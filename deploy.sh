#!/bin/bash
git add -A
git commit -m "gh pages update"
git checkout gh-pages
webpack
cp index.html dist/
git add -A
git commit -m "gh pages update"
git merge master
git push
git checkout master
echo "deployed! :-)"