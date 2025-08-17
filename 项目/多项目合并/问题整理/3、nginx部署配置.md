# 一、技术点描述

- [ ] **`Ngnix`部署配置：**修改项目部署之后的访问路径，路由文件参数，保障项目与静态资源访问

# 二、关于该点回答

- [ ] 这个文件主要配置项目部署之后的访问路径，部署在根目录下对原项目没有啥影响，但部署在二级目录下的项目，如果使用的是`history`路由模式，要将`vue.config.js`中的`publicPath`改为`'./'`，路由文件增加`base`参数，值为项目部署的二级路由，和`nginx.conf`中的二级路由保持一致，比如我当前的路由文件的`base`参数就应该设置为`/model/`

![project5](D:/张旭资料/knowledge-notes/项目/images/project5.png)

- [ ] 由于是多个子项目部署为同一个服务单元，所有不同子项目通过同一个域名下的不同路由去访问，所以要在`nginx`中配置不同的子项目的路由。

# 三、衍生问题

### 1、`vue.config.js`中的`publicPath`

- [ ] `Type：string`

- [ ] `Default：'/'`

- [ ] 默认情况下，`Vue CLI`会假设你的应用是被部署在一个域名的根路径上，例如`https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在`https://www.my-app.com/my-app`，则设置`publicPath`为`/my-app/`。

- [ ] 这个值也可以被设置为空字符串（''）或是相对路径('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似`Cordova hybrid`应用的文件系统中。

- [ ] 相对`publicPath`的限制

  - [ ] 相对路径的`publicPath`有一些使用上的限制。在以下情况下，应当避免使用相对`publicPath`：
    - [ ] 当使用基于`HTML5` `history.pushState`的路由时
    - [ ] 当使用pages选项构建多页面应用时 

- [ ] 这个值在开发环境下同样生效。如果你想把开发服务器架设在根路径，你可以使用一个条件式的值：

  ```
  module.export = {
      publicPath:process.env.NODE_ENV === 'production'
      ?'/production-sub-path/'
      :'/'
  }
  ```

  