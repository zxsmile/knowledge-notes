https://www.jb51.net/article/171869.htm
https://juejin.cn/post/6844903614096343047
#### 一、前言 ####

- Vue2.0对于响应式数据的实现有一些不足：

   - 无法检测数组/对象的新增
   - 无法检测通过索引改变数组的操作。
   - 修改数组长度

- 无法检测数组/对象的新增，原因很简单，对象的属性只有先用Object.defineProperty 方法添加属性描述符的 get 和 set 属性才能被监听，新添加的属性肯定没先用 Object.defineProperty 方法，故无法被监听。删除的属性，其 set 属性监听不到，故无法监听。


#### 二、无法检测数组的索引变化？ ####

- 我们来测试一下看看。以下例子，对遍历数组中的每一项，用Object.defineProperty对其进行监测

			function defineReactive(data, key, value) {
				 Object.defineProperty(data, key, {
					 enumerable: true,
					 configurable: true,
					 get: function defineGet() {
						 console.log(`get key: ${key} value: ${value}`)
						 return value
					 },
					 set: function defineSet(newVal) {
						 console.log(`set key: ${key} value: ${newVal}`)
						 value = newVal
					 }
				 })
			}
			 
			function observe(data) {
				Object.keys(data).forEach(function(key) {
					defineReactive(data, key, data[key])
				})
			}
			 
			let arr = [1, 2, 3]
			observe(arr)

- 通过索引改变arr[1]，可以发现触发了set，也就是Object.defineProperty是可以检测到通过索引改变数组的操作的，那Vue2.0为什么没有实现呢？

  - 原来是出于对性能原因的考虑，没有去实现它。而不是不能实现。对于对象而言，每一次的数据变更都会对对象的属性进行一次枚举，一般对象本身的属性数量有限，所以对于遍历枚举等方式产生的性能损耗可以忽略不计，但是对于数组而言呢？数组包含的元素量是可能达到成千上万，假设对于每一次数组元素的更新都触发了枚举/遍历，其带来的性能损耗将与获得的用户体验不成正比，故vue无法检测数组的变动。
不过Vue3.0用proxy代替了defineProperty之后就解决了这个问题。

#### 三、解决方案 ####

1. 数组

	- this.$set(array, index, data)
      - 这是个深度的修改，某些情况下可能导致你不希望的结果，因此最好还是慎用
      
			this.dataArr = this.originArr
			this.$set(this.dataArr, 0, {data: '修改第一个元素'})
			console.log(this.dataArr)        
			console.log(this.originArr)  //同样的 源数组也会被修改 在某些情况下会导致你不希望的结果 



    - splice
      - Vue对数组的7个变异方法（push、pop、shift、unshift、splice、sort、reverse）实现了响应式
      - 所以splice会被监听有响应式，而splice又可以做到增删改。
      - this.items.splice(newLength) 可解决修改数组长度（减小数组长度）

        

   - 利用临时变量进行中转
			
			let tempArr = [...this.targetArr]
			tempArr[0] = {data: 'test'}
			this.targetArr = tempArr

2. 对象

   - this.$set(obj, key ,value) - 可实现增、改
   
   - 对于对象的属性的删除可以用 this.$delete(obj,key) 来解决，this.$delete 是个实例方法，该方法是全局方法 Vue.delete 的一个别名。

   - watch时添加deep：true深度监听，只能监听到属性值的变化，新增、删除属性无法监听

			this.$watch('blog', this.getCatalog, {
			    deep: true
			    // immediate: true // 是否第一次触发
			  });


   - watch时直接监听某个key

			watch: {
			  'obj.name'(curVal, oldVal) {
			    // TODO
			  }
			}



#### 四、vue对数组的observe做了哪些处理？####
- https://juejin.cn/post/6883365724228681742#heading-6

        var Observer = function Observer(value) {
		    this.value = value;
		    this.dep = new Dep();
		    this.vmCount = 0;
		    def(value, '__ob__', this);
		    if (Array.isArray(value)) {
		        if (hasProto) {
		            protoAugment(value, arrayMethods);
		        } else {
		            copyAugment(value, arrayMethods, arrayKeys);
		        }
		        this.observeArray(value);
		    } else {
		        this.walk(value);
		    }
		}

