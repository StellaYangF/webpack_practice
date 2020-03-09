# What is WebPack?
`WebPack` 可以看做是模块打包机：它做的事情是，分析你的项目结构，找到 `JavaScript` 模块以及其它的一些浏览器不能直接运行的拓展语言（`Scss`, `TypeScript` 等），并将其打包为合适的格式以供浏览器使用。

<img src='./readmeimages/webpack.jpeg'/>

构建就是把源代码转换成发布到线上的可执行 `JavaScrip`、`CSS`、`HTML` 代码，包括如下内容。
- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。

# 初始化项目
```bash
mkdir webpack-practice
cd webpack-practice
npm init -y
```

# 快速上手
## webpack 核心概念
- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
- context: context 即是项目打包的路径上下文，如果指定了 context ,那么 entry 和output 都是相对于上下文路径的，contex必须是一个绝对路径

> Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

## 配置 webpack
```bash
npm install webpack webpack-cli -D
```

## 创建 src 目录
```bash
mkdir src
```

## 创建 dist 目录
这个目录为打包后的文件目录，可自动创建。
```bash
mkdir dist
```

## 基本配置文件
webpack.config.js

```js
const path=require('path');
module.exports = {
  context:process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module: {},
    plugins: [],
    devServer: {}
}
```

- 创建 dist
    - 创建index.html
- 配置文件webpack.config.js
    - entry：配置入口文件的地址
    - output：配置出口文件的地址
    - module：配置模块,主要用来配置不同文件的加载器
    - plugins：配置插件
    - devServer：配置开发服务器

##  创建 index.html 文件
在 dist 目录下创建 index.html 文件，手动把打包后的 bundle.js 引入进来
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="root"></div>
<script src="bundle.js"></script>
</body>
</html>
```

## mode
Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.

webpack 的 mode 配置用于提供模式配置选项告诉 webpack 相应地使用其内置的优化，mode 有以下三个可选值
- development
- production
- none
### 使用
Provide the `mode` option in the config:

在配置选项中设置 `mode` 属性
```js
module.exports = {
  mode: 'development'
};
```

or pass it as a `CLI` argument:

或者通过命令行形式设置
```bash
webpack --mode=development
```

The following string values are supported:

支持以下字符值：
**options** | **description** 
:-|:-|:-
`development` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development` . Enables `NamedChunksPlugin` and `NamedModulesPlugin` . |
`production` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production` . Enables `FlagDependencyUsagePlugin` , `FlagIncludedChunksPlugin` , `ModuleConcatenationPlugin` , `NoEmitOnErrorsPlugin` , `OccurrenceOrderPlugin` , `SideEffectsFlagPlugin` and `TerserPlugin` . |
`none` | Opts out of any default optimization options

如果没有设置 mode 属性，则默认为 productions

common
```bash
//parent chunk中解决了的chunk会被删除
optimization.removeAvailableModules:true
//删除空的chunks
optimization.removeEmptyChunks:true
//合并重复的chunk
optimization.mergeDuplicateChunks:true
```

development
```bash
//调试
devtool:eval
//缓存模块, 避免在未更改时重建它们。
cache:true
//缓存已解决的依赖项, 避免重新解析它们。
module.unsafeCache:true
//在 bundle 中引入「所包含模块信息」的相关注释
output.pathinfo:true
//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
optimization.providedExports:true
//找到chunk中共享的模块,取出来生成单独的chunk
optimization.splitChunks:true
//为 webpack 运行时代码创建单独的chunk
optimization.runtimeChunk:true
//编译错误时不写入到输出
optimization.noEmitOnErrors:true
//给模块有意义的名称代替ids
optimization.namedModules:true
//给模chunk有意义的名称代替ids
optimization.namedChunks:true
```

production
```bash
//性能相关配置
performance:{hints:"error"....}
//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
optimization.flagIncludedChunks:true
//给经常使用的ids更短的值
optimization.occurrenceOrder:true
//确定每个模块下被使用的导出
optimization.usedExports:true
//识别package.json or rules sideEffects 标志
optimization.sideEffects:true
//尝试查找模块图中可以安全连接到单个模块中的段。- -
optimization.concatenateModules:true
//使用uglify-js压缩代码
optimization.minimize:true
```

## 配置开发服务器
```bash
npm i webpack-dev-server –D
```
- contentBase: 配置开发服务运行时的文件根目录
- host：开发服务器监听的主机地址
- compress 开发服务器是否启动gzip等压缩
- port：开发服务器监听的端口

webpack.config.js
```js
+ devServer:{
+        contentBase:path.resolve(__dirname,'dist'),
+        host:'localhost',
+        compress:true,
+        port:8080
+ }
```

package.json
```js
+  "scripts": {
+    "build": "webpack",
+    "dev": "webpack-dev-server --open "
+  }
```

## 支持加载css文件
### 什么是Loader
通过使用不同的 Loader，Webpack 可以要把不同的文件都转成 JS 文件,比如CSS、ES6/7、JSX等。
- test：匹配处理文件的扩展名的正则表达式
- use：loader名称，就是你要使用模块的名称
- include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- query：为loaders提供额外的设置选项

### loader三种写法
- [css-loader](https://www.npmjs.com/package/css-loader)
- [style-loader](https://www.npmjs.com/package/style-loader)

#### loader
加载 CSS 文件，CSS 文件有可能在 node_modules 里，比如 bootstrap 和 antd
```js
module: {
        rules: [
            {
                test: /\.css/,
+                loader:['style-loader','css-loader']
            }
        ]
    }
