#### 一、概念 ####

- Vue.extend 是 Vue 的全局 API，它提供了一种灵活的挂载组件的方式。相比常用的 Vue.component 写法，使用 Vue.extend 步骤更加繁琐一些，但是常用于一些独立组件开发场景中(例如 ElementUI 的 message)，通过Vue.extend+message )，通过 Vue.extend + message)，

- 通过Vue.extend+mount 这对组合使一些动态渲染或使用 js 全局调用的组件变得更加灵活 。

- Vue.extend 用于局部注册组件并创建子类，方法返回一个组件构造器，通过组件构造器创建组件实例，该实例的参数是一个包含组件选项的对象，用来在实例上扩展属性和方法。

#### 二、Vue.component ####

- 注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称

- ```
  // 注册组件，传入一个扩展过的构造器
  Vue.component('my -component', Vue.extend({ /* ... */ }))
  
  // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
  Vue.component('my-component', { /* ... */ })
  
  // 获取注册的组件 (始终返回构造器)
  var MyComponent = Vue.component('my-component')
  let ElInput = Vue.component('ElInput');
  console.log(new ElInput);  // 就是Inout的实例
  ```

  

- 用法也特别的简单，你写好的组件，直接在main.js里面导入然后使用Vue.component('xx-xxx',xxx)就可以全局通用了。

- **优点**

  - 所有页面基本上都是通过 router 来管理可以直接注册，组件的创建我们不需要去关注，相比 extend 要更省心一点


- **缺点**
  - 组件的名称都是自定义的，如果我要从接口动态渲染怎么办。【extend不用必须在初始化的时候完成，下面有实例】
  
  - 所有内容都是在 #app 下渲染，注册组件都是在当前位置渲染。如果实现的是一个函数形式调用 window.alert() 全局提示组件，该如何实现呢？
  
- 这时候，Vue.extend + vm.$mount 组合就派上用场了。

#### 三、Vue.extend使用方式 ####

**1.页面中的元素，即组件的挂载位置**

    <div id="mount-point">
       <h1>标题</h1>
    </div>

**2.通过 Vue.extend 创建构造器，并实现元素的挂载**

	// 创建构造器
	var Profile = Vue.extend({
	  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
	  data: function () {
	    return {
	      firstName: 'Walter', 
	      lastName: 'White',
	      alias: 'Heisenberg'
	    }
	  }
	})
	
	// 创建 Profile 实例，并挂载到一个元素上。
	new Profile().$mount('#mount-point')

  - extend 创建的是 Vue 构造器，而不是我们平时常写的组件实例，需要通过实例化后再使用

  - 需要通过 new Profile() 进行组件的实例化，再将 Vue 实例挂载到指定的元素（'#mount-point）上。

**3.最终页面得到的效果如下**

	<div id="mount-point">
	  <p>Walter White aka Heisenberg</p>
	</div>

  - **注意这里，可以发现Id为mount-point的div ,是直接被替代了，没有在内部填充，在我们 main.js 初始化的时候用发其实也是一样：**

  ```
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');  // 此处都是替换，不是填充
  ```

- 这个 API 可以实现很灵活的功能，比如 ElementUI 里的$message，我们使用this.$message('hello')的时候，其实就是通过这种方式创建一个组件实例，然后再将这个组件挂载到了 body 上，ElementUI里面的这个方法还可以传入虚拟节点

#### 四、Vue.extend的具体使用 ####

