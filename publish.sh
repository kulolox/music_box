#!/bin/bash

npm run build
chmod +x ./scripts/publish-pages.sh
./scripts/publish-pages.sh -d ../music.kulolox.cn -g git@e.coding.net:button-dev/pages/jpm2020.button.tech.git
curl https://aliyun.kulolox.cn:3020/music.kulolox.cn
