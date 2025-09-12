# 一、webpack的作用 #

   ### 1、模块化开发 ###

- 在没有各个 webpack 搭建的脚手架（create-react-app、vue-cli 等等）之前，我们通过在 HTML5 文件里引入一个个 Javascript 文件来进行开发

  ```
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <script src="https://unpkg.com/jquery@3.5.1"></script>
      <script src="https://unpkg.com/lodash@4.17.20"></script>
      <script src="./src/index.js"></script>
    </head>
    <body>
    </body>
  </html>
  ```

- 这样写会导致几个问题：

  - **单独看`index.js`不能清晰的找到他到底依赖哪些外部库**
  - **`script`的顺序必须写正确，如果错了就会导致找不到依赖，直接报错**
  - **模块间通信困难，基本都靠往`window`上注入变量来暴露给外部**
  - **浏览器严格按照`script`标签来下载代码，有些没用到的代码也会下载下来**
  - **当前端规模变大，JS脚本会显得很杂乱，项目管理混乱**

- `webpack`的一个最基本的功能就是来解决上述的情况，允许在JS里面通过 import、require等关键字来显式申明依赖，可以引用第三方库，自己的JS代码间也可以相互引用，这样在实质上就实现了前端代码的模块化。由于历史问题，老版的JS并没有自己模块管理方案，所以社区提出了很多模块管理方案，比如`ES2015`的`import`，`CommonJS`的`require`，另外还有`AMD`，`CMD`等等。就目前我见到的情况来说，`import`因为已经成为`ES2015`标准，所以在客户端广泛使用，而`require`是`Node.js`的自带模块管理机制，也有很广泛的用途，而`AMD`和`CMD`的使用已经很少见了。

- `webpack`作为一个开放的模块化工具，他是支持`ES6`，`CommonJS`和`AMD`等多种标准的，不同的模块化标准有不同的解析方法。

- 在 webpack 中一切皆模块，js、css、图片、字体都是模块，而且支持静态解析、按需打包、动态加载、代码分离等功能，帮助我们优化代码，提升性能。

### 2、编译兼容 ###

- Javascript、CSS 的语法规范在不断更新，比如Less、Sass、ES6、TypeScript，但是浏览器的兼容性却不能同步的更新，即这些新语法不能直接被浏览器识别，webpack 使用 loader 对文件进行预处理。通过预处理器将 TypeScript 编译成 JavaScript、SCSS 编译成 CSS、ES6 编译成 ES5 等。

### 3、主流框架脚手架 ###

- Vue 脚手架 vue-cli、React 脚手架 creact-react-app、Taro 脚手架 taro-cli 都是使用 webpack，开发者掌握 webpack 后，可以自由配置脚手架，根据项目需要，调整 webpack 配置，以提高项目性能。

### 4、其他 ###

- webpack 除了让开发者能够拥有【模块化开发+新语言+新框架】的开发体验。
 - 还有以下优点：

   - 拥有依赖管理、动态打包、代码分离、按需加载、代码压缩、静态资源压缩、缓存等配置；
   - webpack 扩展性强，插件机制完善，开发者可自定义插件、loader；
   - webpack 社区庞大，更新速度快，轮子丰富；

# 二、webpack概念 #

   - **webpack是一种前端资源构建工具，一个静态模块打包器。**

     ![webpack1](..\images\webpack1.png)
- 在图中我们可以看到，webpack 将左侧错综复杂的各自不同类型文件的模板依赖关系，包括 .js、.hbs、.cjs、.sass、.jpg、.png 等类型文件，打包成 .js、.css、.jpg、.png 4 种类型的静态资源。
- **这个过程核心完成了 内容转换 + 资源合并 两种功能，实现上包含三个阶段：初始化阶段、构建阶段、生成阶段。**

# 三、构建流程

### 1、初始化阶段：

**初始化参数**：从配置⽂件和 Shell 语句中读取与合并参数，得出最终的参数； 

**开始编译**：用上一步得到的参数初始化compiler对象，注册所有配置的插件（**plugin**），插件监听webpack构建生命周期的事件节点，做出相应的反应，执行compiler对象的 run 方法开始执行编译。

**确定入口**：根据配置中的 `entry` 找出所有的入口文件；

### 2、构建阶段：

**编译模块(make)**：从⼊⼝⽂件出发，调⽤所有配置的 Loader 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理

**完成模块编译**：上一步使⽤ Loader 递归翻译完所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**

### 3、生成阶段：

**输出资源(seal)**：根据入口和模块之间的依赖关系，生成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会

**输出完成 / 写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上过程中，Webpack 会在特定的时间点⼴播出特定的事件，插件在监听到感兴趣的事件后会执⾏特定的逻辑，并且插件可以调⽤ Webpack 提供的 API 改变 Webpack 的运⾏结果。 

单次构建过程自上而下按顺序执行，下面会展开聊聊细节，在此之前，对上述提及的各类技术名词不太熟悉的同学，可以先看看简介：

**`Entry`：**编译入口，webpack 编译的起点

**`Compiler`：**编译管理器，webpack 启动后会创建 `compiler` 对象，该对象一直存活直到结束退出

**`Compilation`：**单次编辑过程的管理器，比如 `watch = true` 时，运行过程中只有一个 `compiler` 但每次文件变更触发重新编译时，都会创建一个新的 `compilation` 对象

**`Dependence`：**依赖对象，webpack 基于该类型记录模块间依赖关系

**`Module`：**webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的

**`Chunk`：**编译完成准备输出时，webpack 会将 `module` 按特定的规则组织成一个一个的 `chunk`，这些 `chunk` 某种程度上跟最终输出一一对应

**`Loader`：**资源内容转换器，其实就是实现从内容 A 转换 B 的转换器

**`Plugin`：**webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程

### 4、流程简化

**初始化阶段**： 合并计算配置参数，创建`Compiler`、`Compilation`等基础对象，并初始化**Plugin**，并最终根据`entry`配置，找到所有入口模块

**构建模块**： 从`entry`开始，调用`loader`转译对应的模块，调用 `Acorn`将代码转换为`AST`结构， 遍历`AST`从中 构建出完整的模块依赖关系图（递归操作）

**生成阶段**： 根据`entry`配置，根据模块生成一个个`chunk`对象，之后转译`Chunk`代码并封装为`Asset`， 最后写出到文件系统

> 单次构建过程**自上而下**按顺序执行 如果启动了`watch` 则构建完成后不会退出webpack进程 而是持续监听文件内容 发生变化时回到构建阶段重新执行构建

### 5、从资源转换角度看

- `compiler.make`阶段
  - `entry` 文件以 `dependence` 对象形式加入 `compilation` 的依赖列表 ，`dependence` 对象记录了 `entry` 的相关信息
  - 根据 `dependency` 创建 对应的`module` 对象，之后读入 `module` 对应的文件内容， 调用 `loader-runner`对内容做转化， 转化结果若有对其他依赖则继续读入依赖资源， 重复此过程直到所有的依赖均被转换为 `module`
- `compilation.seal` 阶段
  - 遍历 `module` 集合， 根据 `entry`配置以及引入资源的方式， 将 `module` 分配到不同的 `Chunk`
  - `Chunk`之间最终形成`ChunkGraph`结构
  - 遍历`ChunkGraph` 调用 `compilation.emitAssets` 方法标记 `chunk` 的输出规则， 及转换为 `assets`集合
- `compiler.emitAssets`阶段
  - 将 `assets`写入文件系统

# 四、构建过程详解

### 1、初始化阶段

学习一个项目的源码通常都是从入口开始看起，按图索骥慢慢摸索出套路的，所以先来看看 webpack 的初始化过程：

![webpack7](..\images\webpack7.png)

解释一下：

1. 将 `process.args + webpack.config.js` 合并成用户配置
2. 调用 `validateSchema` 校验配置
3. 调用 `getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults` 合并出最终配置
4. 创建 `compiler` 对象
5. 遍历用户定义的 `plugins` 集合，执行插件的 `apply` 方法
6. 调用 `new WebpackOptionsApply().process` 方法，加载各种内置插件

主要逻辑集中在 `WebpackOptionsApply` 类，webpack 内置了数百个插件，这些插件并不需要我们手动配置，`WebpackOptionsApply` 会在初始化阶段根据配置内容动态注入对应的插件，包括：

- 注入 `EntryOptionPlugin` 插件，处理 `entry` 配置
- 根据 `devtool` 值判断后续用那个插件处理 `sourcemap`，可选值：`EvalSourceMapDevToolPlugin`、`SourceMapDevToolPlugin`、`EvalDevToolModulePlugin`
- 注入 `RuntimePlugin` ，用于根据代码内容动态注入 webpack 运行时

到这里，`compiler` 实例就被创建出来了，相应的环境参数也预设好了，紧接着开始调用 `compiler.compile` 函数：

```
// 取自 webpack/lib/compiler.js 
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
      // ...
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        // ...
        this.hooks.finishMake.callAsync(compilation, err => {
          // ...
          process.nextTick(() => {
            compilation.finish(err => {
              compilation.seal(err => {...});
            });
          });
        });
      });
    });
  }

```

Webpack 架构很灵活，但代价是牺牲了源码的直观性，比如说上面说的初始化流程，从创建 `compiler` 实例到调用 `make` 钩子，逻辑链路很长：

- 启动 webpack ，触发 `lib/webpack.js` 文件中 `createCompiler` 方法
- `createCompiler` 方法内部调用 `WebpackOptionsApply` 插件
- `WebpackOptionsApply` 定义在 `lib/WebpackOptionsApply.js` 文件，内部根据 `entry` 配置决定注入 `entry` 相关的插件，包括：`DllEntryPlugin`、`DynamicEntryPlugin`、`EntryPlugin`、`PrefetchPlugin`、`ProgressPlugin`、`ContainerPlugin`
- `Entry` 相关插件，如 `lib/EntryPlugin.js` 的 `EntryPlugin` 监听 `compiler.make` 钩子
- `lib/compiler.js` 的 `compile` 函数内调用 `this.hooks.make.callAsync`
- 触发 `EntryPlugin` 的 `make` 回调，在回调中执行 `compilation.addEntry` 函数
- `compilation.addEntry` 函数内部经过一坨与主流程无关的 `hook` 之后，再调用 `handleModuleCreate` 函数，正式开始构建内容

