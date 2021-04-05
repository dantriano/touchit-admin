#!/bin/bash
#set -e

npm install && npm install -g migrate-mongo && npm migrate
#npm run dev

tail -f /dev/null