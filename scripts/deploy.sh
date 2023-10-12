#!/bin/bash

readonly ROOT_DIR=$(cd $(dirname $0)/.. && pwd)

# clear tmp directory
cd $ROOT_DIR/scripts
rm -rf tmp
mkdir tmp

# clone gh-pages
cd $ROOT_DIR/scripts/tmp
git clone -b gh-pages git@github.com:devtoolsjs/devtoolsjs.github.io.git repo

# build the application
cd $ROOT_DIR
npx vite build --outDir scripts/tmp/repo/docs --base https://cdn.jsdelivr.net/gh/devtoolsjs/devtoolsjs.github.io@gh-pages/docs/

# publish to github pages
cd $ROOT_DIR/scripts/tmp/repo
git add .
git status
git commit -m "build: deploy latest content"
git push
