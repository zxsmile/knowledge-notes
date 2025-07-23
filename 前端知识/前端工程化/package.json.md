## 一、概述

- 从我们接触前端开始，每个项目的根目录下一般都会有一个package.json文件，这个文件定义了当前项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等）。

- 当运行`npm install`命令的时候，会根据`package.json`文件中的配置自动下载所需的模块，也就是配置项目所需的运行和开发环境。

- 比如下面这个文件，只存在简单的项目名称和版本号。

  ```
  {
    "name" : "yindong",
    "version" : "1.0.0",
  }
  ```

- package.json文件是一个JSON对象，这从他的后缀名.json就可以看出来，该对象的每一个成员就是当前项目的一项设置。比如name就是项目名称，version是版本号。

- 下面是一个更完整的package.json文件，详细解释一下每个字段的真实含义。

  ```
  {
      "name": "yindong",
      "version":"0.0.1",
      "description": "antd-theme",
      "keywords":["node.js","antd", "theme"],
      "homepage": "https://zhiqianduan.com",
      "bugs":{"url":"http://path/to/bug","email":"yindong@xxxx.com"},
      "license": "ISC",
      "author": "yindong",
      "contributors":[{"name":"yindong","email":"yindong@xxxx.com"}],
      "files": "",
      "main": "./dist/default.js",
      "bin": "",
      "man": "",
      "directories": "",
      "repository": {
  		"type": "git",
  		"url": "https://path/to/url"
  	},
      "scripts": {
        "start": "webpack serve --config webpack.config.dev.js --progress"
      },
      "config": { "port" : "8080" },
      "dependencies": {},
      "devDependencies": {
          "@babel/core": "^7.14.3",
          "@babel/preset-env": "^7.14.4",
          "@babel/preset-react": "^7.13.13",
          "babel-loader": "^8.2.2",
          "babel-plugin-import": "^1.13.3",
          "glob": "^7.1.7",
          "less": "^3.9.0",
          "less-loader": "^9.0.0",
          "style-loader": "^2.0.0",
          "webpack": "^5.38.1",
          "webpack-cli": "^4.7.0",
          "webpack-dev-server": "^3.11.2"
      },
      "peerDependencies": {
          "tea": "2.x"
      },
      "bundledDependencies": [
          "renderized", "super-streams"
      ],
      "engines": {"node": "0.10.x"},
  	  "os" : [ "win32", "darwin", "linux" ],
      "cpu" : [ "x64", "ia32" ],
      "private": false,
      "publishConfig": {}
    }
    
  
  ```

## 二、name字段

- `package.json`文件中最重要的就是`name`和`version`字段，这两项是必填的。名称和版本一起构成一个标识符，该标识符被认为是完全唯一的。对包的更改应该与对版本的更改一起进行。

- `name`必须小于等于214个字符，不能以`.`或`_`开头，不能有大写字母，因为名称最终成为URL的一部分因此不能包含任何非URL安全字符。 `npm`官方建议我们不要使用与核心节点模块相同的名称。不要在名称中加`js`或`node`。如果需要可以使用`engines`来指定运行环境。

- 该名称会作为参数传递给`require`，因此它应该是简短的，但也需要具有合理的描述性。

## 三、version字段

- `npm` 包中的模块版本都需要遵循 `SemVer` 规范，该规范的标准版本号采用 `X.Y.Z` 的格式，其中 `X`、`Y` 和 `Z` 均为非负的整数，且禁止在数字前方补零：

  - `X` 是主版本号(major)：通常在涉及重大功能更新，产生了破坏性变更时会更新此版本号。
  - `Y` 是次版本号(minor)：在引入了新功能，但未产生破坏性变更，依然向下兼容时会更新此版本号。
  - `Z` 为修订号(patch)：在修复了一些问题，也未产生破坏性变更时会更新此版本号。

- 先行版本号可以加到**主版本号.次版本号.修订号**的后面，通过**-**号连接一连串以句点分隔的标识符和版本编译信息：

  - 内部版本(`alpha`)
  - 公测版本(`beta`)
  - 正式版本的候选版本`rc`（即 `Release candiate`）

