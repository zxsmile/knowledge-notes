new Vue({
    router,
    store,
    render:(h)=>h(App)
}).$mount('app')

function Vue(options){
    this._init(options)
}

initMixin(Vue)

function initMixin(Vue){
    Vue.prototype._init = function(options){
        const vm = this
        vm.$options = options
        initState(vm)
    }
}

function initState(vm){
    let opts = vm.$options
    if(opts.props){
        initProps(vm)
    }
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
        return new Error('data function should return an object')
    }
    
    for(let key in data){
        proxy(vm,'_data',key)
    }

    observe(data)
}

function proxy(object,sourceKey,key){
    Object.defineProperty(object,key,{
        get() {
            return object[sourceKey][key]
        },

        set(val) {
            object[sourceKey][key] = val
        }
    })
}


new Vue({
    router,
    store,
    render:(h) => h(App)
}).$mount('#app')

function Vue(options){
    this._init(options)
}

initMixin(Vue)

function initMixin(Vue){
    Vue.prototype._init = function (options) {
        let vm = this
        vm.$options = options
        initState(vm)
    }
}

function initState (vm) {
    let opts = vm.$options
    if(opts.props){
        initProps(vm)
    }
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
        initWatch()
    }
}

function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    if(Object.prototype.toString.call(data) !== '[object Object]'){
        return new Error('data function should be return an Object')
    }

    for(let key in data){
        proxy(vm,'_data',key)
    }

    observe(data)
    
}

function proxy(obj, sourceKey, key){
    Object.defineProperty(obj,key,  {
        get() {
            return obj[sourceKey][key]
        },
        set(val) {
            obj[sourceKey][key] = val
        }
    })
}
function hasOwnProperty(){
    
}

function observe(data){
    if(data && data.__ob__)
}

new Vue({
    router,
    store,
    render:(h)=>h(App)
}).$mount('#app')

function Vue(options) {
    this._init(options)
}

initMixin(Vue)

function initMixin(Vue){
    Vue.prototype._init = function (options) {
       let vm  = this
       vm.$options = options
       initState(vm)
    }
}

function initState(vm) {
    let opt =  vm.$options
    if(opt.props) {
        initProps(vm)
    }
    if(opt.methods){
        initMethods(vm)
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

function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'?data.call(vm):data||{}
    if(Object.prototype.toString(data) !== '[object Object]'){
        return new Error('data must be object')
    }
    for(let key in data){
        proxy(vm,'_data',key)
    }
    observe(data)
}

function proxy(obj,sourceKey,key) {
    Object.defineProperty(obj,key,{
        get() {
            return obj[sourceKey][key]
        },
        set(val) {
            obj[sourceKey][key] = val
        }
    })
}

function hasOwn(data,key) {
    return Object.prototype. .call(data,key)
}

function observe(data) {
    if(data && hasOwn(data,'__ob__') && data.__ob__ instanceof Observer){
        return data.__ob__
    }
    if(Object.prototype.toString(data) === '[object Object]' || Array.isArray(data)){
        new Observer(data)
    }
}

class Observer{
    constructor(data) {
        Object.definePropertype(data,'__ob__',{
            value:this,
            enumerable:false,
            writable:true,
            configurable:true
        })
       if(Array.isArray(data)){
           data.__proto = arrayMethods
           this.obseveArray(data)

       }else{
           this.walk(data)
       }
    }
    walk(data) {
        for(let key in data){
            let value = data[key]
            defineReactive(data,key,value)
        } 
    }
    obseveArray(data) {
      for(let key in data){
        observe(data[key])
      }
    }
}

function defineReactive(data,key,value) {
    observe(value)
    Object.defineProperty(data,key,{
        get() {
            return value
        },
        set(newVal) {
            if(value === newVal){
                return 
            }
            value = newVal
        }
    })
}

const arrayProto = Array.prototype
export arrayMethods = Object.create(arrayProto)

let methodsToPath = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'reserve',
    'sort'
]

methodsToPath.forEach(method => {
    arrayMethods[method] = function(...arg){
        let result = arrayProto[method].apply(this,arg)
        let ob = this.__ob__
        let inserted;
        switch(method){
           case 'push':
           case 'unshift':
            inserted = arg;
            break;
    
          case 'splice':
            inserted = arg.slice(2);
            break;
          default:
              break;
        }
        if(inserted){
            ob.obseveArray(inserted)
        }
        return result
    }

   
})



new Vue({
    router,
    render:(h) => h(APP)
}).$mount('#app')

function Vue(options) {
    this._init(options)
}

initMixin(Vue)

function initMixin(Vue) {
    Vue.prototype._init = function(options){
        let vm = this
        vm.$options = 
    }
}