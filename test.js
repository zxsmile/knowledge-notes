// async function async1(){
//     await async2()
//     console.log('async1 end')
// } 

// function async2(){
//     console.log('async2 end')
// }
// async1()

// setTimeout(()=>{
//    console.log('setTimeout')
// },0)

// new Promise(reslove=>{
//     reslove()
// }).then(()=>{
//     console.log('promise')
// })
class Subject{
    constructor() {
      this.subs = []
    }

    add(sub) {
        this.subs.push(sub)
    }

    remove(sub) {
        this.subs.filter(item=>{
            return item!==sub
        })
    }
    
    notify() {
        this.subs.forEach(sub=>{
            sub.update.apply(sub)
        })
    }
}

class Observer{
    constructor(name) {
        this.name = name
    }
    update() {
        console.log(this.name)
    }
}

let sub = new Subject()
let obj1 = new Observer('小明')
let obj2 = new Observer('小红')
obj2.update=function(){
    console.log('666')
}
sub.add(obj1)
sub.add(obj2)
sub.notify()