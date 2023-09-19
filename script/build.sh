#!/bin/sh

git restore .

git pull

npm run build

sudo rm -r /var/www/html/*

sudo cp -r dist/* /var/www/html/

sudo systemctl restart nginx