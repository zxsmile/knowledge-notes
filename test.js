new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')

function Vue(options) {
    this._init(options)
}

initMixin(Vue)

function initMixin(Vue) {
    Vue.prototype._init = function(options){
      let vm = this
      vm.$options = options
      initState(vm)
    }
}

function initState(vm) {
   let opt = vm.$options
   if(opt.props){
       initProps(vm)
   }
   initSetup(vm)
   if(opt.methods){
       initMethod(vm)
   }
   if(opt.data){
       initData(vm)
   }
   if(opt.computed){
       initComputed(vm)
   }
   if(opt.watch){
       initWatch(vm)
   }
}


new Vue({
    router,
    store,
    render:h => h(App)
}).$mount('#app')

function Vue(options) {
  this._init(options)
}

initMixin(Vue)

function initMixin(Vue){
    Vue.prototype._init = function(options) {
        let vm = this
        vm.$options = options
        initState(vm)
    }
}

function initState(vm){
    let opts = vm.$options
    if(opts.props){
        initProps(vm)
    }
    initSetup(vm)
    if(opts.methods){
        initMethods(vm)
    }

    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    if(Object.prototype.toString.call(data) !== '[object Object]'){
        return new Error('data functions should return an object')
    }

    let keys = Object.keys(data)
    for(let key in keys){
        proxy(vm,'_data',key)
    }

    observe(data)
}

function proxy(obj,sourceKey,key){
   Object.defineProperty(obj,sourceKey,{
       get() {
           return obj[sourceKey][key]
       },
       set(val) {
           obj[sourceKey][key] = val
       }
   })
}

let hasOwnPrototype = Object.prototype.hasOwnPrototype
function hasOwn (obj,key) {
  return hasOwnPrototype.call(obj,key)
}
function observe(data) {
    if(data && hasOwn(data,'__ob__') && data.__ob__ instanceof Observer){
        return data.__ob__
    }

    if(Array.isArray(data) || Object.prototype.toString.call(data) === '[object Object]'){
        new Observer(data)
    }
}

class Observer{
    constructor(data) {
        Object.defineProperty(data,'__ob__',{
            value:this,
            enumerable:false,
            writable:true,
            configurable:true,
        })

        if(Array.isArray(data)){
            data.__proto__ = arrayMethods
            this.observeArray(data);
        }else{
            this.walk(data)
        }
    }
    walk(data) {
        let keys = Object.keys(data)   
        for(let key in keys){
            defineReactive(data,key,data[key])
        } 
    }
    observeArray() {
        data.forEach(item => {
            observe(item)
        })
    }
}

function defineReactive(obj,key,value) {
    observe(value)
    Object.defineProperty(obj,key,{
        get() {
            return value
        },

        set(newVal){
          if(newVal === value){
              return 
          }
          obj[key] = newVal
        }
    })
}

let arrayProto = Array.prototype
export default arrayMethods = Object.create(arrayProto)

let methodsPath = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reserve'
]

methodsPath.forEach(method => {
    Object.defineProperty(arrayMethods,item,function mutator(...arg){
         let result = arrayProto[method].apply(this,arg)
         let ob = this.__ob__
         let inserted

         switch(item){
             case push:
             case unshift:
                inserted = arg
              break;

             case splice: 
                inserted = arg.slice(2)

              break;

              default:
              break;
         }

         if(inserted){
            ob.observeArray(inserted)
         }
         return result
    })
})