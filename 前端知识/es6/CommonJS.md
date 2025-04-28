## 一、基本概念

 - `Node`应用由模块组成，采用`CommonJS`模块规范
  
  - 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见
  
  - 如果想在多个文件分享变量，必须定义为global对象的属性

    ```
    global.name = 'milk'
    ```

- `CommonJS`规范加载模块是**同步的 **

  - `CommonJS`模块的加载机制是，**输入的是被输出的值的拷贝**。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值

    ```
    // a.js
    var foo="baz"
    module.exports={
        foo:foo
    }
    
    setTimeout(()=>{
        foo = 'nn'
    },500)
    ```

    ```
    // b.js
    
    var m = require('./a.js')
    
    console.log(m.foo) //baz
    
    setTimeout(()=>{
        console.log(m.foo)  //baz
    },1000)    
    ```

## 2、`CommonJS`的特点

- 所有代码都运行在模块作用域，不会污染全局变量

- **模块可以多次加载，但只会在第一次加载时运行一次，然后运行结果就会被缓存了，所有缓存的模块保存在`require.cache`之中,以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存**,可以像下面这样写：

   ```
   delete require.cache[moduleName]
   ```

- **模块的加载顺序，按照其在代码中出现的顺序**

## 3、`module`对象

- 在每个模块内部，使用module变量来代表当前模块，这个变量是一个对象，它有以下属性：

   - `module.id`: 模块识别符，通常是带有绝对路径的模块文件名
   - `module.filename`: 模块的文件名，带有绝对路径。
   - `module.loaded`: 返回一个布尔值，表示模块是否已经完成加载。
   - `module.parent`: 返回一个对象，表示调用该模块的模块。
   - `module.children`: 返回一个数组，表示该模块要用到的其他模块。
   - `module.exports`: 表示模块对外输出的值

## 4、`exports`对象 

- `Node`为每个模块提供一个`exports`变量，指向`module.exports`，等同于在每个模块头部，有以下命令：

       var exports = module.exports

- 所以对外输出接口的时候，可以向`exports`添加属性

       exports.name = 'milk'
       exports.math = function(){}

- 注意，不能将`exports`变量直接指向一个值，这样等于切断了`exports`与`module.exports`的联系

  ```
  exports = function(x) {console.log(x)};
  ```

  - 上面这样的写法是无效的，因为`exports`不再指向`module.exports`了

  - 下面的写法也是无效的

    ```
    exports.hello = function() {
       return 'hello';
    };
    
    module.exports = 'Hello world'
    ```

    

  - 上面代码中，`hello`函数是无法对外输出的，因为`module.exports`被重新赋值了

## 5、`require`命令

 - `require`命令的基本功能是，加载并执行一个`JavaScript`文件，然后返回该模块的`exports`对象，如果没有发现指定模块，会报错

 - `require`加载规则：

      - 当`require`当中的参数字符串以`./`（从当前目录出发）或`../`（从上一级目录出发）开头，表示按照相对路径，从当前文件所在的文件夹开始寻找要载入的模块文件。
      
      - 当`require`当中的参数字符串以`/`开头，则表示从系统根目录开始寻找该模块文件

      - 如果参数字符串不以`./`或`/`或`../`开头，说明要加载的不是一个文件，而是一个默认提供的核心模块。
  
        - 此时则先在`node`平台所提供的核心模块当中找，然后再寻找`NPM`模块（即第三方模块包，或自己写的模块包）
      - 在寻找`NPM`模块包时，会从当前目录出发，向上搜索各级当中的`node_modules`文件夹当中的文件，但若有两个同名文件，则遵循就近原则
        
           脚本/home/user/projects/foo.js执行了require('bar.js')命令，Node会依次搜索以下文件：
            
            /usr/local/lib/node/bar.js
                    /home/user/projects/node_modules/bar.js
              /home/user/node_modules/bar.js
                    /home/node_modules/bar.js
                    /node_modules/bar.js

- `node`的系统模块的优先级最高，一旦有第三方模块包与系统模块重名，则以系统模块为准。
- 之前在使用`require`的方式来加载一个文件时，如果该文件在当前目录当中，则参数字符串当中必须以`./`开头，不能直接写文件名，若在参数字符串当中直接写文件名，则代表载入的是一个模块包，模块包必须放在一个特定名字的文件夹当中，即node_modules。
- 使用require来加载文件时可以省略扩展名。比如`require('./module')`，则对应的加载顺序为：
     - 按`js`文件来执行（先找对应路径当中的`module.js`文件来加载）
     - 按`json`文件来解析（若上面的`js`文件找不到时，则找对应路径当中的`module.json`文件来加载）
     - 按照预编译好的c++模块来执行（寻找对应路径当中的`module.node`文件来加载）
     - 若参数字符串为一个目录（文件夹）的路径，则自动先查找该文件夹下的`package.json`文件，然后再加载该文件当中`main`字段所指定的入口文件。
     - （若`package.json`文件当中没有`main`字段，或者根本没有`package.json`文件，则再默认查找该文件夹下的`index.js`文件作为模块来载入）