- 我们可以执行以下命令查看模块的版本：

  ```
  npm view <packageName> version # 查看某个模块的最新版本
  npm view <packageName> versions # 查看某个模块的所有历史版本
  ```

- 版本说明

  - 固定版本: 比如`5.38.1`，安装时只安装指定版本。 
  - 波浪号: 比如`~5.38.1`, 表示安装`5.38.x`的最新版本（不低于`5.38.1`），但是不安装`5.39.x`，也就是说安装时不改变大版本号和次要版本号。 
  - 插入号: 比如`ˆ5.38.1`, ，表示安装`5.x.x`的最新版本（不低于`5.38.1`），但是不安装`6.x.x`，也就是说安装时不改变大版本号。
  - 需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。 latest: 安装最新版本。

## 四、description字段

- `description`是一个字符串，用于编写描述信息。有助于人们在`npm`库中搜索的时候发现你的模块。

## 五、 keywords字段

- `keywords`是一个字符串组成的数组，有助于人们在`npm`库中搜索的时候发现你的模块。

## 六、homepage字段

- `homepage`项目的主页地址。

## 七、bugs字段

- `bugs`用于项目问题的反馈issue地址或者一个邮箱。

  ```
  "bugs": { 
    "url" : "https://github.com/owner/project/issues",
    "email" : "project@hostname.com"
  }
  ```

## 八、license字段

- `license`是当前项目的协议，让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制。

  ```
  "license" : "BSD-3-Clause"
  ```

## 九、author字段 contributors字段

- `author`是具体一个人，`contributors`表示一群人，他们都表示当前项目的共享者。同时每个人都是一个对象。具有`name`字段和可选的`url`及`email`字段。

  ```
  "author": {
    "name" : "yindong",
    "email" : "yindong@xx.com",
    "url" : "https://zhiqianduan.com/"
  }
  ```

- 也可以写成一个字符串

  ```
  "author": "yindong yindong@xx.com (https://zhiqianduan.com/)"
  ```

## 十、files字段

- `files`属性的值是一个数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来（除非文件被另一些配置排除了）
- 可以在模块根目录下创建一个`.npmignore`文件，写在这个文件里边的文件即便被写在`files`属性里边也会被排除在外，这个文件的写法与`.gitignore`类似。

## 十一、main字段

- `main`字段指定了加载的入口文件，`require`导入的时候就会加载这个文件。这个字段的默认值是模块根目录下面的`index.js`。

## 十二、bin字段

- `bin`项用来指定每个内部命令对应的可执行文件的位置。如果你编写的是一个`node`工具的时候一定会用到`bin`字段。

- 当我们编写一个`cli`工具的时候，需要指定工具的运行命令，比如常用的`webpack`模块，他的运行命令就是`webpack`。

  ```
  "bin": {
    "webpack": "bin/index.js",
  }
  ```

- 当我们执行`webpack`命令的时候就会执行`bin/index.js`文件中的代码。
- 在模块以依赖的方式被安装，如果存在`bin`选项。在`node_modules/.bin/`生成对应的文件， `Npm`会寻找这个文件，在`node_modules/.bin/目录`下建立符号链接。由于`node_modules/.bin/目录`会在运行时加入系统的`PATH`变量，因此在运行`npm`时，就可以不带路径，直接通过命令来调用这些脚本。
- 所有`node_modules/.bin/目录`下的命令，都可以用`npm run [命令]`的格式运行。在命令行下，键入`npm run`，然后按`tab`键，就会显示所有可以使用的命令。

## 十三、man字段

- man用来指定当前模块的man文档的位置

  ```
  "man" :[ "./doc/calc.1" ]
  ```

## 十四、directories字段

- `directories`制定一些方法来描述模块的结构, 用于告诉用户每个目录在什么位置。

## 十五、repository字段

- 指定一个代码存放地址，对想要为你的项目贡献代码的人有帮助

  ```
  "repository" : {
    "type" : "git", 
    "url" : "https://github.com/npm/npm.git"
  }
  ```

