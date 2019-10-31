# create-react-app-template

## webpack alias

## vscode

vscode 在配置 webpack alias 是，需要在项目根目录中添加 `jsconfig.json` 文件，最简配置如下：

```json
{
  "compilerOptions" {
    "baseUrl": "."
    "paths": {
      "@src/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@store/*": ["./src/store/*"],
      "@models/*": ["./src/models/*"]
    }
  }
}
```

但是在使用 `mobx` 时，发现 vscode 不能文件间跳转，在 `jsconfig.json` 文件中添加配置 `module: "commonjs"` 后才能正常跳转至 `mobx`， 但此时 webpack alias 又不能跳转。

解决方案：保持 `jsconfig.json` 文件中添加 `module: "commonjs"` 配置，然后借助 `Path Intellisense` 插件，在项目根目录创建 `.vscode/settings.json` 文件，并将路径别名映射写入配置文件中：

```json
{
  "path-intellisense.mappings": {
    "@src": "${workspaceRoot}/src",
    "@components": "${workspaceRoot}/src/components",
    "@store": "${workspaceRoot}/src/store",
    "@models": "${workspaceRoot}/src/models"
  }
}
```

### webstorm

在设置中配置 webpack 文件路径即可，具体在 `设置 -> Language & Frameworks -> webpack` 中。

### 添加新的路径别名

由于项目是基于 `create-react-app` 并 `eject` 之后修改的，在添加路径别名时，需要修改 `config/modules.js` 文件。 在 `getWebpackAliases` 函数的返回值中添加需要的路径别名。

**NOTE：** 由于上述情况，vscode 在添加路径时比较麻烦，要同时修改三个文件： `config/modules.js`， `jsconfig.json`以及`.vscode/settings.json` 文件，为了保持 webstorm 和 vscode 统一，添加别名时，务必要同时修改这三个文件。

## prettier

### vscode

安装 `prettier` 插件即可

### webstorm

1. `ctrl + alt + s` 打开设置界面
2. 点击 `Tools`
3. 点击 `File Watcher`
4. 点击右边 + 号，从列表中选择 `prettier`
5. 点击确定

## publish-pages.sh

部署 pages 服务脚本，接收2个参数：(getopts 接收参数只能是单个字母)

- `-d`: 目标文件夹，要复制待部署项目到哪个文件夹下，必填
- `-g`: 项目所在的仓库, 必填

示例：

```sh
chmod +x ./script/publish-pages.sh
./script/publish-pages.sh -d /path/to/your/project -g git@your-project.git
```
