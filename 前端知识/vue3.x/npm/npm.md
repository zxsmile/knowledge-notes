# 一、npm是什么？ #

  - npm是node默认的软件包管理系统，安装好node之后，会默认安装好npm
  - npm本身也是基于node.js开发的软件

# 二、npm的使用 #

  - npm -v 查看版本号
  - npm install <Module Name>  #使用npm命令安装模块
  - npm install <Module Name> -g  #全局安装模块
  - npm list -g  #查看所有全局安装的模块
  - npm list <Module Name>  #查看某个模块的版本号
  - npm -g install npm@5.9.1  #(@后跟版本号) 这样就可以更新npm的版本
  - npm install -save <Module Name>   #-save在package.json文件的dependencies节点写入依赖
  - npm install -save-dev <Module Name> #-save-dev在package.json文件的devDependencies节点写入依赖
       - dependencies:运行时的依赖，发布后，即生产环境下还需要用的模块
       - devDependencies:开发时的依赖，里面的模块是开发时用的，发布时用不到它，比如项目中使用的gulp，压缩css、js的模块。这些模块在我们的项目部署后是不需要的。

# 三、npm镜像的设置与查看 #

  - 搭建环境时通过如下代码将npm设置成淘宝镜像

        - npm config set registry https://registry.npm.taobao.org --global
        - npm config set disturl https://npm.taobao.org/dist --global

  - 设置当前地址（设置默认地址）

        - npm config set registry https://registry.npmjs.org/

  - 查看镜像的配置结果

        - npm config get registry
        - npm config get disturl

  - 使用nrm工具切换淘宝源

        - npx nrm use taobao
      
  - 如果之后需要切换回官方源可使用

        - npx nrm use npm

  - 可以使用淘宝定制的cnpm命令行工具代替默认的npm

        - npm install -g cnpm --registry=https://registry.npm.taobao.org


# 四、package.json属性说明 #

  - name  #包名
  - version  #包的版本号
  - description  #包的描述
  - homepage  #包的官网url
  - author #包的作者姓名
  - contributors  #包的其他贡献者姓名
  - dependencies  #依赖包列表。如果依赖包没有安装，npm会自动将依赖包安装在node_module目录下
  - repository  #包代码存放的地方类型，可以是git或svn，git可在GitHub上
  - main  #main字段指定了程序的主入口文件，require（'moduleName'）就会加载这个文件。这个字段的默认值是模块根目录下的index.js
  - keywords  #关键字
  - package.json文件中版本号的说明，安装的时候代表不同的含义：

       - '5.0.3':表示安装指定的5.0.3版本
       - '~5.0.3':表示安装5.0.x中最新的版本
       - '^5.0.3':表示安装5.x.x中最新的版本


# 五、npm和yarn的区别 #

  -Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。因为npm5以下会出现如下问题：

        - npm install的时候巨慢。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。
        - 同一个项目，安装的时候无法保持一致性。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。
         
             - "5.0.3"
             - "~5.0.3"
             - "^5.0.3"

        - 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。

  - Yarn的优点

        - 速度快 。速度快主要来自以下两个方面：

              - 并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
              - 离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。

        - 安装版本统一：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。
        
        - 更简洁的输出：npm 的输出信息比较冗长。在执行 npm install <package> 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。

        - 多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。

        - 更好的语义化： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。


  - Yarn和npm命令对比

        npm                                             	     yarn

     npm install	                                        yarn
     npm install react --save	                            yarn add react
     npm uninstall react --save	                            yarn remove react
     npm install react --save-dev	                        yarn add react --dev
     npm update --save	                                    yarn upgrade


# 六、npm5 #

  -  版本问题导致环境问题

         - npm5之前我们第一次npm install时是根据package.json来安装相关依赖的，但是它里面的版本不固定，因此默认会根据最高的版本来安装相关依赖，但是在npm5是根据package-lock.json来安装相关依赖的，但前提是没有在命令行中新安装依赖或者更改package.json，否则就会根据package.json来安装，由于会安装依赖的最新版本，所以可能会出现兼容性问题。因此当我们安装环境时，又可能会出现问题，即版本问题导致环境问题!!!

  - 那如果我们安装时的包有bug，后面需要更新怎么办？

        - 在以前可能就是直接改package.json里面的版本，然后再npm install了，但是5版本后就不支持这样做了，因为版本已经锁定在package-lock.json里了，所以我们只能npm install xxx@x.x.x  这样去更新我们的依赖，然后package-lock.json也能随之更新。

  - 假如我已经安装了jquery 2.1.4这个版本，从git更新了package.json和package-lock.json，我npm install能覆盖掉node_modules里面的依赖吗?

        - 经过测试，在直接更新package.json和package-loc.json这两个文件后，npm install是可以直接覆盖掉原先的版本的，所以在协作开发时，这两个文件如果有更新，你的开发环境应该npm install一下才对。

  - 总结：

        - npm install xxx 安装相关包时，不需要在--save，它会自动将模块依赖信息安装在package.json文件的denpendecies中

        - 安装模块操作（更新node_moudles文件夹的内容）会自动生成和更新package-lock.json文件

        - 发布的模块不会包含package-lock.json文件

        - 如果手动修改了package.json文件中已存在模块的版本，直接执行npm install并不会安装新指定的版本，需要使用npm install xxx@yy来更新

        - 直接执行npm instll，如果不存在package-lock.json文件，会根据安装模块后的node_modules目录结构来创建，如果已经存在package-lock.json文件，则它只会根据package-lock.json文件指定的结构来下载模块，并不会理会package.json文件。

        - 重新安装模块之所以快，是因为 package-lock.json 文件中已经记录了整个 node_modules 文件夹的树状结构，甚至连模块的下载地址都记录了，再重新安装的时候只需要直接下载文件即可