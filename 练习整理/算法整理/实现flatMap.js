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

2.reduce 

function flatArr(arr,fn){
    return arr.reduce(function(prev, next){
           
         return prev.concat(fn(next))
        }, [])
  }
      
var arr = [1,2,3,4,5,6]
var fn = function(x){
    return x=[[x*2]]
}

console.log(flatArr(arr,fn)) // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ], [ 10 ], [ 12 ] ]

3.map+concat+apply

function flatArr(arr,fn){
    var newArr=arr.map((x)=>{
        return fn(x)
    })

    return [].concat.apply([],newArr)

  }

    var arr = [1,2,3,4,5,6]
    var fn = function(x){
        return x=[[x*2]]
    }

    console.log(flatArr(arr,fn)) // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ], [ 10 ], [ 12 ] ]


*/