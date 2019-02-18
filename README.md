# Talos

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

`Talos`，a starter kit of `react`。

## Feature

1. 根据用户需要自定义的构建流程
2. 使用`redux-model`简化 Redux 组织方式

## Get Start

Before the start, we recommend you read these documentation.

-   [React](https://facebook.github.io/react/)
-   [Redux](https://github.com/reactjs/redux)
-   [ES6](http://babeljs.io/learn-es2015/)
-   [Webpack](https://github.com/webpack/webpack)

You can try ES6 and JSX in [Babel REPL](http://babeljs.io/repl/).

> We recommend node 8.x + npm 5.x / yarn ^1.7.0。

## Files Structure

```
build                   构建产出（可上线）代码

tools                   构建工具，使用ES6语法，做一些流程化的构建工作
    - commands          构建脚本
    - utils
    - config
        - dev           开发构建脚本配置
        - prod          部署构建脚本配置

client
    - components        无状态组件
        - ...
    - constant          不常变的静态变量
        - Routes
        - Type          ActionType（已废弃这种书写方式，仅作参照）
    - containers        容器组件
        - ...
    - public            资源文件目录
        - ...
    - redux             状态管理组件（Redux）
        - actions
        - reducers
        - store

client.jsx              入口文件
.gitlab-ci.yml          gitlab的CI脚本
```

## Install

First, clone `Talos` into your machine:

```
$ git clone https://github.com/anlia260/talos.git
$ cd talos && yarn # Install project dependencies (or `npm install`)

```

## Development

```
$ yarn start # Start the development server (or `npm start`)
```

## Production Build

```
yarn run build
```

## Scripts

| `yarn <script>` | Description                                |
| --------------- | ------------------------------------------ |
| `start`         | Serves your app at <http://localhost:4001> |
| `build`         | Builds the application to ./build          |
| `build -- dll`  | clear dll cache & run build                |

---

## Advance

-   构建完成后，如何预览构建后的文件正确性？[【Nginx 的简单配置】](https://github.com/anlia260/talos/wiki/Nginx.Config)

-   如何快速调试`web`的兼容性？[【Browsersync】](https://github.com/anlia260/talos/wiki/Browsersync)

## Data Flow

![redux](https://user-images.githubusercontent.com/20860159/29354186-429b4446-829f-11e7-9a2f-a15c97dafaa3.png)

## Credits

[React Starter Kit](https://github.com/kriasoft/react-starter-kit)
