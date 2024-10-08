#### 一、toString()方法，转化为字符串形式 ####

在ECMAScript中，Object类型的每个实例都有toString()方法，返回对象的字符串表示，所以每个实例化的对象都可以调用toString()方法。

		var obj = {a: 1};
		obj.toString(); //"[object Object]"

那么，obj的toString()方法是哪里来的呢？


我们顺着原型链，obj => obj.proto => Object.prototype，可以发现，**toString()方法是定义在Object的原型对象Object.prototype上的，这样Object的每个实例化对象都可以共享Object.prototype.toString()方法**

如果不通过原型链查找，怎么直接调用Object.prototype.toString()方法呢？

	Object.prototype.toString();
	<!--"[object Object]"-->

这样写对吗？上述代码中的toString()调用和obj对象没有关系，为什么还得到了"[object Object]"这样的结果呢？这是因为**Object.prototype也是对象，所以返回了对象的字符串表示**

通过obj对象调用Object.prototype.toString()方法的正确方式如下所示：

	Object.prototype.toString.call/apply(obj);
	<!--"[object Object]"-->

**call 在此的作用，我们都知道.call(obj)的作用是将 .call 之前的函数中的 this 指向 obj，但也可以说是把 .call 之前的函数方法借给 obj 去使用**

因此在Object.prototype.toString.call()中，toString()是这样被调用的：

	Object.prototype.toString.call(obj)
	
	obj.toString()

#### 二、不同类型的“对象”调用toString()方法，返回值有什么不同之处？ ####

我们先明确一下ECMAScript的数据类型，7种

  - Undefined
  - Null
  - String
  - Number
  - Boolean
  - Object
  - Symbol（ES6引入）

其中，Object作为引用类型，它是一种数据结构，常被称为Object类（但这种称呼并不妥当，JS中没有类，一切都是语法糖而已）。

另外，基于Object类型，JS还实现了其他常用的对象子类型（就是不同类型的对象）

   - Object
   - Array
   - Function
   - String
   - Boolean
   - Number
   - Date
   - RegExp
   - Error
    ...

我们可以说，**Object类是所有子类的父类**

	Object instanceof Object; //true
	Function instanceof Object; //true
	Array instanceof Object; //true
	String instanceof Object; //true
	Boolean instanceof Object; //true
	Number instanceof Object; //true

**所以，上文提到的定义在Object.prototype上的toString()方法，可以说是最原始的toString()方法了，其他类型都或多或少重写了toString()方法，导致不同类型的对象调用toString()方法产生返回值各不相同。**


**下面，具体分析不同的对象子类型重写toString()方法后的返回结果**

**1.对象object（Object类）**

    - toString：返回对象的字符串表示。

		var obj = {a: 1};
		obj.toString();//"[object Object]"
		Object.prototype.toString.call(obj);//"[object Object]"

     - **思考：任何对象object都可以通过this绑定调用Object.prototype.toString()方法吗？答案是可以，结果如下：**

		Object.prototype.toString.call({}); 
		<!--"[object Object]"-->

		Object.prototype.toString.call([]);
		<!--"[object Array]"-->

		Object.prototype.toString.call(function(){});
		<!--"[object Function]"-->

		Object.prototype.toString.call('');
		<!--"[object String]"-->

		Object.prototype.toString.call(1);
		<!--"[object Number]"-->

		Object.prototype.toString.call(true);
		<!--"[object Boolean]"-->

		Object.prototype.toString.call(null);
		<!--"[object Null]"-->

		Object.prototype.toString.call(undefined);
		<!--"[object Undefined]"-->

		Object.prototype.toString.call();
		<!--"[object Undefined]"-->

		Object.prototype.toString.call(new Date());
		<!--"[object Date]"-->

		Object.prototype.toString.call(/at/);
		<!--"[object RegExp]"-->


**从上述代码可以看到，因为Object是所有子类的父类，所以任何类型的对象object都可以通过this绑定调用Object.prototype.toString()方法，返回该对象的字符串表示！**

