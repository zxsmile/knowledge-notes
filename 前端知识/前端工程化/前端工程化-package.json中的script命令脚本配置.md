##  一、npm run xx 命令

- package.json文件中的scripts属性是用来运行npm run 命令的，凡是配置了的属性xx，都可以用npm run xx进行运行，这个xx代表你可以随意写什么名字，但是我们一般都按照一个规范写，比如开发运行：dev，构建：build，测试：test等。

  ```
  "scripts": {
    "myTest": "node esbuild.config.js",
     "build": "ng build",
     "watch": "ng build --watch --configuration development",
  },
  ```

- 上面配置意味着，在执行npm run myTest的时候会执行node esbuild.config.js这个命令，在执行npm run build的时候会执行ng build这个命令。

- 那为什么不能直接执行ng build命令呢？因为这样会报错，操作系统里只有npm相关的命令，不存在ng build这条命令；而我们在下载安装依赖的时候，会在node_modules/.bin目录下创建好名为ng的可执行文件：

- bin这个目录并不是任何npm包，其目录底下的可执行文件都是一个个软链接；其余node_modules目录下的文件夹都是一个个下载下来的依赖模块。而在.bin目录下，一般针对一个依赖模块，会有3个可执行文件，没有后缀名的是对应Unix系的shell脚本，.cmd为后缀名的是windows bat脚本，.ps1为后缀名的则是PowerShell中可执行文件（可以跨平台），三者作用都是用node执行一个js文件。

- 当我们运行npm run build命令的时候，虽然ng没有全局安装，但是npm会到./node_modules/.bin目录里找到ng.js文件作为node脚本来执行，也就是相当于执行了./node_modules/.bin/ng build命令（最后的build作为参数传入）。

- 那么为啥在执行start命令的时候，可以默认执行node server.js命令呢？那是因为node是已经全局安装了，可以直接被调用。这里多一嘴，如果scripts字段里没有start，也不会报错，会去默认执行node server.js命令。

- 如果我们只运行了npm run命令，那么就会去执行scripts字段里所有的脚本命令。

- .bin目录下的软链接

  - 我们继续往下看，既然.bin目录下的执行文件是一个个软链接，那么这些软链接文件是哪里来的呢？npm又是怎么知道这些软链接是指向哪里呢？我们可以直接在项目根目录下的package-lock.json文件里搜索ng.js，可以看到npm在install的时候，就将bin/ng.js作为bin声明了：

    ```
    "bin":{
      "ng":"bin/ng.js"
    }
    ```

  - 因此在npm安装的时候，就把bin/ng.js文件软链接到了./node_modules/.bin 目录下，而npm 还会自动把node_modules/.bin加入$PATH 变量内，这样ng 就可以不用全局安装了，直接作为命令来运行、开发依赖程序。执行结束后，再将PATH变量恢复原样。这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。也就是说，软链接相当于是一种映射，在执行npm run xxx的时候，就会到node_modules/.bin目录里找到对应的映射文件，然后再找到相对应的js文件来执行。

  - 而如果我们想不用软链接的方式，直接使用全局安装的命令的话，我们就需要在安装包的时候，使用npm install -g xxx来安装这个依赖，那么就会将xxx其中的bin文件加入到全局中；这样就可以和node一样，直接使用诸如xxx build这样的命令了。 

## 二、什么是process.env.NODE_ENV？

- process.env.NODE_ENV应该是我们最熟悉的环境变量了，它经常出现在使用框架或者类库的时候，被用来区分不同的环境（开发，测试，生产等），以便我们进行相对应的项目配置，比如是否开启sourceMap，api地址切换等。那为什么process.env.NODE_ENV能用来区分环境呢？它是如何来的？

#### 1.process

- process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。

#### 2.process.env

- process.env属性返回一个包含用户环境信息的对象。

  ```
    {
      TERM: 'xterm-256color',
      SHELL: '/usr/local/bin/bash',
      USER: 'nodejscn',
      PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
      PWD: '/Users/nodejscn',
      EDITOR: 'vim',
      SHLVL: '1',
      HOME: '/Users/nodejscn',
      LOGNAME: 'nodejscn',
      _: '/usr/local/bin/node'
  }
  
  ```

- 在node环境中，当我们打印process.env时，发现它并没有NODE_ENV这一个属性。实际上，process.env.NODE_ENV是在package.json的scripts命令中注入的，也就是NODE_ENV并不是node自带的，而是由用户定义的，至于为什么叫NODE_ENV，应该是约定成俗的吧。

  ```
  {
      "scripts": {
          "dev": "NODE_ENV=development webpack --config webpack.dev.config.js"
      }
  }
  ```

- 可以看到NODE_ENV被赋值为development，当执行npm run dev时，我们就可以在 webpack.dev.config.js脚本中以及它所引入的脚本中访问到process.env.NODE_ENV，而无法在其它脚本中访问。

- 它不可以在客户端侧代码中使用，简单得来说就是浏览器上，打包后的静态资源。这时候就有人说了,在写 Vue 项目的时候，可以在使用啊；比如 VUE_APP_TITLE，可以这样访问：console.log(process.env.VUE_APP_TITLE)，这个下面会讲到。

- 如何在其他脚本中访问

  -  前面提到，**在scripts命令中注入的NODE_ENV只能被webpack的构建脚本访问，而被webpack打包的源码中是无法访问到的**，此时可以借助webpack的DefinePlugin插件，创建全局变量。

    ```
    const webpack = require('webpack');
    module.exports = {
        plugins: [
            new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
            })
        ]
    }
    ```

  - 当然DefinePlugin不仅仅可以定义process.env.NODE_ENV，你也可以根据自己的需要定义其他的全局变量。定义完成之后，就可以在项目代码中直接使用了。
        

  -  所以就解决了上面的疑问，在**写 Vue 项目时，在客户端侧代码中，只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，你才可以在应用的代码中访问它们**；当然，还有两个特殊的变量也可以在应用中访问：NODE_ENV 和 BASE_URL；同样在 React 应用中，除了一些内置变量（ NODE_ENV 和 PUBLIC_URL ）之外，变量名必须以 REACT_APP_ 开头才能使用。

