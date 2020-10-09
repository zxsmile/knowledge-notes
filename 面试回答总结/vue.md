一、vuex

  vuex是专门为vue提供的一个用于管理数据状态，提供统一数据操作的生态系统。它的属性主要有state,getters,mutations,actions,module。

    - state就是用来存储数据，存储状态的，可以用this.$store.state来访问，它里面存储数据是响应式的，如果数据发生变化组件也会更新（Store类里将用户传入的state包装成data，作为new Vue的参数，从而实现了state 值的响应式）。有时候我们一个组件需要从store中获取多个状态时，我们可以通过mapState把state映射到组件的computed计算属性中。

           import {mapState} form 'vuex'

            computed：{
              ...mapState({
                 count:state=>state.count
              })
            }
    - getters就相当于store的计算属性,可以使用this.$store.getters,也可以使用mapGetters将store中的getter映射到组件的computed计算属性中

         import {mapGetters} from 'vuex'

         computed:{
            ...mapGetter([
               'doneTodosCount',
               'anotherGetter',
            ])
         }

       如果你想将一个 getter 属性另取一个名字，使用对象形式：

      ...mapGetters({
		  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
		  doneCount: 'doneTodosCount'
		})

    - mutations：更改store中的状态的唯一方式就是提交mutations，使用commit来提交mutations。在组件中可以使用this.$store.commit('xxx',{count:0}),也可以使用mapMutations将store中的mutions映射到组件的methods中

       import {mapMutations} from 'vuex'

        methods:{
            ...mapMutation([
               'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
               'incrementBy' 
            ])

            或者

           ...mapMutations({
              add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
           })
        }
    - actions是用于异步操作，通过提交mutations间接更改store的状态。存在异步时，通过dispatch来触发actions中的方法，actions中的commit可以触发mutations中的方法，然后就更改了store中的状态,在组件中使用this.$store.dispath('xxx')来分发actions,也可以使用mapActions将store中的actions映射到组件中的methods中

       import {mapActions} from 'vuex'

       methods:{
         ...mapActions([
           'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
	       'incrementBy'
         ])

        或者

       ...mapActions({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
	    })
       }

    - module可以将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

二、this.$router.push()

   1.query传参

      - 页面跳转
      
          - 不带参数
	
	           this.$router.push('/home')
	           this.$router.push({name:'/home'})
	           this.$router.push({path:'/home'})
	
          - 带参数
	
	           this.$router.push({name:'/home',query:{id:1}})
	           this.$router.push({path:'/home',query:{id:1}})

      - 路由配置

           {path:'/city',name:'City',component:City}

      - 接收参数

           this.$route.query.id

   2.params传参

      - 页面跳转
      
           this.$router.push({name:'home',params: {id:'1'}}) 

      - 路由配置

           {path:'/city/:id',name:'City',component:City}

      - 接收参数

           this.$route.params.id

  3.query和params的区别

     - query使用name或者path都可以，params只能使用name
     - query就相当于get请求，跳转之后会自动拼接上参数；而params就相当于post请求，跳转之后页面url后面不会拼接参数，也就是说使用params不在路由配参数跳转，只有第一次进入页面参数有效，刷新页面参数就会消失
     - 所以由于第二点，query不需要在路由配置参数，而params需要在路由配置参数
     
  4.router和route的区别

      - router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象,经常用的跳转链接就可以用this.$router.push，和router-link跳转一样
      - route相当于当前正在跳转的路由对象,可以从里面获取name,path,params,query等。

  5.path:'name'和path:'/name'的区别

       - 如果加/则会被当作跟目录，否则当前的路径会嵌套在之前的路径中

            //比如当前路径是home
			this.$router.push({path:'name'})//==>path为/home/name
			this.$router.push({path:'/name'})//==>path为/name

三、vue数组的双向绑定原理

    - 我们所知道的利用Object.defineProperty方法可以将对象的属性改为getter/setter,但对于数组就无能为力了，所以对于数组，vue内部利用数组的属性实现了一组观察数组的变异的方法，例如：push,pop,shift
    
    - 下面先看push的实现
 
        //定义一个监听变化的数组

        let obarr = []

        //copy一份数组的原型方法,防止污染原生数组方法

		const arrayProto = Array.prototype
		const arrayMethods = Object.create(arrayProto)	

       //我们先把arrayMethods对象上的push转换为观察者对象

		Object.defineProperty(arrayMethods,'push',{
		    value:function mutator(){
		    	console.log('obarr.push会走这里')
		    }
		})

       //使用arrayMethods覆盖obarr的所有方法
    
       obarr.__proto__ = arrayMethods

   - 上面代码中，arrayMethods对象的push属性的值是一个函数，所以调用它，会打印出'obarr.push会走这里'


   - 针对于不支持__proto__的浏览器实现如下：

 
		let obarr = []
		const arrayProto = Array.prototype
		const arrayMethods = Object.create(arrayProto)	
		Object.defineProperty(arrayMethods,'push',{
		    value:function mutator(){
		    	console.log('obarr.push会走这里')
		    }
		})
		Object.defineProperty(obarr,'push',{
			value:arrayMethods.push
		})

  - 下面再来看真正的push实现：

        let obarr = []
        let arrayMethods = Object.create(Array.prototype)
        Object.defineProperty(arrayMethods,'push',{
            value:function mutator(){
                  //缓存原生方法，之后调用
                 let original = Array,prototype.push
                 let args = Array.from(arguments)
                 original.apply(this,args)
            }
        })
      
       obarr.__proto__ = arrayMethods

- 其他的方法同理，我们只需要把所有需要实现的方法循环遍历执行即可

	const arrayProto = Array.prototype
	const arrayMethods = Object.create(arrayProto)
	;[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	].forEach(item=>{
		Object.defineProperty(arrayMethods,item,{
		    value:function mutator(){
		    	//缓存原生方法，之后调用
		    	const original = arrayProto[item]	
		    	let args = Array.from(arguments)
			    original.apply(this,args)
		    },
		})
	})
	function protoAugment (target,src) {
	  target.__proto__ = src
	}
	// 调用
	let obarr = []
	protoAugment(obarr, arrayMethods)

- 分析：

    - 经过以上的代码可以看出，只会更改我们给定数组(obarr)的相关方法，而不会污染Array的原生方法，因此其他普通数组不受影响。

    - 从新赋值数组的__proto__属性为arrayMethods，而arrayMethods我们从新定义了push，pop等相关属性方法，因此当我们使用数组的push,pop等方法时会调用arrayMethods的相关属性方法，达到监听数组变化的能力。

    - 对于不支持__proto__属性的浏览器，直接使用Object.defineProperty从新定义相关属性。

    - 而Vue的实现方法正如上，更改我们需要监听的Array数组属性值（属性值为函数），在监听函数里执行数组的原生方法，并通知所有注册的观察者进行响应式处理。

