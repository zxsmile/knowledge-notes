#### 一、代理的作用 ####

- vue响应式原理依赖Object.definePrototype，通过setter/getter监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。
- 第一步将数据变为响应式的

		 class Vue{
		  constructor(options) {
		     this.data = options.data
		     this.observe(this.data,options.render)
		  }

		  observe(obj,render) {
		    Object.keys(obj).forEach(key => {
		      this.defineReactive(obj,key,obj[key],render) 
		    })
		  }
		
		  defineReactive(obj,key,value,render) {
		     Object.defineProperty(obj,key,{
		       configurable:true,
		       enumerable:true,
		       get:() =>{
		         return value
		       },
		       set:newValue => {
		        value = newValue
		         render(value)
		       }
		
		     })
		  }
		}

		
		let app = new Vue({
		  data:{
		    text1:1,
		    text2:2,
		    text3:3
		  },
		  render(data) {
		    console.log(data)
		  }
		})
		
		app.data.text1 = 6


- 第二步代理

   - 由第一步可以看出来，必须这样调用app.data.text1才能触发setter，因为上面实现中，Object.definePrototype绑定的是obj，也就是data对象，所以必须调用data才能触发setter。现在我们想要实现直接app.text1这样调用，按上面的的分析思路，我们应该让Object.definePrototype绑定app对象，这样改变它的属性就能触发setter，我们可以在Vue的构造函数constructor中为data执行一个代理proxy。这样我们就把data上面的属性代理到了vm实例上。

		class Vue{
		  constructor(options) {
		     this.data = options.data
		     this.proxy.call(this,this.data,options.render)
		  }
		  proxy(obj,render) {
		    let that = this
		    Object.keys(obj).forEach(key => {
		
		      Object.defineProperty(that,key,{
		        configurable:true,
		        enumerable:true,
		        get:() =>{
		          return that.data[key]
		        },
		        set:newValue => {
		         that.data[key] = newValue
		          render(that.data[key])
		        }
		      })
		    })
		  }
		}
		
		let app = new Vue({
		  data:{
		    text1:1,
		    text2:2,
		    text3:3
		  },
		  render(data) {
		    console.log(data)
		  }
		})
		
		app.text1 = 6


#### 二、全部实现过程 ####

