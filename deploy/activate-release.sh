#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 4 ]; then
  echo "Usage: activate-release.sh <release-dir> <index-sha256> <file-count> <nginx-config>" >&2
  exit 2
fi

release_dir=$1
expected_hash=$2
expected_count=$3
candidate_config=$4
release_root=/var/www/market-skills-releases
current_link=/var/www/market-skills-current
nginx_config=/etc/nginx/sites-available/market-skills
release_id=${release_dir##*/}
next_link=${current_link}.next-${release_id}
rollback_link=${current_link}.rollback-${release_id}
config_backup=${nginx_config}.prev-${release_id}

case "$release_dir" in
  "$release_root"/*) ;;
  *)
    echo "Release directory must be inside $release_root." >&2
    exit 2
    ;;
esac

if ! [[ "$release_id" =~ ^[0-9]{14}-[0-9a-f]{7,40}$ ]]; then
  echo "Invalid release id: $release_id" >&2
  exit 2
fi

if ! [[ "$expected_hash" =~ ^[0-9a-f]{64}$ ]] || ! [[ "$expected_count" =~ ^[0-9]+$ ]]; then
  echo "Invalid release verification arguments." >&2
  exit 2
fi

test -d "$release_dir"
test -f "$release_dir/index.html"
test -f "$release_dir/opengraph-image"
test -f "$candidate_config"
test -f "$nginx_config"
test ! -e "$next_link"
test ! -L "$next_link"
test ! -e "$rollback_link"
test ! -L "$rollback_link"

actual_hash=$(sha256sum "$release_dir/index.html" | awk '{print $1}')
actual_count=$(find "$release_dir" -type f | wc -l | tr -d ' ')

if [ "$actual_hash" != "$expected_hash" ] || [ "$actual_count" != "$expected_count" ]; then
  echo "Uploaded release does not match the local build." >&2
  exit 1
fi

if find "$release_dir" -type f \( -name '._*' -o -name '.DS_Store' \) -print -quit | grep -q .; then
  echo "Uploaded release contains macOS metadata files." >&2
  exit 1
fi

previous_target=
if [ -L "$current_link" ]; then
  previous_target=$(readlink -f "$current_link")
  case "$previous_target" in
    "$release_root"/*) ;;
    *)
      echo "$current_link points outside $release_root." >&2
      exit 1
      ;;
  esac
elif [ -e "$current_link" ]; then
  echo "$current_link exists but is not a symbolic link." >&2
  exit 1
fi

restore_previous_release() {
  if [ -n "$previous_target" ]; then
    ln -s "$previous_target" "$rollback_link"
    mv -Tf "$rollback_link" "$current_link"
  elif [ -L "$current_link" ]; then
    unlink "$current_link"
  fi

  cp -a "$config_backup" "$nginx_config"
  nginx -t
  systemctl reload nginx
}

verify_site() {
  [ "$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: mktskill.com' http://127.0.0.1/)" = 200 ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: mktskill.com' http://127.0.0.1/skills/research-competitors/)" = 200 ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: mktskill.com' http://127.0.0.1/install/)" = 200 ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: mktskill.com' http://127.0.0.1/robots.txt)" = 200 ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' -H 'Host: mktskill.com' http://127.0.0.1/does-not-exist)" = 404 ] || return 1
  curl -fsSI -H 'Host: mktskill.com' http://127.0.0.1/opengraph-image | tr -d '\r' | grep -qi '^Content-Type: image/png' || return 1
  curl -fsS -H 'Host: mktskill.com' http://127.0.0.1/ | grep -q '为市场人量身打造的 AI Skill Hub' || return 1
  curl -fsS -H 'Host: mktskill.com' http://127.0.0.1/skills/research-competitors/ | grep -q 'EXECUTION PROTOCOL / 执行流程' || return 1
}

cp -a "$nginx_config" "$config_backup"
ln -s "$release_dir" "$next_link"
if ! install -m 644 "$candidate_config" "$nginx_config"; then
  unlink "$next_link"
  echo "Could not install the candidate Nginx configuration." >&2
  exit 1
fi

if ! nginx -t; then
  cp -a "$config_backup" "$nginx_config"
  unlink "$next_link"
  echo "Nginx configuration validation failed; the active site was not changed." >&2
  exit 1
fi

if ! mv -Tf "$next_link" "$current_link"; then
  cp -a "$config_backup" "$nginx_config"
  [ ! -L "$next_link" ] || unlink "$next_link"
  echo "Could not switch the current release; restored the previous Nginx configuration." >&2
  exit 1
fi

if ! systemctl reload nginx; then
  restore_previous_release
  echo "Nginx reload failed; restored the previous release." >&2
  exit 1
fi

if ! verify_site; then
  restore_previous_release
  echo "Remote smoke tests failed; restored the previous release." >&2
  exit 1
fi

printf 'release=%s\nfiles=%s\nsha256=%s\nnginx=%s\n' \
  "$release_id" \
  "$actual_count" \
  "$actual_hash" \
  "$(systemctl is-active nginx)"
