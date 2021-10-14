#### 一、模块化的理解 ####
- https://segmentfault.com/a/1190000015302578
- http://www.ruanyifeng.com/blog/2012/10/javascript_module.html
1. 模块的概念
   - 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
   - 模块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

2. 模块化好处：

  - 避免命名冲突(减少命名空间污染)
  - 更好的分离, 按需加载
  - 更高复用性
  - 高可维护性

3. 模块的发展

   - （1）原始写法

         - 模块就是实现特定功能的一组方法。只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

				　　function m1(){
				　　　　//...
				　　}
				
				　　function m2(){
				　　　　//...
				　　}

       - 上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。
       - 这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

  - （2）对象写法

         - 为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

				　　var module1 = new Object({
				
				　　　　_count : 0,
				
				　　　　m1 : function (){
				　　　　　　//...
				　　　　},
				
				　　　　m2 : function (){
				　　　　　　//...
				　　　　}
				
				　　});

       - 上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

　　			   module1.m1();

       - 但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

　　           module1._count = 5;

  - （3）立即执行函数写法

         - 使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。

				　　   var module1 = (function(){
					
					　　　　var _count = 0;
					
					　　　　var m1 = function(){
					　　　　　　//...
					　　　　};
					
					　　　　var m2 = function(){
					　　　　　　//...
					　　　　};
					
					　　　　return {
					　　　　　　m1 : m1,
					　　　　　　m2 : m2
					　　　　};
					
					　　})();

         - 使用上面的写法，外部代码无法读取内部的_count变量。

　　                  console.info(module1._count); //undefined

   - 引入多个<script>后出现出现问题

     - 请求过多

        - 首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多

    - 依赖模糊

       - 我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错。

    - 难以维护

      - 以上两种原因就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。
      - 模块化固然有多个好处，然而一个页面需要引入多个js文件，就会出现以上这些问题。而这些问题可以通过模块化规范来解决，下面介绍开发中最流行的commonjs, AMD, ES6, CMD规范。
      - 时间线：CommonJS->AMD->CMD->ES6 Module

#### 二、CommonJS ####

- CommonJS 主要运行于服务器端，该规范指出，一个单独的文件就是一个模块。 Node.js为主要实践者，它有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。require 命令用于输入其他模块提供的功能，module.exports命令用于规范模块的对外接口，输出的是一个值的拷贝，输出之后就不能改变了，会缓存起来。

		// 模块 a.js
		const name = 'qiufeng'
		
		module.exports = {
		    name,
		    github: 'https://github.com/hua1995116'
		}

		// 模块 b.js
		// 引用核心模块或者第三方包模块，不需要写完整路径
		const path = require('path');
		// 引用自定义模块可以省略.js
		const { name, github } = require('./a');
		
		console.log(name, github, path.basename(github));
		// 输出 qiufeng https://github.com/hua1995116 hua1995116
		
- CommonJS 采用同步加载模块，而加载的文件资源大多数在本地服务器，所以执行速度或时间没问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。

#### 三、AMD ####

- AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。其中 RequireJS 是最佳实践者。
- 模块功能主要的几个命令：define、require、return和define.amd。define是全局函数，用来定义模块,define(id?, dependencies?, factory)。require命令用于输入其他模块提供的功能，return命令用于规范模块的对外接口，define.amd属性是一个对象，此属性的存在来表明函数遵循AMD规范。

		// model1.js
		define(function () {
		    console.log('model1 entry');
		    return {
		        getHello: function () {
		            return 'model1';
		        }
		    };
		});
		
		// model2.js
		define(function () {
		    console.log('model2 entry');
		    return {
		        getHello: function () {
		            return 'model2';
		        }
		    };
		});

		
		// main.js
		define(function (require) {
		    var model1 = require('./model1');
		    console.log(model1.getHello());
		    var model2 = require('./model2');
		    console.log(model2.getHello());
		});
		
		<script src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
		<script>
		    requirejs(['main']);
		</script>
		
		// 输出结果  
		// model1 entry
		// model2 entry
		// model1
		// model2

- 在这里，我们使用define来定义模块，return来输出接口， require来加载模块，这是AMD官方推荐用法。

#### 四、CMD ####

- CMD(Common Module Definition - 通用模块定义)规范主要是Sea.js推广中形成的，一个文件就是一个模块，可以像Node.js一般书写模块代码。主要在浏览器中运行，当然也可以在Node.js中运行。它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行（即不管你用没用到，只要你设置了依赖，就会去全量加载），CMD推崇依赖就近、延迟执行。

		// model1.js
		define(function (require, exports, module) {
		    console.log('model1 entry');
		    exports.getHello = function () {
		        return 'model1';
		    }
		});
		
		// model2.js
		define(function (require, exports, module) {
		    console.log('model2 entry');
		    exports.getHello = function () {
		        return 'model2';
		    }
		});
		
		// main.js
		define(function(require, exports, module) {
		    var model1 = require('./model1'); //在需要时申明
		    console.log(model1.getHello());
		    var model2 = require('./model2'); //在需要时申明
		    console.log(model2.getHello());
		});
		
		<script src="https://cdn.bootcss.com/seajs/3.0.3/sea.js"></script>
		<script>
		    seajs.use('./main.js')
		</script>
		
		// 输出 
		// model1 entry
		// model1
		// model2 entry
		// model2