- 执行 this.value = value ，把要监听的数据 value 赋值到 Observer 类的实例对象上。
- 执行 this.dep = new Dep() ，创建一个订阅者收集器，并把赋值到 Observer 类的实例对象上。
- 执行 this.vmCount = 0 ，把 vmCount 赋值到 Observer 类的实例对象上。
- 这样 Observer 类的实例对象就有三个实例属性：value、dep、vmCount。
- 执行 def(value, '__ob__', this) ，把自身的实例对象添加到数据 value 的 __ob__ 属性上，使value 的 __ob__ 属性上保存 Observer 类的一些实例对象和实例方法，在后续逻辑中会经常用到。另外一个对象上若有 __ob__ 属性，则代表这个对象已经被监听过。
- def 方法是对 Object.defineProperty 方法的封装。这就是用 console.log 打印 data 的数据时会发现多了一个 __ob__ 属性的原因。

		function def(obj, key, val, enumerable) {
		    Object.defineProperty(obj, key, {
		        value: val,
		        enumerable: !!enumerable,
		        writable: true,
		        configurable: true
		    });
		}

- 执行 if (Array.isArray(value)) 判断 value 是否是数组类型，若不是执行 this.walk(value) ，若是执行以下代码。

		if (hasProto) {
		    protoAugment(value, arrayMethods);
		} else {
		    copyAugment(value, arrayMethods, arrayKeys);
		}
		this.observeArray(value);


- 可见在 Vue 中对数组类型的数据和对象类型的数据监听的处理方式是不同的，下面分别来介绍各自的处理方式。

#### 四、监听对象类型的数据 ####

- 在 Observer 构造函数中，对于对象类型的数据，执行 this.walk(value) 来监听。来看一下 this.walk 实例方法。

		Observer.prototype.walk = function walk(obj) {
		    var keys = Object.keys(obj);
		    for (var i = 0; i < keys.length; i++) {
		        defineReactive(obj, keys[i]);
		    }
		};


- 监听对象类型的数据 value 过程，是先把 value 作为参数传入 observe(value) 函数，在其中执行 new Observer(value) ，然后在 Observer 构造函数中，调用 this.walk 实例方法，在 this.walk 方法中用 Object.keys() 获取 value 的键集合 keys ，然后遍历 keys 在其中执行 defineReactive(value, keys[i]) ，在 defineReactive 函数中在 value 自身的属性描述符上定义 get 和 set 属性用来监听，再通过 value[keys[i]] 获取 value 每个子属性 val ，如果 val 是对象或数组就会执行 observe(val) 来监听子属性 val，重复开始的流程，这样形成了一个递归调用，这样数据 value不管本身还是它的所有子属性都会被监听到。

#### 五、监听数组类型的数据 ####

- 在 Observer 构造函数中，对于数组类型的数据，执行以下逻辑来监听。

		if (hasProto) {
		    protoAugment(value, arrayMethods);
		} else {
		    copyAugment(value, arrayMethods, arrayKeys);
		}
		this.observeArray(value);

- 先不管上面的 if 逻辑，来看一下 this.observeArray 实例方法。

		Observer.prototype.observeArray = function observeArray (items) {
		    for (var i = 0, l = items.length; i < l; i++) {
		        observe(items[i]);
		    }
		}

- 试想一下，为什么在遍历中不直接调用 defineReactive 函数来把数据变成响应式对象来监听，而是调用 observe 函数。这是因为数组的元素可以是对象、数组等，在 Vue 中对数组类型和对象类型的数据监听流程是不同的，在 defineReactive 函数是直接把对象类型的数据变成响应式对象来监听，只有在 observe 函数中才有做区分。