**2.数组array（Array类）**

     - toString()：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串

	    var array = [1, 's', true, {a: 2}];
	    array.toString();//"1,s,true,[object Object]"
	    Array.prototype.toString.call(array);//"1,s,true,[object Object]"

    - **思考：非数组对象也可以通过this绑定调用Array.prototype.toString()方法吗？答案是可以，结果如下：** 

        Array.prototype.toString.call({});
		<!--"[object Object]"-->

		Array.prototype.toString.call(function(){})
		<!--"[object Function]"-->

		Array.prototype.toString.call(1)
		<!--"[object Number]"-->

		Array.prototype.toString.call('')
		<!--"[object String]"-->

		Array.prototype.toString.call(true)
		<!--"[object Boolean]"-->

		Array.prototype.toString.call(/s/)
		<!--"[object RegExp]"-->
		
		Array.prototype.toString.call(); 
        <!--"Uncaught TypeError: Cannot convert undefined or null to object"-->

		Array.prototype.toString.call(undefined);
        <!--"Uncaught TypeError: Cannot convert undefined or null to object"-->

		Array.prototype.toString.call(null);
        <!--"Uncaught TypeError: Cannot convert undefined or null to object"-->

  **从上述代码中我们可以发现，数组对象通过this绑定调用Array.prototype.toString()方法，返回数组值的字符串拼接，但是非数组对象通过this绑定调用Array.prototype.toString()方法，返回的是该对象的字符串表示，另外null和undefined不可以通过绑定调用Array.prototype.toString()方法。**


**3.函数function（Function类）**

    - toString()：返回函数的代码

	   function foo(){
		 console.log('function');
	   };
	   foo.toString(); //"function foo(){console.log('function')}
	
		
	   Function.prototype.toString.call(foo); //function foo(){console.log}

    - 此处，我们还需要注意到一个问题，上述我们提到的所有“类”，本质上都是构造函数，所以调用toString()方法返回的都是函数代码。

		Object.toString();
		//"function Object() { [native code] }"

		Function.toString();
		//"function Function() { [native code] }"

		Array.toString();
		//"function Array() { [native code] }"
		....

     - **思考：非数组对象也可以通过this绑定调用Function.prototype.toString()方法吗？答案是不可以，结果如下：** 

        Function.prototype.toString.call({});
        <!--Function.prototype.toString requires that 'this' be a Function-->

  **4.日期（Date类）**

      - toString()：返回带有时区信息的日期和时间
      - Date类型只有构造形式，没有字面量形式

         var date = new Date();

		 date.toString();
		 //"Fri May 11 2018 14:55:43 GMT+0800 (中国标准时间)"

		 Date.prototype.toString.call(date);
		 //"Fri May 11 2018 14:55:43 GMT+0800 (中国标准时间)"


  **5.正则表达式（RegExp类）**

       - toString()：返回正则表达式的字面量

         var re = /cat/g;
		 re.toString();// "/cat/g"
		 RegExp.prototype.toString.call(re);// "/cat/g"



    **通过对其他Object子类的测试，除了上述提到的Object和Array两种情况，其他类型都不支持非自身实例通过this绑定调用该Object子类原型对象上的toString()方法，这说明它们在重写toString()方法时，明确限定了调用该方法的对象类型，非自身对象实例不可调用。所以，一般我们只使用Object.prototype.toString.call/apply()方法。**

  **6.基本包装类型（Boolean/Number/String类）**

       - ECMAScript提供了三个特殊的引用类型Boolean、Number、String，它们具有与各自基本类型相应的特殊行为。
       
       - 以String类型为例简单说一下

		  var str = 'wangpf';
	      str.toString();//"wangpf"

       - 关于上述代码存在疑问，首先我定义了一个基本类型的字符串变量str，它不是对象，但为什么可以调用toString()方法呢，另外，toString()方法又是哪里来的呢？

       - 我们先看一下str和strObject的区别：

		  var str = 'I am a string';
		  typeof str; //"string"
		  str instanceof String; //false
		
		  var strObject = new String('I am a string');
		  typeof strObject; //"object"
		  strObject instanceof String; //true
		  strObject instanceof Object; //true

    **原来，由于String基本包装类型的存在，在必要的时候JS引擎会把字符串字面量转换成一个String对象，从而可以执行访问属性和方法的操作，具体过程如下所示：**

   （1）创建一个String类型的实例；
   （2）在实例上调用指定的方法；
   （3）销毁这个实例。

      - 因此调用toString()方法的过程如下所示：

        var strObject = new String('wangpf');
		strObject.toString(); //'wangpf'
		strObject = null;

   **注意，上述代码是JS引擎自动执行的，你无法访问strObject对象，它只存在于代码的执行瞬间，然后立即销毁，所以我们无法在运行时给基本类型添加属性和方法，除非直接通过new显示调用基本包装类型创建对象，但我们不建议！！！**

 **7.字符串string（String类）**

      - toString()：返回字符串的一个副本

		var str = "a";
		str.toString(); //"a"
		String.prototype.toString.call(str); //"a"

 **8.数值number（Number类）**

     - toString()：返回字符串形式的数值

		var num = 520;
		num.toString(); //"520"
		Number.prototype.toString.call(num); //"520"

 **9.布尔值boolean（Boolean类）**

    - toString()：返回字符串"true"或"false"

		var boo = true;
		boo.toString(); //"true"
		Boolean.prototype.toString.call(boo); //"true"

 **10.null和undefined**

   - **null和undefined没有相应的构造函数，所以它们没有也无法调用toString()方法，也就是说它们不能访问任何属性和方法，只是基本类型而已。**

 **11.全局对象window（Window类）**

   - 全局对象Global可以说是ECMAScript中最特别的一个对象了，它本身不存在，但是会作为终极的“兜底儿对象”，所有不属于其他对象的属性和方法，最终都是它的属性和方法。
   
   - ECMAScript无法没有指出如何直接访问Global对象，但是Web浏览器将这个Global对象作为window对象的一部分加以实现了。所以上述提到的所有对象类型，如Object、Array、Function都是window对象的属性。

   - toString(): 返回对象的字符串表示

	window.toString();
	<!--"[object Window]"-->

	Window.prototype.toString.call(window);//这里其实有问题
	<!--"[object Window]"-->

    - **经查看，Winodw类并没有在Window.prototype原型对象上重写toString()方法，它会顺着原型链查找调用Object.prototype.toString()。**
    
    - 所以，**任何对象object都可以通过this绑定调用Window.prototype.toString()方法，也就是调用Object.prototype.toString()方法，结果和Object类一样。**

    - 故上述代码实质上是

	  Object.prototype.toString.call(window);
	  <!--"[object Window]"-->

