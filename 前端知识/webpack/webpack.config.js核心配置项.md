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
                       test:/\.css$/，
                       loader：'css-loader'
                     }

                    //多个loader写法

                     {
                       test:/\.css$/，
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
                       test:/\.css$/，
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
                       test:/\.css$/，
                       use:[MiriCssExtractPlugin.loader,'css-loader'] //从右到左匹配
                     }
                 ]
              }

            4. 如果sass和less也提取成单独的css文件，也一样将style-loader换成MiriCssExtractPlugin.loader

                module：{
                 rules:[

                     {
                       test:/\.css$/，
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
                       test:/\.css$/，
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

# 八、压缩css #

     - 使用插件optimize-css-asssts-webpack-plugin插件压缩css内容

          1. 下载并引入optimize-css-asssts-webpack-plugin插件

              const OptimizeCssAssstsWebpackPlugin = require('optimize-css-asssts-webpack-plugin')

           2. 使用插件

              plugins:[
 
                  new OptimizeCssAssstsWebpackPlugin()
              ]

# 九、webpack打包图片资源 #

     ## 1.图片在css中使用 ##

          #box1{
		    background-image: url(/test.jpg);
		    background-repeat: no-repeat;
		    width:100px;
		    height:200px;
		    background-size: 100% 100%;
		   }

            - 这种使用方式，file-loader和url-loader都可以打包

                 - file-loader

                       - 如果我们希望在页面引入图片（包括img的src和background的url）。当我们基于webpack进行开发时，引入图片会遇到一些问题。其中一个就是引用路径的问题。拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件
                       module:{
				        rules:[
				            {test:/\.css$/,use:['style-loader','css-loader']},
				            {
                             test:/\.(jpg|png|gif|jpeg)$/,
                             loader:'file-loader',
				        ]
				    },

                 - url-loader

                      - 如果图片较多，会发很多http请求，会降低页面性能。url-loader把图片编码成base64格式写进页面，从而减少服务器请求。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

                      module:{
				        rules:[
				            {test:/\.css$/,use:['style-loader','css-loader']},
				            {
                             test:/\.(jpg|png|gif|jpeg)$/,
                             loader:'url-loader',
                             options:{
                                      //图片大小小于8kb，就会被base64处理
                                      //优点：减少服务器请求数量（减轻服务器压力）
                                      //缺点：图片体积会更大

                                      limit:8*1024，
                                      
                                      //给图片进行重命名
                                      //[hash:10]:取图片的hash的前十位
                                      //[ext]:取文件原来扩展名
                                      name:'[hash:10].[ext]'
                                     }
				        ]
				    },

                 -  url-loader和file-loader是什么关系呢？

                      - 简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。

                      - 通过上面的介绍，我们可以看到，url-loader工作分两种情况：

                            - 1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
                            - 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。

   ## 2.图片在HTML中使用 ##

         <img src='./test.jpg' alt='图片' />

          - 这种方式使用，html-loader进行打包
 
            module:{
				        rules:[
				            {test:/\.css$/,use:['style-loader','css-loader']},
				            {
                             test:/\.html$/,
                             //处理html文件中的img图片（负责引入img，从而能被url-loader处理）
                             loader:'html-loader',
				        ]
				    },



