## 一、`Object.defineProperty`、`Object.definedProperties`

#### 1、属性的内部特性 

- 对象中的属性有一些内部特性， 描述了属性的各种特征，可以控制对象属性的行为。
- 它提供了对属性的更细致管理，允许开发者定义属性的各种特性
- 这些内部特性的名称会用两个中括号括起来，如`[[Enumerable]]`
- 根据内部特性的不同，可以将属性分为**数据属性和访问器属性**

**（1）数据属性**

- **数据属性包含一个数据值的位置**。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。
  - `[[Configurable]]`：表示能否通过`delete`删除属性，以及除`writable`特性和`value`特性外的其他特性是否可以被修改，或者能否将属性修改为访问器属性。
  - `[[Enumerable]]`：表示能否通过`for-in`循环返回属性。
  - `[[Writable]]`：表示能否修改属性的值。
  - `[[Value]]`：包含这个属性的数据值。读取属性值的时候，从这个位置读，写入属性值的时候，把新值保存在这个位置。这个特性的默认值为`undefined`。
- **使用字面量或`new`操作符定义对象时，默认就是一个数据属性。前三个特性都默认为`true`，而`[[value]]`则为指定的值。**

**（2）访问器属性**

- **访问器属性不包含数据值**，它包含一对 `getter` 和 `setter` 函数，不过这两个函数并不是必须的。
- 在读取访问器属性时，会调用 `getter` 函数，这个函数负责返回有效的值；
- 在写入访问器属性时，会调用 `setter` 函数并传入新值，这个函数负责决定如何处理数据。
- 访问器属性有如下 4 个特性：

  - `[[Configurable]]:` 表示能否通过 `delete` 删除属性重定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。默认值为 `true`。
  - `[[Enumerable]]:` 表示能够通过 `for-in` 循环返回属性，默认值 `true`。
  - `[[Get]]:` 在读取函数时调用的函数。**默认值是 `undefined`。**
  - `[[Set]]:` 在写入属性时调用的函数。**默认值 `undefined`。**
- **不一定非要同时指定`getter`和`setter`。只指定`getter`意味着属性是不能写，尝试写入属性会被忽略。在严格模式下，尝试写入只指定了`getter`函数的属性会抛出错误。类似地，没有指定`getter`函数的属性也不能读，否则在非严格模式下会返回`undefined`，而在严格模式下会抛出错误。**
 - **访问器属性不能直接定义，必须使用`Object.defineProperty()` 或 `Object.defineProperties()` 来定义**

```
// 定义一个对象，包含伪私有成员year_和公共成员edition
let book = {
	year_: 2017,
	edition: 1
}
		
Object.defineProperty(book, "year", {
	get() {
		return this.year_;
	},
	set(newValue) {
		if (newValue > 2017) {
		    this.year_ = newValue;
		    this.edition += newValue - 2017;
		}
	}
})
		
// 设置时，会调用 setter 函数
	book.year = 2018
	console.log(book.edition) // 2
		
// 读取时，会调用 getter 函数
	console.log(book.year_) // 2018
		
// configurable 和 enumerable 的值如果不指定，则都默认为 false
   console.log(Object.getOwnPropertyDescriptor(book, "year"))
    // {
        //   get: [Function: get],
        //   set: [Function: set],
        //   enumerable: false,
        //   configurable: false
    // }
```

**2、`Object.defineProperty`** 

- `Object.defineProperty()`方法会直接**在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象**

- 可接收三个参数：

  - obj：要定义属性的对象

  - prop：要定义或修改的属性的名称或者Symbol

  - descriptor：要定义或修改的属性描述符

    ```
    Object.defineProperty(obj, prop, descriptor)
    ```

- 返回值：传递给`Object.defineProperty`的对象

