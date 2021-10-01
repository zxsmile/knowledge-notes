class Vue{
  constructor(options) {
     this.data = options.data
     this.observe(this.data,options.render)
  }
  observe(obj,render) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj,key,obj[key],render) 
    })
  }

  defineReactive(obj,key,value,render) {
    let that = this
     Object.defineProperty(that,key,{
       configurable:true,
      // writable:true,
       enumerable:true,
       get:() =>{
         return that.data[key]
       },
       set:newValue => {
        that.data[key] = newValue
         render(that.data[key])
       }
     })
  }
  proxy(obj) {
     
  }
}

let app = new Vue({
  data:{
    text1:1,
    text2:2,
    text3:3
  },
  render(data) {
    console.log(data)
  }
})

app.text1 = 6