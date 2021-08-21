# 一、webpack.config.js概念 #

     - webpack.config.js基于nodejs平台运行，模块化默认采用commonjs，而项目文件（src内文件）采用的是es6语法

# 二、webpack.config.js作用 #

     -  指示webpack干那些活，当运行webpack指令时会加载其中的配置

# 三、webpack打包html资源 #

     - 使用插件（plugins）对html文件进行处理（html-webpack-plugin）
     - 使用步骤：下载，引入，使用
     - 下载安装

           - npm install html-webpack-plugin -D  (-D是--save-dev的缩写，表示开发环境)

     - 引入插件
     
           - const HtmlWebpackPlugin = require('html-webpack-plugin')
     
     - 使用插件

           plugins:[
               //功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（js/css）

               new HtmlWebpackPlugin()

               //通过参数可以输出有结构的html资源
               
               new HtmlWebpackPlugins({
                  //复制'./src/index.js'文件，并自动引入打包输出的所有资源（js/css）

                  template:'./src/index.js'
                               
                  //默认打包输出的html文件名称为index.html，可通过filename设置输出文件名称

                  filename:'demo.html'
               })
               
           ]

      - 压缩js和html代码

          - js代码只需要设置成生产模式（production）会自动压缩
          - 压缩html方法
          
                plugins:[
		               //功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（js/css）
		
		               new HtmlWebpackPlugin()
		
		               //通过参数可以输出有结构的html资源
		               
		               new HtmlWebpackPlugins({
		                  //复制'./src/index.js'文件，并自动引入打包输出的所有资源（js/css）
		
		                  template:'./src/index.js'
		                               
		                  //默认打包输出的html文件名称为index.html，可通过filename设置输出文件名称
		
		                  filename:'demo.html'

                         //压缩html代码

                          minify:{
                             //移除空格

                               coallpseWhitespace:true,
                            
                            //移除注释

                               removeComments:true
                          }
		               })
		               
		           ]