https://juejin.cn/post/6989106100582744072#heading-14

			class Vue{
			  constructor(options) {
			    // 获取到传入的对象 没有默认为空对象
			     this.$options = options || {}
			
			     // 获取 el
			     this.$el = options.el === 'string'?document.querySelector(options.el):options.el
			
			     // 获取 data
			     this.$data = options.data || {}
			
			     // 调用 proxyData 处理data中的属性，将data属性代理给Vue实例
			     this.proxyData(this.$data)
			
			     //使用 Obsever 把data中的数据转为响应式
			     new Observer(this.$data)
			
			     //编译模板
			     new Compiler(this)
			    }
			     proxyData(data) {
			       Object.keys(data).forEach(key => {
			          // 进行数据劫持
			          // 把每个data的属性 到添加到 Vue 转化为 getter setter方法
			          Object.defineProperty(this,key,{
			            // 设置可以枚举
			            enumerable:true,
			            // 设置可以配置
			            configurable:true,
			             // 获取数据
			            get:() => {
			              return data[key]
			            },
			            // 设置数据
			            set:newVal => {
			               // 判断新值和旧值是否相等
			              if(newVal === data[key]){
			                return
			              }
			              // 设置新值
			              newVal = data[key]
			            }
			          })
			       })
			     }
			
			}
			
			class Observer{
			
			  constructor(data){
			    //用来遍历data
			    this.walk(data)
			  }
			
			  // 遍历 data 转为响应式
			  walk() {
			    // 判断 data是否为空 和 对象
			    if(!data || typeof data !== 'object'){
			      return
			    }
			    // 遍历 data
			    Object.keys(data).forEach(key => {
			      // 转为响应式
			      this.defineReactive(data,key,data[key])
			    })
			  }
			
			  // 转为响应式
			  // 要注意的 和vue.js 写的不同的是
			  // vue.js中是将 属性给了 Vue 转为 getter setter
			  // 这里是 将data中的属性转为getter setter
			
			  defineReactive(obj,key,value) {
			
			    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
			    this.walk(value)
			    // 保存一下 this
			    let self = this
			   // 创建 Dep 对象
			    let dep = new Dep()
			    Object.defineProperty(obj,key,{
			      enumerable:true,
			      configurable:true,
			
			      get:() => {
			        // 在这里添加观察者对象 Dep.target 表示观察者
			        if(Dep.target){
			          dep.addSub(Dep.target)
			        }
			        return value
			      },
			
			      set:newVal => {
			         if(value === newVal){
			           return
			         }
			         
			         // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
			         self.walk(newVal)
			          // 触发通知 更新视图
			         dep.notify()
			      }
			    })
			  }
			} 
			
			class Dep{
			  constructor() {
			    // 存储观察者
			    this.subs = []
			  }
			
			  // 添加观察者
			  addSub(sub) {
			    // 判断观察者是否存在 和 是否拥有update方法
			     if(sub && sub.updata){
			       this.subs.push(sub)
			     }
			  }
			
			  notify() {
			    // 通知方法
			    this.subs.forEach(sub => {
			      // 触发每个观察者的更新方法
			      sub.updata()
			    })
			  }
			}
			
			
			
			class Compiler {
			  // vm 指 Vue 实例
			  constructor(vm) {
			    // 拿到 vm
			    this.vm = vm
			    // 拿到 el
			    this.el = vm.$el
			    // 编译模板
			    this.compile(this.el)
			  }
			  // 编译模板
			  compile(el) {
			    // 获取子节点 如果使用 forEach遍历就把伪数组转为真的数组
			    let childNodes = [...el.childNodes]
			    childNodes.forEach((node) => {
			      // 根据不同的节点类型进行编译
			      // 文本类型的节点
			      if (this.isTextNode(node)) {
			        // 编译文本节点
			        this.compileText(node)
			      } else if (this.isElementNode(node)) {
			        //元素节点
			        this.compileElement(node)
			      }
			      // 判断是否还存在子节点考虑递归
			      if (node.childNodes && node.childNodes.length) {
			        // 继续递归编译模板
			        this.compile(node)
			      }
			    })
			  }
			  // 编译文本节点(简单的实现)
			  compileText(node) {
			    // 核心思想利用把正则表达式把{{}}去掉找到里面的变量
			    // 再去Vue找这个变量赋值给node.textContent
			    let reg = /\{\{(.+?)\}\}/
			    // 获取节点的文本内容
			    let val = node.textContent
			    // 判断是否有 {{}}
			    if (reg.test(val)) {
			      // 获取分组一  也就是 {{}} 里面的内容 去除前后空格
			      let key = RegExp.$1.trim()
			      // 进行替换再赋值给node
			      node.textContent = val.replace(reg, this.vm[key])
			      // 创建观察者
			      new Watcher(this.vm, key, (newValue) => {
			        node.textContent = newValue
			      })
			    }
			  }
			  // 编译元素节点这里只处理指令
			  compileElement(node) {
			    // 获取到元素节点上面的所有属性进行遍历
			    ![...node.attributes].forEach((attr) => {
			      // 获取属性名
			      let attrName = attr.name
			      // 判断是否是 v- 开头的指令
			      if (this.isDirective(attrName)) {
			        // 除去 v- 方便操作
			        attrName = attrName.substr(2)
			        // 获取 指令的值就是  v-text = "msg"  中msg
			        // msg 作为 key 去Vue 找这个变量
			        let key = attr.value
			        // 指令操作 执行指令方法
			        // vue指令很多为了避免大量个 if判断这里就写个 uapdate 方法
			        this.update(node, key, attrName)
			      }
			    })
			  }
			  // 添加指令方法 并且执行
			  update(node, key, attrName) {
			    // 比如添加 textUpdater 就是用来处理 v-text 方法
			    // 我们应该就内置一个 textUpdater 方法进行调用
			    // 加个后缀加什么无所谓但是要定义相应的方法
			    let updateFn = this[attrName + 'Updater']
			    // 如果存在这个内置方法 就可以调用了
			    updateFn && updateFn.call(this, node, key, this.vm[key])
			  }
			  // 提前写好 相应的指定方法比如这个 v-text
			  // 使用的时候 和 Vue 的一样
			  textUpdater(node, key, value) {
			    node.textContent = value
			    // 创建观察者
			    new Watcher(this.vm, key, (newValue) => {
			      node.textContent = newValue
			    })
			  }
			  // v-model
			  modelUpdater(node, key, value) {
			    node.value = value
			    // 创建观察者
			    new Watcher(this.vm, key, (newValue) => {
			      node.value = newValue
			    })
			    // 这里实现双向绑定
			    node.addEventListener('input', () => {
			      this.vm[key] = node.value
			    })
			  }
			
			  // 判断元素的属性是否是 vue 指令
			  isDirective(attr) {
			    return attr.startsWith('v-')
			  }
			  // 判断是否是元素节点
			  isElementNode(node) {
			    return node.nodeType === 1
			  }
			  // 判断是否是 文本 节点
			  isTextNode(node) {
			    return node.nodeType === 3
			  }
			}
			
			
			class watcher{
			  constructor(vm,key,cb){
			    // vm 是 Vue 实例
			    this.vm = vm
			    // key 是 data 中的属性
			    this.key = key
			    // cb 回调函数 更新视图的具体方法
			    this.cb = cb
			    // 把观察者的存放在 Dep.target
			    Dep.target = this
			    // 旧数据 更新视图的时候要进行比较
			    // 还有一点就是 vm[key] 这个时候就触发了 get 方法
			    // 之前在 get 把 观察者 通过dep.addSub(Dep.target) 添加到了 dep.subs中
			    this.oldVal = vm[key]
			    // Dep.target 就不用存在了 因为上面的操作已经存好了
			    Dep.target = null
			  }
			  // 观察者中的必备方法 用来更新视图
			  update() {
			    // 获取新值
			    let newVal = this.vm[this.key]
			    // 比较旧值和新值
			    if(newVal === this.oldVal){
			      return
			    }
			    // 调用具体的更新方法
			    this.cb(newVal)
			  }
			}
			
			     