## 十六、`scripts`字段

- `scripts`指定了运行脚本命令的`npm`命令行缩写，比如`start`指定了运行`npm run start`时，所要执行的命令。

  ```
  "scripts": {
    "start": "node ./start.js"
  }
  
  ```

- 使用`scripts`字段可以快速的执行shell命令，可以理解为`alias`。

- `scripts`可以直接使用node_modules中安装的模块，这区别于直接运行需要使用`npx`命令。

  ```
  "scripts": {
    "build": "webpack"
  }
  
  // npm run build
  // npx webpack
  ```

## 十七、`config`字段

- `config`字段用于添加命令行的环境变量。

  ```
  {
    "name" : "yindong",
    "config" : { "port" : "8080" },
    "scripts" : { "start" : "node server.js" }
  }
  ```

- 然后，在`server.js`脚本就可以引用`config`字段的值。

  ```
  console.log(process.env.npm_package_config_port); // 8080
  ```

- 用户可以通过`npm config set`来修改这个值。

  ```
  npm config set yindong:port 8000
  ```

## 十八、`dependencies`字段, `devDependencies`字段

#### **1、走出 “`dev`” 的误区**

- 关于 “`devDependencies` 和 `dependencies` 有什么区别？” 这样的问题，我们随便百度一下都能出来很多个答案，其中**最广为流传的说法**大概就是：“ `devDependencies` 是开发环境下需要用到的依赖， `dependencies` 是生产环境下需要用到的依赖” 这样的话术，这也就是很容易让人走进误区的开端。至于为什么这么说，我们接着往下看。

**（1）`devDependencies` 的 `dev` 理解误区**

- 存在即合理，即然这是个容易让人产生误区的话术，为什么它是搜索引擎中最容易搜索到的答案呢？其实，从某种角度来看，这个说法并没有什么毛病，只是很容易让人走进误区。如果没有实践中体会过他们的区别，就**很难真正的理解这句话**，这也是让我们掉进误区的原因。

- 其中最大的误区便是对 “`dev`” 的理解。这么说可能不够清晰，把它转述成一个问题：

  - 安装在 `devDependencies` 中的依赖，在项目执行 `build` 的时候会不会被打包进 **`dist`** 产物中

  - 针对这个问题，我们从正常的项目打包流程分析（不管是 `webpack` 还是 `vite`，打包的核心步骤都类似），**这里从最简化的进行分析，只为了针对上述问题。**

    - 初始化配置
    - **项目入口**
    - **依赖解析**
    - `loader`处理
    - ... ...

  - 看到这样的打包流程（集中关注**第2、3**步），大家应该也意识到一点：**项目打包跟 `devDependencies` 这个字段并没什么关系**。这样一来，上述问题的答案也就很清晰了。**只要是项目中用到的依赖（且安装到 `node_modules` 中），不管这个依赖是放在 `devDependencies` 还是放在 `dependencies` ，都会被打包工具解析、构建，最后都打进 `dist` 产物中。**

    

- 总结：**生产打包 与 `devDependencies` 字段无关**。`devDependencies` 中的 `dev` **并不是**指我们 `dev server` 时候的 `dev` ，不能简单的把 `dev` 理解成当前项目的 “开发环境” 。接着往下，我们通过真实的装包来验证一下这个结论。

**（2）验证`devDependencies`**



- 随便用`vue-cli`生成一个`vue2`项目，目录如下。

  ![package1](.\images\package1.png)

- 当前项目的依赖情况如下图：

  ![package2](.\images\package2.png)

  - 可以看到，目前的`vue`是放在`dependencies` 字段中。

- `install` 一下依赖，然后到 `node_modules` 中找到 `vue` 的依赖包，并且找到对应的入口文件。

  ![package3](.\images\package3.png)

- 在 `vue.runtime.esm.js` 中，加入一行代码。看看打包后的情况如何。

  ![package4](.\images\package4.png)