## 6、`require`的内部处理流程

- `require`命令是`CommonJS`规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的`module.require`命令，而后者又调用Node的内部命令`Module._load`

  ```
  Module._load = function(request, parent, isMain) {
      // 1. 检查 Module._cache，是否缓存之中有指定模块
      // 2. 如果缓存之中没有，就创建一个新的Module实例
      // 3. 将它保存到缓存
      // 4. 使用 module.load() 加载指定的模块文件，
      //    读取文件内容之后，使用 module.compile() 执行文件代码
      // 5. 如果加载/解析过程报错，就从缓存删除该模块
      // 6. 返回该模块的 module.exports
  };
  ```

- 上面的第4步，采用`module.compile()`执行指定模块的脚本，逻辑如下。

  ```
  Module.prototype._compile = function(content, filename) {
      // 1. 生成一个require函数，指向module.require
      // 2. 加载其他辅助方法到require
      // 3. 将文件内容放到一个函数之中，该函数可调用 require
      // 4. 执行该函数
  };
  ```

- 上面第一步和第二步，require函数及其辅助方法主要如下：

  - `require()`: 加载外部模块
  - `require.resolve()`：将模块名解析到一个绝对路径
  - `require.main`：用来判断模块是直接执行，还是被调用执行，直接执行的时候（`node module.js`），`require.main`属性指向模块本身
  -  `require.cache`：指向所有缓存的模块
  -  `require.extensions`：根据文件的后缀名，调用不同的执行函数

- ​        一旦`require`函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括`require`、`module`、`exports`，以及其他一些参数 
- `Module._compile`方法是同步执行的，所以`Module._load`要等它执行完成，才会向用户返回`module.exports`的值

## 7、模块的循环加载

 - `CommonJS`模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行，一旦出现某个模块被循环加载，就只输出已执行的部分，还未执行的部分不会输出
     
 - 下面一个例子：
     
  ```
     // a.js
     
     exports.done = false;
     var b = require('./b.js');
     console.log('在 a.js 之中，b.done ='+ b.done);
     exports.done = true;
     console.log('a.js 执行完毕');
     ```
     
- 上面代码之中，`a.js`脚本先输出一个done变量，然后加载另一个脚本文件`b.js`，注意，此时`a.js`代码就停在这里，等待`b.js`执行完毕，再往下执行

     ```
     // b.js
     
     exports.done = false;
     var a = require('./a.js');
     console.log('在 b.js 之中，a.done = ' + a.done);
     exports.done = true;
     console.log('b.js 执行完毕');
     ```

- 上面代码之中，`b.js`执行到第二行，就会去加载`a.js`，这时，就发生了“循环加载”。

- 系统会去`a.js`模块对应对象的`exports`属性取值，可是因为`a.js`还没有执行完，从`exports`属性只能取回已经执行的部分，而不是最后的值 ，`a.js`已经执行的部分，只有一行

     ```
       exports.done = false
     ```

- 因此，对于`b.js`来说，它从`a.js`只输入一个变量`done`，值为`false`

- 然后，`b.js`接着往下执行，等到全部执行完毕，再把执行权交还给`a.js`。于是，`a.js`接着往下执行，直到执行完毕。

- 我们写一个脚本`main.js`，验证这个过程：

         var a = require('./a.js');
         var b = require('./b.js');
         console.log('在 main.js 之中,', a.done, b.done);                    

- 执行`main.js`，运行结果如下。

  ```
  $ node main.js
  ```

- 在 `b.js` 之中，`a.done = false`

- `b.js` 执行完毕

- 在 `a.js` 之中，`b.done = true`

- `a.js` 执行完毕

- 在 `main.js` 之中, `a.done=true, b.done=true`

- 上面的代码证明了两件事：

  - 一是，在`b.js`之中，`a.js`没有执行完毕，只执行了第一行
    二是，`main.js`执行到第二行时，不会再次执行`b.js`，而是输出缓存的`b.js`的执行结果，即它的第四行

    ```
       exports.done = true;
    ```