#### 3.跨平台的cross-env

 - 在window平台下直接设置NODE_ENV =XXX是会报错的，cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然后在windows上也能够兼容。

- 安装cross-env

  ```
  npm install cross-env --save
  ```

- 在NODE_ENV=XXX前面添加cross-env。

  ```
  "scripts": {
          "dev": "cross-env NODE_ENV=devlll NAME=222 vue-cli-service serve",
      }
  ```

- 这种写法就是在scripts中给process.env注入NODE_ENV和NAME属性，值分别为myDev和222，这个时候在vue.config.js打印process.env，重启服务在命令行中可以看到多了NODE_ENV和NAME属性。

#### 4.使用.env文件（dotenv读取)

 - 如果需要配置的环境变量太多，全部设置在scripts命令中既不美观也不容易维护，此时将环境变量配置在.env文件中，然后使用dotenv插件来加载.env配置文件。

 - dotenv 是一个零依赖包，可将环境变量从 .env 文件加载到 process.env；其原理是将 .env 文件解析为 json 对象，并对其中的 key-value 对通过 process.env 将其赋值为环境变量，之后便可通过 process.env[key] 来使用。dotenv的默认策略是如果.env文件中存在与系统中相同的环境变量, 那么将跳过该变量的加载

 - 安装dotenv

   ```
   npm install dotenv --save
   ```
   
- 创建.env文件

  ```
  NODE_ENV = development
  API_URL = https://abc.com
  ```

- 使用

  ```
   require('dotenv').config() // 默认是.env文件
  ```

- 它会把项目根目录下的 .env 文件内容加载到 process.env

- .env中配置的字段同样也会给process.env注入该字段的属性，但是如果script中和.env有同样名字的属性，script中的优先级更高

##### 4.vue-cli也可以读取.env文件

- vue-cli为我们提供了**--mode参数**可以让我们**读取不同环境的env文件**

  ```
  "scripts": {
    "dev": "vue-cli-service serve --mode dev"
   }
  ```

- 上述的配置就是使用了vue-cli为我们提供的--mode参数，--mode dev表示读取.env.dev文件，该文件中配置的字段会给process.env注入该字段的属性，是如果script中和.env有同样名字的属性，script中的优先级更高

  ```
  "scripts": {
     "dev": "cross-env NODE_ENV=devlll NAME=222 vue-cli-service serve --mode dev",
  },
  
  .env.dev
        
  NODE_ENV=dev
  VUE_APP_NAME = 我是dev的name
  NAMES=333
  ```

-  上述的配置，process.env中增加的属性为

  ```
  {
    NODE_ENV:devlll,
    NAME:222,
    VUE_APP_NAME:我是dev的name,
    NAMES:333
  }
  ```

- **在vue.config.js中打印process.env可以看到，但是在前端代码中打印只能看到NODE_ENV和VUE_APP_NAME**，因为上面我们也说了，**在scripts命令中注入的属性只能被webpack的构建脚本访问，而被webpack打包的源码中是无法访问到的，此时可以借助webpack的DefinePlugin插件，创建全局变量，写 Vue 项目时，在客户端侧代码中，只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，你才可以在应用的代码中访问它们；当然，还有两个特殊的变量也可以在应用中访问：NODE_ENV 和 BASE_URL。**

#### 5.模式和环境变量

  - 模式是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：

      - development 模式用于 vue-cli-service serve
      - test 模式用于 vue-cli-service test:unit
      - production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e

   - 你可以通过传递在script中直接给NODE_ENV赋值或者通过--mode xx读取.env.xx文件重写NODE_ENV的值，也可以添加其他环境变量

      ```
      "scripts": {
          "dev": "vue-cli-service serve --mode dev",
          "mydev": "vue-cli-service serve --mode test"
      }
      ```

- 当运行 npm run dev 命令时，所有的环境变量都从对应的环境文件中载入。

     - 如果文件内部不包含 NODE_ENV 变量，并且--mode后面的值是三种模式中的一种时，它的值将取决于模式。
       - 比如运行上面的npm run mydev，且--mode后面的值是test,是三种模式中的一种，并且.env.test文件内部不包含 NODE_ENV 变量，所以NODE_ENV值为test
     - 如果文件内部不包含 NODE_ENV 变量，并且--mode后面的值不是三种模式中的一种时，它的值默认则是 "development"。
       - 比如运行上面的npm run dev，且--mode后面的值是dev,不是三种模式中的一种，并且.env.dev文件内部不包含 NODE_ENV 变量，所以NODE_ENV值为"development"。

        - NODE_ENV 将决定您的应用运行的模式，是开发，生产还是测试，因此也决定了创建哪种 webpack 配置。

           - 例如通过将 NODE_ENV 设置为 "test"，Vue CLI 会创建一个优化过后的，并且旨在用于单元测试的 webpack 配置，它并不会处理图片以及一些对单元测试非必需的其他资源。

           - 同理，NODE_ENV=development 创建一个 webpack 配置，该配置启用热更新，不会对资源进行 hash 也不会打出 vendor bundles，目的是为了在开发的时候能够快速重新构建。

           - 当你运行 vue-cli-service build 命令时，无论你要部署到哪个环境，应该始终把 NODE_ENV 设置为 "production" 来获取可用于部署的应用程序。