#### 三、直接执行toString()方法 ####

- 直接执行toString()，输出结果如下

	toString();

	<!--"[object Undefined]"-->
	
	(function(){
	    console.log(toString());
	})();

	<!--[object Undefined]-->

- 也就是说直接调用toString()方法，等价于

	Object.prototype.toString.call();
	<!--"[object Undefined]"-->

	Object.prototype.toString.call(undefined);
	<!--"[object Undefined]"-->

**所以直接调用toString()应该就是变相的undefined.toString()方法。**

**注意，直接调用toString()方法这里不可以理解成为全局作用域调用toString()方法，即window.toString();**


#### 四、toString.call/apply(this)方法 ####

	toString.call({});
	<!--"[object Object]"-->
	
	toString.call([]);
	<!--"[object Array]"-->

- 用toString.call/apply(this)去代替Object.prototype.toString.call/apply(this)使用，这样是不严谨的，容易导致一些问题，如下所示：

	function toString(){
	    console.log("wangpf")
	}
	toString();//"wangpf"
	toString.call({});//"wangpf"
	toString.call([]);//"wangpf"

**我们可以发现，当我们自定义了toString()方法时，直接调用toString()方法，就不会再默认调用Object类的toString()方法，而是会使用我们自定义的方法，这样可能得不到我们想要的结果，所以我们还是应当尽量使用Object.prototype.toString.call/apply(this)。**


#### 四、Object.prototype.toString(xxx)（ECMAScript 5） ####

