#### 一、Map和Object的区别 ####

1. Map和Object都是键值对的集合，但Map的键可以是任意类型，而Object的键只能是字符串和Symbol（非字符串会转换为字符串）

   - Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
   - 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

2. Map 默认情况下不包含任何键，所有键都是自己添加进去的。不同于 Object 原型链上有一些默认的键。
3. Map 的键值对个数可以轻易通过size属性获取，Object 需要手动计算


#### 二、Map的属性和方法 ####

1. 属性

   - constructor：构造函数
   - size：返回字典中所包含的元素个数

2. 方法

   - 操作方法：
   
       - set(key, value)：向字典中添加新元素
       - get(key)：通过键查找特定的数值并返回
       - has(key)：判断字典中是否存在键key
       - delete(key)：通过键 key 从字典中移除对应的数据
       - clear()：将这个字典中的所有元素删除
       
   - 遍历方法
  
       - Keys()：将字典中包含的所有键名以迭代器形式返回
       - values()：将字典中包含的所有数值以迭代器形式返回
       - entries()：返回所有成员的迭代器
       - forEach()：遍历字典的所有成员

#### 三、WeakMap ####

1. WeakMap特性

   - （1）只接受对象作为键名，不接受其他类型的值作为键名
   - （2）WeakMap的键名引用的对象是弱引用

        - 什么是强引用？

               例如：let obj = {foo:5}
                    let arr = [obj]
                    obj=null

          - 上面代码中，arr数组对于对象{foo:5}就是一个强引用，当obj不在引用这个对象时，这个对象也不会被垃圾回收机制清除，因为arr仍然存在着对对象的引用，必须手动清除引用才会被垃圾回收机制回收

                        arr[0]=null      

         - 所以Map对**键名**所引用的对象也是强引用

               例如：let map = new Map()
                    let obj = {foo:6}
                    map.set(obj,3)
                    obj=null
 
          - 上面代码中，清除obj对{foo:6}的引用，垃圾回收机制也不会回收这个对象，因为还存在着map对这个对象的引用


        - 什么是弱引用？

           - 弱引用和强引用相对，弱引用是指垃圾回收机制在回收这个对象的时候，不会考虑该引用

	               例如：let map = new WeakMap()
	                    let obj = {foo:6}
	                    map.set(obj,3)
	                    obj=null
 
            - 上面代码中，清除obj对{foo:6}的引用，垃圾回收机制就会回收这个对象，它不考虑WeakMap对该对象的引用，因为WeakMap的引用是弱引用


   - （3）不可遍历

       - 正因为WeakMap对键名所引用的对象是弱引用关系，因此WeakMap内部成员是会取决于垃圾回收机制有没有执行，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是不可预测的，因此不可遍历
       - 也因此他没有size属性和那些遍历方法


2. WeakMap的属性和方法

- （1）属性

        - constructor：构造函数

- （2）方法

       - 相比map也没有clear方法

       - set(key, value)：向字典中添加新元素
       - get(key)：通过键查找特定的数值并返回
       - has(key)：判断字典中是否存在键key
       - delete(key)：通过键 key 从字典中移除对应的数据
       

3. WeakMap的应用

- （1） 通过 WeakMap 缓存计算结果

     - 使用 WeakMap，你可以将先前计算的结果与对象相关联，而不必担心内存管理。以下功能 countOwnKeys() 是一个示例：它将以前的结果缓存在 WeakMap 中 cache。

				const cache = new WeakMap();
				
				function countOwnKeys(obj) {
				  if (cache.has(obj)) {
				    return [cache.get(obj), 'cached'];
				  } else {
				    const count = Object.keys(obj).length;
				    cache.set(obj, count);
				    return [count, 'computed'];
				  }
				}

- （2）部署私有属性

     - 利用弱映射，将内部属性设置为实例的弱引用对象，当实例删除时，私有属性也会随之消失，因此不会内存泄漏

			const _counter = new WeakMap();
			const _action = new WeakMap();
			
			class Countdown {
			  constructor(counter, action) {
			    _counter.set(this, counter);
			    _action.set(this, action);
			  }
			  
			  dec() {
			    let counter = _counter.get(this);
			    counter--;
			    _counter.set(this, counter);
			    if (counter === 0) {
			      _action.get(this)();
			    }
			  }
			}
			


			let invoked = false;
			
			const countDown = new Countdown(3, () => invoked = true);
			countDown.dec();
			countDown.dec();
			countDown.dec();
			
			console.log(`invoked status: ${invoked}`)


#### 四、Set ####

- Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。判断类似于全等，但是在Set 中认为 NaN 与 NaN 相等

1. Set的属性和方法

    - 属性：

        - constructor：构造函数
        - size：返回集合所包含的元素个数

   - 方法

      - 操作方法：
   
       - add(value)：添加某个值，返回 Set 结构本身(可以链式调用)。
       - delete(value)：删除某个值，删除成功返回 true，否则返回 false。
       - has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
       - clear()：清除所有成员，没有返回值。
       
      - 遍历方法
  
       - Keys()：返回键名的遍历器。
       - values()：返回键值的遍历器。
       - entries()：返回键值对的遍历器
       - forEach()：使用回调函数遍历每个成员。

       - 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。


#### 五、WeakSet ####

- 成员必须都是对象
- 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏。
- WeakSet 不可迭代，因此不能被用在 for-of 等循环中
- WeakSet 没有 size 属性。

1. 属性和方法

- （1）属性

        - constructor：构造函数

- （2）方法

       - 相比Set也没有clear方法

       - add(value)：添加某个值，返回 Set 结构本身(可以链式调用)。
       - delete(value)：删除某个值，删除成功返回 true，否则返回 false。
       - has(value)：返回一个布尔值，表示该值是否为 Set 的成员。