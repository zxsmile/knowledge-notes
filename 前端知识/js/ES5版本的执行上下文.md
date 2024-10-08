![](./images/img7.awebp)

####一、不同ECMAScript版本的执行上下文创建过程####

1.执行上下文在**ES3**中，包含三个部分:

  - 作用域(scope)：也常常被叫做作用域链。 
  
  - 变量对象(variable object)：用于存储变量的对象。 
  
  - this值(this value)。

2.在**ES5**中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子。

  - 词法环境(lexical environment)：当获取变量时使用。（通过let、const、with()、try-catch创建的变量存在词法环境中）
  
  - 变量环境(variable environment)：当声明变量时使用。（通过var声明或function(){}声明的变量存在变量环境中）
  
  - this值(this value)。


3.在**ES2018**中，执行上下文又变成了这个样子，this值被归入lexical environment，但是增加了不少内容。

  - 词法环境(lexical environment)：当获取变量或者this值时使用。

  - 变量环境(variable environment)：当声明变量时使用。

  - code evaluation state：用于恢复代码执行位置。

  - Function：执行的任务是函数时使用，表示正在被执行的函数。

  - ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。

  - Realm：使用的基础库和内置对象实例。

  - Generator：仅生成器上下文有这个属性，表示当前生成器。


本文主要讲解ES5版本的执行上下文。

ES5版本中，JS执行上下文的创建阶段主要负责三件事：

 - 确定this
 
 - 创建词法环境组件（LexicalEnvironment）

 - 创建变量环境组件（VariableEnvironment）


####二、词法环境（LexicalEnvironment）####

- 简单来说，词法环境是一种持有标识符—变量映射的结构。
- 这里的标识符指的是变量/函数的名字，而变量是对实际对象（包含函数类型对象）或原始数据的引用。

1.**在词法环境中有两个组成部分：**

- 环境记录(EnvironmentRecord)： 储存变量和函数声明的实际位置

- 对外部环境的引用(Outer)：当前可以访问的外部词法环境，通过其访问父级词法环境（作用域），词法作用域链也是保存在[[Scope]]属性上的。

**2.词法环境分为两种类型：**

- 全局环境： 全局执行上下文，他没有外部环境的引用，拥有一个全局对象window和关联的方法和属性（比如: Math,String,Date等）。还有用户定义的全局变量，并将this指向全局对象。

- 函数环境： 用户在函数定义的变量将储存在环境记录中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。环境记录中包含：用户声明的变量、函数、还有arguments对象。

- 举例词法环境在伪代码中如下：

		GlobalExectionContent = {//全局执行上下文
		  LexicalEnvironment: {//词法环境
		    EnvironmentRecord: {//环境记录
		      Type: "Object",
		      // 剩余标识符
		    },
		    Outer: null,//对外部环境的引用
		  }
		}
		
		FunctionExectionContent = {//函数执行上下文
		  LexicalEnvironment: {//词法环境
		    EnvironmentRecord: {//环境记录
		      Type: "Declarative",
		      // 剩余标识符
		    },
		    Outer: [Global or outer function environment reference],//对外部环境的引用
		  }
		}



#### 三、变量环境（VariableEnvironment）####

- 变量环境也是一个词法环境，他具有词法环境中所有的属性。

- 单独分出这个变量环境的概念是为 ES6 服务的：

   - ES6 中，词法环境组件和 变量环境的一个不同就是**前者被用来存储函数声明和变量（let 和 const）绑定**，而**后者只用来存储 var 变量绑定**

		 例：let a = 20;  
			const b = 30;  
			var c;
			
			function add(e, f) {  
			 var g = 20;  
			 function c(){}
			 return e + f + g;  
			}
			
			c = add(20, 30);

   - 在预编译阶段。生成的词法环境和变量环境如下：

		GlobalExectionContent = {
		  thisBinding: Global,
		  LexicalEnvironment: {//词法环境
		    EnvironmentRecord: {//环境记录
		      Type: "Object",
		      a: <uninitialied>,
		      b: <uninitialied>,
		      add: <func>
		      // 剩余标识符
		    },
		    Outer: null,//对外部环境的引用
		  },
		
		  VariableEnvironment: {//变量环境
		    EnvironmentRecord: {//环境记录
		      Type: "Object",
		      c: undefined,
		      // 剩余标识符
		    },
		    Outer: null,//对外部环境的引用
		  }
		}
		
		FunctionExectionContent = {
		  thisBinding: Global,
		  LexicalEnvironment: {//词法环境
		    EnvironmentRecord: {//环境记录
		      Type: "Declarative",
		      arguments: {
		        0: 20,
		        1: 30,
		        length: 2,
		      },
		      e: 20,
		      f: 30,
		      c: reference to function c(){}
		      // 剩余标识符
		    },
		    Outer: GlobalLexicalEnvironment,//对外部环境的引用
		  },
		  VariableEnvironment: {//变量环境
		    EnvironmentRecord: {//环境记录
		      Type: "Declarative",
		      g: undefined,
		      // 剩余标识符
		    },
		    Outer: GlobalLexicalEnvironment,//对外部环境的引用
		  }
		}