- 在了解Object.prototype.toString.call()之前，要先了解Object.prototype调用toString方法时的步骤和call对this的显示绑定。

**1.当Object.prototype调用toString方法时的步骤**

Object.prototype.toString()中的toString()只有在Object.prototype调用的时候才会走以下步骤（this的值就是this的指向）：

（1）如果 this 是 null（如toString.call(null)）, 返回'[object Null]'，这里，尽管null也是一个对象类型的特殊值，它的toString行为也是由Object.prototype.toString定义的，并且特例化为返回表示null的字符串。

（2）如果 this 是 undefined（例如，toString.call(undefined)）），返回 '[object Undefined]' ，这是因为undefined没有自己的属性或方法，所以它会遵循原型链找到Object.prototype.toString，但实际操作的对象是undefined，因此返回的是表示undefined的特殊字符串。

（3）如果this既不是null也不是undefined，则调用ToObject()，let O = ToObject(this)，让O作为调用ToObject的结果。

    - 调用ToObject()传入如果是原始数据类型，则转换成对象，如数字,则会new Number()，转换为 Number 对象，字符串会转换为 String 对象。
    
    - 如果传入的是一个对象，结果就是这个对象

（4）定义一个class作为O的内部属性[[class]]的值。**（在js内部，给所有的数据都设定了一个[[class]]属性,它表明了数据类型，比如"Array"、"Date"、"Function"等，而且不能被修改。并且只有一个方法可以间接查询到它--就是toString()。例如，数组的 [[Class]] 可能是 "Array"）**

（5）返回由"[object"和"class"和"]"组成的字符串。

     Object.prototype.toString(123) //[object Object]


**因为Object.prototype.toString()返回的是调用者的类型。不论你toString()本身的入参写的是什么，在Object.prototype.toString()中，他的调用者永远都是Object.prototype所以，在不加call()情况下，我们的出来的结果永远都是 '[object Object]'**

**call(),是为了改变Object.prototype.toString这个函数都指向。Object.prototype.toString这个方法指向我们所传入的数据。**


**2.call方法修改this指向（底层逻辑）**

- call方法的主要步骤：

   （1）判断调用call方法的是不是一个函数；

   （2）通过在引入的形参对象上添加了一个独一无二的函数；

   （3）将this（调用call的函数）赋值为刚刚添加的函数；

   （4）然后将调用该函数的结果赋值给res（通过隐式绑定让this指向形参对象）；

   （5）删除添加的函数；（为了使形参对象保持原状）

   （6）返回res。

**该效果相当于object借用了func函数。**

- **Object.prototype.toString.call( )运行步骤**

		Object.prototype.toString.call('1')
		//相当于

		Object.prototype.toString.call(new String('1'))
		//call的参数是对象


（1）通过call方法将this指向new String('1')对象;


（2）Object.prototype调用toString方法，执行toString方法被调用的步骤：


     - 判断是不是null和undefined;

     - 创建一个变量O，将ToObject(this)的值（也就是String对象）赋值给变量O。

     - 创建名为class的变量，将O的内部属性[[class]]（也就是"String"）赋值给class。

     - 返回[object+class]组成的字符串（也就是[object + String]）。

**3.为什么一定要用Object.prototype.toString.call()？直接在当前数据本身去调用toString()，然后让他顺着原型链去找，最后找到Object.prototype.toString这个方法不行吗？连call都省下了**

  **因为对象的toString()方法可能被重写。所以，如果我们拿数据本身去toString()，是无法调用到Object.prototype.toString的。而且，在数组上被重写之后的toString方法，作用也不再是返回对象类型了。而是打印数组内容。**



#### 五、Object.prototype.toString(xxx)（ECMAScript 6） ####

