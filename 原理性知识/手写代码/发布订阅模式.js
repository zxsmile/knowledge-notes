class event {
    constructor() {
        this.subs = []
    }

    on(key,fn) {
        if(!this.subs[key]){
            this.subs[key] = []
        }
        this.subs[key].push(fn)
    }

    emit(key,...args) {
      if(!this.subs[key] || this.subs[key].length===0){
          return false
      }

      this.subs[key].forEach((fn)=>{
          fn(...args)
      })

    }

    remove(key,fn) {
        if(!this.subs[key]){
            return false
        }
        if(!fn){
            this.subs[key].length=0
        }

        this.subs[key]=this.subs[key].filter((sub)=>{
            return sub!==fn
        })
    }
}

function dog(name){
   this.name = name
    console.log(this.name)
}

function cat(){
    console.log('喵喵喵')
}

let obj = new event()
console.log(obj)
obj.on('pet',dog)
obj.on('pet',cat)
obj.remove('pet',dog)
obj.emit('pet','花花')
