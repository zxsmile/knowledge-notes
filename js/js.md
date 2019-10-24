一、js事件流

1.事件：指可以被JavaScript侦听到的行为。
2.事件流：从页面接收事件的顺序也可以理解为事件在页面中传播的顺序。
  (1)捕获：最不具体的节点先接收事件，由上至下依次传播直至目标节点。(window->document->html->body->div)
  (2)冒泡：目标节点先接收事件，由下至上依次传播直至window。(div->body->html->document->window)
  (3)DOM2级事件规定的事件流包括三个阶段：
     事件捕获阶段,目标事件阶段，事件冒泡阶段
3.事件处理程序(事件侦听器)：响应某个事件的函数。
  (1)html事件处理程序

  <button onclick="alert('hello')"></button>

  <button onclick="fun()"></button>
   <script>
       function fun(){
           alert('hello')
       }
   </script>

  (2)DOM0级事件处理程序

   <button id='btn'>点击</button>
   <script>
       var btn=document.getElementById('btn')
       btn.onclick=function(){
           alert('hello')
       }
   </script>

   btn.onclick = null;来删除指定的事件处理程序。
   
   使用DOM0级方法指定的事件处理程序被认为是元素的方法，因此，这时候的事件处理程序是在元素作用域中运行。换句话说，程序中的this引用当前元素。
   不支持捕获事件。
   缺点：DOM0级事件处理程序同一个事件不能添加多个，也不能控制事件流是捕获还是冒泡。

  (3)DOM2级事件处理程序

  addEventListener()：添加事件侦听器，接收三个参数:要处理的事件名(不带on前缀才是事件名)，作为事件处理程序的方法，一个布尔值，false表示在冒泡阶段调用事件处理程序，true表示在捕获阶段调用事件处理程序。
  removeEventListener()：删除事件侦听器，接收三个参数，和需要移除的事件侦听器的addEventListener参数保持一致。

  <button id='btn'>点击</button>
   <script>
       var btn=document.getElementById('btn')
	   btn.addEventListener('click',hello，false);
	   btn.addEventListener('click',helloagain，false);
	   function hello(){
	    alert("hello");
	   }
	   function helloagain(){
	    alert("hello again");
      }
   </script>
  
  同时支持冒泡事件和捕获事件，先捕获再冒泡，可以指定在那个阶段响应
  利用addEventListener方法添加事件侦听器，同一个事件可以添加多个事件侦听器，但是事件侦听器的方法名称不能一样，会发生覆盖。
  如果同一个监听事件分别为"事件捕获"和"事件冒泡"注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。
  事件触发的顺序是按照添加它们的顺序。
  
  (4)IE事件处理程序

  attachEvent():添加事件侦听器
  detachEvent():删除事件侦听器
  它们都接收两个参数：
      事件处理程序名称。如onclick、onmouseover，注意：这里不是事件，而是事件处理程序的名称，所以有on。
      事件处理程序函数。
  之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持冒泡事件流。

 <button id='btn'>点击</button>
   <script>
       var btn=document.getElementById('btn')
	   btn.attachEvent('click',hello，false);
	   btn.attachEvent('click',helloagain，false);
	   function hello(){
	    alert("hello");
	   }
	   function helloagain(){
	    alert("hello again");
      }
   </script>

  attachEvent方法有个缺点，this的值会变成window对象的引用，而不是触发元素的引用。
  事件触发的顺序是按照添加它们的相反顺序。

二、js继承

1.继承的核心

(1)说明

* __proto__

    * 对象特有
    * 指向上层(创建自己的那个构造函数)的原型对象(prototype)
    * 对象从prototype继承属性和方法
	
* prototype

    * 函数特有
    * 用于存储共享的属性和方法

* constructor

    * 函数特有，定义在prototype里面
    * 通过new创建实例的时候，该实例便继承了prototype里的属性和方法
    
(2)对象是由构造函数创建的

