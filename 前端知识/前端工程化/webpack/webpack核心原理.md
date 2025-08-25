# 一、webpack的作用 #

   ### 1、模块化开发 ###

- 在没有各个 webpack 搭建的脚手架（create-react-app、vue-cli 等等）之前，我们通过在 HTML5 文件里引入一个个 Javascript 文件来进行开发，这就可能导致并行请求数量过多、存在重复代码等问题。而通过 webpack，我们可以使用 import、require 来进行模块化开发。

- 在 webpack 中一切皆模块，js、css、图片、字体都是模块，而且支持静态解析、按需打包、动态加载、代码分离等功能，帮助我们优化代码，提升性能。

### 2、编译兼容 ###

- Javascript、CSS 的语法规范在不断更新，比如Less、Sass、ES6、TypeScript，但是浏览器的兼容性却不能同步的更新即这些新语法不能直接被浏览器识别，webpack 使用 loader 对文件进行预处理。通过预处理器将 TypeScript 编译成 JavaScript、SCSS 编译成 CSS、ES6 编译成 ES5 等。

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
   - ![webpack1](..\images\webpack1.png)

- 在图中我们可以看到，webpack 将左侧错综复杂的各自不同类型文件的模板依赖关系，包括 .js、.hbs、.cjs、.sass、.jpg、.png 等类型文件，打包成 .js、.css、.jpg、.png 4 种类型的静态资源。
- **这个过程核心完成了 内容转换 + 资源合并 两种功能，实现上包含三个阶段：初始化阶段、构建阶段、生成阶段。**

# 三、构建流程



## 三、module、chunk、bundle ##

  #### 1.module ####

- module模块就是我们编写的代码文件，比如JavaScript文件、CSS文件、Image文件、Font文件等等，它们都是属于module模块。而module模块的一个特点，就是可以被引入使用。

  #### 2.chunk ####

- chunk是webpack打包过程的中间产物，webpack会根据文件的引入关系生成chunk，也就是说一个chunk是由一个module或多个module组成的，这取决于有没有引入其他的module。

  #### 3.bundle ####

- bundle其实是webpack的最终产物，通常来说，一个bundle对应这一个chunk也有可能是多个chunk的集合。

  #### 4.总结 ####

 - 其实module、chunk和bundle可以说是同一份代码在不同转换场景的不同名称：

      - 我们编写的是module
      - webpack处理时是chunk
      - 最终生成供使用的是bundle