**我们发现使用let和const声明的变量在词法环境创建时是未赋值初始值。而使用var定义的变量在变量环境创建时赋值为undefined。这也就是为什么const、let声明的变量在声明钱调用会报错，而var声明的变量不会**

#### 四、变量提升 ####

1.**变量提升（Hoisting）**被认为是，Javascript 中执行上下文（特别是创建和执行阶段）工作方式的一种认识,从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中

- 由上述概念我们可以得出一个关键信息：**js代码在执行之前需要进行编译，变量和函数的声明在编译阶段会被放在内存中**

2.**变量提升的本质：**js执行一段代码需要先编译，编译的过程中会生成对应的执行上下文，变量和函数的声明会保存到其中的变量对象中，代码执行的时候会从当前执行上下文的变量对象逐层往上（词法作用域规则）寻找变量和函数，直到全局执行上下文。

3.**var的缺陷：**

 （1）受变量提升的影响，容易出现变量污染、变量覆盖、代码层面不好理解等问题
  
 （2）不支持块级作用域，很容易在不知情的情况下声明全局变量，本应销毁的变量没有被销毁

为了解决这个设计缺陷，es6引入支持块级作用域的关键字let、const

4.**暂时性死区**

通过前面对词法环境和变量环境的学习，我们发现使用let和const声明的变量在词法环境创建时是未赋值初始值。而使用var定义的变量在变量环境创建时赋值为undefined。

**这不就是暂时性死区的原因吗？**

- 用 let、const 或 class 声明的变量可以称其从代码块的开始一直到代码执行到变量声明的位置并被初始化前，都处于一个“暂时性死区”（Temporal dead zone，TDZ）中。

- 当变量处于暂时性死区之中时，其尚未被初始化，并且任何访问其的尝试都将导致抛出 ReferenceError。当代码执行到变量被声明的位置时，变量会被初始化为一个值。如果变量声明中未指定初始值，则变量将被初始化为 undefined。

 **（1）为什么存在变量提升？**

     - 变量提升的原因是因为js执行代码前需要先进行编译，它是通过变量环境实现的。

 **(2)为什么要引入let、const，它们是怎么支持块级作用域的?**

     - 引入支持块级作用域关键字let、const是为了避免var由于设计缺陷在变量提升的作用下，引发的一系列问题：不经意的情况定义全局变量，污染变量、覆盖变量等。让代码执行更加的规范以及符合我们的常识：代码块执行完了里面的变量应该被立刻销毁。外部无法访问内部代码块的变量。
     
     - **块级作用域是通过词法环境实现的，每一个块级作用域内的变量都会在当前执行上下文中的词法组件以栈的形式保存下来。每当一个块级作用域代码执行完成，便会从栈顶弹出。**

 **（3）暂时性死区触发的原因是什么，为什么会引入这么一个概念？**

      - **let、const也存在变量提升的情况**, 但是对它们做了一道限制：没有默认值 undefined。直到代码执行到声明语句之后，才可以对其使用。代码块开头到声明语句前的这段区域为暂时性死区,在暂时性死区内使用变量，会有ReferenceError错误。解决了var在声明前就可以使用，给人带来困扰、难以理解的问题

#### 五、#### 六、梳理创建执行上下文的步骤 #### ####

- 函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

- ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

		// 情况一
		if (true) {
		  function f() {}
		}
		
		// 情况二
		try {
		  function f() {}
		} catch(e) {
		  // ...
		}

