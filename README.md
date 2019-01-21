# Talos

`Talos` 一套 web 模版，使用了`React`。

# 特点（Todo）

1. 可以自定义的构建流程
2. 简单的 redux 组织方式

## 目录结构

```
build                   构建产出（可上线）代码

tools                   构建工具，使用ES6语法，做一些流程化的构建工作
    - commands          构建脚本
    - core
    - utils             构建工具库
    - config
        - dev           开发构建脚本配置
        - prod          部署构建脚本配置

src/client              源码目录(TODO to fix)
    - components        业务组件目录（包含无状态组件与有状态组件）
        - ad            有状态业务组件
        - echat         无状态组件
        - ...           其他
    - constant          不常变的静态文件目录
        - api           业务API接口
        - type          项目中 Action Type 的定量
    - public            资源文件目录（TODO to fix）
        - ...           静态资源
    - redux             状态管理组件（Redux）
        - actions       动作
            - name1     模块名称_组件_action 当一个模块较大会把对应的action拆成若干个组件
            - name2     模块名称_action 适用于小的模块，比如 common_action
        - reducers      状态累加器
            - name1     模块名称_组件_reducer 当一个模块较大会把对应的action拆成若干个组件
            - name2     模块名称_reducer 适用于小的模块，比如 common_reducer
        - store         store对象
    - routes            路由组件

client.jsx              入口文件
package.json            包说明
README.md               说明文档
CHANGELOG.md            项目日志文档
.gitignore              git忽略配置
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

`Talos` will compile your source code into production code, when compiling finished, you can find them in the `build/` folder.

## Credits

[Redux](https://github.com/reactjs/redux)

[Webpack](https://github.com/webpack/webpack)

[React Starter Kit](https://github.com/kriasoft/react-starter-kit)