这个过程需要在 webpack 初始化的时候预埋下各种插件，经历 4 个文件，7次跳转才开始进入主题，前戏太足了，如果读者对 webpack 的概念、架构、组件没有足够了解时，源码阅读过程会很痛苦。

### 2、构建阶段

#### 1.1、基本流程

你有没有思考过这样的问题：

- Webpack 编译过程会将源码解析为 AST 吗？webpack 与 babel 分别实现了什么？
- Webpack 编译过程中，如何识别资源对其他资源的依赖？
- 相对于 grunt、gulp 等流式构建工具，为什么 webpack 会被认为是新一代的构建工具？

这些问题，基本上在构建阶段都能看出一些端倪。构建阶段从 `entry` 开始递归解析资源与资源的依赖，在 `compilation` 对象内逐步构建出 `module` 集合以及 `module` 之间的依赖关系，核心流程：

![webpack2](..\images\webpack2.png)

解释一下，构建阶段从入口文件开始：

- 调用 `handleModuleCreate` ，根据文件类型构建 `module` 子类

- 调用 loader-runner 仓库的 `runLoaders` 转译 `module` 内容，通常是从各类资源类型转译为 JavaScript 文本

- 调用 acorn 将 JS 文本解析为AST

  > acorn是一个轻量级、高性能的JavaScript解析器库，它完全由JavaScript编写，能够快速地将源代码解析为抽象语法树（AST）。

- 遍历 AST，触发各种钩子
  - 在 `HarmonyExportDependencyParserPlugin` 插件监听 `exportImportSpecifier` 钩子，解读 JS 文本对应的资源依赖
  - 调用 `module` 对象的 `addDependency` 将依赖对象加入到 `module` 依赖列表中
  
- AST 遍历完毕后，调用 `module.handleParseResult` 处理模块依赖

- 对于 `module` 新增的依赖，调用 `handleModuleCreate` ，控制流回到第一步

- 所有依赖都解析完毕后，构建阶段结束

这个过程中数据流 `module => ast => dependences => module` ，**先转 AST 再从 AST 找依赖。这就要求 `loaders` 处理完的最后结果必须是可以被 acorn 处理的标准 JavaScript 语法**，比如说对于图片，需要从图像二进制转换成类似于 `export default "data:image/png;base64,xxx"` 这类 base64 格式或者 `export default "http://xxx"` 这类 url 格式。

`compilation` 按这个流程递归处理，逐步解析出每个模块的内容以及 `module` 依赖关系，后续就可以根据这些内容打包输出。

#### 1.2、示例：层级递进

假如有如下图所示的文件依赖树：

![webpack3](..\images\webpack3.png)

其中 `index.js` 为 `entry` 文件，依赖于 a/b 文件；a 依赖于 c/d 文件。初始化编译环境之后，`EntryPlugin` 根据 `entry` 配置找到 `index.js` 文件，调用 `compilation.addEntry` 函数触发构建流程，构建完毕后内部会生成这样的数据结构：

![webpack4](..\images\webpack4.png)

此时得到 `module[index.js]` 的内容以及对应的依赖对象 `dependence[a.js]` 、`dependence[b.js]` 。OK，这就得到下一步的线索：a.js、b.js，根据上面流程图的逻辑继续调用 `module[index.js]` 的 `handleParseResult` 函数，继续处理 a.js、b.js 文件，递归上述流程，进一步得到 a、b 模块：

![webpack5](..\images\webpack5.png)

从 a.js 模块中又解析到 c.js/d.js 依赖，于是再再继续调用 `module[a.js]` 的 `handleParseResult` ，再再递归上述流程：

![webpack6](..\images\webpack6.png)

到这里解析完所有模块后，发现没有更多新的依赖，就可以继续推进，进入下一步。

#### 1.3、总结

回顾章节开始时提到的问题：

- Webpack 编译过程会将源码解析为 AST 吗？webpack 与 babel 分别实现了什么？
  - 构建阶段会读取源码，解析为 AST 集合。
  - Webpack 读出 AST 之后仅遍历 AST 集合；babel 则对源码做等价转换
- Webpack 编译过程中，如何识别资源对其他资源的依赖？
  - Webpack 遍历 AST 集合过程中，识别 `require/ import` 之类的导入语句，确定模块对其他资源的依赖关系
- 相对于 grant、gulp 等流式构建工具，为什么 webpack 会被认为是新一代的构建工具？
  - Grant、Gulp 仅执行开发者预定义的任务流；而 webpack 则深入处理资源的内容，功能上更强大

### 3、生成阶段

#### 3.1、基本流程

构建阶段围绕 `module` 展开，生成阶段则围绕 `chunks` 展开。经过构建阶段之后，webpack 得到足够的模块内容与模块关系信息，接下来开始生成最终资源了。代码层面，就是开始执行 `compilation.seal` 函数：

```
// 取自 webpack/lib/compiler.js 
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
      // ...
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        // ...
        this.hooks.finishMake.callAsync(compilation, err => {
          // ...
          process.nextTick(() => {
            compilation.finish(err => {
              **compilation.seal**(err => {...});
            });
          });
        });
      });
    });
  }

```

`seal` 原意密封、上锁，我个人理解在 webpack 语境下接近于 **“将模块装进蜜罐”** 。`seal` 函数主要完成从 `module` 到 `chunks` 的转化，核心流程：

![webpack8](..\images\webpack8.png)

简单梳理一下：

1. 构建本次编译的 `ChunkGraph` 对象；
2. 遍历 `compilation.modules` 集合，将 `module` 按 `entry/动态引入` 的规则分配给不同的 `Chunk` 对象；
3. `compilation.modules` 集合遍历完毕后，得到完整的 `chunks` 集合对象，调用 `createXxxAssets` 方法
4. `createXxxAssets` 遍历 `module/chunk` ，调用 `compilation.emitAssets` 方法将资 `assets` 信息记录到 `compilation.assets` 对象中
5. 触发 `seal` 回调，控制流回到 `compiler` 对象

这一步的关键逻辑是将 `module` 按规则组织成 `chunks` ，webpack 内置的 `chunk` 封装规则比较简单：

- `entry` 及 entry 触达到的模块，组合成一个 `chunk`
- 使用动态引入语句引入的模块，各自组合成一个 `chunk`

`chunk` 是输出的基本单位，默认情况下这些 `chunks` 与最终输出的资源一一对应，那按上面的规则大致上可以推导出一个 `entry` 会对应打包出一个资源，而通过动态引入语句引入的模块，也对应会打包出相应的资源，我们来看个示例。

#### 3.2、示例：多入口打包

假如有这样的配置：

```
const path = require("path");

module.exports = {
  mode: "development",
  context: path.join(__dirname),
  entry: {
    a: "./src/index-a.js",
    b: "./src/index-b.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
  },
  devtool: false,
  target: "web",
  plugins: [],
};

```

实例配置中有两个入口，对应的文件结构：

![webpack9](..\images\webpack9.png)

`index-a` 依赖于c，且动态引入了 e；`index-b` 依赖于 c/d 。根据上面说的规则：

- **`entry` 及entry触达到的模块，组合成一个 chunk**
- **使用动态引入语句引入的模块，各自组合成一个 chunk**

生成的 `chunks` 结构为：

![webpack10](..\images\webpack10.png)

也就是根据依赖关系，`chunk[a]` 包含了 `index-a/c` 两个模块；`chunk[b]` 包含了 `c/index-b/d` 三个模块；`chunk[e-hash]` 为动态引入 `e` 对应的 chunk。

不知道大家注意到没有，`chunk[a]` 与 `chunk[b]` 同时包含了 c，这个问题放到具体业务场景可能就是，一个多页面应用，所有页面都依赖于相同的基础库，那么这些所有页面对应的 `entry` 都会包含有基础库代码，这岂不浪费？为了解决这个问题，webpack 提供了一些插件如 `CommonsChunkPlugin` 、`SplitChunksPlugin`，在基本规则之外进一步优化 `chunks` 结构。

#### 3.3、`SplitChunksPlugin` 的作用

`SplitChunksPlugin` 是 webpack 架构高扩展的一个绝好的示例，我们上面说了 webpack 主流程里面是按 `entry / 动态引入` 两种情况组织 `chunks` 的，这必然会引发一些不必要的重复打包，webpack 通过插件的形式解决这个问题。

回顾 `compilation.seal` 函数的代码，大致上可以梳理成这么4个步骤：

- 遍历 `compilation.modules` ，记录下模块与 `chunk` 关系
- 触发各种模块优化钩子，这一步优化的主要是模块依赖关系
- 遍历 `module` 构建 chunk 集合
- 触发各种优化钩子

![webpack11](..\images\webpack11.png)

上面 1-3 都是预处理 + chunks 默认规则的实现，不在我们讨论范围，这里重点关注第4个步骤触发的 `optimizeChunks` 钩子，这个时候已经跑完主流程的逻辑，得到 `chunks` 集合，`SplitChunksPlugin` 正是使用这个钩子，分析 `chunks` 集合的内容，按配置规则增加一些通用的 chunk ：

![webpack12](..\images\webpack12.png)

理解了吗？webpack 插件架构的高扩展性，使得整个编译的主流程是可以固化下来的，分支逻辑和细节需求“外包”出去由第三方实现，这套规则架设起了庞大的 webpack 生态，关于插件架构的更多细节，下面 `plugin` 部分有详细介绍，这里先跳过。

#### 3.4、写入文件系统

经过构建阶段后，`compilation` 会获知资源模块的内容与依赖关系，也就知道“输入”是什么；而经过 `seal` 阶段处理后， `compilation` 则获知资源输出的图谱，也就是知道怎么“输出”：哪些模块跟那些模块“绑定”在一起输出到哪里。`seal` 后大致的数据结构：