- **在调用 `Object.defineProperty()` 时，`configurable`、`enumerable` 和 `writable` 的值如果不指定，则都默认为 `false`。 在严格模式下，尝试删除不可配置属性会抛出错误，尝试修改只读属性也会抛出错误。**

  ```
  var obj = {
      name:"xiaoyu",
      age:20
  }
  Object.defineProperty(obj,"height",{
      //很多的配置
      value:1.75
  })
  
  console.log(obj)
  
  //node环境下打印
  //{ name: 'xiaoyu', age: 20 }
  
  //浏览器控制台打印
  //{name: 'xiaoyu', age: 20, height: 1.75}
  ```

- 由上例，我们能够看到，返回值`obj`对象身上确实生效了`height`属性，那为什么两种环境下所显示的结果会不同，这又是什么原理？

- 因为`height`的属性是不可枚举，不可遍历的。所以我们在`node`环境下整体打印就看不到新增的`height`，但是我们可以局部打印还是可以出来的，例如浏览器控制台打印，说明这个`height`已经真真实实的添加到我们的`obj`里面了，只是我们看不到而已

- **浏览器控制台（如`Chrome`, `Firefox`等）往往对用户更加友好，它们在打印对象时可能显示所有属性，包括非枚举属性。**浏览器开发者工具的目的本身就是调试，通常会提供更多的信息，帮助我们更全面地了解对象的状态，因此会选择显示非枚举属性

- **`Node.js`环境通常遵循严格的`ECMAScript`标准，使用像 `console.log()` 这样的方法打印对象时，默认只显示那些可枚举的属性。**这是因为`Node.js`的 `console.log` 在底层使用 `util.inspect()` 方法，该方法默认只考虑可枚举属性

```
var obj = {
	 name: "xiaoyu",
	 age: 20
};
Object.defineProperty(obj, "height", {
	 value: 1.75,
	 enumerable: true  // 设置为true使其可枚举
});
console.log(obj);  // 将在所有环境中显示 { name: 'xiaoyu', age: 20, height: 1.75 }	
```

#### 3、`Object.defineProperties()`

  - 如果有多个属性需要定义特性，用 `defineProperty`逐个定义有些繁琐。`ECMAScript5` 又定义了一个 **`Object.defineProperties()`方法。利用这个方法可以通过描述符一次定义多个属性。**

  - **这个方法接受两个对象参数**：
    - **第一个对象是要添加和修改其属性的对象**
    - **第二个对象的属性与第一个对象中要添加或者修改的属性一一对应。**

```
var book = {};
Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2018
    },
    edition: {
        configurable: true,
        writable: true,
        value: 1
    },
    year: {
        get() {
            return this._year;
        },
        set(newValue) {
            this._year = newValue;
            this.edition += newValue - 2018;
        }
    }
});

book.year = 2020;
console.log(book.edition);
```

- 以上方法在 book 对象上定义了两个数据属性和一个访问器属性。

## 二、`Object.getOwnPropertyDescriptor`

- 可以使用`Object.getOwnPropertyDescriptor()`查看属性的描述符，它接收两个参数，第一个参数为对象，第二个参数为需要查看描述符的属性。

- `Object.getOwnPropertyDescriptor()`方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用`Object.getOwnPropertyDescriptor()`方法

  ```
  	const o = { name: "wang" }
  		
  	console.log(Object.getOwnPropertyDescriptor(o, "name"))
  
  	// {
  	//   value: 'wang',
  	//   writable: true,
  	//   enumerable: true,
  	//   configurable: true
  	// }
  ```

  

## 三、`Object.getPrototypeOf()`

- **`Object.getPrototypeOf()`方法用于获取一个对象的原型（即内部属性 `[[Prototype]]` 的值）。这个方法返回一个对象，它代表了指定对象的原型**

  ```
  console.log(Object.getPrototypeOf(person1) === Person.prototype) //true
  console.log(Object.getPrototypeOf(person1).name) //'Nicholas'
  ```

- 上例中的第一行代码，**确定`Object.getPrototypeOf()`返回的对象实际就是这个对象的原型**

  - 第二行代码取得了原型对象中`name`属性的值，也就是`'Nicholas'`

  - **使用`Object.getPrototypeOf()`可以方便地取得一个对象的原型**