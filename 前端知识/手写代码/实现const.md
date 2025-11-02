```
function newConst(key,val){
    let dsc={
        value:val,
        writable:false
    }

    Object.defineProperty(window,key,dsc)

}

newConst('a',3)
a=6
console.log(a) //3



function newConst(key,val){
    window.key = val
    let dsc={
        get:()=>{
          return val
        },
        set:(value)=>{
          throw '不能改写'
        }
    }

    Object.defineProperty(window,key,dsc)

}
newConst('a',3)
a=6
console.log(a) 

//报错

//注：value或者writable不能和set和get同时出现
```

