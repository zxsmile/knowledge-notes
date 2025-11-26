# 围绕webpack可以从哪些方面开展项目性能优化?

围绕 webpack 做性能优化，分为两个方面:构建时间优化、构建体积优化

## 构建时间优化

#### 缩小范围

我们在使用loader时，可以配置include、exclude缩小loader对文件的搜索范围，以此来提高构建速率。

像/node_moudles目录下的体积辣么大，又是第三方包的存储目录，直接 exclude掉可以节省一定的时间的。

当然 exclude 和 include 可以一起配置，大部分情况下都是只需要使用loader 编译src目录下的代码

```
module.exports ={module:{
rules:[
test: /.(|ts|tsx|js|jsx)$/,// 只解析 src 文件夹下的 ts、tsx、js.
jsx 文件// include可以是数，表示多个文件夹下的模块都要解析
include: path.resolve(__dirname,'../src'), use:['thread-loader','babel-loader'],
//当然也可以配置 exclude,表示loader解析时不会编译这部分文件//同样
exclude 也可以是数组
exclude: /node_modules/,

}
```

还需注意一个点就是要确保loader的准确性,比如不要使用less-loader去解析 css文件

#### 文件后缀

resolve.extensions 是我们常用的一个配置，他可以在导入语句没有带文件后缀时，可以按照配置的列表，自动补上后缀。我们应该根据我们项目中文件的实际使用情况设置后缀列表，将使用频率高的放在前面、同时后缀列表也要尽可能的少，减少没有必要的匹配。同时，我们在源码中写导入语句的时候，尽量带上后缀，避免查找匹配浪费时间。

```
module.export ={
resolve:{// 按照 tsx、ts、jsx、js的顺序匹配,若没匹配到则报错 extensions: ['.tsx','.ts','.jsx','.js'],}

别名
通过配置resolve,alias别名的方式，减少引用文件的路径复杂度

module,exports ={
resolve: {
alias: {//把 src文件夹别名为 @//引入 src下的文件就可以import xxx from
'@/xxx"'@': path.join(__dirname,'../src')

}
// 引入src下的某个模块时import xxx from '@/xxx/xxx.tsx'
```

#### 缓存

在优化的方案中，缓存也是其中重要的一环。在构建过程中，开启缓存提升二次打包速度。
在项目中，js文件是占大头的，当项目越来越大时，如果每次都需要去编译JS代码，那么构建的速度肯定会很慢的，所以我们可以配置babel-loader的缓存配置项cacheDirectory来缓存没有变过的js代码

```
module.exports ={module:{
rules: [{
test: /.jsx?$/, use:[{
loader:'babel-loader', options: {
cacheDirectory:true,

}
```

上面的缓存优化只是针对像babel-loader这样可以配置缓存的loader，那没有缓存配置的 loader 该怎么使用缓存呢，此时需要cache-loader

```
module.exports ={module: {
rules: [{
test: /.jsx?$/，
use: ['cache-loader',"babel-loader"
1,
}
```

编译后同样多一个/node_modules/.cache/cache-loader缓存目录当然还有一种方式，webpack5 直接提供了 cache配置项，开启后即可缓存

```
module.exports ={ cache:{
type:'filesystem'

编译后会多出 /node_modules/.cache/webpack缓存目录并行构建
首先，运行在 Node 里的 webpack是单线程的，所以一次性只能干一件事，那如果利用电脑的多核优势，也能提高构建速度?thread-loader可以开启多进程打包
module.exports ={module:{
rules:[
test: /.jsx?$/，
use: [// 开启多进程打包。
loader: 'thread-loader', options: {
workers: 3 //开启 3个进程}

loader:'babel-loader',
}
}
```

放置在这个 thread-loader之后的 loader 就会在一个单独的worker池(worker pool) 中运行。每个 worker 都是一个单独的有600ms 限制的 node.js进程。同时跨进程的数据交换也会被限制。所以建议仅在耗时的loader上使用。若项目文件不算多就不要使用，毕竟开启多个线程也会存在性能开销。

#### 定向查找第三方模块

resolve.modules配置用于指定webpack去哪些目录下寻找第三方模块。默认值是
['node_modules']。而在引入模块的时候，会以node核心模块----->node_modules ----> node全局模块的顺序查找模块。
我们通过配置resolve.modules指定webpack搜索第三方模块的范围，提高构建速率

```
module.export={ resolve: {
modules: [path.resolve(__dirname,'node_modules' )]
```

## 2、构建结果优化

#### 压缩js

