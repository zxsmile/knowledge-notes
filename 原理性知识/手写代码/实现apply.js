// 1.参数字符串，布尔，数值会报错
// 2.参数为undefined，null，除了arguments的对象会返回undefined
// 3.所以用arguments的属性callee（返回正在执行的函数）来区分arguments对象和别的对象

Function.prototype.myApply = function(newThis,argArr){
    newThis = newThis ? Object(newThis) : window
	newThis.fn = this
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
        result = newThis.fn(...argArr)
	}else{
        result = newThis.fn()
    }
    delete newThis.fn
	return result     
}