- 执行 if (hasProto)，其中 hasProto 是这么定义的 var hasProto = '__proto__' in {}，变量 in 对象，判断变量是否是对象的属性。

- 来看一下 protoAugment 函数和 copyAugment 函数。

		function protoAugment(target, src) {
		    target.__proto__ = src;
		}
		function copyAugment(target, src, keys) {
		    for (var i = 0, l = keys.length; i < l; i++) {
		        var key = keys[i];
		        def(target, key, src[key]);
		    }
		}

- 在 protoAugment 函数中把参数 src 赋值到参数 target 的 __proto__。对象的 __proto__ 属性的值就是它所对应的原型对象，在JS中，数组也是一个对象。那么 protoAugment 函数的作用就是把参数 target 的原型对象改成参数 src。
- 但 __proto__ 这个属性在一些版本的浏览器不支持，比如IE9，故要用 '__proto__' in {} 做一下兼容判断。
- 若是浏览器不支持 __proto__ 这个属性，则调用 copyAugment 函数，在其中通过 def方法，把参数 target 的原型对象中的值更改，def 方法已经在上面介绍过。
- 执行protoAugment(value, arrayMethods)，其中 value 是一个数组，要把 value 的原型对象修改成 arrayMethods，那为什么要数组的原型对象修改成 arrayMethods，先来看一下 arrayMethods 是如何定义的。

			var arrayProto = Array.prototype;
			var arrayMethods = Object.create(arrayProto);
			var methodsToPatch = [
			    'push',
			    'pop',
			    'shift',
			    'unshift',
			    'splice',
			    'sort',
			    'reverse'
			];
			methodsToPatch.forEach(function(method) {
			    var original = arrayProto[method];
			    def(arrayMethods, method, function mutator() {
			        var args = [],
			            len = arguments.length;
			        while (len--) args[len] = arguments[len];
			        var result = original.apply(this, args);
			        var ob = this.__ob__;
			        var inserted;
			        switch (method) {

                        //对于push，unshift会新增索引，所以需要手动observe
			            case 'push':
			            case 'unshift':
			                inserted = args;
			                break
                        //splice方法，如果传入了第三个参数，也会有新增索引，所以也需要手动observe
			            case 'splice':
			                inserted = args.slice(2);
			                break
			        }
                    
                    // push，unshift，splice三个方法触发后，在这里手动observe，其他方法的变更会在当前的索引上进行更新，所以不需要再执行ob.observeArray
			        if (inserted) {
			            ob.observeArray(inserted);
			        }
			        ob.dep.notify();
			        return result
			    });
			});
			var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

- 执行 var arrayProto = Array.prototype 获取数组的原型对象并赋值给 arrayProto 。
- 执行 var arrayMethods = Object.create(arrayProto) 创建一个新对象 arrayMethods ，其拥有数组的原型对象。
- 变量 methodsToPatch 中定义了一些常见的数组实例方法，遍历 methodsToPatch 在其中调用 def 函数修改 arrayMethods 上和 methodsToPatch 中同名的实例方法，这叫作函数劫持。
- 执行 var original = arrayProto[method] 把数组的原实例方法缓存到常量 original，然后调用 def 函数，在 def 函数的第三个参数传入重新定义的数组实例方法。
- 在重新定义的数组实例方法中，执行

		var args = [],len = arguments.length;
		while (len--) args[len] = arguments[len];

- 定义一个变量 args，然后把调用数组实例方法时的参数赋值给变量 args，然后执行 var result = original.apply(this, args)，把参数传入 original 该数组原先的实例方法执行，并把执行结果赋值给常量 result 。
- 执行 var ob = this.__ob__，获取属于要被监听数组的 Observer 类实例化的对象赋值给常量 ob。
- 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被 observe ，splice方法，如果传入了第三个参数，也会有新增索引，所以也需要手动observe
- 执行 var ob = this.__ob__，获取属于要被监听数组的 Observer 类实例化的对象赋值给常量 ob。


#### 六、vue的 set 方法实现 ####

