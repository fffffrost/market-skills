#!/usr/bin/env bash

set -euo pipefail

site_origin=${MARKET_SKILLS_SITE_ORIGIN:-https://mktskill.com}
site_host=${MARKET_SKILLS_SITE_HOST:-mktskill.com}

case "$site_origin" in
  https://*) ;;
  *)
    echo "MARKET_SKILLS_SITE_ORIGIN must use HTTPS." >&2
    exit 2
    ;;
esac

check_page() {
  local path=$1
  local marker=$2
  curl --fail --silent --show-error --location --max-time 20 --retry 2 "${site_origin}${path}" | grep --fixed-strings --quiet "$marker"
}

check_page "/" "MARKET"
check_page "/skills/research-competitors/" "MINIMUM INPUT / 最低输入"
check_page "/cases/map-competitors-before-comparing/" "DATA DISCLOSURE"
check_page "/install/" "TROUBLESHOOT / 安装排错"
check_page "/feedback/" "FEEDBACK / OPEN CHANNEL"
check_page "/en/" "Operate in China"
check_page "/en/skills/research-competitors/" "MINIMUM INPUT"
check_page "/en/feedback/" "Record only the signal needed"
check_page "/sitemap.xml" "${site_origin}/en/skills/research-competitors/"
check_page "/events/collect.txt" "ok"

redirect_target=$(curl --silent --show-error --output /dev/null --max-time 20 --write-out '%{redirect_url}' "http://${site_host}/monitor-check?source=github-actions")
if [ "$redirect_target" != "${site_origin}/monitor-check?source=github-actions" ]; then
  echo "Unexpected HTTP redirect target: $redirect_target" >&2
  exit 1
fi

certificate_pem=$(openssl s_client -servername "$site_host" -connect "${site_host}:443" </dev/null 2>/dev/null || true)
if [ -z "$certificate_pem" ] || ! printf '%s\n' "$certificate_pem" | openssl x509 -noout -checkend 1814400; then
  echo "TLS certificate is unavailable or expires within 21 days." >&2
  exit 1
fi

echo "Chinese and English production paths, redirects, content markers, telemetry endpoint, and TLS expiry are healthy."