```
compilation = {
  // ...
  modules: [
    /* ... */
  ],
  chunks: [
    {
      id: "entry name",
      files: ["output file name"],
      hash: "xxx",
      runtime: "xxx",
      entryPoint: {xxx}
      // ...
    },
    // ...
  ],
};

```

`seal` 结束之后，紧接着调用 `compiler.emitAssets` 函数，函数内部调用 `compiler.outputFileSystem.writeFile` 方法将 `assets` 集合写入文件系统，实现逻辑比较曲折，但是与主流程没有太多关系，所以这里就不展开讲了。

#### 3.5、资源形态流转

OK，上面已经把逻辑层面的构造主流程梳理完了，这里结合**资源形态流转**的角度重新考察整个过程，加深理解：

![webpack13](..\images\webpack13.png)

`compiler.make` 阶段：

- `entry` 文件以 `dependence` 对象形式加入 `compilation` 的依赖列表，`dependence` 对象记录有 `entry` 的类型、路径等信息
- 根据 `dependence` 调用对应的工厂函数创建 `module` 对象，之后读入 `module` 对应的文件内容，调用 `loader-runner` 对内容做转化，转化结果若有其它依赖则继续读入依赖资源，重复此过程直到所有依赖均被转化为 `module`

`compilation.seal` 阶段：

- 遍历 `module` 集合，根据 `entry` 配置及引入资源的方式，将 `module` 分配到不同的 `chunk`
- 遍历 `chunk` 集合，调用 `compilation.emitAsset` 方法标记 `chunk` 的输出规则，即转化为 【集合

`compiler.emitAssets` 阶段：

- 将 `assets` 写入文件系统

# 五、代码实现简易版的`webpack`的核心工作流

## 1、创建目录

首先让我们创建一个良好的目录来管理我们需要实现的`Packing tool`吧！

![webpack17](..\images\webpack17.png)

- `webpack/core`存放我们自己将要实现的`webpack`核心代码。

- `webpack/example`存放我们将用来打包的实例项目。
  - `webpack/example/webpak.config.js`配置文件.
  - `webpack/example/src/entry1`第一个入口文件
  - `webpack/example/src/entry1`第二个入口文件
  - `webpack/example/src/index.js`模块文件

- `webpack/loaders`存放我们的自定义`loader`。

- `webpack/plugins`存放我们的自定义`plugin`。

  

## 2、初始化参数阶段

往往，我们在日常使用阶段有两种方式去给`webpack`传递打包参数，让我们先来看看如何传递参数:

### `Cli`命令行传递参数

通常，我们在使用调用`webpack`命令时，有时会传入一定命令行参数，比如:

```
webpack --mode=production
# 调用webpack命令执行打包 同时传入mode为production
```

### `webpack.config.js`传递参数

另一种方式，我相信就更加老生常谈了。

我们在项目根目录下使用`webpack.config.js`导出一个对象进行`webpack`配置:

```
const path = require('path')

// 引入loader和plugin ...
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/entry1.js'),
    second: path.resolve(__dirname, './src/entry2.js'),
  },
  devtool: false,
  // 基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)。
  // 换而言之entry和loader的所有相对路径都是相对于这个路径而言的
  context: process.cwd(),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  plugins: [new PluginA(), new PluginB()],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          // 使用自己loader有三种方式 这里仅仅是一种
          path.resolve(__dirname, '../loaders/loader-1.js'),
          path.resolve(__dirname, '../loaders/loader-2.js'),
        ],
      },
    ],
  },
};

```

同时这份配置文件也是我们需要作为实例项目`example`下的实例配置，接下来让我们修改`example/webpack.config.js`中的内容为上述配置吧。

> 当然这里的`loader`和`plugin`目前你可以不用理解，接下来我们会逐步实现这些东西并且添加到我们的打包流程中去。

### 实现合并参数阶段

这一步，让我们真正开始动手实现我们的`webpack`吧！

首先让我们在`webpack/core`下新建一个`index.js`文件作为核心入口文件。

同时建立一个`webpack/core`下新建一个`webpack.js`文件作为`webpack()`方法的实现文件。

首先，我们清楚在`NodeJs Api`中是通过`webpack()`方法去得到`compiler`对象的。

![webpack18](..\images\webpack18.png)

此时让我们按照原本的`webpack`接口格式来补充一下`index.js`中的逻辑:

- 我们需要一个`webpack`方法去执行调用命令。
- 同时我们引入`webpack.config.js`配置文件传入`webpack`方法。

```
// index.js
const webpack = require('./webpack');
const config = require('../example/webpack.config');
// 步骤1: 初始化参数 根据配置文件和shell参数合成参数
const compiler = webpack(config);

```

接下来让我们去实现一下`webpack.js`:

```
function webpack(options) {
  // 合并参数 得到合并后的参数 mergeOptions
  const mergeOptions = _mergeOptions(options);
}

// 合并参数
function _mergeOptions(options) {
  const shellOptions = process.argv.slice(2).reduce((option, argv) => {
    // argv -> --mode=production
    const [key, value] = argv.split('=');
    if (key && value) {
      const parseKey = key.slice(2);
      option[parseKey] = value;
    }
    return option;
  }, {});
  return { ...options, ...shellOptions };
}

module.exports = webpack;

```

这里我们需要额外说明的是

`webpack`文件中需要导出一个名为`webpack`的方法，同时接受外部传入的配置对象。这个是我们在上述讲述过的。

当然关于我们合并参数的逻辑，是将**外部传入的对象和执行`shell`时的传入参数进行最终合并**。

在`Node Js`中我们可以通过`process.argv.slice(2)`来获得`shell`命令中传入的参数，比如:

![webpack19](..\images\webpack19.png)

当然`_mergeOptions`方法就是一个简单的合并配置参数的方法，**这一步我们已经完成了打包流程中的第一步：合并配置参数**。

## 3、编译阶段

在得到最终的配置参数之后，我们需要在`webpack()`函数中做以下几件事情:

- 通过参数创建`compiler`对象。我们看到官方案例中通过调用`webpack(options)`方法返回的是一个`compiler`对象。并且同时调用`compiler.run()`方法启动的代码进行打包。
- 注册我们定义的`webpack plugin`插件。
- 根据传入的配置对象寻找对应的打包入口文件。

### 创建`compiler`对象

让我们先来完成`index.js`中的逻辑代码补全:

```
// index.js
const webpack = require('./webpack');
const config = require('../example/webpack.config');
// 步骤1: 初始化参数 根据配置文件和shell参数合成参数
// 步骤2: 调用Webpack(options) 初始化compiler对象  
// webpack()方法会返回一个compiler对象

const compiler = webpack(config);

// 调用run方法进行打包
compiler.run((err, stats) => {
  if (err) {
    console.log(err, 'err');
  }
  // ...
});

```

可以看到，核心编译实现在于`webpack()`方法返回的`compiler.run()`方法上。

一步一步让我们来完善这个`webpack()`方法：

```
// webpack.js
function webpack(options) {
  // 合并参数 得到合并后的参数 mergeOptions
  const mergeOptions = _mergeOptions(options);
  // 创建compiler对象
  const compiler = new Compiler(mergeOptions)
  
  return compiler
}

// ...

```

让我们在`webpack/core`目录下同样新建一个`compiler.js`文件，作为`compiler`的核心实现文件:

```
// compiler.js
// Compiler类进行核心编译实现
class Compiler {
  constructor(options) {
    this.options = options;
  }

  // run方法启动编译 
  // 同时run方法接受外部传递的callback
  run(callback) {
  }
}

module.exports = Compiler

```

此时我们的`Compiler`类就先搭建一个基础的骨架代码。

目前，我们拥有了:

- `webpack/core/index.js`作为打包命令的入口文件，这个文件引用了我们自己实现的`webpack`同时引用了外部的`webpack.config.js(options)`。调用`webpack(options).run()`开始编译。
- `webpack/core/webpack.js`这个文件目前处理了参数的合并以及传入合并后的参数`new Compiler(mergeOptions)`，同时返回创建的`Compiler`实力对象。
- `webpack/core/compiler`，此时我们的`compiler`仅仅是作为一个基础的骨架，存在一个`run()`启动方法。

### 编写`Plugin`

还记得我们在`webpack.config.js`中使用了两个`plugin`---`pluginA`、`pluginB`插件吗。接下来让我们来依次实现它们:

在实现`Plugin`前，我们需要先来完善一下`compiler`方法:

```
const { SyncHook } = require('tapable');

class Compiler {
  constructor(options) {
    this.options = options;
    // 创建plugin hooks
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 输出 asset 到 output 目录之前执行 (写入文件之前)
      emit: new SyncHook(),
      // 在 compilation 完成时执行 全部完成编译执行
      done: new SyncHook(),
    };
  }

  // run方法启动编译
  // 同时run方法接受外部传递的callback
  run(callback) {}
}

module.exports = Compiler;

```

这里，我们在`Compiler`这个类的构造函数中创建了一个属性`hooks`，它的值是三个属性`run`、`emit`、`done`。

关于这三个属性的值就是我们上文提到前置知识的`tapable`的`SyncHook`方法，本质上你可以简单将`SyncHook()`方法理解称为一个`Emitter Event`类。

当我们通过`new SyncHook()`返回一个对象实例后，我们可以通过`this.hook.run.tap('name',callback)`方法为这个对象上添加事件监听，然后在通过`this.hook.run.call()`执行所有`tap`注册的事件。

> 当然`webpack`真实源码中，这里有非常多的`hook`。以及分别存在同步/异步钩子，我们这里更多的是为大家讲解清楚流程，所以仅列举了三个常见且简单的同步钩子。

此时，我们需要明白，我们可以通过`Compiler`类返回的实例对象上`compiler.hooks.run.tap`注册钩子。

接下来让我们切回到`webpack.js`中，让我们来填充关于插件注册的逻辑:

```
const Compiler = require('./compiler');

function webpack(options) {
  // 合并参数
  const mergeOptions = _mergeOptions(options);
  // 创建compiler对象
  const compiler = new Compiler(mergeOptions);
  // 加载插件
  _loadPlugin(options.plugins, compiler);
  return compiler;
}

// 合并参数
function _mergeOptions(options) {
  const shellOptions = process.argv.slice(2).reduce((option, argv) => {
    // argv -> --mode=production
    const [key, value] = argv.split('=');
    if (key && value) {
      const parseKey = key.slice(2);
      option[parseKey] = value;
    }
    return option;
  }, {});
  return { ...options, ...shellOptions };
}

// 加载插件函数
function _loadPlugin(plugins, compiler) {
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      plugin.apply(compiler);
    });
  }
}

module.exports = webpack;

```

这里我们在创建完成`compiler`对象后，调用了`_loadPlugin`方法进行**注册插件**。

有接触过`webpack`插件开发的同学，或多或少可能都有了解过。**任何一个`webpack`插件都是一个类(当然类本质上都是funciton的语法糖)，每个插件都必须存在一个`apply`方法**。

这个`apply`方法会接受一个`compiler`对象。我们上边做的就是依次调用传入的`plugin`的`apply`方法并且传入我们的`compiler`对象。

> **这里请记住上边的流程，日常我们编写`webpack plugin`时本质上就是操作`compiler`对象从而影响打包结果进行。**

> 也许此时你并不是很理解这句话的含义，在我们串联完成整个流程之后我会为大家揭晓这个答案。

接下来让我们去编写这些个插件:

不了解插件开发的同学可以去稍微看一下[官方的介绍](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompiler-hooks%2F)，其实不是很难,我个人强烈建议如果不了解可以先去看看再回来结合上变讲的内容你一定会有所收获的。

首先让我们先创建文件:

![webpack20](..\images\webpack20.png)

```
// plugin-a.js
// 插件A
class PluginA {
  apply(compiler) {
    // 注册同步钩子
    // 这里的compiler对象就是我们new Compiler()创建的实例哦
    compiler.hooks.run.tap('Plugin A', () => {
      // 调用
      console.log('PluginA');
    });
  }
}

module.exports = PluginA;
```

```
// plugin-b.js
class PluginB {
  apply(compiler) {
    compiler.hooks.done.tap('Plugin B', () => {
      console.log('PluginB');
    });
  }
}

module.exports = PluginB;
```

看到这里我相信大部分同学都已经反应过来了，`compiler.hooks.done.tap`不就是我们上边讲到的通过`tapable`创建一个`SyncHook`实例然后通过`tap`方法注册事件吗？

没错！的确是这样，关于`webpack`插件**本质上就是通过发布订阅的模式，通过`compiler`上监听事件。然后再打包编译过程中触发监听的事件从而添加一定的逻辑影响打包结果**。

我们在每个插件的`apply`方法上通过`tap`在编译准备阶段(也就是调用`webpack()`函数时)进行订阅对应的事件，当我们的编译执行到一定阶段时发布对应的事件告诉订阅者去执行监听的事件，从而达到在编译阶段的不同生命周期内去触发对应的`plugin`。

> 所以这里你应该清楚，我们在进行`webpack`插件开发时，`compiler`对象上存放着本次打包的所有相关属性，比如`options`打包的配置，以及我们会在之后讲到的各种属性。

### 寻找`entry`入口

这之后，我们的绝大多数内容都会放在`compiler.js`中去实现`Compiler`这个类实现打包的核心流程。

**任何一次打包都需要入口文件，接下来让我们就从真正进入打包编译阶段。首当其冲的事情就是，我们需要根据入口配置文件路径寻找到对应入口文件。**

```
// compiler.js
const { SyncHook } = require('tapable');
const { toUnixPath } = require('./utils');

class Compiler {
  constructor(options) {
    this.options = options;
    // 相对路径跟路径 Context参数
    this.rootPath = this.options.context || toUnixPath(process.cwd());
    // 创建plugin hooks
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 输出 asset 到 output 目录之前执行 (写入文件之前)
      emit: new SyncHook(),
      // 在 compilation 完成时执行 全部完成编译执行
      done: new SyncHook(),
    };
  }

  // run方法启动编译
  // 同时run方法接受外部传递的callback
  run(callback) {
    // 当调用run方式时 触发开始编译的plugin
    this.hooks.run.call();
    // 获取入口配置对象
    const entry = this.getEntry();
  }

  // 获取入口文件路径
  getEntry() {
    let entry = Object.create(null);
    const { entry: optionsEntry } = this.options;
    if (typeof optionsEntry === 'string') {
      entry['main'] = optionsEntry;
    } else {
      entry = optionsEntry;
    }
    // 将entry变成绝对路径
    Object.keys(entry).forEach((key) => {
      const value = entry[key];
      if (!path.isAbsolute(value)) {
        // 转化为绝对路径的同时统一路径分隔符为 /
        entry[key] = toUnixPath(path.join(this.rootPath, value));
      }
    });
    return entry;
  }
}

module.exports = Compiler;

```

```
// utils/index.js
/**
 *
 * 统一路径分隔符 主要是为了后续生成模块ID方便
 * @param {*} path
 * @returns
 */
function toUnixPath(path) {
  return path.replace(/\\/g, '/');
}

```

这一步我们通过`options.entry`处理获得入口文件的绝对路径。

这里有几个需要注意的小点:

- `this.hooks.run.call()`

在我们`_loadePlugins`函数中对于每一个传入的插件在`compiler`实例对象中进行了订阅，那么当我们调用`run`方法时，等于真正开始执行编译。这个阶段**相当于我们需要告诉订阅者，发布开始执行的订阅**。此时我们通过`this.hooks.run.call()`执行关于`run`的所有`tap`监听方法，从而触发对应的`plugin`逻辑。

- `this.rootPath`:

在上述的外部`webpack.config.js`中我们配置了一个` context: process.cwd()`，其实真实`webpack`中这个`context`值默认也是`process.cwd()`。

关于它的详细解释你可以在这里看到[Context](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fentry-context%2F%23root)。

简而言之，这个路径就是我们项目启动的目录路径，任何`entry`和`loader`中的相对路径都是针对于`context`这个参数的相对路径。

这里我们使用`this.rootPath`在构造函数中来保存这个变量。

- `toUnixPath`工具方法:

因为不同操作系统下，文件分隔路径是不同的。这里我们统一使用`\`来替换路径中的`//`来替换模块路径。后续我们会**使用模块相对于`rootPath`的路径作为每一个文件的唯一ID**，所以这里统一处理下路径分隔符。

- `entry`的处理方法:

关于`entry`配置，`webpack`中其实有很多种。我们这里考虑了比较常见的两种配置方式:

```
entry:'entry1.js'

// 本质上这段代码在webpack中会被转化为
entry: {
    main:'entry1.js
}

```

```
entry: {
   'entry1':'./entry1.js',
   'entry2':'/user/wepback/example/src/entry2.js'
}
```

这两种方式任何方式都会经过`getEntry`方法最终转化称为`{ [模块名]:[模块绝对路径]... }`的形式，关于`geEntry()`方法其实非常简单，这里我就不过于累赘这个方法的实现过程了。

这一步，我们就通过`getEntry`方法获得了一个`key`为`entryName`,`value`为`entryAbsolutePath`的对象了，接来下就让我们从入口文件出发进行编译流程吧。

## 4、模块编译阶段

上边我们讲述了关于编译阶段的准备工作:

- 目录/文件基础逻辑补充。
- 通过`hooks.tap`注册`webpack`插件。
- `getEntry`方法获得各个入口的对象。

接下来让我们继续完善`compiler.js`。

在模块编译阶段，我们需要做的事件:

- 根据入口文件路径分析入口文件，对于入口文件进行匹配对应的`loader`进行处理入口文件。
- 将`loader`处理完成的入口文件使用`webpack`进行编译。
- 分析入口文件依赖，重复上边两个步骤编译对应依赖。
- 如果嵌套文件存在依赖文件，递归调用依赖模块进行编译。
- 递归编译完成后，组装一个个包含多个模块的`chunk`

首先，我们先来给`compiler.js`的构造函数中补充一下对应的逻辑:

```
class Compiler {
  constructor(options) {
    this.options = options;
    // 创建plugin hooks
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 输出 asset 到 output 目录之前执行 (写入文件之前)
      emit: new SyncHook(),
      // 在 compilation 完成时执行 全部完成编译执行
      done: new SyncHook(),
    };
    // 保存所有入口模块对象
    this.entries = new Set();
    // 保存所有依赖模块对象
    this.modules = new Set();
    // 所有的代码块对象
    this.chunks = new Set();
    // 存放本次产出的文件对象
    this.assets = new Set();
    // 存放本次编译所有产出的文件名
    this.files = new Set();
  }
  // ...
 }

```

这里我们通过给`compiler`构造函数中添加一些列属性来保存关于编译阶段生成的对应资源/模块对象。

> 关于`entries\modules\chunks\assets\files`这几个`Set`对象是贯穿我们核心打包流程的属性，它们各自用来储存编译阶段不同的资源从而最终通过对应的属性进行生成编译后的文件。

### 根据入口文件路径分析入口文件

上边说到我们在`run`方法中已经可以通过`this.getEntry();`获得对应的入口对象了～

接下来就让我们从入口文件开始去分析入口文件吧！

```
class Compiler {
    // run方法启动编译
  // 同时run方法接受外部传递的callback
  run(callback) {
    // 当调用run方式时 触发开始编译的plugin
    this.hooks.run.call();
    // 获取入口配置对象
    const entry = this.getEntry();
    // 编译入口文件
    this.buildEntryModule(entry);
  }

  buildEntryModule(entry) {
    Object.keys(entry).forEach((entryName) => {
      const entryPath = entry[entryName];
      const entryObj = this.buildModule(entryName, entryPath);
      this.entries.add(entryObj);
    });
  }
  
  
  // 模块编译方法
  buildModule(moduleName,modulePath) {
    // ...
    return {}
  }
}

```

这里我们添加了一个名为`buildEntryModule`方法作为入口模块编译方法。循环入口对象，得到每一个入口对象的名称和路径。

> 比如如假使我们在开头传入`entry:{ main:'./src/main.js' }`的话，`buildEntryModule`获得的形参`entry`为`{ main: "/src...[你的绝对路径]" }`, 此时我们`buildModule`方法接受的entryName为`main`,`entryPath`为入口文件`main`对应的的绝对路径。

