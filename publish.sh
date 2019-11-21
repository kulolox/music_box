#!/bin/bash

npm run build
chmod +x ./scripts/publish-pages.sh
./scripts/publish-pages.sh -d ../music.kulolox.cn -g git@git.dev.tencent.com:kulolox/music.kulolox.cn.git
curl http://aliyun.kulolox.cn:3020/music.kulolox.cn
