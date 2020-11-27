//1.接收一个参数列表，参数值为任意类型都可以

Function.prototype.myCall = function(newThis){
    newThis = newThis?object(newThis):window
    newThis.fn = this
    let result
    let args = [...arguments].slice(1)
    result = newThis.fn(...args)
    delete newThis.fn
    return result
}