> 单个入口编译完成后，我们会在`buildModule`方法中返回一个对象。这个对象就是我们编译入口文件后的对象。

### `buildModule`模块编译方法

在进行代码编写之前，我们先来梳理一下`buildModule`方法它需要做哪些事情:

- `buildModule`接受两个参数进行模块编译，**第一个为模块所属的入口文件名称**，第二个为需要编译的模块路径。
- `buildModule`方法要进行代码编译的前提就是，通过`fs`模块根据入口文件路径读取文件源代码。
- 读取文件内容之后，调用所有匹配的loader对模块进行处理得到返回后的结果。
- 得到`loader`处理后的结果后，通过`babel`分析`loader`处理后的代码，进行代码编译。(这一步编译主要是针对`require`语句，修改源代码中`require`语句的路径)。
- 如果该入口文件没有依赖与任何模块(`require`语句)，那么返回编译后的模块对象。
- 如果该入口文件存在依赖的模块，递归`buildModule`方法进行模块编译。

#### 读取文件内容

1. 我们先调用`fs`模块读取文件内容。

   ```
   const fs = require('fs');
   // ...
   class Compiler {
         //...
         // 模块编译方法
         buildModule(moduleName, modulePath) {
           // 1. 读取文件原始代码
           const originSourceCode =
             ((this.originSourceCode = fs.readFileSync(modulePath, 'utf-8'));
           // moduleCode为修改后的代码
           this.moduleCode = originSourceCode;
         }
         
         // ...
    }
   ```

#### 调用`loader`处理匹配后缀文件

2. 接下来我们获得了文件的具体内容之后，就需要匹配对应`loader`对我们的源代码进行编译了。

##### 实现简单自定义loader

在进行`loader`编译前，我们先来实现一下我们上方传入的自定义`loader`吧。

![webpack21](..\images\webpack21.png)

`webpack/loader`目录下新建`loader-1.js`,`loader-2.js`:

首先我们需要清楚**简单来说`loader`本质上就是一个函数，接受我们的源代码作为入参同时返回处理后的结果。**

> 关于`loader`的特性，更加详细你可以在[这里看到](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fconcepts%2Floaders%2F%23loader-features)，因为文章主要讲述打包流程所以`loader`我们简单的作为倒序处理。

```
// loader本质上就是一个函数，接受原始内容，返回转换后的内容。
function loader1(sourceCode) {
  console.log('join loader1');
  return sourceCode + `\n const loader1 = 'https://github.com/19Qingfeng'`;
}

module.exports = loader1;
```

```
function loader2(sourceCode) {
  console.log('join loader2');
  return sourceCode + `\n const loader2 = '19Qingfeng'`;
}

module.exports = loader2;
```

##### 使用loader处理文件

在搞清楚了`loader`就是一个单纯的函数之后，让我们在进行模块分析之前将内容先交给匹配的loader去处理下吧。

```
// 模块编译方法
  buildModule(moduleName, modulePath) {
    // 1. 读取文件原始代码
    const originSourceCode =
      ((this.originSourceCode = fs.readFileSync(modulePath)), 'utf-8');
    // moduleCode为修改后的代码
    this.moduleCode = originSourceCode;
    //  2. 调用loader进行处理
    this.handleLoader(modulePath);
  }

  // 匹配loader处理
  handleLoader(modulePath) {
    const matchLoaders = [];
    // 1. 获取所有传入的loader规则
    const rules = this.options.module.rules;
    rules.forEach((loader) => {
      const testRule = loader.test;
      if (testRule.test(modulePath)) {
        if (loader.loader) {
          // 仅考虑loader { test:/\.js$/g, use:['babel-loader'] }, { test:/\.js$/, loader:'babel-loader' }
          matchLoaders.push(loader.loader);
        } else {
          matchLoaders.push(...loader.use);
        }
      }
      // 2. 倒序执行loader传入源代码
      for (let i = matchLoaders.length - 1; i >= 0; i--) {
        // 目前我们外部仅支持传入绝对路径的loader模式
        // require引入对应loader
        const loaderFn = require(matchLoaders[i]);
        // 通过loader同步处理我的每一次编译的moduleCode
        this.moduleCode = loaderFn(this.moduleCode);
      }
    });
  }

```

这里我们通过`handleLoader`函数，对于传入的文件路径匹配到对应后缀的`loader`后，依次倒序执行loader处理我们的代码`this.moduleCode`并且同步更新每次`moduleCode`。

最终，在每一个模块编译中`this.moduleCode`都会经过对应的`loader`处理。

#### `webpack`模块编译阶段

上一步我们经历过`loader`处理了我们的入口文件代码，并且得到了处理后的代码保存在了`this.moduleCode`中。

此时，经过`loader`处理后我们就要进入`webpack`内部的编译阶段了。

这里我们需要做的是:**针对当前模块进行编译，将当前模块所有依赖的模块(`require()`)语句引入的路径变为相对于跟路径(`this.rootPath`)的相对路径**。

> 总之你需要搞明白的是，我们这里编译的结果是期望将源代码中的依赖模块路径变为相对跟路径的路径，同时建立基础的模块依赖关系。后续我会告诉你为什么针对路径进行编译。

让我们继续来完善`buildModule`方法吧:

```
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;//使用@babel/traverse来对ast进行遍历和操作

const generator = require('@babel/generator').default; //修改后的AST可以用@babel/generator又转换为代码

const t = require('@babel/types');//这个库可以帮我们创建新的AST节点，
const tryExtensions = require('./utils/index')
// ...
  class Compiler {
     // ...
      
     // 模块编译方法
      buildModule(moduleName, modulePath) {
        // 1. 读取文件原始代码
        const originSourceCode =
          ((this.originSourceCode = fs.readFileSync(modulePath)), 'utf-8');
        // moduleCode为修改后的代码
        this.moduleCode = originSourceCode;
        //  2. 调用loader进行处理
        this.handleLoader(modulePath);
        // 3. 调用webpack 进行模块编译 获得最终的module对象
        const module = this.handleWebpackCompiler(moduleName, modulePath);
        // 4. 返回对应module
        return module
      }

      // 调用webpack进行模块编译
      handleWebpackCompiler(moduleName, modulePath) {
        // 将当前模块相对于项目启动根目录计算出相对路径 作为模块ID
        const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
        // 创建模块对象
        const module = {
          id: moduleId,
          dependencies: new Set(), // 该模块所依赖模块绝对路径地址
          name: [moduleName], // 该模块所属的入口文件
        };
        // 调用babel分析我们的代码
        const ast = parser.parse(this.moduleCode, {
          sourceType: 'module',
        });
        // 使用traverse深度优先遍历AST
        traverse(ast, {
          // 当遇到require语句时
          CallExpression:(nodePath) => {
            const node = nodePath.node;
            if (node.callee.name === 'require') {
              // 获得源代码中引入模块相对路径
              const requirePath = node.arguments[0].value;
              // 寻找模块绝对路径 当前模块路径+require()对应相对路径
              const moduleDirName = path.posix.dirname(modulePath);
              const absolutePath = tryExtensions(
                path.posix.join(moduleDirName, requirePath),
                this.options.resolve.extensions,
                requirePath,
                moduleDirName
              );
              // 生成moduleId - 针对于跟路径的模块ID 添加进入新的依赖模块路径
              const moduleId =
                './' + path.posix.relative(this.rootPath, absolutePath);
              // 通过babel修改源代码中的require变成__webpack_require__语句
              node.callee = t.identifier('__webpack_require__');
              // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
              node.arguments = [t.stringLiteral(moduleId)];
              // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
              module.dependencies.add(moduleId);
            }
          },
        });
        // 遍历结束根据AST生成新的代码
        const { code } = generator(ast);
        // 为当前模块挂载新的生成的代码
        module._source = code;
        // 返回当前模块对象
        return module
      }
  }

```

这一步我们关于`webpack`编译的阶段就完成了。

需要注意的是:

- 这里我们使用`babel`相关的`API`针对于`require`语句进行了编译，**注意： webpack源码解析AST并不是使用的`babel`，而是使用的[acorn](https://github.com/acornjs/acorn)，webpack继承`acorn`的`Parser`，自己实现了一个[JavascriptParser](https://github.com/webpack/webpack/blob/a07a1269f0a0b23d40de6c9565eeaf962fbc8904/lib/javascript/JavascriptParser.js)，本文写作时采用了`babel`，这也是一个大家更熟悉的工具**。
- 同时我们代码中引用了一个`tryExtensions()`工具方法，这个方法是针对于后缀名不全的工具方法，稍后你就可以看到这个方法的具体内容。
- 针对于每一次文件编译，我们都会返回一个**module**对象，这个对象是重中之重。
  - `id`属性，表示当前模块针对于`this.rootPath`的相对目录。
  - `dependencies`属性，它是一个`Set`内部保存了该模块依赖的所有模块的模块ID。
  - `name`属性,它表示该模块属于哪个入口文件。
  - `_source`属性，它存放模块自身经过`babel`编译后的字符串代码。

##### tryExtensions方法实现

我们在上文的`webpack.config.js`有这么一个配置：

![webpack22](..\images\webpack22.png)

熟悉`webpack`配置的同学可能清楚，**resolve.extensions**是针对于引入依赖时，在没有书写文件后缀的情况下，`webpack`会自动帮我们按照传入的规则为文件添加后缀。

在清楚了原理后我们来一起看看`utils/tryExtensions`方法的实现:

```

/**
 *
 *
 * @param {*} modulePath 模块绝对路径
 * @param {*} extensions 扩展名数组
 * @param {*} originModulePath 原始引入模块路径
 * @param {*} moduleContext 模块上下文(当前模块所在目录)
 */
function tryExtensions(
  modulePath,
  extensions,
  originModulePath,
  moduleContext
) {
  // 优先尝试不需要扩展名选项
  extensions.unshift('');
  for (let extension of extensions) {
    if (fs.existsSync(modulePath + extension)) {
      return modulePath + extension;
    }
  }
  // 未匹配对应文件
  throw new Error(
    `No module, Error: Can't resolve ${originModulePath} in  ${moduleContext}`
  );
}

