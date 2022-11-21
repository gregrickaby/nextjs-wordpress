#!/bin/bash
# Run `bash dependabots.sh` to update all dependencies.

git pull
cd ./apps/nextjs && npx npm-check-updates -u
cd ../wordpress/wp-content && composer upgrade
cd ../../../packages/eslint-config-custom && npx npm-check-updates -u
cd ../prettier-config-custom && npx npm-check-updates -u
cd ../../ && composer upgrade && npx npm-check-updates -u && npm i
git add . && git commit -m "dependency bump" && git push
exit
