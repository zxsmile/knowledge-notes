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

# 四、webpack打包多个html #

    - 多html的规律是需要有多个entry，每个html一个entry，同时需要新建多个HtmlWebpackPlugin

      - 多个enter入口

           entry：{
              
             vender：['jquery','./src/js/common.js']
             index:'./src/js/index.js'
             cart:'./src/js/cart.js'
           }

      - 负责打包html文件，将js注入到html中，minity压缩html

           new HtmlWebpackPlugin({

               template:'./src/index.html',
               filename:'index.html',
               chunk:['index','vendor'],
               minify:{
                             //移除空格

                               coallpseWhitespace:true,
                            
                            //移除注释

                               removeComments:true
                          }
           })

          new HtmlWebpackPlugin({

               template:'./src/cart.html',
               filename:'cart.html',
               chunk:['cart','vendor'],
               minify:{
                             //移除空格

                               coallpseWhitespace:true,
                            
                            //移除注释

                               removeComments:true
                          }
           })

# 五、webpack打包css资源 #

     - 需要使用npm下载安装两个loader帮我们完成打包

         - css-loader的作用是处理css中的@import和url这样的外部资源，将其打包到js中
         - style-loader的作用是把样式插入到Dom中，方法是在head中插入一个style标签，并把样式写入到这个这个标签的innerHTML中


            module：{
                 rules:[

                    //单个loader写法

                     {
                       text:/\.css$/，
                       loader：'css-loader'
                     }

                    //多个loader写法

                     {
                       text:/\.css$/，
                       use:['style-loader','css-loader'] //从右到左匹配
                     }
                 ]
            }

# 六、webpack打包less和sass资源 #

     - less需要使用npm下载less包和less-loader
     - sass需要使用npm下载node-sass包和sass-loader

           module：{
                 rules:[

      

                     {
                       text:/\.css$/，
                       use:['style-loader','css-loader'，'less-loader'] //从右到左匹配
                     }
                 ]
            }

# 七、提取css为单独文件 #

     - css内容是打包在js文件中的 ，可以使用'miri-css-extract-plugin'插件提取成单独的CSS文件
     - 步骤：

            1. 下载'miri-css-extract-plugin'插件，并在webpack.config.js中引入
            
                 const MiriCssExtractPlugin = require('miri-css-extract-plugin') 
    
            2. 在plugins模块中使用插件
           
                 plugins:[

                          new MiriCssExtractPlugin() 

                          //使用参数filename重新命名提取的css文件名   

                          new MiriCssExtractPlugin(options：{filename:'./css/demo.css'})     

                         ]

            3. 在css的rules中使用MiriCssExtractPlugin.loader取代style-loader，提取js中css内容为单文件

                module：{
                 rules:[

                     {
                       text:/\.css$/，
                       use:[MiriCssExtractPlugin.loader,'css-loader'] //从右到左匹配
                     }
                 ]
              }

            4. 如果sass和less也提取成单独的css文件，也一样将style-loader换成MiriCssExtractPlugin.loader

                module：{
                 rules:[

                     {
                       text:/\.css$/，
                       use:[MiriCssExtractPlugin.loader,'css-loader'，'less-loader'] //从右到左匹配
                     }
                 ]
            }

# 8.处理css的兼容性 #

     - 不同浏览器对某些属性的支持不一样，比如：-webkit-backface-visibility:hidden和backface-visibility:hidden
     - 可以使用postcss来进行处理，webpack在打包的时候会自动为我们加上不同浏览器支持的属性形式
     - 使用步骤:

              1. 下载两个包postcss-loader和postcss-preset-env
              2. 将postcss-loader写入loader中

                   module：{
                 rules:[

                     {
                       text:/\.css$/，
                       use:[MiriCssExtractPlugin.loader,'css-loader'，'postcss-loader'] //从右到左匹配
                     }
                  ]
                }
    
              3. postcss-loader会去找postcss.config.js文件，所以我们要创建一个postcss.config.js，在postcss.config.js文件中使用插件postcss-preset-env

                postcss.config.js
 
                    let PostcssPresetEnv = require('postcss-preset-env')

                    module.exports = {

                         plugins:[
                        
                           new PostcssPresetEnv()
                         ]

                     }

               4. postcss-preset-env插件会读取package.json文件中的browserslist参数，这个参数需要我们自己配置

                   //分别设置生产模式和开发模式

                   "browserslist"：{
                       "production":[],
                       "development":[]
                   }

                  //生产模式

                   browserlist:[
       
                      "> 0.2%", //80%的浏览器都支持
                      "last 2 versions", //所有浏览器最新两个版本支持
                      "not dead", //死掉的浏览器
                   ]

               5. less和sass兼容同理