```

这个方法很简单，我们通过`fs.existsSync`检查传入文件结合`extensions`依次遍历寻找对应匹配的路径是否存在，如果找到则直接返回。如果未找到则给予用于一个友好的提示错误。

> 需要注意` extensions.unshift('');`是防止用户如果已经传入了后缀时，我们优先尝试直接寻找，如果可以找到文件那么就直接返回。找不到的情况下才会依次尝试。

#### 递归处理

经过上一步处理，针对入口文件我们调用`buildModule`可以得到这样的返回对象。

我们先来看看运行`webpack/core/index.js`得到的返回结果吧。

![webpack23](..\images\webpack23.png)

我在`buildEntryModule`中打印了处理完成后的`entries`对象。可以看到正如我们之前所期待的:

- `id`为每个模块相对于跟路径的模块.(这里我们配置的`context:process.cwd()`)为`webpack`目录。
- `dependencies`为该模块内部依赖的模块，这里目前还没有添加。
- `name`为该模块所属的入口文件名称。
- `_source`为该模块编译后的源代码。

> 目前`_source`中的内容是基于

此时让我们打开`src`目录为我们的两个入口文件添加一些依赖和内容吧:

```
// webpack/example/entry1.js
const depModule = require('./module');

console.log(depModule, 'dep');
console.log('This is entry 1 !');


// webpack/example/entry2.js
const depModule = require('./module');

console.log(depModule, 'dep');
console.log('This is entry 2 !');

// webpack/example/module.js
const name = '19Qingfeng';

module.exports = {
  name,
};

```

此时让我们重新运行`webpack/core/index.js`:

![webpack24](..\images\webpack24.png)

OK，目前为止我们针对于`entry`的编译可以暂时告一段落了。

**总之也就是，这一步我们通过``方法将`entry`进行分析编译后得到一个对象。将这个对象添加到`this.entries`中去。**

接下来让我们去处理依赖的模块吧。

其实对于依赖的模块无非也是相同的步骤：

- 检查入口文件中是否存在依赖。
- 存在依赖的话，递归调用`buildModule`方法编译模块。传入`moduleName`为当前模块所属的入口文件。`modulePath`为当前被依赖模块的绝对路径。
- 同理检查递归检查被依赖的模块内部是否仍然存在依赖，存在的话递归依赖进行模块编译。这是一个**深度优先**的过程。
- 将每一个编译后的模块保存进入`this.modules`中去。

接下来我们只要稍稍在`handleWebpackCompiler`方法中稍稍改动就可以了:

```
 // 调用webpack进行模块编译
  handleWebpackCompiler(moduleName, modulePath) {
    // 将当前模块相对于项目启动根目录计算出相对路径 作为模块ID
    const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
    // 创建模块对象
    const module = {
      id: moduleId,
      dependencies: new Set(), // 该模块所依赖模块绝对路径地址
      name: [moduleName], // 该模块所属的入口文件
    };
    // 调用babel分析我们的代码
    const ast = parser.parse(this.moduleCode, {
      sourceType: 'module',
    });
    // 深度优先 遍历语法Tree
    traverse(ast, {
      // 当遇到require语句时
      CallExpression: (nodePath) => {
        const node = nodePath.node;
        if (node.callee.name === 'require') {
          // 获得源代码中引入模块相对路径
          const requirePath = node.arguments[0].value;
          // 寻找模块绝对路径 当前模块路径+require()对应相对路径
          const moduleDirName = path.posix.dirname(requirePath);
          const absolutePath = tryExtensions(
            path.posix.join(moduleDirName, requirePath),
            this.options.resolve.extensions,
            moduleName,
            moduleDirName
          );
          // 生成moduleId - 针对于跟路径的模块ID 添加进入新的依赖模块路径
          const moduleId =
            './' + path.posix.relative(this.rootPath, absolutePath);
          // 通过babel修改源代码中的require变成__webpack_require__语句
          node.callee = t.identifier('__webpack_require__');
          // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
          node.arguments = [t.stringLiteral(moduleId)];
          // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
          module.dependencies.add(moduleId);
        }
      },
    });
    // 遍历结束根据AST生成新的代码
    const { code } = generator(ast);
    // 为当前模块挂载新的生成的代码
    module._source = code;
    // 递归依赖深度遍历 存在依赖模块则加入
    module.dependencies.forEach((dependency) => {
      const depModule = this.buildModule(moduleName, dependency);
      // 将编译后的任何依赖模块对象加入到modules对象中去
      this.modules.add(depModule);
    });
    // 返回当前模块对象
    return module;
  }

```

这里我们添加了这样一段代码:

```
    // 递归依赖深度遍历 存在依赖模块则加入
    module.dependencies.forEach((dependency) => {
      const depModule = this.buildModule(moduleName, dependency);
      // 将编译后的任何依赖模块对象加入到modules对象中去
      this.modules.add(depModule);
    });
```

这里我们对于依赖的模块进行了递归调用`buildModule`,将输出的模块对象添加进入了`this.modules`中去。

此时让我们重新运行`webpack/core/index.js`进行编译，这里我在`buildEntryModule`编译结束后打印了`assets`和`modules`:

![webpack25](..\images\webpack25.png)

```
Set {
  {
    id: './example/src/entry1.js',
    dependencies: Set { './example/src/module.js' },
    name: [ 'main' ],
    _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
      '\n' +
      "console.log(depModule, 'dep');\n" +
      "console.log('This is entry 1 !');\n" +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  },
  {
    id: './example/src/entry2.js',
    dependencies: Set { './example/src/module.js' },
    name: [ 'second' ],
    _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
      '\n' +
      "console.log(depModule, 'dep');\n" +
      "console.log('This is entry 2 !');\n" +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  }
} entries
Set {
  {
    id: './example/src/module.js',
    dependencies: Set {},
    name: [ 'main' ],
    _source: "const name = '19Qingfeng';\n" +
      'module.exports = {\n' +
      '  name\n' +
      '};\n' +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  },
  {
    id: './example/src/module.js',
    dependencies: Set {},
    name: [ 'second' ],
    _source: "const name = '19Qingfeng';\n" +
      'module.exports = {\n' +
      '  name\n' +
      '};\n' +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  }
} modules

```

可以看到我们已经将`module.js`这个依赖如愿以偿加入到`modules`中了，同时它也经过`loader`的处理。但是我们发现它被重复加入了两次。

这是因为**module.js**这个模块被引用了两次，它被`entry1`和`entry2`都已进行了依赖，在进行递归编译时我们进行了两次`buildModule`相同模块。

让我们来处理下这个问题:

```
    handleWebpackCompiler(moduleName, modulePath) {
       ...
        // 通过babel修改源代码中的require变成__webpack_require__语句
          node.callee = t.identifier('__webpack_require__');
          // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
          node.arguments = [t.stringLiteral(moduleId)];
          // 转化为ids的数组 好处理
          const alreadyModules = Array.from(this.modules).map((i) => i.id);
          if (!alreadyModules.includes(moduleId)) {
            // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
            module.dependencies.add(moduleId);
          } else {
            // 已经存在的话 虽然不进行添加进入模块编译 但是仍要更新这个模块依赖的入口
            this.modules.forEach((value) => {
              if (value.id === moduleId) {
                value.name.push(moduleName);
              }
            });
          }
        }
      },
    });
    ...
    }

```

这里在每一次代码分析的依赖转化中，首先判断`this.module`对象是否已经存在当前模块了（通过唯一的模块id路径判断）。

如果不存在则添加进入依赖中进行编译，如果该模块已经存在过了就证明这个模块已经被编译过了。所以此时我们不需要将它再次进行编译，我们仅仅需要更新这个模块所属的chunk，为它的`name`属性添加当前所属的`chunk`名称。

重新运行，让我们在来看看打印结果:

```
Set(2) {
  {
    id: './example/src/entry1.js',
    dependencies: Set(1) { './example/src/module.js' },
    name: [ 'main' ],
    _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
      '\n' +
      "console.log(depModule, 'dep');\n" +
      "console.log('This is entry 1 !');\n" +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  },
  {
    id: './example/src/entry2.js',
    dependencies: Set(0) {},
    name: [ 'second' ],
    _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
      '\n' +
      "console.log(depModule, 'dep');\n" +
      "console.log('This is entry 2 !');\n" +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  }
} 入口文件
Set(1) {
  {
    id: './example/src/module.js',
    dependencies: Set(0) {},
    name: [ 'main', 'second' ],
    _source: "const name = '19Qingfeng';\n" +
      'module.exports = {\n' +
      '  name\n' +
      '};\n' +
      "const loader2 = '19Qingfeng';\n" +
      "const loader1 = 'https://github.com/19Qingfeng';"
  }
} modules

```

此时针对我们的“模块编译阶段”基本已经结束了，这一步我们对于所有模块从入口文件开始进行分析。

- 从入口出发，读取入口文件内容调用匹配`loader`处理入口文件。
- 通过`babel`分析依赖，并且同时将所有依赖的路径更换为相对于项目启动目录`options.context`的路径。
- 入口文件中如果存在依赖的话，递归上述步骤编译依赖模块。
- 将每个依赖的模块编译后的对象加入`this.modules`。
- 将每个入口文件编译后的对象加入`this.entries`。



## 5、编译完成阶段

在上一步我们完成了模块之间的编译，并且为`module`和`entry`分别填充了内容。

在将所有模块递归编译完成后，我们需要**根据上述的依赖关系，组合最终输出的`chunk`模块**。

让我们来继续改造我们的`Compiler`吧:

```js
class Compiler {

    // ...
    buildEntryModule(entry) {
        Object.keys(entry).forEach((entryName) => {
          const entryPath = entry[entryName];
          // 调用buildModule实现真正的模块编译逻辑
          const entryObj = this.buildModule(entryName, entryPath);
          this.entries.add(entryObj);
          // 根据当前入口文件和模块的相互依赖关系，组装成为一个个包含当前入口所有依赖模块的chunk
          this.buildUpChunk(entryName, entryObj);
        });
        console.log(this.chunks, 'chunks');
    }
    
