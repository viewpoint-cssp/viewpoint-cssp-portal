#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# create 404.html as a copy of index.html 
cp index.html 404.html

# deploying to our custom domain
echo 'www.viewpoint-cssp.org' > CNAME

git init
git add -A
git commit -m 'deploy'

# deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/viewpoint-cssp/viewpoint-cssp-portal.git master:gh-pages

cd -