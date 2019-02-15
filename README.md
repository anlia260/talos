# Talos

`Talos` 是一套 web 模版，使用`React`。

# 特点

1. 根据用户需要自定义的构建流程
2. 使用`redux-model`简化 Redux 组织方式

## 目录结构

```
build                   构建产出（可上线）代码

tools                   构建工具，使用ES6语法，做一些流程化的构建工作
    - commands          构建脚本
    - utils
    - config
        - dev           开发构建脚本配置
        - prod          部署构建脚本配置

src/client              源码目录
    - components        木偶组件
        - ...
    - constant          不常变的静态变量
        - Routes        路由
        - api           业务API接口
        - type          项目中 Action Type 的定量（已废弃这种书写方式）
    - containers        智能组件
        - ...
    - public            资源文件目录
        - ...
    - redux             状态管理组件（Redux）
        - actions
        - reducers
        - store
    - routes            路由组件

client.jsx              入口文件
package.json
README.md
CHANGELOG.md
.gitignore
.editorConfig           格式配置
.gitlab-ci.yml          gitlab CI脚本
```

## Install

First, clone `Talos` into your machine:

```
https://github.com/anlia260/talos
```

Then go to the project directory, install dependencies:

```
$ cd talos && yarn
```

## Development

By running this:

```
yarn start
```

`Talos` will start a development server and run your code with live-reload.

## Production Build

By running this:

```
yarn run build
```

`Talos` will compile your source code into production, when compiling finished, you can find them in the `build/` folder.

## Advance

-   构建完成后，如何预览构建后的文件正确性？【Nginx 的简单配置】

## Nginx Config

```
server {
        listen 10086;
        server_name talos.com;

        location / {
                root ~/talos/build;
                autoindex on;
                client_max_body_size    1000m;
        }

}
```

## Credits

[Redux](https://github.com/reactjs/redux)

[Webpack](https://github.com/webpack/webpack)

[React Starter Kit](https://github.com/kriasoft/react-starter-kit)
