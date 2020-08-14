/* 1. 概述

       - ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
         CommonJS 和 AMD 模块，都只能在运行时确定这些东西

       - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";

   2.export命令

       - 两种输出写法：

            export var firstName = 'Michael'

            var firstName = 'Michael';
            var lastName = 'Jackson';
            var year = 1958;

            export { firstName, lastName, year };

       - 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名

            function v1() { ... }
            function v2() { ... }

            export {
            v1 as streamV1,
            v2 as streamV2,
            v2 as streamLatestVersion
            };

       - export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
          这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
        
              // a.js

                export var foo="baz"
        
                setTimeout(()=>{
                    foo = 'nn'
                },500)

                // b.js

                import {foo} from './a.js'

                console.log(foo) //baz

                setTimeout(()=>{
                    console.log(foo)  //nn
                },1000)

       - export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错
         import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷 

    3.import命令

       - import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同
       - 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名

                import { lastName as surname } from './profile.js';

       - import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口

                import {a} from './xxx.js'

                a = {}; // Syntax Error : 'a' is read-only;

       - 如果a是一个对象，改写a的属性是允许的

                import {a} from './xxx.js'

                a.foo = 'hello'; // 合法操作

       - import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置
       - import命令具有提升效果，会提升到整个模块的头部，首先执行
       - 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构
       - import语句会执行所加载的模块，因此可以有下面的写法

            import 'lodash';
            上面代码仅仅执行lodash模块，但是不输入任何值

      - 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
      - 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面

                 import * as circle from './circle';

                 console.log('圆面积：' + circle.area(4));
                 console.log('圆周长：' + circle.circumference(14));

                 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

                    import * as circle from './circle';

                    // 下面两行都是不允许的
                    circle.foo = 'hello';
                    circle.area = function () {};
                    
    4. export default命令

      - export default命令为模块提供默认输出 

           - export default用在匿名函数前
      
                // export-default.js

                    export default function () {
                    console.log('foo');
                    }

                    上面代码是一个模块文件export-default.js，它的默认输出是一个函数。

                    其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

                    // import-default.js
                    import customName from './export-default';
                    customName(); // 'foo'

                    需要注意的是，这时import命令后面，不使用大括号
                      
                       - export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令

           - export default命令用在非匿名函数前，也是可以的


                 // export-default.js

                    export default function foo() {
                    console.log('foo');
                    }

                    // 或者写成

                    function foo() {
                    console.log('foo');
                    }

                    export default foo;
                    上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

     - 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字，所以，下面的写法是有效的：

             // modules.js

                function add(x, y) {
                return x * y;
                }
                export {add as default};
                // 等同于
                // export default add;

                // app.js
                import { default as foo } from 'modules';
                // 等同于
                // import foo from 'modules';

     - 因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句

                // 正确
                export var a = 1;

                // 正确
                var a = 1;
                export default a;

                // 错误
                export default var a = 1;

     - 因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后

                export default 42

     - 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样

                import _, { each, forEach } from 'lodash';

   5.export和import复合写法

      - 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起

            export { foo, bar } from 'my_module';

            // 可以简单理解为
            import { foo, bar } from 'my_module';
            export { foo, bar };

        上面代码中，export和import语句可以结合在一起，写成一行
        但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar

      - 模块的接口改名和整体输出，也可以采用这种写法。

            // 接口改名
            export { foo as myFoo } from 'my_module';

            // 整体输出
            export * from 'my_module';
            
      - 默认接口的写法如下。

            export { default } from 'foo';
            
      - 具名接口改为默认接口的写法如下。

            export { es6 as default } from './someModule';

            // 等同于
            import { es6 } from './someModule';
            export default es6;
           
      - 同样地，默认接口也可以改名为具名接口。

            export { default as es6 } from './someModule';

      - 下面三种import语句，没有对应的复合写法。

            import * as someIdentifier from "someModule";
            import someIdentifier from "someModule";
            import someIdentifier, { namedIdentifier } from "someModule";
           
      - 为了做到形式的对称，现在有提案，提出补上这三种复合写法。

            export * as someIdentifier from "someModule";
            export someIdentifier from "someModule";
            export someIdentifier, { namedIdentifier } from "someModule";

   6. 模块的继承

     - 假设有一个circleplus模块，继承了circle模块

            // circleplus.js

                export * from 'circle';
                export var e = 2.71828182846;
                export default function(x) {
                return Math.exp(x);
                }
                
                上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。

     - 这时，也可以将circle的属性或方法，改名后再输出。

            // circleplus.js

            export { area as circleArea } from 'circle';

            上面代码表示，只输出circle模块的area方法，且将其改名为circleArea

   7. import()

     - import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行,所以import命令不会动态加载，因此，下面的代码会报错

            // 报错
            if (x === 2) {
            import MyModual from './myModual';
            }

        引擎处理import语句时，是在编译阶段，这时不会去分析或执行if语句，所以import语句放在if里面毫无意义，所以上面语句会报句法错误，而不是执行时错误
     
     - import()函数，支持动态加载功能

     - import命令能够接受什么参数，import()函数就能接受什么参数，两者区别主要是后者为动态加载
     - import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用
     - 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块
     - 另外，import()函数与所加载的模块没有静态连接关系，这点也是与import语句不相同
     - import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载
     - import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数，因此，可以使用对象解构赋值的语法，获取输出接口。

            import('./myModule.js')
            .then(({export1, export2}) => {
            // ...·
            });
            上面代码中，export1和export2都是myModule.js的输出接口，可以解构获得。

     - 如果模块有default输出接口，可以用参数直接获得。

            import('./myModule.js')
            .then(myModule => {
            console.log(myModule.default);
            });

     - 如果想同时加载多个模块，可以采用下面的写法。

            Promise.all([
            import('./module1.js'),
            import('./module2.js'),
            import('./module3.js'),
            ])
            .then(([module1, module2, module3]) => {
            ···
            });

            
            
            
            
 
 
*/