- 执行 `build`。并对 `dist` 文件夹搜索。

  ![package5](.\images\package5.png)

  - 没有意外，`vue2` 的包给打进了该项目的 `dist` 包中。

- 接下来，把 `vue` 的依赖信息移动到**`devDependencie`s**中，然后删除掉之前的 `node_modules` 目录后重新执行 `install` ，结果如图所示。

  ![package6](.\images\package6.png)

  ![package7](.\images\package7.png)

- 这时，再重复上述步骤 3、4、5 ，对 `vue2` 项目进行打包，再去 `dist`目录中**搜索**手动添加到 `vue2` 源码中的 `console.log` ，结果如图所示。

  ![package8](.\images\package8.png)

- **结果就是，放在 `devDependencies` 的 `vue2` 在 `build` 时候（`mode` 为 `production`）依然会被打包进单页应用的项目中。所以，通过这个实践，就为了搞清楚一个点，`devDependencies` 的 `dev` 并不是指我们在业务项目开发中的 `dev` 和 `prod`，它甚至跟打包时候的 `mode` 扯不上关系。**

#### 2、『`npm`包』的 `devDependencies`

- 其实`devDependencies` 这个字段的 **`dev`** 的真正含义，更多是指 **`npm`包** 的开发阶段所需要的依赖。

**（1）`npm`包的`dev`**

- 怎么理解前面提到的 `npm`包 开发阶段所需要的依赖？我们大概回忆一下`npm`包从 开发 - 发包 的流程。

  - `npm`**初始化**——`package.json`。想要开发一个 `npm`包，最先一定是要进行初始化，执行命令 `npm init`，然后填写一些信息比如 name 、 version 、 description ...此时便会生成一个 `pakcage.json` 文件。
  - `npm`包的**开发**。这个阶段，也就是对 `npm`包 功能实现的阶段，我们会开始编写代码。然而，我们在编写`npm`包的时候，可能需要用到其他的库，这个时候我们就需要去**安装其他的库**。
  - `npm`包的**打包、发布**。`npm`包开发完成后，当然就是要对我们的项目进行打包，然后通过 `npm publish` 命令去发布我们的`npm`包。

- 整个 `npm`包的实现 大概就是这么一个流程。其中第二点，笔者提到了：**如果开发过程中需要用到其他的工具库，就要把依赖安装到当前项目里**！这就涉及到本文的重点了，要怎么安装呢？`-D`、还是`-S`？不同的命令会带来怎么样不同的后果呢？

- 现在，我们来通过一个具体案例来探讨这个问题的答案。

  - 场景描述：现在要开发一个基于 `element-plus` 的二次封装的组件库，所以在开发调试阶段，需要安装 `vue3` 、 `element-plus` ... 等等依赖，以辅助我们开发组件。

  - 对比实验：

    - 将 `vue3` 、 `element-plus` 都放在组件库`package.json`的 `devDependencies` 中，然后将组件库发包（`vc-element-plus`）。最后，在业务项目中安装该组件库，看依赖情况。

      ![package9](.\images\package9.png)

    - 将 `vue3` 放在组件库`package.json`的 `devDependencies` 中，`element-plus` 放在组件库`package.json`的 `dependencies` 中，然后将组件库发包。最后，在业务项目中安装该组件库，看依赖情况。

      ![package10](.\images\package10.png)

**（2）对比实验1**

- 首先在业务项目中安装组件库 `vc-element-plus`。依赖如下图：

  ![package11](.\images\package11.png)

  - 执行安装，操作如下：

    ![package12](.\images\package12.png)

- 看下安装的 `vc-element-plus` 内部的依赖安装情况。如图：

  ![package13](.\images\package13.png)

