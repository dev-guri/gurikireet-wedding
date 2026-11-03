#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

commit_message="${1:-Update wedding website}"

git add --all
if ! git diff --cached --quiet; then
  git commit -m "$commit_message"
fi

git push origin main
