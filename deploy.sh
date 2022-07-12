#!/bin/bash
git checkout gh-pages
webpack
cp index.html dist/
git add -A
git commit -m "gh pages update"
git push
git checkout master
echo "deployed! :-)"