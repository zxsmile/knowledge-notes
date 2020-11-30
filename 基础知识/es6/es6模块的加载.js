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

            - exports的优先级高于main,它有很多用法：

                 (1)子目录别名

                     - package.json文件的exports字段可以指定脚本或子目录的别名。

                            // ./node_modules/es-module-package/package.json
                            {
                            "exports": {
                                "./submodule": "./src/submodule.js"
                            }
                            }
                            
                            上面的代码指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。

                            import submodule from 'es-module-package/submodule';
                            
                            // 加载 ./node_modules/es-module-package/src/submodule.js 

                    - 如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

                            // 报错
                            import submodule from 'es-module-package/private-module.js';

                            // 不报错
                            import submodule from './node_modules/es-module-package/private-module.js';

                 (2)main的别名

                    - exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。

                            {
                            "exports": {
                                ".": "./main.js"
                            }
                            }

                            // 等同于
                            {
                            "exports": "./main.js"
                            }

                    - 由于exports字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。

                            {
                            "main": "./main-legacy.cjs",
                            "exports": {
                                ".": "./main-modern.cjs"
                            }
                            }
                            上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是main-legacy.cjs，新版本的 Node.js 的入口文件是main-modern.cjs。

                 (3)条件加载
                 
                    - 利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。

                            {
                            "type": "module",
                            "exports": {
                                ".": {
                                "require": "./main.cjs",
                                "default": "./main.js"
                                }
                            }
                            }
                            上面代码中，别名.的require条件指定require()命令的入口文件（即 CommonJS 的入口），default条件指定其他情况的入口（即 ES6 的入口）


                    - 上面的写法可以简写如下。

                            {
                            "exports": {
                                "require": "./main.cjs",
                                "default": "./main.js"
                            }
                            }
                            
                            
                    - 注意，如果同时还有其他别名，就不能采用简写，否则或报错。

                            {
                            // 报错
                            "exports": {
                                "./feature": "./lib/feature.js",
                                "require": "./main.cjs",
                                "default": "./main.js"
                            }
                            }


    3. 循环加载

          - ES6 处理“循环加载”与 CommonJS 有本质的不同。ES6 模块是动态引用，如果使用import从一个模块加载变量
          （即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，
          真正取值的时候能够取到值

                 // a.mjs
                import {bar} from './b';
                console.log('a.mjs');
                console.log(bar);
                export let foo = 'foo';

                // b.mjs
                import {foo} from './a';
                console.log('b.mjs');
                console.log(foo);
                export let bar = 'bar';


                上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。

                    $ node --experimental-modules a.mjs
                    b.mjs
                    ReferenceError: foo is not defined

                首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs
                接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行
                执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错

                解决这个问题的方法，就是让b.mjs运行的时候，foo已经有定义了。这可以通过将foo写成函数来解决

                  
                     // a.mjs
                    import {bar} from './b';
                    console.log('a.mjs');
                    console.log(bar());
                    function foo() { return 'foo' }
                    export {foo};

                    // b.mjs
                    import {foo} from './a';
                    console.log('b.mjs');
                    console.log(foo());
                    function bar() { return 'bar' }
                    export {bar};
                    这时再执行a.mjs就可以得到预期结果。

                    $ node --experimental-modules a.mjs
                    b.mjs
                    foo
                    a.mjs
                    bar

                    这是因为函数具有提升作用，在执行import {bar} from './b'时，函数foo就已经有定义了，所以b.mjs加载的时候不会报错
                    这也意味着，如果把函数foo改写成函数表达式，也会报错


*/