**1.实现 loading 的挂载**

  **(1)先写一个loading.vue页面，用于实现 loading 样式**

		<template>
		  <!-- 打开弹框的动画 -->
		  <transition name="animation">
		    <div
		      v-if="showLoading"
		      class="loadingWrap"
		      :style="{ background: backgroundColor }">
		      <div class="loadingContent">
		        <div class="iBox">
		          <img src="@/assets/imgs/loading.svg" alt="" class="loading">
		        </div>
		        <div class="text">{{ text }}</div>
		      </div>
		    </div>
		  </transition>
		</template>
		
		<script>
		export default {
		  data () {
		    return {
		      showLoading: false, // 控制显示与隐藏的标识
		      backgroundColor: 'rgba(0, 0, 0, .1)', // 默认背景色
		      text: '', // 默认文字
		    }
		  },
		}
		</script>
		
		  <style lang="scss" scoped>
		.loadingWrap {
		   position: absolute;
		   top: 0;
		   left: 0;
		   width: 100%;
		   height: 100%;
		   display: flex;
		   justify-content: center;
		   align-items: center;
		   .loadingContent {
		      color:  #1762ef;
		      text-align: center;
		    .iBox {
		      margin-bottom: 6px;
		      .loading {
		        width: 26px;
		        height: 26px;
		        transform: rotate(360deg);
		        animation: rotation 3s linear infinite;
		      }
		    }
		  }
		  .text {
		    color: #1762ef;
		  }
		}
		  // 加一个过渡效果
		  .animation-enter, .animation-leave-to { opacity: 0;}
		  .animation-enter-active, .animation-leave-active { transition: opacity .5s; }
		
		  @keyframes rotation{
		    from {-webkit-transform: rotate(0deg);}
		    to {-webkit-transform: rotate(360deg);}
		  }
		
		  </style>

  **(2)挂载 loading**

    在loading同级目录下创建 loading.js 将组件挂载到全局
    
    	// 引入vue
    	import Vue from 'vue'
    	
    	// 引入loading组件
    	import Loading from './loading'
    	
    	// 通过Vue的extend方法继承这个引入的 loading 组件，继承后会返回一个vue子类，需要使用实例化即可
    	const LoadingConstructor = Vue.extend(Loading)
    	
    	// 创建实例并且挂载到 div上
    	const loading = new LoadingConstructor().$mount(document.createElement('div'))
    	
    	// 显示loading效果
    	function showLoad (options) {
    	  // 初始化调用传递过来的参数赋值更改组件内内部值
    	  for (const key in options) {
    	    loading[key] = options[key]
    	  }
    	  // 让其显示
    	  loading.showLoading = true
    	  // 并将 Vue.extend 创建的 dom 元素插入body中
    	  document.getElementById('app').appendChild(loading.$el)
    	}
    	
    	// 关闭loading效果
    	function hideLoad () {
    	  // 因为是v-if去控制，所以将标识showLoading置为false，就会自动把弹框dom删掉
    	  loading.showLoading = false
    	}
    	
    	// 将控制 loading 的方法挂载到 Vue 原型
    	Vue.prototype.$showLoad = showLoad
    	Vue.prototype.$hideLoad = hideLoad

  **(3)在 main.js 中引入**

		import Vue from 'vue'
		import App from './App.vue'
		import router from './router'
		import '@/components/loading/index.js'
		
		new Vue({
		  router,
		  render: h => h(App),
		}).$mount('#app')

  **(4)调用**

  通过 this.$showLoad() 即可实现页面的 loading 效果

