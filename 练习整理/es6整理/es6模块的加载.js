/* 1. 浏览器加载

      - <script>标签打开defer或async属性，脚本就会异步加载

          - defer与async的区别是：
           
               - defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染
               - 一句话，defer是“渲染完再执行”，async是“下载完就执行”。
               - 另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的

     - 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。

            <script type="module" src="./foo.js"></script>

     - 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性
     - <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

            <script type="module" src="./foo.js" async></script>
           
            一旦使用了async属性，<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块

     - ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

            <script type="module">
            import utils from "./utils.js";

            // other code
            </script>

     - 对于外部的模块脚本（上例是foo.js），有几点需要注意：

           - 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
           - 模块脚本自动采用严格模式，不管有没有声明use strict。
           - 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
           - 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
           - 同一个模块如果加载多次，将只执行一次

   2. Node.js加载

      (1) 概述

            - Node.js 要求 ES6 模块采用.mjs后缀文件名
            
                - 也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名
                Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"
            
            - 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module， 一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块

                {
                    "type": "module"
                    }

            - 如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs
            - 如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块
            - 以上总结为一句话：.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置
                
      (2)main字段

            - package.json文件有两个字段可以指定模块的入口文件：main和exports。比较简单的模块，可以只使用main字段，指定模块加载的入口文件

                   // ./node_modules/es-module-package/package.json 

                        {
                        "type": "module",
                        "main": "./src/index.js"
                        }

                    上面代码指定项目的入口脚本为./src/index.js，它的格式为 ES6 模块。如果没有type字段，index.js就会被解释为 CommonJS 模块
            
                    import { something } from 'es-module-package';
                    // 实际加载的是 ./node_modules/es-module-package/src/index.js

                    上面代码中，运行该脚本以后，Node.js 就会到./node_modules目录下面，寻找es-module-package模块，然后根据该模块package.json的main字段去执行入口文件

       (3)exports字段

       








*/