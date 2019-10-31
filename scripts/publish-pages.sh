#!/bin/bash

origin_path=$(pwd)

while getopts ":d:g:" opt; do
  case $opt in
    d)
      dst_path="$OPTARG"
      ;;
    g)
      git_origin="$OPTARG"
      ;;
    :)                                         # If expected argument omitted:
      echo "Error: -${OPTARG} requires an argument."
  esac
done

function formatEcho() {
  echo -e "\n\e[30;48;5;82m $1 \e[0m\n"
}

# 目标路径未传入，则退出脚本
if [ -z "$dst_path" ]; then
  echo "Error: -d is a required argument"
  exit 1
fi

if [ -z "$git_origin"]; then
  echo "Error: -g is a required argument"
  exit 1
fi

# 初始化目标文件夹
if [ ! -d $dst_path ]; then
  formatEcho '创建目标文件夹'
  mkdir $dst_path
fi

# 进入目标文件夹
formatEcho '进入目标文件夹'
cd $dst_path

# 初始化 git
if [ ! -d .git ]; then
  formatEcho '初始化git'
  git init
  git remote add origin $git_origin
  git pull origin master
fi

# 删除上次打包文件
formatEcho '删除上一版本文件'
for file in $(ls); do
  if [ $file != "README.md" -a $file != "readme.md" ]; then  
    echo "正在删除：$file"
    rm -rf $file
  fi
done

# 复制文件
formatEcho '复制当前版本'
for file in $(ls $origin_path/build); do
  echo "正在复制：$origin_path/build/$file -> $dst_path/$file"
  cp -r $origin_path/build/$file .
done


# 提交至仓库
formatEcho '提交至仓库'
git add .
git commit -m publish
git push origin master

formatEcho '完成'