webpack5的话通过 terser-webpack-plugin来压缩 JS,但在配置了mode:production时，会默认开启

```
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
optimization:{//开启压缩 minimize: true,//压缩工具
minimizer: [new TerserPlugin({})，],

},}
```

需要注意一个地方:生产环境会默认配置terser-webpack-plugin，所以如果你还有其它压缩插件使用的话需要将TerserPlugin显示配置或者使用...，否则terser-webpack-plugin会被覆盖。

```
const TerserPlugin = require("terser-webpack-plugin"); optimization:{ minimize: true,
minimizer: [new TerserPlugin({})，//显示配置//"..."，//或者使用展开符,启用默认插件//其它压缩插件new CssMinimizerPlugin(),],

#### 压缩CSS
```

#### 压缩css 

我们使用css-minimizer-webpack-plugin

同时，应该把css提取成单独的文件，使用mini-css-extract-plugin

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); const CssMinimizerPlugin = require("css-minimizer-webpack-plugin" ) ;
module.exports ={module:{
rules:[
test: /\.css$/,
use:[//提取成单独的文件
MiniCssExtractPlugin.loader,"css-loader"],
exclude: /node_modules/,},
1
},
plugins:[new MiniCssExtractPlugin({//定义输出文件名和目录
filename:"asset/css/main.css",

optimization: { minimize: true,
minimizer:[//压缩cssnew CssMinimizerPlugin({}),
]
}

```

#### 压缩html

压缩 html使用的还是html-webpack-plugin插件。该插件支持配置一个minify对象，用来配置压缩html

```
module.export = {
plugins: [new HtmlwebpackPlugin({// 动态生成html 文件
template: "./index.html", minify:{//压缩HTML
removeComments: true，// 移除HTML中的注释
collapseWhitespace: true，// 删除空白符与换行符 minifycsS: true //压缩内联css
```

#### 压缩图片

可以通过image-webpack-loader来实现

```
module.exports ={module:{
rules: [
test: /\.(png|jpg|gif|jpeg |webp| svg)$/, use: ["file-loader",
loader: "image-webpack-loader", options: { mozjpeg: {
progressive: true,},
optipng: {
enabled: false,}，
pngquant: {
quality: [0.65，0.9]， speed: 4,
gifsicle:{
interlaced: false,}，

},},],
exclude: /node_modules/，//排除 node_modules目录}，
},

]

}

]
```

#### 按需加载

很多时候我们不需要一次性加载所有的JS文件，而应该在不同阶段去加载所需要的代码。

将路由页面/触发性功能单独打包为一个文件，使用时才加载，好处是减轻首屏渲染的负担。因为项目功能越多其打包体积越大，导致首屏渲染速度越慢。

实际项目中大部分是对懒加载路由，而懒加载路由可以打包到一个chunk里面。比如某个列表页和编辑页它们之间存在相互跳转，如果对它们拆分成两个import()js资源加载模块，在跳转过程中视图会出现白屏切换过程。

因为在跳转期间，浏览器会动态创建script标签来加载这个chunk文件，在这期间，页面是没有任何内容的。

所以一般会把路由懒加载打包到一个chunk 里面

```
const List =lazyComponent('list',() => import(/*webpackChunkName: "list" */'@/pages/list'));
const Edit=lazyComponent('edit',() => import(/* webpackChunkName: "list" */'@/pages/edit'));
```

但需要注意一点:动态导入import()一个模块，这个模块就不能再出现被其他模块使用同步 import方式导入。

比如，一个路由模块在注册<Route />时采用动态import()导入，但在这个模块对外暴露了一些变量方法供其他子模块使用，在这些子模块中使用了同步ESModule import方式引入，这就造成了动态 import()的失效。

####  prload、prefetch

对于某些较大的模块，如果点击时再加载，那可能响应的时间反而延长。我们可以使用 prefetch 、preload 去加载这些模块

prefetch:将来可能需要一些模块资源(一般是其他页面的代码)，在核心代码加载完成之后带宽空闲的时候再去加载需要用到的模块代码。

preload:当前核心代码加载期间可能需要模块资源(当前页面需要的但暂时还没使用到的)，其是和核心代码文件一起去加载的。

只需要通过 魔法注释 即可实现，以prefetch 为例:

```
document.getElementById('btn1').onclick = function() {import(/* webpackChunkName: "btnchunk"
/* webpackPrefetch:true*/'./module1.js') . then(fn => fn.default());}
```

这行代码表示在浏览器空闲时加载module1.js模块，并且单独拆一个chunk，叫做btnChunk可以看到，在 head 里面，我们的懒加载模块被直接引入了，并且加上了rel='prefetch'.这样，页面首次加载的时候，浏览器空闲的会后会提前加载modulel.js。当我们点击按钮的时候，会直接从缓存中读取该文件，因此速度非常快。

#### 代码分割

在项目中，一般是使用同一套技术栈和公共资源。如果每个页面的代码中都有这些公开资源，就会导致资源的浪费。在每一个页面下都会加载重复的公共资源，一是会浪费用户的流量，二是不利于项目的性能，造成页面加载缓慢，影响用户体验。

一般是把不变的第三方库、一些公共模块(比如util.js)这些单独拆成一个chunk，在访问页面的时候，就可以一直使用浏览器缓存中的资源

webpack 里面通过splitChunks来分割代码

```
module.exports ={//... optimization: { splitChunks: {
chunks: 'async'， // 值有 all, async 和initial
minSize: 20000，// 生成chunk的最小体积(以bytes为单位)。 minRemainingSize: 0,
minChunks:1，//拆分前必须共享模块的最小chunks数。 maxAsyncRequests: 30，//按需加载时的最大并行请求数。 maxInitialRequests: 30，//入口点的最大并行请求数。 enforceSizeThreshold:50000, cacheGroups:{
defaultVendors:{
test: /[\/]node_modules[\/]/，//第三方模块拆出来 priority:-10,
reuseExistingChunk: true,},

util.vendors:{I
test: /[\/]utils[\/]/，//公共模块拆出来 minChunks: 2, priority: -20,
reuseExistingChunk: true,
人,
},};
```

#### tree shaking

tree shaking在生产模式下已经默认开启了只是需要注意下面几点:
1.只对ESM 生效

2.只能是静态声明和引用的 ES6 模块，不能是动态引入和声明的。

3.只能处理模块级别，不能处理函数级别的冗余。

4.只能处理 JS 相关冗余代码，不能处理cSS冗余代码。

而可能样式文件里面有些代码我们也没有使用，我们可以通过purgecss-webpack-plugin插件来对 css 进行 tree shaking

```
const path =require("path");
const PurgecssPlugin = require("purgecss-weppack-plugin");
const glob = require("glob"); // 文件匹配模式module.exports = {//... plugins:[
...new PurgeCSSPlugin({
paths: glob.sync('${PATH.src}/**/*`，{ nodir: true }),})
// Add your plugins here// Learn more about plugins from https://webpack.js.org/configuration/plugins/
};
```

#### gzip

前端除了在打包的时候将无用的代码或者console、注释剔除之外。我们还可以使用Gzip对资源进行进一步压缩。那么浏览器和服务端是如何通信来支持 Gzip呢?

1.当用户访问 web站点的时候，会在request header 中设置accept-encoding:gzip,
表明浏览器是否支持 Gzip。

2.服务器在收到请求后，判断如果需要返回 Gzip压缩后的文件那么服务器就会先将我们的
JS\CSS等其他资源文件进行 Gzip压缩后再传输到客户端，同时将response headers设置content-encoding:gzip。反之，则返回源文件。

3.浏览器在接收到服务器返回的文件后，判断服务端返回的内容是否为压缩过的内容，是的话则进行解压操作。

一般情况下我们并不会让服务器实时Gzip 压缩，而是利用webpack提前将静态资源进行Gzip压缩，然后将 Gzip资源放到服务器，当请求需要的时候直接将Gzip 资源发送给客户端。我们只需要安装compression-webpack-plugin 并在plugins配置就可以了

```
const CompressionWebpackPlugin = require("compression-webpack-plugin");//需要安装module.exports ={
plugins:[newCompressionWebpackPlugin()
```

#### 作用域提升

Scope Hoisting 可以让webpack打包出来的代码文件体积更小，运行更快。

在开启 Scope Hoisting后，构建后的代码会按照引入顺序放到一个函数作用域里，通过适当重命名某些变量以防止变量名冲突，从而减少函数声明和内存花销。

需要注意:Scope Hoisting需要分析模块之间的依赖关系，所以源码必须采用ES6模块化语法 

Scope Hoisting 是webpack内置功能，只需要在plugins里面使用即可，或者直接开启生产环境也可以让作用域提升生效。

```
module.exports ={//方式1 mode: 'production',//方式2
plugins: [//开启Scope Hoisting 功能new webpack.optimize,ModuleConcatenationPlugin()
}
```

