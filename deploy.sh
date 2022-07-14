#!/bin/bash
webpack
cp index.html dist/
git add -A
git commit -m "gh pages update"
git push

echo "deployed! :-)"