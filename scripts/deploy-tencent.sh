#!/usr/bin/env bash

set -euo pipefail

if [ -z "${DEPLOY_HOST:-}" ] || [ -z "${DEPLOY_KEY:-}" ]; then
  echo "Set DEPLOY_HOST and DEPLOY_KEY before deploying." >&2
  exit 2
fi

if ! [[ "$DEPLOY_HOST" =~ ^[A-Za-z0-9._:-]+$ ]]; then
  echo "DEPLOY_HOST contains unsupported characters." >&2
  exit 2
fi

if [ ! -f "$DEPLOY_KEY" ]; then
  echo "DEPLOY_KEY does not point to a readable file." >&2
  exit 2
fi

for command_name in git npm rsync ssh shasum; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Missing required command: $command_name" >&2
    exit 2
  fi
done

if [ -n "$(git status --porcelain)" ]; then
  echo "Refusing to deploy a dirty worktree. Commit the release first." >&2
  exit 1
fi

npm run build
npm run validate:seo

if [ -n "$(git status --porcelain)" ]; then
  echo "The production build changed tracked files; review them before deploying." >&2
  exit 1
fi

commit=$(git rev-parse --verify HEAD)
short_commit=$(git rev-parse --short=7 HEAD)
release_id=$(date '+%Y%m%d%H%M%S')-${short_commit}
release_root=/var/www/market-skills-releases
release_dir=${release_root}/${release_id}
remote_script=/tmp/activate-market-skills-${release_id}.sh
remote_config=/tmp/nginx-market-skills-${release_id}.conf
target=root@${DEPLOY_HOST}
expected_hash=$(shasum -a 256 out/index.html | awk '{print $1}')
expected_count=$(find out -type f ! -name '.DS_Store' ! -name '._*' | wc -l | tr -d ' ')
ssh_options=(-i "$DEPLOY_KEY" -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=10)
printf -v rsync_shell 'ssh -i %q -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=10' "$DEPLOY_KEY"

ssh "${ssh_options[@]}" "$target" \
  "set -eu; command -v rsync >/dev/null; command -v sha256sum >/dev/null; install -d -m 755 '$release_root'; test ! -e '$release_dir'; test ! -L '$release_dir'; install -d -m 755 '$release_dir'"

rsync -rlptz --delete \
  --exclude '.DS_Store' \
  --exclude '._*' \
  -e "$rsync_shell" \
  out/ "$target:$release_dir/"

rsync -rlptz -e "$rsync_shell" deploy/activate-release.sh "$target:$remote_script"
rsync -rlptz -e "$rsync_shell" deploy/nginx-market-skills.conf "$target:$remote_config"

ssh "${ssh_options[@]}" "$target" \
  bash "$remote_script" "$release_dir" "$expected_hash" "$expected_count" "$remote_config"

ssh "${ssh_options[@]}" "$target" \
  "set -eu; test ! -e '$remote_script' || unlink '$remote_script'; test ! -e '$remote_config' || unlink '$remote_config'"

printf 'Deployed commit %s as %s.\n' "$commit" "$release_id"
