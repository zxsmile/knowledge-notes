## 一、背景

- 使用CRA脚手架创建的项目，如果想要修改编译配置，通常可能会选择npm run eject 弹出配置后魔改。但是，eject是不可逆的，弹出配置后，你将无法跟随官方的脚步去升级项目的react-script版本
- 如果想要无eject重写CRA配置，目前成熟的是下面这几种方式
  - 通过CRA官方支持的--script-version参数，创建项目时使用自己重写过的scripts包 
  - 使用react-app-rewired+customize-cra组合覆盖配置 
  - 使用craco覆盖配置
- 第二种方式相对第三种略复杂一些
- react-scripts是create-react-app的一个核心包，一些脚本和工具的默认配置都集成在里面，而yarn eject命令执行后会将封装在create-react-app中的配置全部反编译到当前项目，这样用户就能完全取得webpack文件的控制权。所以eject命令存在的意义就是更改webpack配置
- npm run eject会复制所有依赖文件和相应的依赖（webpack、babel）到你的项目，是不可逆的，这样配置过于繁琐，配置文件代码过多，不易快速寻找

## 二、craco配置步骤

1.首先，使用create-react-app创建一个项目，这里我们命名为my-project

```lua
npm create-react-app my-project
```

2.进入项目目录，安装基本依赖

```bash
npm install @craco/craco -D
```

3.修改package.json中的脚本命令

```json
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test",
   "eject": "react-scripts eject"
 }
```

4.在项目根目录下，创建配置文件craco.config.js



```css
const path = require('path')

module.exports = {
//配置跨域
  
  devServer: {
     port:3000,
     proxy: {
     '/api': {
           target:'http://127.0.0.1:2000',
           changeOrigin:true,
           pathRewrite:{'^/api':''}
     }
     }
  },

  //配置文件别名

  webpack:{
     alias:{
           '@': path.resolve(__dirname, 'src')
     }
  },
  //配置全局less样式文件
  //全局less样式文件:src/assets/styles/less/global.less
  //const = cracoPluginStylusResourcesLoader = require('craco-plugin-stylus-resource-loader')

  plugins:[
     {
        plugin: cracoPluginStylusResourcesLoader,
        options: {
           patterns: [
              path.join(__dirname, 'src/assets/styles/less/global.less')
           ],
           styleType:'less'
        }
     }
  ]

  //自定义antd主题颜色,要先npm installl craco-antd -D
  //const CracoLessPlugin = require('craco-less')
  
  plugins: [
    {
     plugin: CracoLessPlugin,
     options: {
        lessLoaderOptions: {
           lessOptions: {
              //自定义antd主题颜色
              modifyVars: {
                 "@primary-color": "red"
              },
              javascriptEnabled: true
           }
        }
     }
    }
  ]
 }
```



5.顺带配置一下vscode识别路径并给出路径提示，在项目根目录下创建jsconfig.json（用的ts的话文件名为tsconfig.json）配置文件

```
{ "compilerOptions":{ "baseUrl":"./", "paths": { "@/*": [ "src/*" ] } } }
```

6.重启项目，让配置生效