- 回顾实验1条件：

  ```
  "dependencies": {
    "@element-plus/icons-vue": "^2.0.6",
    "@xxx/vc-shared": "workspace:*",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.3.3",
    "element-plus": "^2.2.8",
    "vue": "^3.2.36",
    "vue-router": "4",
    "less": "^4.1.3"
  }
  ```

  - 根据步骤2中的图可以清晰看出，放在 `dependencies` 字段中的三个依赖包：`@element-plus/icons-vue` 、 `@xxx/vc-shared` 、 `lodash` 都被安装到组件库的 `node_modules` 中，而组件库位于**当前的业务项目**的 `node_modules` 中。换句话说，业务项目中拥有了组件库 `dependencies` 中的依赖包。
  - 猜想，实验2中，`element-plus` 将被装到组件库的内部依赖中。紧接着，我们进行实验2验证一下猜想。

**（3）对比实验2**

- 首先在业务项目中安装组件库 `vc-element-plus`（版本号对比**实验1**已经不同）。依赖如下图：

  ![package14](.\images\package14.png)

  - 同样的，删除`node_module`后进行装包，操作如下：

    ![package15](.\images\package15.png)

- 看下安装的 `vc-element-plus` 内部的依赖安装情况。如图：

  ![package16](.\images\package16.png)

  - `ok`，这样一对比，应该就很清晰了。很明显，实验2中安装了4个依赖，其中多出来的就是我们实验二中放进 `dependencies` 中 `element-plus`。（注意，`@element-plus`是图标那些的，跟`element-plus`不是同一个依赖源）。再次回顾 `dependencies` 字段验证一下：

    ```
    "dependencies": {
      "@element-plus/icons-vue": "^2.0.6",
      "@xxx/vc-shared": "workspace:*",
      "lodash": "^4.17.21",
      "element-plus": "^2.2.8",
    },
    "devDependencies": {
      "@vitejs/plugin-vue": "^2.3.3",
      "vue": "^3.2.36",
      "vue-router": "4",
      "less": "^4.1.3"
    }
    
    ```

- 到这里，大家应该对 `devDependencies` 和 `dependencies` 之间的区别有一个清晰的认识了。至于项目装包中什么时候使用 `-D`，什么时候使用 `-S` 也有自己的理解了。

#### 3、总结 `devDependencies` 和 `dependencies` 的区别

- 结论：`devDependencies` 和 `dependencies`的区别核心体现在 **`npm`包** 中。只要开发的项目是**发`npm`包**提供给外部、其他业务项目使用的，需要非常注意依赖的安装地方，因为搞不好很容易在业务使用中会出现bug。而如果只是自己项目用，**不需要发`npm`包**的话，把依赖安装到 `devDependencies` 或者 `dependencies` 中，实质上是没有任何区别的。
- 为什么在开发 `npm`包 的时候 不严格区分 `devDependencies` 、 `dependencies` 进行装包可能会导致业务项目的使用中出现bug呢？笔者举一个例子来加深理解：

  - 假设`npm`包开发者不小心把 `vue3` 的依赖写到了 `dependencies` 中（用于开发调试的），版本是 `3.0.36`。
  - 业务项目自身用了 `vue@3.0.0` 的情况下，安装了这个 `npm`包 ，由于 `npm`包 中的 `dependencies` 有 `vue@3.0.36` 这个依赖，此时会在装 `npm`包 的同时安装36版本的`vue`。
  - 由于 `npm`包中会用到`vue`，代码是这样引入的：`import { onMount } from 'vue'`，此时，`npm`包会在自己内部的 `node_modules` 中找到 `vue@3.0.36` 的包并使用，此时就会产生 2 个 `vue3` 实例，就很容易出现一些奇怪的`bug`。（业务项目的`vue@3.0.0` 和 `npm`包的`vue@3.0.36`）
  - 业务引用`vue3`，那么业务代码根目录下的`node_module`就会装`vue3`的包（ `根目录/node_modules/vue3`），然后业务侧`npm`包依赖`vue2`并且写在`dependencies`中的话，就会在这个`npm`包的`node_modules`目录下装`vue2`包（`根目录/node_modules/依赖的npm包/node_modules/vue2`），所以就有2个版本的`vue`了，之所以这个依赖的`npm`包内**`import { xxx api } from vue`** 找不到是因为全局只有一个`vue`实例，也就是业务侧`main.js`里`create-app`出来的`Vue3`实例，依赖的那个`npm`包都没有`Vue`实例创建的的代码，自然用的是`Vue3`实例，找不到`Vue2 api`。
