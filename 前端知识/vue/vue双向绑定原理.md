https://www.cnblogs.com/wangjiachen666/p/9883916.html
https://www.cnblogs.com/canfoo/p/6891868.html
#### 一、原理 ####

- vue数据双向绑定是通过数据劫持结合发布订阅者模式的方式来实现的

#### 二、实现过程分析 ####

1. 实现mvvm主要包括两方面，数据变化更新视图，视图变化更新数据
 
   - 视图变化更新数据可以通过事件监听来实现
   - 主要来分析一下数据改变如何来更新视图

2. 数据改变更新视图分析

   - （1）如何知道数据发生变化了

       - 我们可以通过Object.definePrototype(obj,prop,descriptor)方法为属性设置一个set函数，当数据改变了就会触发这个函数，所以我们只要将更新视图的方法写进这个函数里面就好了

          - obj:要定义属性的对象
          - prop:要定义会修改的属性
          - descriptor:要定义或修改的属性的描述符
                  
             - 数据描述符
                  
               - configurable 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认值false
               - enumerable 表示属性是否可枚举,默认值false
               - value 属性值，默认值为undefined
               - writable 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变，默认为 false。
     
             - 存取描述符

                - get:属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值,默认为 undefined。
                - set:属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

   - (2)实现过程

      - 实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要一个监听器Observer，来监听所有属性。当属性发生变化了就告诉订阅者Watcher看是否需要更新。由于订阅者是很多个的，所以需要一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间统一管理。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。因此接下去我们执行以下3个步骤，实现数据的双向绑定：

        - 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
        - 实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
        - 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

        1. 实现一个Observer，使数据对象变得可观测

           function defineReactive（obj,key,val）{
                 
               Object.definePrototype(obj,key,{
 
                  enumerable: true,
                  configurable: true,

                  get() {
                    console.log(`${key}属性被读取了`)
                    return val    
                  },

                  set(newVal) {
                     console.log(`我监测到${key}属性被修改了`)
                     val = newVal
                  }

                })
             }


           function observable(obj){
               if(!obj || typeof obj !== 'object'){
                  return
               }
               
               Object.keys(obj).forEach((key)=>{
                   defineReactive(obj,key,obj[key])
               })
               
               return obj
           }


       2. 创建消息订阅器Dep
      
       - 完成了数据的'可观测'，即我们知道了数据在什么时候被读或写了，那么，我们就可以在数据被读或写的时候通知那些依赖该数据的视图更新了，为了方便，我们需要先将所有依赖收集起来，一旦数据发生变化，就统一通知更新。其实，这就是典型的“发布订阅者”模式，数据变化为“发布者”，依赖对象为“订阅者”。现在，我们需要创建一个依赖收集容器，也就是消息订阅器Dep，用来容纳所有的“订阅者”。订阅器Dep主要负责收集订阅者，然后当数据变化的时候后执行对应订阅者的更新函数。

         class Dep{

           constructor() {
              this.subs=[]
            },

           addSub(sub) {
             this.subs.push(sub) 
           }

           depend() {
             if(Dep.target){
                this.addSub(Dep.target) //保证初始化时，添加订阅者（我们只要在订阅者Watcher初始化的时候才需要添加订阅者，所以需要
                                                                 做一个判断操作，所以这里的Dep.target指的就是订阅者Watcher）
             }
           }

           notify() {
            this.subs.forEach(sub)=>{
               sub.update()              //遍历所有订阅者，去执行更新函数(每个订阅者都有一个update函数)
            })
           }
         }

         Dep.target=null

    3. 有了订阅器之后再改造一下defineReactive函数，在defineReactive函数里边加入订阅器

        function defineReactive(obj,key,val){
            dep=new Dep()
           Object.definePrototype(obj,key,{
               enumerable: true,
               configurable: true,

               get() {
                 dep.depend()
                 console.log(`${key}属性被读取了`);
                 return val
               }

               set(newVal) {
                 val=newVal
                 console.log(`${key}属性被修改了`);
                 dep.notify() //数据变化通知所有的订阅者
               }
           })
        }


   4. 订阅者Watcher

      - 订阅者在初始化vue实例的时候，需要将自己添加进订阅器Dep中，以便后面数据变化的时候，能够通知到该订阅者，如何添加呢？

        - 我们知道上面我们的监听器Observer是在get函数中执行了，添加订阅者Watcher的操作的，所以我们只需要在初始化vue实例的时候，去执行get方法就好了，而执行get方法就是去获取属性值就好了
        - 我们只要在订阅者Watcher初始化的时候才需要添加订阅者，所以需要做一个判断操作，因此可以在订阅器上做一下手脚：在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了

            class Watcher{
              constructor(vm,exp.cb){
                this.vm = vm   // vue实例
                this.exp = exp // 是node节点的v-model或v-on：click等指令的属性值。如v-model="name"，exp就是name
                this.cb = cb   // 是Watcher绑定的更新函数;
                this.value = this.get() //执行自己的get方法，在get方法中会将自己缓存在Dep.target中，并获取vm的属性值，从而触
                                           发监听器Observer的get方法，从而达到将自己添加到订阅器的目的
              },
              
              update() {
               let value = this.vm.data[this.exp] //修改属性值的时候，触发监听器中的set函数,然后执行该方法，获取修改之后的新值
               let oldVal = this.value  //该this.value值是在初始化实例的时候，在get方法中获取到的
               if(value !== oldVal){
                 this.value = value
                 this.cb.call(this.vm,value,oldVal)
               }
              },
              
              get() {
                Dep.target=this //缓存自己
                let value = this.vm.data[this.exp] //获取vm中的属性值，执行Observer中的get函数，把自己添加到订阅器
                Dep.target = null //添加完之后，释放自己
                return value
              }
            }


    过程分析：当我们去实例化一个构造函数时(new Watcher),会发生new的四个过程，其中一步是执行我们的构造函数的逻辑，所以我们就会执行它
             的this.get()方法 ，进入get方法，首先会执行：
                                     
                                           Dep.target=this //缓存自己

             实际上就是把 Dep.target 赋值为当前的渲染 watcher ,接着又执行了：

                                           let value = this.vm.data[this.exp]  // 强制执行监听器Observer里的get函数

             在这个过程中会对vm上的数据访问，其实就是为了触发数据对象的getter，每个对象值的 getter 都持有一个 dep，在触发 getter 的时候会调用 dep.depend() 方法，也就会执行 this.addSub(Dep.target),即把当前的 watcher 订阅到这个数据持有的 dep 的 subs 中，这个目的是为后续数据变化时候能通知到哪些 subs 做准备。
             这样实际上已经完成了一个依赖收集的过程。那么到这里就结束了吗？其实并没有，完成依赖收集后，还需要把 Dep.target 恢复成上一个状态，即：
                                           Dep.target = null;  // 释放自己

             因为当前vm的数据依赖收集已经完成，那么对应的渲染Dep.target 也需要改变。

			 而update()函数是用来当数据发生变化时调用Watcher自身的更新函数进行更新的操作。先通过let value = this.vm.data[this.exp];获取到最新的数据,然后将其与之前get()获得的旧数据进行比较，如果不一样，则调用更新函数cb进行更新。
			
    5. 将Observer和Watcher关联起来

         function myVue(data,el,exp){
            this.data=data
            observable(data) //将数据变得可观测
            el.innerHtml = this.data[exp] //初始化模板数据的值
            new Watcher(this,exp,function(value){
                 el.innerHtml = value
           })                        //初始化将订阅者添加到订阅器

           return this
         }


    6. 测试使用

       <body>
		<h1 id="name"></h1>
		<input type="text">
		<input type="button" value="改变data内容" onclick="changeInput()">
		
		<script src="observer.js"></script>
		<script src="watcher.js"></script>
		<script>
			var ele = document.querySelector('#name');
			var input = document.querySelector('input');
			
		    var myVue = new myVue({
				name: 'hello world'
			}, ele, 'name');
		 	
			//改变输入框内容
		    input.oninput = function (e) {
		    	myVue.data.name = e.target.value
		    }
			//改变data内容
			function changeInput(){
				myVue.data.name = "难凉热血"
			
			}
		</script>
	</body>



    - observer.js

       - 把一个对象的每一项都转化成可观测对象
	

			function observable (obj) {
				if (!obj || typeof obj !== 'object') {
		        	return;
		    	}
				let keys = Object.keys(obj);
				keys.forEach((key) =>{
					defineReactive(obj,key,obj[key])
				})
				return obj;
			}

	
      - 使一个对象转化成可观测对象

			function defineReactive (obj,key,val) {
				let dep = new Dep();
				Object.defineProperty(obj, key, {
					get(){
						dep.depend();
						console.log(`${key}属性被读取了`);
						return val;
					},
					set(newVal){
						val = newVal;
						console.log(`${key}属性被修改了`);
						dep.notify()                    //数据变化通知所有订阅者
					}
				})
			}
		
			class Dep {
				
				constructor(){
					this.subs = []
				}
				//增加订阅者
				addSub(sub){
					this.subs.push(sub);
				}
		        //判断是否增加订阅者
				depend () {
				    if (Dep.target) {
				     	this.addSub(Dep.target)
				    }
				}
		
				//通知订阅者更新
				notify(){
					this.subs.forEach((sub) =>{
						sub.update()
					})
				}
				
			}
		
			Dep.target = null;

   - watcher.js

		    class Watcher {
				constructor(vm,exp,cb){
				    this.vm = vm;
				    this.exp = exp;
				    this.cb = cb;
				    this.value = this.get();  // 将自己添加到订阅器的操作
				}
				get(){
					Dep.target = this;  // 缓存自己
		        	let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
		        	Dep.target = null;  // 释放自己
		        	return value;
				}
				update(){
					let value = this.vm.data[this.exp];
		        	let oldVal = this.value;
		        	if (value !== oldVal) {
		                this.value = value;
		                this.cb.call(this.vm, value, oldVal);
					}
			    }
		     }


   7. 还有一个细节问题就是我们在赋值的时候是这样的，myVue.data.name = "难凉热血"，而我们的理想形式是myVue.name = '难凉热血'，为了实现这样的形式，我们需要在new SelfVue的时候做一个代理处理，让访问selfVue的属性代理为访问selfVue.data的属性，实现原理还是使用Object.defineProperty( )对属性值再包一层：

        function myVue (data, el, exp) {
		    var self = this;
		    this.data = data;
		 
		    Object.keys(data).forEach(function(key) {
		        self.proxyKeys(key);  // 绑定代理属性
		    });
		 
		    observe(data);
		    el.innerHTML = this.data[exp];  // 初始化模板数据的值
		    new Watcher(this, exp, function (value) {
		        el.innerHTML = value;
		    });
		    return this;
		}
		 
		myVue.prototype = {
		    proxyKeys: function (key) {
		        var self = this;
		        Object.defineProperty(this, key, {
		            enumerable: false,
		            configurable: true,
		            get: function proxyGetter() {
		                return self.data[key];
		            },
		            set: function proxySetter(newVal) {
		                self.data[key] = newVal;
		            }
		        });
		    }
		}

     这下我们就可以直接通过myVue.name = '难凉热血'改变属性值了

    8. 实现Compile

       - (1) 为了解析模板，首先需要获取到dom元素，然后对含有dom元素上含有指令的节点进行处理，因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理
       - (2)接下来需要遍历各个节点，对含有相关指定的节点进行特殊处理,这里通过if(node.nodeType == 1)来判断该节点是否为元素节点，可以分为两种情况：元素节点(v-model,v-bind,v-html,class,v-on)和文本节点且匹配{{}}这种形式，分别处理
	
             - 在每个元素节点中又分为事件指令和普通指令分别处理，因为事件指令比其他的要多传一个参数(事件类型如click）
             
               - 事件指令通过addEventListener来添加事件
               - 文本节点且匹配{{}}这种形式，直接处理
	
     - https://github.com/DMQ/mvvm/blob/master/js/compile.js
