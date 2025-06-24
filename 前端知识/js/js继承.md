## 一、继承的核心 ##

#### 1.说明 

* `__proto__`
* 对象特有
  * 指向上层(创建自己的那个构造函数)的原型对象(`prototype`)
  * 对象从`prototype`继承属性和方法
* `prototype`
* 函数特有
  * 用于存储共享的属性和方法
* `constructor`
  - 函数特有，定义在`prototype`里面
  - 通过`new`创建实例的时候，该实例便继承了`prototype`里的属性和方法

#### 2.对象是由构造函数创建的

* `Object`既是对象，也是构造函数
* 作为函数：`Object.prototype`是原型链的顶端，`Object.prototype.__proto__ = null`
  * 作为对象：`Object.__proto__ = Function.prototype`
  
* `Function`既是对象，也是构造函数
* 作为函数：`Function.prototype`用于共享，而`Function.prototype.__proto__`继承自`Object.prototype`
  * 作为对象：`Function.__proto__ = Function.prototype`(`Function`是被自己创建的)
  
* `Array`(`Date`...)既是对象，也是构造函数
* 作为函数：`Array.prototype`用于共享，而`Array.prototype.__proto__`继承自`Object.prototype`
  * 作为对象：`Array.__proto__ = Function.prototype`

  * 普通对象`Person`

    * 作为函数：**`Person.prototype`**用于共享，而`Person.prototype.__proto__`继承自**`Object.prototype`**
    * 作为对象：`Person.__proto__ = Function.prototype`

3. 结论

   * 原型链的顶端是`Object.prototype`
   * 所有对象(包括`Object`,`Function`,`Array`,普通对象等)，它们的`__proto__`均指向`Function.prototype`。构造函数创建的对象都是`Function`的实例
   * 除了`Object`，所有对象(应该叫构造函数)的`prototype`，均继承自`Object.prototype`

## 二、继承方式 ##

#### 1.原型链继承

* **原理：将父类的实例作为子类的原型**

  ```
  function Person(){
     this.name = 'milk'
     this.colors = ['hddhhd']
  }
  
  Person.prototype.sayName=function(){
    console.log(this.name)
  }
  
  function Child(){
     this.age = 18
  }
  
  Child.prototype = new Person()
  
  Child.prototype.sayAge=function(){
    console.log(this.age)
  }
  
  var child = new Child()
     child.name = '666'
   **这里其实是给实例child添加属性name，所以不影响其他实例**
  
     child.colors.push('666')
  **这里是修改原型是的属性，会影响其他实例**
  
     child.arr = ['lll']
   **这里也是给实例child添加属性name，所以不影响其他实例**
  
     console.log(child.name) //666 
  
     onsole.log(child.colors)//['hddhhd','666']
     console.log(child.arr)//['111']
  
     var child1 = new Child()
     Child.prototype.constructor = Child;//修正constructor
     console.log(child1.name) //milk
     console.log(child1.colors)//['hddhhd','666']
     console.log(child1.arr)//undefined
  ```

* 实现的本质是重写原型对象

* 给Child添加方法不能使用字面量形式，这样会覆盖原型链

	```
	Child.prototype = {
	 sayAge: function() {
	   console.log(this.age)
	 }
	}
	```


  * **特点：**


    * 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）

* **缺点：**
  
  
  * 新实例无法向父类构造函数传参
      * 所有新实例都会共享父类实例的属性（原型上的属性是共享的，**对于引用类型，一个实例修改了原型属性，另一个实例的原型属性也会被修改！**）
      * 构造函数被篡改：在上面的例子中，`Child.prototype.constructor`现在指向的是`Person`，而不是`Child`。
  
    - **因此这个方法适用于确定自己不会去修改原型上的属性，并且不需要传参**

#### 2.构造函数继承

-  **原理：改变函数的`this`指向（用`.call()`和`.apply()`将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））)**

 - 通过**在子类型的构造函数中调用父类型的构造函数，可以实现父类型的属性继承。**

 - **每个实例都有独立的属性，但无法继承父类原型上的方法。**


```
	  function Person(name){
	    this.name = name
         this.arr = [1]
	    this.sayName=function(){
	        console.log(this.name)
	      }
	  }
```


