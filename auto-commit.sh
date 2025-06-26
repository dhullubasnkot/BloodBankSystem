#!/bin/bash

# Move to the root of the Git repo
cd "$(git rev-parse --show-toplevel)"

EXCLUDE_PATTERN="node_modules"

# Get a list of modified and untracked files
files=$(git status --porcelain | grep -E '^( M|\?\?)' | cut -c4-)

for file in $files; do
  # Skip non-existing files or excluded directories
  if [[ ! -e "$file" || "$file" =~ $EXCLUDE_PATTERN ]]; then
    echo "❌ Skipping: $file"
    continue
  fi

  # Check if there are actual diff changes
  if git diff --quiet "$file"; then
    echo "⚪ No real change in: $file"
    continue
  fi

  git add "$file"

  # Use filename as the commit message
  filename=$(basename "$file")
  git commit -m "update($filename): changes made in $filename"
done

# Push to current branch
branch=$(git rev-parse --abbrev-ref HEAD)
git push origin "$branch"

echo "✅ Only real changes committed and pushed to '$branch'."
