class observer{
    constructor() {
        this.walk(value)
    }
    walk(data) {
        let keys = Object.keys(data)
        for(var i=0;i<keys.length;i++){
            let key = keys[i]
            let value = data[key]
            defineReactive(data,key,value)
        }
    }
}


function defineReactive(data,key,value){
    observer(value)
    Object.defineProperty(data,key,{
        get() {
            //需要做依赖收集过程，这里代码没有写出来
            return value
        },
        set(newValue) {
            if(newValue===value){
                return 
            }
            //需要做派发更新过程，这里没写出来
            value = newValue
        }
    })
}

function observe(value){
 //如果传过来的是对象或者数组，进行属性劫持
  if(Object.prototype.toString.call(value)==="[Object,Object]" || Array.isArray(value)){
      return new observer(value)
  }
}