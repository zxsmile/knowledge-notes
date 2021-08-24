let {resolve} = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    /* 1.entry：入口（entry）指示webpack以哪个文件作为入口起点开始打包，分析构建内部依赖图*/

        /* （1）单入口：如果只有一个入口，使用字符串，指定一个入口文件，打包一个chunk，输出一个bundle，chunk名称默认*/

            entry:'./src/index.js',

        /*  （2）多入口：Array，写多个入口文件，所有入口文件形成一个chunk，输出一个bundle，chunk名称默认 */

            // entry:['./src/index.js','./src/main.js'],

        /*  （3）多入口：Object，有几个入口文件就会生成几个chunk，并输出几个bundle，chunk的名称是key（键名） */

            // entry:{
            //     one:'./src/index.js',
            //     two:'./src/main.js'
            // },

        /*  （4）特殊用法： */

            // entry:{
            //     onea:['./src/index.js','./src/main.js'],
            //     twob:'./src/index.js'
            // },

    /* 2.output：输出（output）指示webpack打包后的资源bundles输出到哪里，以及如何命名*/
    output:{
        /* （1）单入口，数组的多入口 */

        filename:'build.js',

        /* （2）对象的多入口 */

        // filename:[name].js,

        path:resolve(__dirname,'./build')
    },

    /* 3.loader：oader让webpack能够去处理那些非JavaScript资源如css、img等，将他们处理成webpack能够识别的资源，可以理解成一个
    翻译的过程，webpack自身只能理解js和json */
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.(jpg|png|gif|jpeg)$/,loader:'url-loader'}
        ]
    },

    /* 4.plugins：插件（plugins）可用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义范围中的变量等*/
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],

    /* 5.mode：模式（mode）指示webpack使用相应模式的配置*/
    mode:'production'
}