* Object既是对象，也是构造函数

   * 作为函数：Object.prototype是原型链的顶端，Object.prototype.__proto__=null
   * 作为对象：Object.__proto__=Function.prototype
   
* Function既是对象，也是构造函数

  * 作为函数：Function.prototype用于共享，而Function.prototype.__proto__继承自Object.prototype
  * 作为对象：Function.__proto__=Function.prototype(Function是被自己创建的)
    
* Array(Date...)既是对象，也是构造函数

  * 作为函数：Array.prototype用于共享，而Array.prototype.__proto__继承自Object.prototype
  * 作为对象：Array.__proto__=Function.prototype

* 普通对象Person

  * 作为函数：Person.prototype用于共享，而Person.prototype.__proto__继承自Object.prototype
  * 作为对象：Person.__proto__=Function.prototype

(3)结论

* 原型链的顶端是Object.prototype
* 所有对象(包括Object,Function,Array,普通对象等)，它们的__proto__均指向Function.prototype。构造函数创建的对象都是Function的实例
* 除了Object，所有对象(应该叫构造函数)的prototype，均继承自Object.prototype

2.继承方式

(1)原型链

* 原理：将父类的实例作为子类的原型

	function Person(){
	   this.name = 'milk'
	}
	
	Person.prototype.sayName=function(){
	  console.log(this.name)
	}
	
	function Child(){
	   this.age = 18
	}
	 
	Child.prototype=new Person()
	
	Child.prototype.sayAge=function(){
	  console.log(this.age)
	}
	
	var child = new Child()

* 实现的本质是重写原型对象
* 给Child添加方法不能使用字面量形式，这样会覆盖原型链

	Child.prototype = {
	 sayAge: function() {
	   console.log(this.age)
	 }
	}


* 特点：

    * 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）

* 缺点：

    * 新实例无法向父类构造函数传参
    * 继承单一
    * 所有新实例都会共享父类实例的属性（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

(2)构造函数

* 原理：改变函数的this指向(用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））)

	   function Person(name){
	    this.name = name
	    this.sayName=function(){
	        console.log(this.name)
	      }
	  }
	 
	 
	 function Child(name){
	    Person.call(this,name)
	    this.age = 18
	 }
	  
	 var child = new Child('milk')

* 特点：

    * 只继承了父类构造函数的属性，没有继承父类原型的属性。
    * 解决了原型链继承缺点1、2、3
    * 可以继承多个构造函数属性（call多个）
    * 在子实例中可向父实例传参。

* 缺点：

    * 只能继承父类构造函数的属性
    * 无法实现构造函数的复用（每次用每次都要重新调用）
    * 每个新实例都有父类构造函数的副本，臃肿。
     
(3)组合继承(原型链+构造函数)

* 原理：原型链可以继承原型对象的属性和方法，构造函数可以继承实例的属性且可以给父类传参

	function Person(name){
	    this.name = name
        this.colors = ["red", "blue", "green"]
	 }
	 
	 Person.prototype.sayName=function(){
	   console.log(this.name)
	 }
	 
	 function Child(name){
	    Person.call(this,name)  //第二次调用父类构造函数
	    this.age = 18
	 }
	  
	 Child.prototype = new Person() //第一次调用父类构造函数
	
	 Child.prototype.sayAge=function(){
	   console.log(this.age)
	 }
	 
	 var child = new Child('milk')

* 特点：

    * 可以继承父类原型上的属性，可以传参，可复用
    * 每个新实例引入的构造函数属性是私有的

* 缺点：

    * 调用了两次父类构造函数(耗内存)
    * 子类的构造函数会代替原型上的那个父类构造函数
         * 在第一次调用Person构造函数时，Child.prototype会得到两个属性： name和colors； 他们都是Person的实例属性，只不过现在位于Child的原型中。当调用Child构造函数时，又会调用一次Person构造函数，这一次又在新对象上创建了实例属性name和colors。于是这两个属性就屏蔽了原型中的两个同名属性