​		 
```
	 function Child(name){
	    Person.call(this,name)
	    this.age = 18
	 }
	  
	 var child = new Child('milk')
      child.arr.push(2)
      child.colors = ['jjj']
      console.log(child.arr,child.colors ) 

      var child1 = new Child('offer')
      console.log(child1.arr,child1.colors )
```

 - 这里主要是在**子构造函数`Child`中通过`Parent.call(this, name)`调用了父构造函数`Parent`，这样使得`Child`的实例能够拥有自己的`name`属性和独立的`colors`数组，而不是简单地从`Parent`的原型链上继承这些属性，从而确保了每个`Child`实例的数据独立性，避免了实例间的属性污染。**

  - **特点：**

    - 只继承了父类构造函数的属性，没有继承父类原型的属性。
    - **每个实例的数据都是独立的（多个实例对象，this是各自指向各自，已经没有公用的原型了）**
    - 可以继承多个构造函数属性（call多个）
    - 在子实例中可向父实例传参。

- **缺点：**

    - 只能继承父类构造函数的属性，无法继承父类原型上的属性

    * 无法实现构造函数的复用（每次用每次都要重新调用）
    * 子类实例对象身上会出现父类实例对象的属性方法的副本，这显然是没有必要的。
#### 3.组合继承(原型链+构造函数)

* **原理：原型链可以继承原型对象的属性和方法，构造函数可以继承实例的属性且可以给父类传参**
	
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
		Child.prototype.constructor = Child;//修正constructor
		Child.prototype.sayAge=function(){
			console.log(this.age)
		}
		var child = new Child('milk')
	
* **特点：**

   - **可以继承父类原型上的属性，可以传参，可复用**
   - **每个新实例引入的构造函数属性是私有的**

* **缺点：**

   - **调用了两次父类构造函数,一次是在子类构造函数中，另一次是在设置子类原型时。这会产生多余的性能开销**
   - **子类实例对象上会存在父类实例对象的属性或方法的副本，其原型对象是父类实例对象，若将子类实例副本属性删除后，再次调用该属性依然存在，这就会造成问题**
     - 在第一次调用`Person`构造函数时，`Child.prototype`会得到两个属性： `name`和`colors`； 他们都是`Person`的实例属性，只不过现在位于`Child`的原型中。当调用`Child`构造函数时，又会调用一次`Person`构造函数，这一次又在新对象上创建了实例属性`name`和`colors`。于是这两个属性就屏蔽了原型中的两个同名属性

#### 4.原型式继承

- **原理：不采用构造函数的形式，借助原型可以基于现有方法来创建对象，`var B = Object.create(A)` 以`A`对象为原型，生成`A`对象，`B`继承了`A`的所有属性和方法。**

```
function object(o,name){
 let F = Object.create(o)
 F.name = name
 return F
}
person={
    age:18，
    friends:['Shelby','Court','Van']
}

var per=object(person,'MILK')

console.log(per.age) //18
```
  * 本质上来说，`object`是对传入的`person`对象实行了一次浅复制
  * 这种模式下，必须有一个对象作为另一个对象的基础

    * 在这个例子下，`person`作为另一个对象的基础，把`person`传入`object`中，该函数就会返回一个新的对象
    * 这个新对象将`person`作为原型，所以它的原型中就包含一个基本类型和一个引用类型
    * 所以意味着如果还有另外一个对象关联了`person`，`anotherPerson`修改数组`friends`的时候，也会体现在这个对象中
  * **特点：**
    * **类似于复制一个对象，用函数来包装。**
    * **没有严格意义上的构造函数，借助原型可以基于已有对象创建新对象**
* **缺点：**
  * **所有实例都会继承原型上的属性。修改引用类型的值会影响到别的实例**

（1）**`Object.create()`**

- `ECMAScript5`通过新增`Object.create(`)方法规范了原型式继承。**也就是说使用该方法就是在使用原型式继承**

  ```
  object.create(proto, propertiesObject)
  ```

- `object.create()` 是使用指定的原型`proto`对象及其属性`propertiesObject`去创建一个新的对象。**这个方法接收两个参数，一个是用作新对象原型的对象，另一个是新对象定义额外属性的（可选）对象。**

- **实现`Object.create`**

        Object.prototype.MyCreate = function(proto,properties){
            //if(! (proto instanceof Object) && typeof proto !== 'object'){
              // throw 'error'
             // 类型校验
               throw new TypeError("proto必须为对象或者函数");
            //}
            
          if (typeof proto !== "object" && typeof proto !== "function") {
           // 类型校验
           throw new TypeError("proto必须为对象或者函数");
          }
          if ( defineProperties === null ) {
              throw new TypeError('Cannot convert undefined or null to object')
            }
        
            function F(){}
            F.prototype = proto  //也可以使用 Object.setPrototypeOf(result, proto);// 将该对象的原型设置为proto
           
            let obj = new F()
            if(properties){
               Object.defineProperties(obj,properties)
            }
            if(proto === null){
               obj.__proto__ = null
            }
            return obj
        }

