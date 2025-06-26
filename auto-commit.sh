#!/bin/bash

# Exclude unwanted paths like node_modules
EXCLUDE_PATTERN="node_modules"

# Get list of modified or untracked files
files=$(git status --porcelain | grep -E '^( M|\?\?)' | cut -c4-)

for file in $files; do
  # Skip if file doesn't exist or is in node_modules
  if [[ ! -e "$file" || "$file" == *"$EXCLUDE_PATTERN"* ]]; then
    echo "❌ Skipping: $file"
    continue
  fi

  git add "$file"
  git commit -m "New update : $file"
done

# Push to current branch
branch=$(git rev-parse --abbrev-ref HEAD)
git push origin "$branch"

echo "✅ All valid files committed and pushed to '$branch'."
