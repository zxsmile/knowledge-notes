一、promise

1.Promise.all()

   - Promise.all()接受一个数组作为参数，数组成员都是promise对象，当数组中的所有promise对象的状态变为resloved的时候，Promise.all()的状态就会变为resloved；当有一个状态变为rejected的时候，Promise.all()的状态就会变为rejected；
   - 调用then方法时，结果成功的回调函数的参数也是一个数组，按照顺序保存着每一个promise对象reslove执行的值；结果失败的回调函数的参数是第一个变为rejected的promise对象的reject执行的值；
   - Promise.all()可以解决异步并行的问题

     例1：
        let promise1 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       resolve(1);
			},10000)
		})
		
		let promise2 = new Promise((reslove,reject)=>{
		   setTimeout(()=>{
		      resolve(2);
		   },9000)
		})
		
		let promise3 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       resolve(3);
			},11000)
		})
		
		let promiseAll = Promise.all([promise1,promise2,promise3])
		
		promiseAll.then((res)=>{
		    console.log(res) // 进入成功的回调，输出[1,2,3]
		},(err)=>{
		    console.log(err)
		})

    - 上例也表明，与哪个promise的状态先变成resolved无关

    例2：
        let promise1 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       reject(1);
			},10000)
		})
		
		let promise2 = new Promise((reslove,reject)=>{
		   setTimeout(()=>{
		      reject(2);
		   },9000)
		})
		
		let promise3 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       reslove(3);
			},11000)
		})
		
		let promiseAll = Promise.all([promise1,promise2,promise3])
		
		promiseAll.then((res)=>{
		    console.log(res) 
		},(err)=>{
		    console.log(err) // 进入失败的回调，promise2先进入rejected，所以输出2
		})

    
    例3：
        let promise1 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       console.log(1)
			},10000)
		})
		
		let promise2 = new Promise((reslove,reject)=>{
		   setTimeout(()=>{
		      reslove(2);
		   },9000)
		})
		
		let promise3 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       console.log(3);
			},11000)
		})
		
		let promiseAll = Promise.all([promise1,promise2,promise3])
		
		promiseAll.then((res)=>{
		    console.log(res) 
		},(err)=>{
		    console.log(err) 
		})

    - 上例中只会输出1，3但不会执行then里面的回调，是因为promise里面的代码是同步执行的所以里面的console.log会输出，但promise.all()的状态是pedding，所以不会执行then

    例4：
        let promise1 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       reject(1)
			},10000)
		})
		
		let promise2 = new Promise((reslove,reject)=>{
		   setTimeout(()=>{
		      console.log(2);
		   },9000)
		})
		
		let promise3 = new Promise((reslove,reject)=>{
		    setTimeout(()=>{
		       console.log(3);
			},11000)
		})
		
		let promiseAll = Promise.all([promise1,promise2,promise3])
		
		promiseAll.then((res)=>{
		    console.log(res) 
		},(err)=>{
		    console.log(err) 
		})

    - 上例会输出2，1，3，是因为promise1的状态变为rejected，所以会执行then里面的失败回调，而两个console是同步的依然会执行


 - 由例3和例4可以看出，只要有一个状态为rejected，Promise.all()的状态就会变为rejected，当所有状态为resloved的时候Promise.all()的状态才会变为resloved

2.Promise.race()

   - Promise.race()也是接受一个数组，数组里面的成员为promise对象，它就相当于竞赛一样，第一个promise对象的状态变为resloved的时候，Promise.race()的状态就变为resloved,第一个promise的状态变为rejectd的时候，Promise.race()的状态就变为rejected
   

    例1：
        let promise1 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       reject(1);
			},10000)
		});
		let promise2 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       resolve(2);
			},9000)
		});
		let promise3 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       resolve(3);
			},11000)
		});
		
		let promiseRace = Promise.race([promise1,promise2,promise3])
		
		promiseRace.then((res)=>{
		    console.log(res) // promise2的状态先发生变化，变为resloved,所以Promise.race的状态变为resloved，输出2
		},(err)=>{
		    console.log(err)
		})
		

    例2：
        let promise1 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       reject(1);
			},10000)
		});
		let promise2 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       reject(2)
			},9000)
		});
		let promise3 = new Promise((resolve,reject)=>{
			setTimeout(()=>{
		       resolve(3);
			},11000)
		});
		
		let promiseRace = Promise.race([promise1,promise2,promise3])
		
		promiseRace.then((res)=>{
		    console.log(res) // promise2的状态先发生变化，变为rejectd,所以Promise.race的状态变为rejected，输出2
		},(err)=>{
		    console.log(err)
		})

3.使用Promise.race()实现超时处理

	let promise1 = new Promise((reslove,reject)=>{
	    setTimeout(()=>{
	       reslove(1)
	    },3000)
	})
	
	let promise2 = new Promise((reslove,reject)=>{
	   setTimeout(()=>{
	      reject(2);
	   },2000)
	})
	
	let promise3 = new Promise((reslove,reject)=>{
	    setTimeout(()=>{
	      reslove(3);
	    },5000)
	})
	
	let promiseAll = Promise.all([promise1,promise2,promise3])
	
   // 超时处理

	function timeoutPromise(promise,delay){
	
	    let timeout = new Promise((reslove,reject)=>{
	        setTimeout(()=>{
	            reject('异步处理超时')
	        },delay)
	    })
	    
	    let promiseRace = Promise.race([promise,timeout])
	    return promiseRace
	}
	


	timeoutPromise(promiseAll,1000).then((res)=>{
	    console.log(res) 
	},(err)=>{
	    console.log(err) 
	})
	
	



