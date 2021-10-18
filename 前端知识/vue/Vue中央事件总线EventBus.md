#### 一、原理 ####

- BUS总线实际上就是一个发布订阅模式，中央事件总线EventBus的实质就是创建一个Vue实例，通过一个空的Vue实例作为中间桥梁，使用Vue实例方法$emit和$on发送事件和监听事件来实现组件之间传值的目的

#### 二、作用 ####

- 它是非父子组件之间传值的一种解决方案

#### 三、适用场景 ####

- BUS总线和Vuex都可用于非父子组件之间传值，BUS总线适用于小项目，数据被更少组件使用的项目。而Vuex则适用于大中型项目，数据在多组件之间公用的情况

#### 四、使用BUS总线 ####

1. 使用一个空的Vue实例(bus.js)作为中央事件总线

   - （1）创建一个bus.js文件

			import Vue from 'vue';
			const bus = new Vue();
			export default bus;

   - （2）使用

	         import bus from ./bus.js
	
	         bus.$emit('getMessage','lalala')
	      
	         bus.$on('getMessage',function(msg){console.log(msg)})

2. 把bus定义在vue的prototype上，在全局都可以使用

		    main.js中加入如下代码
		
			const bus = new Vue()
			
			Vue.prototype.$bus = bus
			
			这样我们就不需要再自己写bus.js引入了，就可以直接再组建中使用
			
			this.$bus.on()，this.$bus.$emit()，this.$bus.$off()

 
         
3. 将bus封装成一个vue的插件，可以在所有组件之间任意使用，而不需要导入

   - (1)新建一个bus.js文件

		     let install = function(Vue){
		
		        let Bus = new Vue({
		         
		            //定义方法
		            methods:{
		      
		                emit(event,...args){
		
			              this.$emit(event,...args);
		
				        },
		
				        on(event,callback){
		
				           this.$on(event,callback);
				        },
		
				        off(event,callback){
		
				           this.$off(event,callback);
				        }
		              
		            }
		
		        })
		
		        //注册到给vue对象的原型上添加全局属性
				Vue.prototype.$bus = Bus;
				
		    }
		
		    export default install;


   - (2)在main.js中引入bus.js，并使用。

			import Bus from './store/bus'
				
			Vue.use(Bus)
			这样就可以在组件中使用了。使用的时候需要通过this.$bus.方法(即emit,on,off)，可以传递字符串，数组，函数等.