stash=$(git stash --keep-index --include-untracked)

set +e
npm run check
npm run test
set -e

if ! [ "No local changes to save" == "$stash" ]; then
  git stash pop
fi