- **在没有必要兴师动众地创建构造函数，而只想让一个对象与另一个对象保持类似的情况下，原型式继承是完全可以胜任的。**

#### 5.寄生式继承

- **原理： 创建新对象，浅拷贝一份目标对象（这一步也就是原型式继承方式）,在对新对象进行增强，添加一些处理方法**

- **在原型式继承中，一个新对象是基于另一个对象创建的，但所有实例共享原型对象上的属性，尤其是引用类型属性，这可能导致数据污染。**

- **寄生式继承则通过创建一个仅用来继承的函数，然后在返回新对象之前，对这个新对象进行增强，以此确保每个实例都有其独立的属性副本,可以让子对象默认具有自己的属性。**

- **有点像把传入的对象浅拷贝了一份，所谓增强就是添加属性，返回对象**

* 与寄生构造函数和工厂模式类似，创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象

    ```
    function createAnother(original){
        var clone = Object.create(original);    //通过调用函数创建一个新对象
          //或者
        var clone = Object.create(person);  
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
    ```

    

* **优点：**

  * **没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象**

* **缺点：**

    * **创建的实例共用同一个对象，修改引用类型的值会影响到别的实例**
    * **每次创建对象都会创建一遍实例属性，跟借助构造函数模式一样。**

#### 6.寄生组合式继承

- **寄生组合继承的目标是避免父类构造函数的多次调用，并确保每个子类实例都能够正确地继承父类的属性和方法，而不会共享引用类型属性**

- 为了解决组合继承的第二条缺点（调用两次父类）

- 原理:本质上就是使用寄生式继承来继承父类的原型，在将结果指定给子类型的原型

- **实现步骤：**

     - 创建一个不作任何事情的临时构造函数：这个构造函数用于继承父类的属性，但不会执行父类构造函数中的任何代码。

     - 使用`Object.create(`)方法：使用临时构造函数的原型来创建子类的原型，这样子类就能继承父类原型上的方法。

     - 修正构造函数指针：确保子类的`prototype.constructor`指向子类本身，而不是临时构造函数。

     - 在子类构造函数中调用父类构造函数：使用`call`或`apply`方法调用父类构造函数，以便每个子类实例都能获得父类的属性。

- 实现思路：不必为了指定子类型的原型而调用父类的构造函数，我们需要的无非就是父类原型的一个副本

	```
	function inheritPrototype(subType, superType) { 
		var prototype = Object.create(superType.prototype) 
		prototype.constructor = subType 
  	subType.prototype = prototype 
  }
  ```
  
  
  
  * 该函数实现了寄生组合继承的最简单形式
  * 这个函数接受两个参数，一个子类，一个父类
  * 第一步创建父类原型的副本，第二步给创建的副本添加constructor属性，第三步将子类的原型指向这个副本

* 所以寄生组合继承并不是使用原型链的原理达成继承效果的，而是借用构造函数 + 拷贝对象的方式实现继承。

* 完整例子

	   ```
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
	
	   //function inheritPrototype(subType, superType) { 
		//    var prototype = Object.create(superType.prototype) 
		//    prototype.constructor = subType 
		//    subType.prototype = prototype 
  // }
	
	   // 继承 
   //inheritPrototype(SubType, SuperType) 
     
        SubType.prototype = Object.create(superType.prototype)
	   SubType.prototype.constructor = subType
	   var instance = new SubType('Jiang', 'student') 
	   console.log(instance.colors)
	```
	
	

#### 7.`ES6`类继承 `extends`

- 在`ES6`中，类继承通过`extends`关键字实现，子类可以继承父类的属性和方法，并且可以使用`super`关键字来调用父类的构造函数和方法。

				class Parent {
		  constructor(name) {
		    this.name = name;
		  }
		  getName() {
		    return this.name;
		  }
		}
		
		class Child extends Parent {
		  constructor(name) {//继承父类属性
		    super(name);//super里不传参数的话就是把父类里的属性都继承过来
		    this.age = 20;
		  }
		  getAge() {//子类扩展的方法
		    return this.age
		  }
		}
		
		let c = new Child('JiSung');//创建Child实例并
		console.log(c.getName())//调用getName方法
		console.log(c.getAge())
	
- 子类继承了父类的属性和方法，同时还可以添加自己的属性和方法（`getAge()`）。

- 通过调用`super(name)`，子类的构造函数确保了父类的构造函数被正确调用，从而正确初始化了继承的属性。

- 子类类可以自由地添加或覆盖属性和方法，以扩展或修改从父类继承的行为。

	​	