```

#### use
```js
module: {
        rules: [
            {
                test: /\.css/,
+                use:['style-loader','css-loader']
            }
        ]
    },
```

#### use + loader
```js
  module: {
        rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insert:'top'
                    }
                },'css-loader']
            }
        ]
    }
```

## 插件
- 在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务
- 模块代码转换的工作由 loader 来处理
- 除此之外的其他任何工作都可以交由 plugin 来完成

### 自动产出html
- 我们希望自动能产出HTML文件，并在里面引入产出后的资源
- [chunksSortMode](https://github.com/jaketrent/html-webpack-template/blob/86f285d5c790a6c15263f5cc50fd666d51f974fd/index.html) 还可以控制引入的顺序
```bash
npm i html-webpack-plugin -D
```
> [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 所有的插件几乎都是一个类
- minify 是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号
- hash 引入产出资源的时候加上查询参数，值为哈希避免缓存
- template 模版路径
- filename 产出后的文件
```js
+    +entry:{
+        index:'./src/index.js',  // chunk名字 index
+        common:'./src/common.js' //chunk名字 common
+    },

    plugins: [
+       new HtmlWebpackPlugin({
+            template:'./src/index.html',//指定模板文件
+            filename:'index.html',//产出后的文件名
+            inject:false,
+            hash:true,//为了避免缓存，可以在产出的资源后面添加hash值
+            chunks:['common','index'],
+            chunksSortMode:'manual'//对引入代码块进行排序的模式
+        }),
    )]
```

```bash
<head>
+ <% for (var css in htmlWebpackPlugin.files.css) { %>
+        <link href="<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet">
+ <% } %>
</head>
<body>
+ <% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
+ <script src="<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
+ <% } %>
</body>
```

## 支持图片
### 手动添加图片
```bash
npm i file-loader url-loader -D
```
[file-loader](https://npmjs.com/package/file-loader) 解决CSS等文件中的引入图片路径问题
[url-loader](https://www.npmjs.com/package/url-loader) 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝

### JS中引入图片
#### JS
```js
let logo=require('./images/logo.png');
let img=new Image();
img.src=logo;
document.body.appendChild(img);
```
#### webpack.config.js
```js
{
  test:/\.(jpg|png|bmp|gif|svg)/,
    use:[
    {
       loader:'url-loader',
       options:{limit:4096}
    }
  ]
}
```
#### 在 CSS 中引入图片
还可以在CSS文件中引入图片
##### CSS
```css
.logo{
    width:355px;
    height:133px;
    background-image: url(./images/logo.png);
    background-size: cover;
}
```
##### HTML
```html
<div class="logo"></div>
```