- **这里还要注意一点就是 `externals`** 。有同学可能会说，`npm`包打包的时候会 `externals` 掉第三方的库，比如上述中的 `vue3` ，`externals` 只是保证 `vue3` 的代码不打包进 `npm`包 的代码中而已。
- **`npm install/i  packageName  -S/--save `表示将该模块写入`dependencies`属性，`npm install/i packageName -D/--save-dev` 表示将该模块写入`devDependencies`属性。**

## 十九、`peerDependencies`字段

- 当我们开发一个模块的时候，如果当前模块与所依赖的模块同时依赖一个第三方模块，并且依赖的是两个不兼容的版本时就会出现问题。

- 比如，你的项目依赖`A`模块和`B`模块的1.0版，而`A`模块本身又依赖`B`模块的2.0版。

- 大多数情况下，这不构成问题，`B`模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。

- 最典型的场景就是插件，比如`A`模块是`B`模块的插件。用户安装的`B`模块是1.0版本，但是`A`插件只能和2.0版本的`B`模块一起使用。这时，用户要是将1.0版本的`B`的实例传给`A`，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果`A`和`B`一起安装，那么`B`必须是2.0模块。

- `peerDependencies`字段，就是用来供插件指定其所需要的主工具的版本。可以通过`peerDependencies`字段来限制，使用`myless`模块必须依赖`less`模块的`3.9.x`版本。

  ```
  {
    "name": "myless",
    "peerDependencies": {
      "less": "3.9.x"
    }
  }
  ```

- 注意，从`npm 3.0`版开始，`peerDependencies`不再会默认安装了。就是初始化的时候不会默认带出。

## 二十、`bundledDependencies`字段

- `bundledDependencies`指定发布的时候会被一起打包的模块。

## 二十一、`optionalDependencies`字段

- 如果一个依赖模块可以被使用， 同时你也希望在该模块找不到或无法获取时`npm`继续运行，你可以把这个模块依赖放到`optionalDependencies`配置中。这个配置的写法和`dependencies`的写法一样，不同的是这里边写的模块安装失败不会导致`npm install`失败。

## 二十二、engines字段

- `engines`字段指明了该模块运行的平台，比如`Node`或者`npm`的某个版本或者浏览器。

  ```
  { "engines" : { "node" : ">=0.10.3 <0.12", "npm" : "~1.0.20" } }
  ```

## 二十三、os字段

* 可以指定你的模块只能在哪个操作系统上运行

  ```
  "os" : [ "darwin", "linux", "win32" ]
  ```

## 二十四、 cpu字段

- 限制模块只能在某种架构的`cpu`下运行

  ```
  "cpu" : [ "x64", "ia32" ]
  ```

## 二十五、private字段

- 如果这个属性被设置为`true`，`npm`将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。

  ```
  "private": true
  ```

  

## 二十六、 publishConfig字段

- 这个配置是会在模块发布时生效，用于设置发布用到的一些值的集合。如果你不想模块被默认标记为最新的，或者默认发布到公共仓库，可以在这里配置tag或仓库地址。

- 通常`publishConfig`会配合`private`来使用，如果你只想让模块被发布到一个特定的`npm`仓库，如一个内部的仓库。

  ```
  "private": true,
  "publishConfig": {
    "tag": "1.0.0",
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
  
  ```

## 二十七、 preferGlobal字段

- `preferGlobal`的值是布尔值，表示当用户不将该模块安装为全局模块时（即不用–global参数），要不要显示警告，表示该模块的本意就是安装为全局模块。

  ```
  "preferGlobal": false
  ```

  

## 二十八、browser字段

- `browser`指定该模板供浏览器使用的版本。`Browserify`这样的浏览器打包工具，通过它就知道该打包那个文件。

  ```
  "browser": {
    "tipso": "./node_modules/tipso/src/tipso.js"
  },
  ```