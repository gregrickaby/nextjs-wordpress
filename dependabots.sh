#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")"
# Dependabots
cd ./ && git pull
cd ./apps/nextjs && npx npm-check-updates -u
cd ../wordpress/wp-content && composer upgrade
cd ../../../packages/eslint-config-custom && npx npm-check-updates -u
cd ../prettier-config-custom && npx npm-check-updates -u
cd ../../ && composer upgrade && npx npm-check-updates -u && npm i
cd ./ && git add . && git commit -m "dependency bump" && git push
echo Done!
exit
