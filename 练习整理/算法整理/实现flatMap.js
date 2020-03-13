/* 1. map + flat

function flatMap(arr,fn){

        var newArr=arr.map((x)=>{
            return fn(x)
        })

        var newArr1 = newArr.flat()

        return newArr1

}

var arr=[1,2,3]
var fn = function(x){
    return x=[x*2]
}
var newArr =flatMap(arr,fn)
console.log(newArr) //[2,4,6]

2.reduce + flat




*/