- Vue.set 是在 initGlobalAPI 函数中定义。initGlobalAPI 函数在定义构造函数 Vue 后马上执行。

		function initGlobalAPI(Vue) {
		    Vue.set = set;
		}
		initGlobalAPI(Vue);

- 其中 Vue.set 是 set 函数赋值的，来看一下 set 函数。

		function set (target: Array<any> | Object, key: any, val: any): any {
		 // 如果target是数组，且key是有效的数组索引，会调用数组的splice方法，
		 // 我们上面说过，数组的splice方法会被重写，重写的方法中会手动Observe
		 // 所以vue的set方法，对于数组，就是直接调用重写splice方法
		 if (Array.isArray(target) && isValidArrayIndex(key)) {
		 target.length = Math.max(target.length, key)
		 target.splice(key, 1, val)
		 return val
		 }
		 // 对于对象，如果key本来就是对象中的属性，直接修改值就可以触发更新
		 if (key in target && !(key in Object.prototype)) {
		 target[key] = val
		 return val
		 }
		 // vue的响应式对象中都会添加了__ob__属性，所以可以根据是否有__ob__属性判断是否为响应式对象
		 const ob = (target: any).__ob__

	    if (target._isVue || (ob && ob.vmCount)) {
	        warn(
	            'Avoid adding reactive properties to a Vue instance or its root $data ' +
	            'at runtime - declare it upfront in the data option.'
	        );
	        return val
	    }

		 // 如果不是响应式对象，直接赋值
		 if (!ob) {
		 target[key] = val
		 return val
		 }
		 // 调用defineReactive给数据添加了 getter 和 setter，
		 // 所以vue的set方法，对于响应式的对象，就会调用defineReactive重新定义响应式对象，defineReactive 函数
		 defineReactive(ob.value, key, val)
		 ob.dep.notify()
		 return val
		}

- 执行 if (isUndef(target) || isPrimitive(target)) 判断参数 target 是否为 undefined、null、字符串、布尔值、数字。若是在控制台打出警告，无法对未定义、null或基础类型数据设置属性，其中 isPrimitive 方法代码如下。

		function isPrimitive(value) {
		    return (
		        typeof value === 'string' ||
		        typeof value === 'number' ||
		        typeof value === 'symbol' ||
		        typeof value === 'boolean'
		    )
		}

- 执行 if (Array.isArray(target) && isValidArrayIndex(key)) 判断参数 target 是否为数组，若是则参数 key 应该为数组下标，用 来判断参数 key 是不是正确的数组下标，
		
		function isValidArrayIndex(val) {
		    var n = parseFloat(String(val));
		    return n >= 0 && Math.floor(n) === n && isFinite(val)
		}

- 数组下标应该是个大于零的整数，且不是无穷大。在 isValidArrayIndex 函数先用 parseFloat 把参数 val，因为 parseFloat 的接收的参数是字符串格式，所以用 String 处理一下参数 val。这里很巧妙利用 Math.floor(n) === n 来判断参数 val 是不是整数，最后用 isFinite 判断参数 val 是不是无穷大。
- 若参数 key 是个正确的数组下标，执行以下逻辑

		target.length = Math.max(target.length, key);
		target.splice(key, 1, val);

- 此时 target 是个数组，这里巧妙的应用 splice 这个数组实例方法，实现通过数组下标来添加一个数组项的功能，同时 splice 这个数组实例方法在 Vue 中被劫持过，故会被监听到。
那为什么还要重新设置一下 target 的长度。是因为 splice 方法有个缺陷，下面用一个例子说明。

		let a = [1,2]
		a[3]=3;
		console.log(a) //[1, 2, empty, 3] 
		let b = [1,2]
		b.splice(3,1,3) //[1, 2, 3]
		console.log(b)

- 说明 splice 实例方法中的参数 key 只要超过数组的长度，那么只会在数组尾部添加上所要的数组元素。为了避免这个缺陷，执行 target.length = Math.max(target.length, key) ，当 key 比target.length 大，就把 key 赋值给 target.length 先扩充一下数组的长度，保证通过 splice 添加数组元素和通过数组下标添加数组元素的结果是一致的。