**1.在ES6，调用 Object.prototype.toString 时，会进行如下步骤：**

   （1）如果 this 是 undefined（例如，toString.call(undefined)）），返回 '[object Undefined]' ，这是因为undefined没有自己的属性或方法，所以它会遵循原型链找到Object.prototype.toString，但实际操作的对象是undefined，因此返回的是表示undefined的特殊字符串。
    
   （2）如果 this 是 null（如toString.call(null)） , 返回 '[object Null]'，这里，尽管null也是一个对象类型的特殊值，它的toString行为也是由Object.prototype.toString定义的，并且特例化为返回表示null的字符串。

   （3）令 O 为以 this 作为参数调用 ToObject 的结果

   （4）使用isArray方法验证O，令 isArray 为 IsArray(O) 

   （5）如果O是特定字符串对象，则内部标识为"String"。

   （6）如果O有一个[[ParameterMap]]内部插槽，则内部标识为"Arguments"。

   （7）如果O有一个[[Call]]内部插槽，则内部标识为"Function"。

   （8）如果O有一个[[ErrorData]]内部插槽，则内部标识为"Error" 

   （9）如果O有一个[[BooleanData]]内部插槽，则内部标识为"Boolean"

   （10）如果O有一个[[NumberData]]内部插槽，则内部标识为"Number"

   （11）如果O有一个[[DateValue]]内部插槽，则内部标识为"Date"

   （12）如果O有一个[[RegExpMatcher]]内部插槽，则内部标识为"RegExp"

   （13）如果都不是则内部标识为"Object"。

   （14）假设tag是O对象的@@toStringTag属性值。

   （15）如果tag获取@@toStringTag属性值不是字符串，则tag等于内部标识。

   （16）最后返回拼接后的字符串"[object tag]"。

**在本规范的前几个版本中，toString这个函数通过访问内部属性[[class]]的内插槽的String值。上面toString函数保留了对以前一些特定类型内置对象的检测。但是对于其他内置对象或者预定义对象没有提供可靠的检测机制。针对这种情况，程序提供使用@@toStringTag的检测方式代替原来的类型检测方法。**

**很明显toString方法在ES6内部产生了比较大的变化，具体体现第4~16步：**

 （1）提供了专门判断数组的方法isArray。

 （2）不再访问内置对象的[[call]]属性，而是根据一些特殊内部插槽判断内置对象，例如根据Arguments的[[ParameterMap]]内部插槽标记"Arguments"标识、根据Function的[[ParameterMap]]内部插槽标记"Function"标识等等（这里我认为内部卡槽可以简单理解为标识或属性）。

 （3）一部分老的内置对象和新增的内置对象都有@@toStringTag属性值，例如JSON、Symbol、Map、Set、WeekMap、WeekSet、ArrayBuffer、DataView、Promise。
 
 （4）获取对象的@@toStringTag或者内部标识的字符串值。（引擎为它们设置好了toStringTag标签）


#### 六、如何让Object.prototype.toString方法识别自定义对象 ####

		class Person {
		  constructor(name, age) {
		    this.name = name;
		    this.age = age;
		  }
		​
		  setName(name) {
		    this.name = name;
		  }
		}
		​
		const p = new Person('王五', 25);
		​
		// undefined
		console.log(Person.prototype[Symbol.toStringTag])
		// [object Object]
		console.log(Object.prototype.toString.call(p))


代码中自定义了Person对象，但是使用Object.prototype.toString.call判断类型时只能返回"[object Object]"。

这是因为Person继承了Object的toString方法，根据ES6的toString执行的步骤可以知道执行顺序是3->14->17，获取的tag是Object，所以最终的结果是"[object Object]"。

如果可以让Object.prototype.toString.call判断类型返回"[object Person]"？

 - 我们需要再次查看toString执行的步骤，看第15和第16可以知道，如果给Person设置@@toStringTag的话，就可以实现我们的目标。

 **每个对象都有一个Symbol.toStringTag属性，这个属性设置的值就是@@toStringTag。**

		class Person {
		  constructor(name, age) {
		    this.name = name;
		    this.age = age;
		  }
		​
		  setName(name) {
		    this.name = name;
		  }
		​
		  get [Symbol.toStringTag]() {
		    return 'Person'
		  }
		}
		​
		const p = new Person('王五', 25);
		​
		// Person
		console.log(Person.prototype[Symbol.toStringTag])

		// [object Person]
		console.log(Object.prototype.toString.call(p))
