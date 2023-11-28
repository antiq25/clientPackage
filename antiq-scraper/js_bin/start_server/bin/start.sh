#!/bin/bash

# Start the first npm process
pkill node

cd "$HOME/clientPackage" && source env/bin/activate

cd "$HOME/clientPackage/antiq-scraper" && node js_bin/dataApi.js &

cd "$HOME/clientPackage/devias-template" && yarn run dev -p 3001  &

cd "$HOME/clientPackage/sms-backend" && yarn run dev:db; yarn run dev &