     // 根据入口文件和依赖模块组装chunks
      buildUpChunk(entryName, entryObj) {
        const chunk = {
          name: entryName, // 每一个入口文件作为一个chunk
          entryModule: entryObj, // entry编译后的对象
          modules: Array.from(this.modules).filter((i) =>
            i.name.includes(entryName)
          ), // 寻找与当前entry有关的所有module
        };
        // 将chunk添加到this.chunks中去
        this.chunks.add(chunk);
      }
      
      // ...
}

```

这里，我们根据对应的入口文件通过每一个模块(`module`)的`name`属性查找对应入口的所有依赖文件。

我们先来看看`this.chunks`最终会输出什么:

```js
Set {
  {
    name: 'main',
    entryModule: {
      id: './example/src/entry1.js',
      dependencies: [Set],
      name: [Array],
      _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
        '\n' +
        "console.log(depModule, 'dep');\n" +
        "console.log('This is entry 1 !');\n" +
        "const loader2 = '19Qingfeng';\n" +
        "const loader1 = 'https://github.com/19Qingfeng';"
    },
    modules: [ [Object] ]
  },
  {
    name: 'second',
    entryModule: {
      id: './example/src/entry2.js',
      dependencies: Set {},
      name: [Array],
      _source: 'const depModule = __webpack_require__("./example/src/module.js");\n' +
        '\n' +
        "console.log(depModule, 'dep');\n" +
        "console.log('This is entry 2 !');\n" +
        "const loader2 = '19Qingfeng';\n" +
        "const loader1 = 'https://github.com/19Qingfeng';"
    },
    modules: []
  }
} 

```

这一步，**我们得到了`Webpack`中最终输出的两个`chunk`**。

它们分别拥有:

- `name`:当前入口文件的名称
- `entryModule`: 入口文件编译后的对象。
- `modules`: 该入口文件依赖的所有模块对象组成的数组，其中每一个元素的格式和`entryModule`是一致的。

此时编译完成我们拼装`chunk`的环节就圆满完成。

## 6、输出文件阶段

我们先放一下上一步所有编译完成后拼装出来的`this.chunks`。

### 分析原始打包输出结果

这里，我把`webpack/core/index.js`中做了如下修改:

```js
- const webpack = require('./webpack');
+ const webpack = require('webpack')

...

```

运用原本的`webpack`代替我们自己实现的`webpack`先进行一次打包。

运行`webpack/core/index.js`后，我们会在`webpack/src/build`中得到两个文件:`main.js`和`second.js`,我们以其中一个`main.js`来看看它的内容:

```
(() => {
  var __webpack_modules__ = {
    './example/src/module.js': (module) => {
      const name = '19Qingfeng';

      module.exports = {
        name,
      };

      const loader2 = '19Qingfeng';
      const loader1 = 'https://github.com/19Qingfeng';
    },
  };
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    const depModule = __webpack_require__(
      /*! ./module */ './example/src/module.js'
    );

    console.log(depModule, 'dep');
    console.log('This is entry 1 !');

    const loader2 = '19Qingfeng';
    const loader1 = 'https://github.com/19Qingfeng';
  })();
})();


```

> 这里我手动删除了打包生成后的多余注释，精简了代码。

我们来稍微分析一下原始打包生成的代码：

`webpack`打包后的代码内部定义了一个`__webpack_require__`的函数代替了`NodeJs`内部的`require`方法。

同时底部的

![webpack26](..\images\webpack26.png)

这块代码相比大家都很熟悉吧，这就是我们编译后的入口文件代码。同时顶部的代码是该入口文件依赖的所有模块定义的一个对象:

![webpack27](..\images\webpack27.png)

这里定义了一个`__webpack__modules`的对象，**对象的`key`为该依赖模块相对于跟路径的相对路径，对象的`value`该依赖模块编译后的代码。

## 7、输出文件阶段

接下里在分析完`webpack`原始打包后的代码之后，上我们来继续上一步。通过我们的`this.chunks`来尝试输出最终的效果吧。

让我们回到`Compiler`上的`run`方法中:

```
   class Compiler {
   
   }
  // run方法启动编译
  // 同时run方法接受外部传递的callback
  run(callback) {
    // 当调用run方式时 触发开始编译的plugin
    this.hooks.run.call();
    // 获取入口配置对象
    const entry = this.getEntry();
    // 编译入口文件
    this.buildEntryModule(entry);
    // 导出列表;之后将每个chunk转化称为单独的文件加入到输出列表assets中
    this.exportFile(callback);
  }

```

我们在`buildEntryModule`模块编译完成之后，通过`this.exportFile`方法实现导出文件的逻辑。

让我们来一起看看`this.exportFile`方法:

```
 // 将chunk加入输出列表中去
  exportFile(callback) {
    const output = this.options.output;
    // 根据chunks生成assets内容
    this.chunks.forEach((chunk) => {
      const parseFileName = output.filename.replace('[name]', chunk.name);
      // assets中 { 'main.js': '生成的字符串代码...' }
      this.assets[parseFileName] = getSourceCode(chunk);
    });
    // 调用Plugin emit钩子
    this.hooks.emit.call();
    // 先判断目录是否存在 存在直接fs.write 不存在则首先创建
    if (!fs.existsSync(output.path)) {
      fs.mkdirSync(output.path);
    }
    // files中保存所有的生成文件名
    this.files = Object.keys(this.assets);
    // 将assets中的内容生成打包文件 写入文件系统中
    Object.keys(this.assets).forEach((fileName) => {
      const filePath = path.join(output.path, fileName);
      fs.writeFileSync(filePath, this.assets[fileName]);
    });
    // 结束之后触发钩子
    this.hooks.done.call();
    callback(null, {
      toJson: () => {
        return {
          entries: this.entries,
          modules: this.modules,
          files: this.files,
          chunks: this.chunks,
          assets: this.assets,
        };
      },
    });
  }

```

`exportFile`做了如下几件事:

- 首先获取配置参数的输出配置，迭代我们的`this.chunks`，将`output.filename`中的`[name]`替换称为对应的入口文件名称。同时根据`chunks`的内容为`this.assets`中添加需要打包生成的文件名和文件内容。
- 将文件写入磁盘前调用`plugin`的`emit`钩子函数。
- 判断`output.path`文件夹是否存在，如果不存在，则通过`fs`新建这个文件夹。
- 将本次打包生成的所有文件名(`this.assets`的`key`值组成的数组)存放进入`files`中去。
- 循环`this.assets`，将文件依次写入对应的磁盘中去。
- 所有打包流程结束，触发`webpack`插件的`done`钩子。
- 同时为`NodeJs Webpack APi`呼应，调用`run`方法中外部传入的`callback`传入两个参数。

总的来说，`this.assets`做的事情也比较简单，就是通过分析`chunks`得到`assets`然后输出对应的代码到磁盘中。

仔细看过上边代码，你会发现。`this.assets`这个`Map`中每一个元素的`value`是通过调用`getSourceCode(chunk)`方法来生成模块对应的代码的。

那么`getSourceCode`这个方法是如何根据`chunk`来生成我们最终编译后的代码呢？让我们一起来看看吧！

### `getSourceCode`方法

首先我们来简单明确一下这个方法的职责，我们需要`getSourceCode`方法接受传入的`chunk`对象。从而返回该`chunk`的源代码。

废话不多说，其实这里我用了一个比较偷懒的办法，但是完全不妨碍你理解`Webpack`流程，上边我们分析过原本`webpack`打包后的代码**仅仅只有入口文件和模块依赖是每次打包不同的地方，关于`require`方法之类都是相通的**。

把握每次的不同点，我们直接先来看看它的实现方式:

```
// webpack/utils/index.js

...


/**
 *
 *
 * @param {*} chunk
 * name属性入口文件名称
 * entryModule入口文件module对象
 * modules 依赖模块路径
 */
function getSourceCode(chunk) {
  const { name, entryModule, modules } = chunk;
  return `
  (() => {
    var __webpack_modules__ = {
      ${modules
        .map((module) => {
          return `
          '${module.id}': (module) => {
            ${module._source}
      }
        `;
        })
        .join(',')}
    };
    // The module cache
    var __webpack_module_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
        // no module.id needed
        // no module.loaded needed
        exports: {},
      });

      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      // Return the exports of the module
      return module.exports;
    }

    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      ${entryModule._source}
    })();
  })();
  `;
}
...

