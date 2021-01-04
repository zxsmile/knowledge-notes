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