- 执行 if (key in target && !(key in Object.prototype))，判断参数 key 是否是参数 target 的属性，且不是其原型对象的属性。若是，则 target[key] 已被监听，直接把参数 val 赋值给 target[key] 即可。
- 执行if (target._isVue || (ob && ob.vmCount)) ，用 target._isVue 来判断参数 target 是否为 Vue 实例对象.
- 用 ob && ob.vmCount 来判断参数 target 是否为根数据对象（即 data 选项返回的对象），其中 ob 为参数 target.__ob__，__ob__ 为 Observer 类的实例化对象，在 Observer 构造函数中 只有
- data 为根数据，才会给 vmCount 实例对象赋值。若是在控制台打出警告注意参数 target 不能是 Vue 实例，或者 Vue 实例的根数据对象。
- 执行 if (!ob) 判断参数 target 是否是被监听，如果不是，那么也必要去监听其子属性，执行target[key] = val 直接赋值即可。
- 如果是，执行 defineReactive(ob.value, key, val) 在新增属性的描述符属性上定义 get 和 set 属性来监听新增属性，其中 ob.value 是参数target变成的响应式对象，如果直接用参数 target ，会导致参数 target 本身及其子属性都无法被监听。
- 执行 ob.dep.notify() ，因为参数 target 新增属性了，那么本身也改变了，故触发其订阅者的更新。
- 最后返回新增的值 `val 。

#### 七、Vue.delete的内部逻辑 ####

- Vue.delete 是在 initGlobalAPI 函数中定义。initGlobalAPI 函数在定义构造函数 Vue 后马上执行。

		function initGlobalAPI(Vue) {
		    Vue.delete = del;
		}
		initGlobalAPI(Vue);

- 其中 Vue.delete 是 del 函数赋值的，来看一下 del 函数。

		function del(target, key) {
		    if (isUndef(target) || isPrimitive(target)) {
		        warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
		    }
		    if (Array.isArray(target) && isValidArrayIndex(key)) {
		        target.splice(key, 1);
		        return
		    }
		    var ob = (target).__ob__;
		    if (target._isVue || (ob && ob.vmCount)) {
		        warn(
		            'Avoid deleting properties on a Vue instance or its root $data ' +
		            '- just set it to null.'
		        );
		        return
		    }
		    if (!hasOwn(target, key)) {
		        return
		    }
		    delete target[key];
		    if (!ob) {
		        return
		    }
		    ob.dep.notify();
		}

- 里面部分逻辑和 set 函数是一模一样的，在上面已经介绍过了。来介绍一下不一样的逻辑。
- 当参数 target 为数组时，且参数 key 为正确的数组下标，执行 target.splice(key, 1) ，这里巧妙的应用 splice 这个数组实例方法，实现删除数组中某个元素的功能，同时 splice 这个数组实例方法在 Vue 中被劫持过，故会被监听到。
- 执行 if (!hasOwn(target, key)) ，判断参数 key 是否是参数 target 的属性，若不是，则直接 return 。
- 若不是，执行delete target[key]删除这个对象属性。
- 执行 var ob = (target).__ob__; if(!ob) 判断参数 target 是否被监听，若不是，则直接 return 。
- 若是，执行 ob.dep.notify() ，触发参数 target 本身的订阅者更新。

#### 八、监听数组类型数据的边界场景 ####

- 在上小节讲到只有用push 、pop 、 shift 、unshift 、 splice 、 sort 、 reverse 这些在 Vue 内部重新定义的数组实例方法，去操作数组才能被监听到。其实这些数组实例方法都会去变更原始数组，称为变更方法。那还有一些数组实例方法如 filter 、concat 和 slice ，这些方法不会去变更原始数组，会返回一个新数组，称为替换方法。filter 、concat 和 slice 这些替换方法来操作数组会被监听到。
