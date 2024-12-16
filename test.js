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

function observe(data){
    
}