- **上面两种函数声明，根据 ES5 的规定都是非法的。但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。**

- **ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。**

		function f() { console.log('I am outside!'); }
		
		(function () {
		  if (false) {
		    // 重复声明一次函数f
		    function f() { console.log('I am inside!'); }
		  }
		
		  f();
		}());

上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

		// ES5 环境
		function f() { console.log('I am outside!'); }
		
		(function () {
		  function f() { console.log('I am inside!'); }
		  if (false) {
		  }
		  f();
		}());

- **ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？**
		
		// 浏览器的 ES6 环境
		function f() { console.log('I am outside!'); }
		
		(function () {
		  if (false) {
		    // 重复声明一次函数f
		    function f() { console.log('I am inside!'); }
		  }
		
		  f();
		}());
		// Uncaught TypeError: f is not a function

- **原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。**

       - **允许在块级作用域内声明函数。**

       - **函数声明类似于var，即会提升到全局作用域或函数作用域的头部。**
 
       - **同时，函数声明还会提升到所在的块级作用域的头部。**

- **注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。**

- **根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。**上面的例子实际运行的代码如下。

		// 浏览器的 ES6 环境
		function f() { console.log('I am outside!'); }
		(function () {
		  var f = undefined;
		  if (false) {
		    function f() { console.log('I am inside!'); }
		  }
		
		  f();
		}());
		// Uncaught TypeError: f is not a function

- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

		// 块级作用域内部的函数声明语句，建议不要使用
		{
		  let a = 'secret';
		  function f() {
		    return a;
		  }
		}
		
		// 块级作用域内部，优先使用函数表达式
		{
		  let a = 'secret';
		  let f = function () {
		    return a;
		  };
		}

- **另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。**

		// 第一种写法，报错
		if (true) let x = 1;
		
		// 第二种写法，不报错
		if (true) {
		  let x = 1;
		}

- 上面代码中，第一种写法没有大括号，所以不存在块级作用域，而**let只能出现在当前作用域的顶层，所以报错**。第二种写法有大括号，所以块级作用域成立。

- 函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

		// 不报错
		'use strict';
		if (true) {
		  function f() {}
		}
		
		// 报错
		'use strict';
		if (true)
		  function f() {}

#### 六、可执行代码执行阶段 ####

代码执行时根据之前的环境记录对应赋值，比如早期var在创建阶段为undefined，如果有值就对应赋值，**像let const值为未初始化，如果有值就赋值，无值则赋予undefined**，最后执行代码。

#### 七、梳理创建执行上下文的步骤 ####

**1. 创建全局执行上下文的步骤**

- this绑定，把全局执行上下文中的this指向window对象；

- 确定词法环境，把全局执行上下文中的所有**函数声明和使用let、const声明的变量存储到词法环境的环境记录器**，把全局执行上下文的对外部环境的引用指向null；

- 确定变量环境：把全局执行上下文中的**var声明的变量存储变量环境的环境记录器**，并把这些变量的值**初始化为undefined；**

**2.创建函数执行上下文的步骤**

- this绑定，函数执行上下文中的this的指向取决于函数是如何调用，在代码运行前已经确定好了每一次调用函数的代码中的this的指向；

- 确定词法环境，把函数执行上下文中的所有**函数声明和使用let、const声明的变量存储到词法环境的环境记录器**，另外还会把包含**函数参数的arguments对象存储到词法环境的环境记录器**，把函数执行上下文的对外部环境的引用指向；

- 确定变量环境：把函数执行上下文中的**var声明的变量存储变量环境的环境记录器**，并把这些变量的值**初始化为undefined**；


**3.全局和函数执行上下文的不同**

- 函数可以被多次调用，所以同一个函数被调用多次会有多个函数执行上下文，每个函数执行上下文的this不一定相同，但是都会在代码运行前确定；

- 函数的词法环境的变量中，还包含给函数传入的参数组成的arguments对象，这也表明函数的参数可以理解为函数内部声明的内部变量，和函数内部定义的函数变量一样；

- 函数的执行上下文的词法环境还包含对外部环境的引用（包含对父级作用域1的引用），**这意味在代码还没执行的时候，函数可以访问的父级作用域就已经确定了（思考一下闭包？）**。




    
