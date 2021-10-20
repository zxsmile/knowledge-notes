// 1.参数字符串，布尔，数值会报错
// 2.参数为undefined，null，除了arguments的对象会返回undefined
// 3.所以用arguments的属性callee（返回正在执行的函数）来区分arguments对象和别的对象

Function.prototype.myApply = function(newThis,argArr){
	//this指的是调用apply的函数
    if(typeof this !== 'function'){
        throw new TypeError(this + ' is not a function');
    }
    newThis = newThis ? Object(newThis) : window
	//newThis.fn = this
	//使用Symbol()
  let fn = Symbol()
  newThis[fn] = this
	//使用缓存
	// let originalVal = newThis.fn;
    // let hasOriginalVal = newThis.hasOwnProperty(fn);
	// newThis.fn = this
	
	let result
        
    if(argArr){
		let errArr = ['string','boolean','number']
		let argRes = typeof argArr
		if(errArr.includes(argRes)){
			throw '参数有误'
		}
		let objErrArr = ['undefined','null','function']
		if((argRes==='object'&& !argArr.callee) || objErrArr.includes(argRes)){
			return undefined
		}
		//使用symbol()
		result = newThis[fn](...argArr)
		//使用缓存
		//result = newThis.fn(...argArr)
	}else{
		//使用symbol()
		result = newThis[fn]()
		//使用缓存
		//result = newThis.fn()
	}
	//使用symbol()
	delete newThis[fn]
	//使用缓存
	//delete newThis.fn
	// if(hasOriginalVal){
    //     newThis.fn = originalVal
    // }
	return result     
}

let obj = {
    name:'milk',
    fn:5
  }
  
  function bar(){
    console.log(this.name)
    return 6
  }
  
  console.log(bar.myApply(obj,null))
  console.log(obj.fn)