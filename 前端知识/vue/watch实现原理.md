#### 一、先看watch的使用方式 ####

		new Vue({
		    el: '#app',
		    data() {
		        return {
		            a: 1,
		            b: {
		                c: 2,
		                d: {
		                    e: 5
		                }
		            }
		        }
		    },
		    
		    computed: {
		        computedA() {
		            return this.a + 10;
		        },        
		    },
		    
		    watch: {
		        computedA(newVal, oldVal) {
		            console.log(newVal);
		        },
		        
		        a(newVal, oldVal) {
		            console.log(newVal);
		        },
		        
		        b: {
		            deep: true,
		            handler(newVal) {
		                console.log(newVal);
		            }
		        }
		    }
		})


#### 二、initWatch ####

- watch的执行过程：Vue -> _init -> initState -> initWatch