**2.全局 toast 实现**

  - 仿照 element-ui 的 Message 实现全局 toast 效果。

  **(1)先写一个toast.vue页面，用于实现 toast  样式**

		<template>
		  <div id="toast">
		    <p :class="[type ? `toast-${type}` : '', size ? `toast-${size}` : '']">
		      {{ message }}
		      <svg t="1684223217446" @click="handleClick" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2372" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2373" :fill="color[type]"></path></svg>
		    </p>
		  </div>
		</template>
		
		<script>
		export default {
		  data () {
		    return {
		      // 显示类型（success，info，warning，error），默认为info
		      type: 'info',
		      // 显示大小（default，small，big），默认为default
		      size: 'default',
		      // 显示文字内容
		      message: '',
		      // 显示时间，默认为3000
		      duration: 3000,
		      timer:null,
		      color:{
		        'error':'#F56C6C',
		        'success': '#67C23A',
		        'info': '#909399',
		        'warning':'#E6A23C',
		      }
		
		    }
		  },
		  beforeDestroy() {
		    clearTimeout(this.timer)
		  },
		  mounted () {
		    // 指定时间后销毁组件
		    this.timer =setTimeout(() => {
		      this.$destroy(true) // 销毁组件
		      this.$el.parentNode.removeChild(this.$el) // 父元素中移除dom元素（$el为组件实例）
		    }, this.duration)
		   
		  },
		  methods: {
		    // 点击 icon 触发组件的销毁, 同时触发自定义事件
		    handleClick() {
		      if(this.timer){
		        clearTimeout(this.timer)
		      }
		      this.$destroy(true) // 销毁组件
		      this.$el.parentNode.removeChild(this.$el) 
		      this.$emit('close-event')
		    }
		  },
		
		}
		</script>
		
		  <style lang="scss" scoped>
		  #toast {
		    position: fixed;
		    top: 10px;
		    left: 50%;
		    transform: translateX(-50%);
		    z-index: 9999;
		    p {
		        border-radius: 4px;
		    }
		    .toast-success {
		        background-color: #F0F9EB;
		        color: #67C23A;
		        border: 1px solid #E1F3D8;
		    }
		    .toast-info {
		        background-color: #F4F4F5;
		        color: #909399;
		        border: 1px solid  #EBEEF5;
		    }
		    .toast-warning {
		        background-color: #FDF6EC;
		        color: #E6A23C;
		        border: 1px solid #FAECD8;
		    }
		    .toast-error {
		        background-color: #FEF0F0;
		        color: #F56C6C;
		        border: 1px solid #FDE2E2;
		    }
		    .toast-default {
		        padding: 12px 28px;
		        font-size: 16px;
		    }
		    .toast-small {
		        padding: 10px 16px;
		        font-size: 14px;
		    }
		    .toast-big {
		        padding: 14px 40px;
		        font-size: 18px;
		    }
		    .close-icon {
		      width: 20px;
		      height: 20px;
		      vertical-align: -4px;
		    }
		    
		}
		  </style>

  **(2)挂载到全局**

     通过 vm.$on 给组件绑定事件，这个也是平时经常用到的一个 api
    
    	import Vue from 'vue'
    	import Toast from './toast.vue'
    	
    	// 创建Toast构造器
    	const ToastConstructor = Vue.extend(Toast)
    	let instance
    	
    	function toast (options = {}) {
    	  // 设置默认参数为对象，如果参数为字符串，参数中message属性等于该参数
    	  if (typeof options === 'string') {
    	    options = {
    	      message: options,
    	    }
    	  }
    	  // 创建实例
    	  instance = new ToastConstructor({
    	    data: options
    	  })
    	  
    	  // 注册组件的监听事件
    	  instance.$on('close-event', () => {
    	    console.log('success')
    	  })
    	  
    	  // 将实例挂载到body下
    	  document.body.appendChild(instance.$mount().$el)
    	}
    	
    	// 将Toast组件挂载到vue原型上
    	Vue.prototype.$toast = toast

  **(3)在 main 中引入**    

		import Vue from 'vue'
		import App from './App.vue'
		import router from './router'
		import '@/components/toast/index.js'
		
		new Vue({
		  router,
		  render: h => h(App),
		}).$mount('#app')

  **(4)使用方式**   

 调用提供的全局方法 $toast() 即可 

    	this.$toast({
    	  type: 'error',
    	  size: 'default',
    	  message: '数据请求出错请联系管理员！',
    	  duration: 3000,
    	})

#### 五、Vue.extend源码实现 ####

