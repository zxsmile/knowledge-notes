#### 一、父组件向子组件传值 ####

  1. 父组件通过属性的方式向子组件传值，子组件通过props来接收

     - (1)使用

        - 在父组件的子组件标签中绑定自定义属性

		          // 父组件
		
				<user-detail :myName="name" />
				    
				export default {
				    components: {
				        UserDetail
				    }
				    ......
				}

       - 在子组件中使用props（可以是数组也可以是对象）接收即可。可以传多个属性。
		
		        // 子组件
		
				export default {
				    props: ['myName']
				}
				​
				/*
				props: { myName: String } //这样指定传入的类型，如果类型不对会警告
				props: { myName: [String, Number] } // 多个可能的类型
				props: { myName: { type: String, requires: true } } //requires为true表示这个值必传
		        props: { myName: { type: String, default: '123' } } //有默认值123
		
		        // 数组/对象的默认值应当由一个工厂函数返回
		
				props: { 
				    childMsg: { 
				        type: Array, 
				        default: () => [] // default指定默认值
		                //default：function（）{return []}
				    }
				}  
		 
		        // 自定义验证函数
		
		        props: {
			      message：{
		             validator: function (value) {
			              return value > 10
			         }
		          }
			    }  //message值必须大于10
		
				如果 props 验证失败，会在控制台发出一个警告。
				*/


    - (2)单向数据流

       - props是单向绑定的，当父组件的属性变化时，将传给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态。
       - 另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着不应该在子组件内部改变 prop。如果这么做了，Vue 会在控制台给出警告

    - (3)修改props数据

       - 修改prop中的数据，通常有以下两种原因

          - prop 作为初始值传入后，子组件想把它当作局部数据来用
          - prop 作为初始值传入，由子组件处理成其它数据输出
        
       - 对于这两种情况的应对方案有：

         -  <1>.定义一个局部变量，并用 prop 的值初始化它

	                props: ['initialCounter'],
					data: function () {
					  return { counter: this.initialCounter }
					}

         - 但是，定义的局部变量counter只能接受initialCounter的初始值，当父组件要传递的值发生变化时，counter无法接收到最新值

         - <2>.更加妥帖的方案是，使用变量储存prop的初始值，并使用watch来观察prop的值的变化。发生变化时，更新变量的值

	                  props:['childMsg'],
					  data(){
					    return{
					      temp:this.childMsg
					    }
					  },
					  watch:{
					    childMsg(){
					      this.temp = this.childMsg
					    }
					  }


         - 注意：上面方法对于传过来的值是简单数据类型，是可以在子组件中修改，也不会影响其他兄弟组件内同样调用了来自该父组件的值，但是如果引用类型的值，当在子组件中修改后，父组件的也会修改，因其数据是公用的，其他同样引用了该值的子组件也会跟着被修改。可以理解成父组件传递给子组件的值，就相当于复制了一个副本，这个副本的指针还是指向父组件中的那个，即共享同一个引用。所以除非有特殊需要，否则不要轻易修改。

#### 二、子组件向父组件传值 ####

 1. 子组件绑定一个事件，通过this.$emit()来触发
 2. 通过 $parent / $children 或 $refs 访问组件实例

     - 这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据。

				// 子组件
				export default {
				  data () {
				    return {
				      title: '子组件'
				    }
				  },
				  methods: {
				    sayHello () {
				        console.log('Hello');
				    }
				  }
				}
		
				// 父组件
				<template>
				  <child ref="childRef" />
				</template>
				​
				<script>
				  export default {
				    created () {
				      // 通过 $ref 来访问子组件
				      console.log(this.$refs.childRef.title);  // 子组件
				      this.$refs.childRef.sayHello(); // Hello
				      
				      // 通过 $children 来调用子组件的方法
				      this.$children.sayHello(); // Hello 
				    }
				  }
				</script>
		

  - 注：这种方式的组件通信不能跨级。
  
3. 通过callback函数

   - 先在父组件中定义一个callback函数，并把callback函数传过去

	            // 父组件
				<child :callback="callback"></child>
				​
				methods: {
				    callback: function(name) {
				        this.name = name
				    }
				}

   - 在子组件中接收并执行callback

	            // 子组件
				<button @click="callback('Jack')">改变父组件的name</button>
				​
				props: {
				    callback: Function,
				}
	
	  