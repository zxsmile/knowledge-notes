#### 一、继承的核心 ####

1. 说明 

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
    
2. 对象是由构造函数创建的

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

3. 结论

   * 原型链的顶端是Object.prototype
   * 所有对象(包括Object,Function,Array,普通对象等)，它们的__proto__均指向Function.prototype。构造函数创建的对象都是Function的实例
   * 除了Object，所有对象(应该叫构造函数)的prototype，均继承自Object.prototype

#### 二、继承方式 ####

1. 原型链

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

2. 构造函数

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
     
3. 组合继承(原型链+构造函数)

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

4. 原型式继承

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

5. 寄生式继承

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
    
6. 寄生组合式继承

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
     * 第一步创建父类原型的副本，第二步给创建的副本添加constructor属性，第三步将子类的原型指向这个副本

   * 所以寄生组合继承并不是使用原型链的原理达成继承效果的，而是借用构造函数 + 拷贝对象的方式实现继承。

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