- Vue.extend 的源码位置：src/core/global-api/extend.js

  	// 定义 Vue.extend 方法   基于 Vue 构造器，创建一个 Vue 的“子类” 
  	export function initExtend (Vue: GlobalAPI) {
  	
  	  // 每个实例构造函数，包括 Vue，都有一个唯一的 cid。
  	  // 这使我们能够为原型继承创建包装的“子构造函数”并缓存它们。
  	  // 这个cid是一个全局唯一的递增的id, 缓存的时候会用到它，形成闭包
  	  Vue.cid = 0
  	  let cid = 1
  	
  	  /**
  	   * Class inheritance
  	   * 基于 Vue 去扩展子类，该子类同样支持进一步的扩展
  	   * 扩展时可以传递一些默认配置，就像 Vue 也会有一些默认配置
  	   * 默认配置如果和基类有冲突则会进行选项合并（mergeOptions)
  	   */
  	  Vue.extend = function (extendOptions: Object): Function {
  	    extendOptions = extendOptions || {}
  	    // 这里的Super就是Vue
  	    const Super = this
  	    const SuperId = Super.cid
  	
  	    // 每次创建完Sub构造函数后，都会把这个函数储存在extendOptions上的_Ctor中
  	    // 下次如果用再同一个extendOptions创建Sub时
  	    // 就会直接从_Ctor返回
  	    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
  	    if (cachedCtors[SuperId]) {
  	      return cachedCtors[SuperId]
  	    }
  	
  	  /**
  	   * 利用缓存，如果存在则直接返回缓存中的构造函数
  	   * 什么情况下可以利用到这个缓存？
  	   *   如果你在多次调用 Vue.extend 时使用了同一个配置项（extendOptions），这时就会启用该缓存
  	   */
  	    
  	  // 验证组件名称
  	    const name = extendOptions.name || Super.options.name
  	    if (process.env.NODE_ENV !== 'production' && name) {
  	      validateComponentName(name)
  	    }
  	    
  	   // 创建 Sub 构造函数，和 Vue 构造函数一样
  	  const Sub = function VueComponent (options) {
  	  	 // 调用 Vue.prototype._init，之后的流程就和首次加载保持一致
  	  	 this._init(options)
  	 }
  	
  	 // 通过原型继承的方式继承 Vue，这里的Super就是Vue
  	  	 Sub.prototype = Object.create(Super.prototype)
  	  	 Sub.prototype.constructor = Sub
  	  	 Sub.cid = cid++
  	
  	// 选项合并，合并 Vue 的配置项到 自己的配置项上来
  	  	 Sub.options = mergeOptions(
  	  	   Super.options,   // Vue 的 options
  	  	   extendOptions   //  组件的 options
  	  	 )
  	  	 Sub['super'] = Super 
  	  	 
  	// 初始化 props，将 props 配置代理到 Sub.prototype._props 对象上
  	// 在组件内通过 this._props 方式可以访问
  	    if (Sub.options.props) {
  	      initProps(Sub)
  	    }
  	
  	// 初始化 computed，将 computed 配置代理到 Sub.prototype 对象上
  	// 在组件内可以通过 this.computedKey 的方式访问
  	  	if (Sub.options.computed) {
  	  	  initComputed(Sub)
  	  	}
  	// allow further extension/mixin/plugin usage
  	// 继承 Vue 的 global-api：extend、mixin、use 这三个静态方法，允许在 Sub 基础上再进一步构造子类
  	    Sub.extend = Super.extend
  	    Sub.mixin = Super.mixin
  	    Sub.use = Super.use
  	
  	// 继承assets的api，比如注册组件(component)，指令(filter)，过滤器(directive) 静态方法
  	    ASSET_TYPES.forEach(function (type) {
  	      Sub[type] = Super[type]
  	    })
  	// 递归组件的原理，如果组件设置了 name 属性，则将自己注册到自己的 components 选项中
  	  	if (name) {
  	  	  Sub.options.components[name] = Sub
  	    }
  	// 在扩展时保留对基类选项的引用。
  	// 稍后在实例化时，我们可以检查 Super 的选项是否具有更新
  	  	Sub.superOptions = Super.options
  	  	Sub.extendOptions = extendOptions
  	  	Sub.sealedOptions = extend({}, Sub.options)
  	  	
  	  	// cache constructor 设置缓存
  	    cachedCtors[SuperId] = Sub
  	    return Sub
  	  }
  	}
  	
  	function initProps (Comp) {
  	  const props = Comp.options.props
  	  for (const key in props) {
  	    proxy(Comp.prototype, `_props`, key)
  	  }
  	}
  	
  	function initComputed (Comp) {
  	  const computed = Comp.options.computed
  	  for (const key in computed) {
  	    defineComputed(Comp.prototype, key, computed[key])
  	  }
  	}
  
- Vue.extend 中实现的流程如下：

  1.创建一个子类构造函数 Sub，并继承父类构造函数 Super 的原型对象。

  2.将子类构造函数的 cid 属性自增，以确保每个组件拥有唯一的 cid。

  3.将父类的选项和子类的选项合并到子类的 options 属性中。

  4.如果子类有 props 或 computed 属性，则在子类的原型对象上定义代理属性，避免每次实例化时都需要调用 Object.defineProperty。

  5.将父类的 extend、mixin 和 use 方法复制到子类上，以便子类可以继续扩展。

  6.继承父类身上的assets的api。

  7.如果子类有 name 属性，则将子类注册到父类的 components 选项中。

  8.缓存子类构造函数，避免重复创建。

- 在 Vue.extend 中实现 Vue 的继承，创建了一个子类 Sub ，将 Vue上的各种配置项合并到自身最终将子类返回。

		// 创建 Sub 构造函数，和 Vue 构造函数一样
		const Sub = function VueComponent (options) {
		  // 调用 Vue.prototype._init，之后的流程就和首次加载保持一致
		  this._init(options)
		}

- Vue.extend 返回的子类实例化时，执行的就是上面从 Vue 原型上继承到的  _init() 方法

#### 六、_init() 组件初始化 ####