- 由上面的例子可以看出AMD和CMD的区别：
   - AMD加载module完成后就会执行该module，所有module都加载执行完成后会进入require的回调函数，执行主逻辑。依赖的执行顺序和书写的顺序不一定一致，谁先下载完谁先执行，但是主逻辑 一定在所有的依赖加载完成后才执行(有点类似Promise.all)。
   - CMD加载完某个依赖后并不执行，只是下载而已。在所有的module加载完成后进入主逻辑，遇到require语句的时候才会执行对应的module。module的执行顺序和书写的顺序是完全一致的。
#### 五、UMD ####

- 是一种思想，兼容commonjs、AMD、CMD。
- 先判断是否支持Nodejs模块(exports是否存在)，如果存在就使用Nodehs模块。不支持的话，再判断是否支持AMD/CMD(判断define是否存在)。都不行就挂载在window全局对象上。

		(function(t, e) {
		  if (typeof module === 'object' && module.exports) { // Nodejs环境
		    module.exports = e(require('react')) 
		  } else if (typeof define === 'function' && define.amd) { // 浏览器环境
		    define('react', e)
		  } else { // 其他运行环境，比如小程序
		    t.xx = e(t.React)  
		  }
		)(window, function () {})


#### 六、ES6 Module ####

- ES6 在语言标准层面上，实现了模块功能，而且实现的非常简单，宗旨是在浏览器和服务器通用的模块解决方案。其模块功能由两个命令组成：export 和 import。
- ES6模块的特征：

  - import 是只读属性，不能赋值。相当于const
  - export/import 提升，import/export必须位于模块的顶级，不可以位于作用域内，其次对于模块内的import/export都会提升到模块的顶部。
  - import 优先执行:

	    // a.js
		console.log('a.js')
		import { age } from './b.js';
		
		// b.js
		export let age = 1;
		console.log('b.js 先执行');
		
		// 运行 index.html 执行结果:
		// b.js 先执行
		// a.js

    - 虽然 import 顺序比较靠后，但是 由于 import 提升效果会优先执行。

- ES6 Module 加载时机

  - import 是静态命令的方式，js引擎对脚本静态分析时，遇到模块加载命令import，会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被记载的那么模块中去取值。模块内部引用的变化会反应在外部。
  - 在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为编译时加载。在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。

#### 七、CommonJS与AMD ####

- 相同点：

  - CommonJS 和 AMD 都是运行时加载，换言之：都是在运行时确定模块之间的依赖关系。

- 二者不同点：

  - CommonJS 是服务器端模块规范，AMD 是浏览器端模块规范。
  - CommonJS 加载模块是同步的，即执行var hello = require('./hello.js');时，在 hello.js 文件加载完成后，才执行后面的代码。AMD 加载模块是异步的，所有依赖加载完成后以回调函数的形式执行代码。

#### 八、ESM 与 CommonJS ####

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

   - CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
   - ESM 的运行机制与 CommonJS 不一样。JS 引擎在对脚本静态分析的时候，遇到模块加载命令import，会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ESM 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ESM 是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。


- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

  - 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
  - 编译时加载: ESM 不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载即所谓的“编译时加载”。

- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

- 其中，第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ESM 不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

#### 回答 ####

- CommonJS 主要运行于服务器端,使用require来导入模块，使用module.exports来导出模块。CommonJS 采用同步加载模块，输出的值一个值拷贝。CommonJS 模块是运行时加载也就是输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法。
- AMD主要运行于浏览器，使用define定义模块，使用require命令导入模块，return输出模块，define.amd属性是一个对象，此属性的存在来表明函数遵循AMD规范。AMD采用异步加载模块，并且也是运行时加载
- CMD一个文件就是一个模块，可以像Node.js一般书写模块代码。主要在浏览器中运行，当然也可以在Node.js中运行。它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行（即不管你用没用到，只要你设置了依赖，就会去全量加载），CMD推崇依赖就近、延迟执行。
- AMD加载module完成后就会执行该module，所有module都加载执行完成后会进入require的回调函数，执行主逻辑。依赖的执行顺序和书写的顺序不一定一致，谁先下载完谁先执行，但是主逻辑 一定在所有的依赖加载完成后才执行(有点类似Promise.all)。
- CMD加载完某个依赖后并不执行，只是下载而已。在所有的module加载完成后进入主逻辑，遇到require语句的时候才会执行对应的module。module的执行顺序和书写的顺序是完全一致的。
- es6Module宗旨是成为浏览器和服务器通用的模块解决方案,使用import导入模块，使用export导出模块。可以和Commonjs模块混合使用。ES modules 输出的是值的引用，原始值变了，import加载的值也会跟着变。因此，ESM 是动态引用，并且不会缓存值。ES modules 模块编译时执行。