(4)原型式继承

	function object(o){
	    function F(){}
	    F.prototype = o
	    return new F()
	}

	person={
	    age:18
	}
	
	var per=object(person)
	
	console.log(per.age) //18

* 在object函数内部，先创建一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例
* 本质上来说，object是对传入的person对象实行了一次浅复制
* 这种模式下，必须有一个对象作为另一个对象的基础

    * 在这个例子下，person作为另一个对象的基础，把person传入object中，该函数就会返回一个新的对象
    * 这个新对象将person作为原型，所以它的原型中就包含一个基本类型和一个引用类型
    * 所以意味着如果还有另外一个对象关联了person，anotherPerson修改数组friends的时候，也会体现在这个对象中

* 特点：

    * 类似于复制一个对象，用函数来包装。

* 缺点：

     * 所有实例都会继承原型上的属性。
     * 无法实现复用（新实例属性都是后面添加的）

(5)寄生式继承

* 与寄生构造函数和工厂模式类似，创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象

	function createAnother(original){
	    var clone = Object.create(original);    //通过调用函数创建一个新对象
	    clone.sayHi = function(){               //以某种方式来增强这个对象
	       console.log("Hi");
	    };
	    
	    return clone;                        //返回这个对象
	}
	
	var person = {
	    name: "Bob",
	    friends: ["Shelby", "Court", "Van"]
	};
	var anotherPerson = createAnother(person);
	anotherPerson.sayHi();

* 优点：

     * 没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象

* 缺点：
    
    * 没用到原型，无法复用
    
(6)寄生组合式继承

* 为了解决组合继承的第二条缺点
* 原理:本质上就是使用寄生式继承来继承父类的原型，在将结果指定给子类型的原型
* 实现思路：不必为了指定子类型的原型而调用父类的构造函数，我们需要的无非就是父类原型的一个副本

	function inheritPrototype(subType, superType) { 
	 var prototype = Object.create(superType.prototype) 
	 prototype.constructor = subType 
	 subType.prototype = prototype 
	}

   * 该函数实现了寄生组合继承的最简单形式
   * 这个函数接受两个参数，一个子类，一个父类
   * 第一步创建父类原型的副本，第二步将创建的副本添加constructor属性，第三步将子类的原型指向这个副本

* 完整例子

	   function SuperType(name) { 
		    this.name = name 
		    this.colors = ['red', 'blue', 'green'] 
	   } 

	   SuperType.prototype.sayName = function () { 
	        console.log(this.name) 
	   } 

	   function SubType(name, job) { 
		    // 继承属性 
		    SuperType.call(this, name) 
		    this.job = job 
	   } 
	
	   function inheritPrototype(subType, superType) { 
		    var prototype = Object.create(superType.prototype) 
		    prototype.constructor = subType 
		    subType.prototype = prototype 
	   }

	   // 继承 
	   inheritPrototype(SubType, SuperType) 
	   var instance = new SubType('Jiang', 'student') 
	   console.log(instance.colors)



三、localstorage sessionstorage session cookie区别 

1.cookie

(1)原理

由于http是无状态的协议，一旦客户端和服务器的数据交换完毕，就会断开连接，再次请求，会重新连接，这就说明服务器单从网络连接上是没有办法知道用户身份的。怎么办呢？那就给每次新的用户请求时，给它颁发一个身份证（独一无二）吧，下次访问，必须带上身份证，这样服务器就会知道是谁来访问了，针对不同用户，做出不同的响应

(2)工作流程

* 首先，我们假设当前域名下还是没有 Cookie 的
* 接下来，浏览器发送了一个请求给服务器（这个请求是还没带上 Cookie 的）
* 服务器设置 Cookie 并发送给浏览器（当然也可以不设置）
* 浏览器将 Cookie 保存下来
* 接下来，以后的每一次对该域的请求，都会带上这些 Cookie，发送给服务器

ps:
Cookie 虽然是存储在浏览器，但是通常由服务器端进行设置，当然客户端也可以设置

(3)属性介绍