- 原型上的 _init() 在 initMixin 中被定义 源码位置位于src\core\instance\init.js
		
		export function initMixin(Vue: Class<Component>) {
		  Vue.prototype._init = function (options?: Object) {
		    const vm: Component = this
		    // a uid 每个实例都有一个 uid 每实例化一个 uid + 1
		    vm._uid = uid++
		
		    let startTag, endTag
		    /* istanbul ignore if */
		    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
		      startTag = `vue-perf-start:${vm._uid}`
		      endTag = `vue-perf-end:${vm._uid}`
		      mark(startTag)
		    }
		
		    // a flag to avoid this being observed
		    vm._isVue = true
		    // 合并选项
		    if (options && options._isComponent) {
		      // 子组件的初始化
		      initInternalComponent(vm, options)
		    } else {
		      vm.$options = mergeOptions(
		        // 根组件走这里  选项合并  将全局配置选项合并到根组件的局部配置上
		        resolveConstructorOptions(vm.constructor),
		        options || {},
		        vm
		      )
		    }
		    if (process.env.NODE_ENV !== 'production') {
		      // initProxy给实例创建proxy代理 ，代理的位置在vm._renderProxy
		      initProxy(vm)
		    } else {
		      vm._renderProxy = vm
		    }
		    // expose real self
		    vm._self = vm
		    
		    //   初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等
		    initLifecycle(vm)  
		    
		    /**
		     * 初始化自定义事件，这里需要注意一点，我们在 <comp @click="handleClick" /> 上注册的事件，
		     * 监听者不是父组件，而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
		    */
		    initEvents(vm)
		
		    //  渲染初始化 初始化插槽  获取 this.$slots 定义 this._c 即 createElement() 用于创建 VNode
		    //  通常也称为 h 函数
		    initRender(vm)
		
		    // 执行 beforeCreate 生命周期钩子函数
		    callHook(vm, 'beforeCreate')
		
		    // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，
		    // 对结果数据进行响应式处理，并代理每个 key 到 vm 实例
		    initInjections(vm)
		
		    // 数据响应式的重点，处理 props、methods、data、computed、watch
		    initState(vm)
		
		    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
		    initProvide(vm) // resolve provide after data/props
		
		    // 执行 created 生命周期钩子函数
		    callHook(vm, 'created')
		
		    /* istanbul ignore if */
		    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
		      vm._name = formatComponentName(vm, false)
		      mark(endTag)
		      measure(`vue ${vm._name} init`, startTag, endTag)
		    }
		
		    // 如果发现配置项上有 el 选项,则自动调用 $mount 方法
		    // el 选项为 Vue 实例的挂载目标，
		    if (vm.$options.el) {
		      vm.$mount(vm.$options.el)
		    }
		  }
		}

- _init() 方法是 Vue  实例初始化过程中的核心方法，它完成了组件实例的初始化、状态的初始化、事件的初始化以及渲染相关的属性和方法的初始化等工作。

- 实例化时的合并选项过程中判断 会对实例化的传参进行判断

		// 合并选项
		if (options && options._isComponent) {
		  // 初始化组件实例的内部属性
		  initInternalComponent(vm, options)
		} else {
		  /*
		  *  mergeOptions 合并构造函数和用户传入的选项，得到最终的选项对象，
		  *  并将其赋值给 vm.$options 属性。
		  */
		  vm.$options = mergeOptions(
		    // 获取构造函数上的选项
		    resolveConstructorOptions(vm.constructor),
		    options || {},
		    vm
		  )
		}

- 在合并选项时通过 resolveConstructorOptions 获取构造函数上的配置项 即 Sub.options，

- 将 Sub.options 和 new Profile() 传入的 options 合并，再赋值给实例的 vm.$options 属性，得到最终配置项。

- 在 _init 的最后判断是否需要将组件进行挂载

    ```
    // 如果发现配置项上有 el 选项,则自动调用 $mount 方法
    // el 选项为 Vue 实例的挂载目标，
      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      }
    ```

- 由于我们在实例化时没有传入任何配置项，所以在 _init 的最后是不会进行挂载的，此时需要我们手动执行进行挂载，所以你才会看到例子中的new Profile().$mount('#mount-point')的挂载方法，

- 其中 $mount('#mount-point') 表示将组件创建的实例挂载到 #mount-point 元素上。

- 那么通过源码的解读我们能发现另一种挂载方式：在组件实例化时配置挂载的 el 选项 new Profile({ el: '#mount-point' })

#### 七、$mount 的实现原理 ####

- 这里  简单的介绍一下 $mount 的原理：在 vm.$mount 方法中，会根据传入的 el 参数获取到对应的 DOM 元素，然后通过 updateComponent 方法创建一个渲染 Watcher 对象，并将其挂载到 Vue 实例上。

- 渲染 Watcher 对象会在数据发生变化时重新渲染视图，并将渲染结果更新到对应的 DOM 元素上。