```

这段代码其实非常非常简单，远远没有你想象的多难！有点返璞归真的感觉是吗哈哈。

在`getSourceCode`方法中，我们通过组合而来的`chunk`获得对应的:

- `name`: 该入口文件对应输出文件的名称。
- `entryModule`: 存放该入口文件编译后的对象。
- `modules`:存放该入口文件依赖的所有模块的对象。

**我们通过字符串拼接的方式去实现了`__webpack__modules`对象上的属性，同时也在底部通过`${entryModule._source}`拼接出入口文件的代码。**

> 这里我们上文提到过为什么要将模块的`require`方法的路径转化为相对于跟路径(`context`)的路径，看到这里我相信为什么这么做大家都已经了然于胸了。因为我们最终实现的`__webpack_require__`方法全都是针对于模块跟路径的相对路径自己实现的`require`方法。

> 同时如果不太清楚`require`方法是如何转变称为`__webpack_require__`方法的同学可以重新回到我们的编译章节仔细复习熬～我们通过`babel`在`AST`转化阶段将`require`方法调用变成了`__webpack_require__`。

## 8、大功告成

至此，让我们回到`webpack/core/index.js`中去。重新运行这个文件，你会发现`webpack/example`目录下会多出一个`build`目录。

![webpack28](..\images\webpack28.png)

这一步我们就完美的实现属于我们自己的`webpack`。

实质上，我们对于实现一个简单版的`webpack`核心我还是希望大家可以在理解它的工作流的同时彻底理解`compiler`这个对象。

在之后的任何关于`webpack`相关底层开发中，真正做到对于`compiler`的用法了然于胸。了解`compiler`上的各种属性是如何影响到编译打包结果的。

让我们用一张流程图来进行一个完美的收尾吧:

![webpack29](..\images\webpack29.png)

# 六、`Plugin`解析





网上不少资料将 webpack 的插件架构归类为“事件/订阅”模式，我认为这种归纳有失偏颇。订阅模式是一种松耦合架构，发布器只是在特定时机发布事件消息，订阅者并不或者很少与事件直接发生交互，举例来说，我们平常在使用 HTML 事件的时候很多时候只是在这个时机触发业务逻辑，很少调用上下文操作。而 webpack 的钩子体系是一种强耦合架构，它在特定时机触发钩子时会附带上足够的上下文信息，插件定义的钩子回调中，能也只能与这些上下文背后的数据结构、接口交互产生 **side effect**，进而影响到编译状态和后续流程。

学习插件架构，需要理解三个关键问题：

- **WHAT:** 什么是插件
- **WHEN:** 什么时间点会有什么钩子被触发
- **HOW:** 在钩子回调中，如何影响编译状态

## 1、什么是插件？

从形态上看，插件通常是一个带有 `apply` 函数的类：

```
class SomePlugin {
    apply(compiler) {
    }
}
```

`apply` 函数运行时会得到参数 `compiler` ，以此为起点可以调用 `hook` 对象注册各种钩子回调，例如： `compiler.hooks.make.tapAsync` ，这里面 `make` 是钩子名称，`tapAsync` 定义了钩子的调用方式，webpack 的插件架构基于这种模式构建而成，插件开发者可以使用这种模式在钩子回调中，插入特定代码。webpack 各种内置对象都带有 `hooks` 属性，比如 `compilation` 对象：

```javascript
class SomePlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('SomePlugin', (compilation) => {
            compilation.hooks.optimizeChunkAssets.tapAsync('SomePlugin', ()=>{});
        })
    }
}
```

钩子的核心逻辑定义在 Tapable 仓库，内部定义了如下类型的钩子：

```
const {
        SyncHook,
        SyncBailHook,
        SyncWaterfallHook,
        SyncLoopHook,
        AsyncParallelHook,
        AsyncParallelBailHook,
        AsyncSeriesHook,
        AsyncSeriesBailHook,
        AsyncSeriesWaterfallHook
 } = require("tapable");

```

不同类型的钩子根据其并行度、熔断方式、同步异步，调用方式会略有不同，插件开发者需要根据这些的特性，编写不同的交互逻辑。

### 2、什么时候会触发钩子？

了解 webpack 插件的基本形态之后，接下来需要弄清楚一个问题：webpack 会在什么时间节点触发什么钩子？这一块我认为是知识量最大的一部分，毕竟源码里面有237个钩子，但官网只介绍了不到100个，且官网对每个钩子的说明都太简短，就我个人而言看完并没有太大收获，所以有必要展开聊一下这个话题。先看几个例子：

- `compiler.hooks.compilation`：
  - 时机：启动编译创建出 compilation 对象后触发
  - 参数：当前编译的 compilation 对象
  - 示例：很多插件基于此事件获取 compilation 实例
- `compiler.hooks.make`：
  - 时机：正式开始编译时触发
  - 参数：同样是当前编译的 `compilation` 对象
  - 示例：webpack 内置的 `EntryPlugin` 基于此钩子实现 `entry` 模块的初始化
- compilation.hooks.optimizeChunks：
  - 时机： `seal` 函数中，`chunk` 集合构建完毕后触发
  - 参数：`chunks` 集合与 `chunkGroups` 集合
  - 示例： `SplitChunksPlugin` 插件基于此钩子实现 `chunk` 拆分优化
- compiler.hooks.done：
  - 时机：编译完成后触发
  - 参数： `stats` 对象，包含编译过程中的各类统计信息
  - 示例： `webpack-bundle-analyzer` 插件基于此钩子实现打包分析

这是我总结的钩子的三个学习要素：触发时机、传递参数、示例代码。

#### 2.1、触发时机

触发时机与 webpack 工作过程紧密相关，大体上从启动到结束，`compiler` 对象逐次触发如下钩子：

![webpack14](..\images\webpack14.png)

而 `compilation` 对象逐次触发：

![webpack15](..\images\webpack15.png)

所以，理解清楚前面说的 webpack 工作的主流程，基本上就可以捋清楚“什么时候会触发什么钩子”。

#### 2.2、参数

传递参数与具体的钩子强相关，官网对这方面没有做出进一步解释，我的做法是直接在源码里面搜索调用语句，例如对于 `compilation.hooks.optimizeTree` ，可以在 webpack 源码中搜索 `hooks.optimizeTree.call` 关键字，就可以找到调用代码：

```javascript
// lib/compilation.js#2297
this.hooks.optimizeTree.callAsync(this.chunks, this.modules, err => {
});

```

结合代码所在的上下文，可以判断出此时传递的是经过优化的 `chunks` 及 `modules` 集合。

#### 2.3、找到示例

Webpack 的钩子复杂程度不一，我认为最好的学习方法还是带着目的去查询其他插件中如何使用这些钩子。例如，在 `compilation.seal` 函数内部有 `optimizeModules` 和 `afterOptimizeModules` 这一对看起来很对偶的钩子，`optimizeModules` 从字面上可以理解为用于优化已经编译出的 `modules` ，那 `afterOptimizeModules` 呢？

从 webpack 源码中唯一搜索到的用途是 `ProgressPlugin` ，大体上逻辑如下：

```
compilation.hooks.afterOptimizeModules.intercept({
  name: "ProgressPlugin",
  call() {
    handler(percentage, "sealing", title);
  },
  done() {
    progressReporters.set(compiler, undefined);
    handler(percentage, "sealing", title);
  },
  result() {
    handler(percentage, "sealing", title);
  },
  error() {
    handler(percentage, "sealing", title);
  },
  tap(tap) {
    // p is percentage from 0 to 1
    // args is any number of messages in a hierarchical matter
    progressReporters.set(compilation.compiler, (p, ...args) => {
      handler(percentage, "sealing", title, tap.name, ...args);
    });
    handler(percentage, "sealing", title, tap.name);
  }
});

```

基本上可以猜测出，`afterOptimizeModules` 的设计初衷就是用于通知优化行为的结束。

`apply` 虽然是一个函数，但是从设计上就只有输入，webpack 不 care 输出，所以在插件中只能通过调用类型实体的各种方法来或者更改实体的配置信息，变更编译行为。例如：

- compilation.addModule ：添加模块，可以在原有的 module 构建规则之外，添加自定义模块
- compilation.emitAsset：直译是“提交资产”，功能可以理解将内容写入到特定路径

到这里，插件的工作机理和写法已经有一个很粗浅的介绍了。

### 3、如何影响编译状态？

解决上述两个问题之后，我们就能理解“如何将特定逻辑插入 webpack 编译过程”，接下来才是重点 —— 如何影响编译状态？强调一下，webpack 的插件体系与平常所见的 订阅/发布 模式差别很大，是一种非常强耦合的设计，hooks 回调由 webpack 决定何时、以何种方式执行；而在 hooks 回调内部可以通过修改状态、调用上下文 api 等方式对 webpack 产生 **side effect**。

比如，`EntryPlugin` 插件：

```
class EntryPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "EntryPlugin",
      (compilation, { normalModuleFactory }) => {
        compilation.dependencyFactories.set(
          EntryDependency,
          normalModuleFactory
        );
      }
    );

    compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
      const { entry, options, context } = this;

      const dep = EntryPlugin.createDependency(entry, options);
      compilation.addEntry(context, dep, options, (err) => {
        callback(err);
      });
    });
  }
}

```

上述代码片段调用了两个影响 `compilation` 对象状态的接口：

- `compilation.dependencyFactories.set`
- `compilation.addEntry`

操作的具体含义可以先忽略，这里要理解的重点是，webpack 会将上下文信息以参数或 `this` (compiler 对象) 形式传递给钩子回调，在回调中可以调用上下文对象的方法或者直接修改上下文对象属性的方式，对原定的流程产生 side effect。所以想纯熟地编写插件，除了要理解调用时机，还需要了解我们可以用哪一些api，例如：

- `compilation.addModule`：添加模块，可以在原有的 `module` 构建规则之外，添加自定义模块
- `compilation.emitAsset`：直译是“提交资产”，功能可以理解将内容写入到特定路径
- `compilation.addEntry`：添加入口，功能上与直接定义 `entry` 配置相同
- `module.addError`：添加编译错误信息
- ...

# 七、Loader 介绍

Loader 的作用和实现比较简单，容易理解，所以简单介绍一下就行了。回顾 loader 在编译流程中的生效的位置：

![webpack16](..\images\webpack16.png)

流程图中， `runLoaders` 会调用用户所配置的 loader 集合读取、转译资源，此前的内容可以千奇百怪，但转译之后理论上应该输出标准 JavaScript 文本或者 AST 对象，webpack 才能继续处理模块依赖。

理解了这个基本逻辑之后，loader 的职责就比较清晰了，不外乎是将内容 A 转化为内容 B，但是在具体用法层面还挺多讲究的，有 pitch、pre、post、inline 等概念用于应对各种场景。

为了帮助理解，这里补充一个示例： [Webpack 案例 -- vue-loader 原理分析](https://juejin.cn/post/6937125495439900685)。





## 三、module、chunk、bundle ##

  #### 1.module ####

- module模块就是我们编写的代码文件，比如JavaScript文件、CSS文件、Image文件、Font文件等等，它们都是属于module模块。而module模块的一个特点，就是可以被引入使用。

#### 2.chunk ####

- chunk是webpack打包过程的中间产物，webpack会根据文件的引入关系生成chunk，也就是说一个chunk是由一个module或多个module组成的，这取决于有没有引入其他的module。

#### 3.bundle ####

- bundle其实是webpack的最终产物，通常来说，一个bundle对应着一个chunk也有可能是多个chunk的集合。

#### 4.总结 ####

 - 其实module、chunk和bundle可以说是同一份代码在不同转换场景的不同名称：

      - 我们编写的是module
      - webpack处理时是chunk
      - 最终生成供使用的是bundle