其实cookie是一个很小的文本文件，是浏览器储存在用户的机器上的。Cookie是纯文本，没有可执行代码。储存一些服务器需要的信息，每次请求站点，会发送相应的cookie，这些cookie可以用来辨别用户身份信息等作用

* NAME=VALUE：键值对，可以设置要保存的 Key/Value，注意这里的 NAME 不能和其他属性项的名字一样
* Expires：过期时间，在设置的某个时间点后该 Cookie 就会失效
* Domain：生成该 Cookie 的域名，如 domain="www.baidu.com"
* Path：该 Cookie 是在当前的哪个路径下生成的，如 path=/wp-admin/
* Secure：如果设置了这个属性，那么只会在 SSH 连接时才会回传该 Cookie

Expires

* 该属性用来设置Cookie的有效期，必须是 GMT 格式的时间
* 如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效
* 当maxAge属性为负数，则表示该Cookie只是一个临时Cookie，不会被持久化，仅在本浏览器窗口或者本窗口打开的子窗口中有效，关闭浏览器后该Cookie立即失效
* 当maxAge为0时，表示立即删除Cookie

Domain

* 该属性用来的设置cookie的域，如果没有设置path，默认为该页面的域
* domain参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则cookie不起作用
    * 如：网站的域名为，i.xiaohan.com,那么前端cookie的domain只能设置，i.xiaohan.com和其父域名xiaohan.com，如果设置成同级域名如api.xiaohan.com或者子域名api.i.xiaohan.com 那么cookie设置将无效
    * 同样在服务端上，如果制定你的server服务的域名为server.xiaohan.com那么在服务端生成的cookie的domain只能指定为server.xiaohan.com或者xiaohan.com 其他domain都无法成功设置cookie
* cookie的作用域是domain本身以及domain下的所有子域名。例如设置xiaohan.com为domain的cookie时，只有该域名或者其子域名才能获取到这个cookie

Path

* path表示cookie所在页面，如果没有设置path值，则默认为该页面的path
* 要想同域名下的所有页面都可以访问到cookie值，则可以将path设置为'/'
* 比如path值设为'/E:/Demo/'，则在'/E:/Demo/'下的所有页面都可以访问到该cookie
* 比如path值设为'/E:/Demo/dir'，则在'/E:/Demo/dir'下的所有页面都可以访问到该cookie,而'/E:/Demo/'下的页面不能访问

secure

* secure 选项用来设置 Cookie 只在确保安全的请求中才会发送
* 当请求是 HTTPS 或者其他安全协议时，包含 secure 选项的 Cookie 才能被保存到浏览器或者发送至服务器。
* 默认情况下，Cookie 不会带 secure 选项(即为空)。所以默认情况下，不管是 HTTPS 协议还是 HTTP 协议的请求，Cookie 都会被发送至服务端

httpOnly

* 这个选项用来设置 Cookie 是否能通过 js 去访问
* 默认情况下，Cookie 不会带 httpOnly 选项(即为空)，客户端是可以通过 js 代码去访问（包括读取、修改、删除等）这个 Cookie 的。当 Cookie 带 httpOnly 选项时，客户端则无法通过 js 代码去访问（包括读取、修改、删除等）这个 Cookie

(4)cookie的设置

* cookie既可以在客户端设置又可以在服务端设置

* 客户端设置
   
   * 设值
     
     如：document.cookie = 'name=value'

   * 自定义存、取、删除cookie函数
   
     如：function setCookie(name,value,iDay){
		    var oDate=new Date();
		    oDate.setDate(oDate.getDate()+iDay);
		    document.cookie=name+'='+value+';expires='+oDate+';path=/E:/Demo'+';domain=www.baidu.com';
		}
		
		function getCookie(name){
		   var arr=document.cookie.split('; ');
		   for(var i=0;i<arr.length;i++){
		       var arr1=arr[i].split('=');
		       if(arr1[0]==name){
		           return arr1[1];
		       }
		   }
		    return '';
		}
		
		function removeCookie(name){
		   setCookie(name,'1',-1);
		}


