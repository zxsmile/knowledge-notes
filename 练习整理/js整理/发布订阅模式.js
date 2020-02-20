/*
   clientListen 缓存列表，存放订阅者的回调函数
   listen 增加订阅者
   trigger 发布消息
   remove  取消订阅
   installEvent 给对象安装发布-订阅功能
*/

var event={

    clientListen:[],

    listen:function(key,fn){

        if(!this.clientListen[key]){
            this.clientListen[key]=[]
        }

        this.clientListen[key].push(fn)
    },

    trigger:function(){
        var key = Array.prototype.shift.call(arguments)  //shift()方法从数组中删除数组的第一个元素，并返回该元素的值，会改变原数组
        var fns = this.clientListen[key]

        if(!fns||fns.length===0){
            return false
        }

        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments)
        }
    },

    remove:function(key,fn){

        var fns = this.clientListen[key]

        if(!fns){
            return false
        }
        if(!fn){
            fns&&(fns.length=0)
        }else{
            for(var j=fns.length-1;j>=0;j--){
                if(fn===fns[j]){
                      fns.splice(j,1)
                }
            }
        }
    }
}


var installEvent =function(obj){

    for(var i in event){
        salesOffices[i]=event[i]
    }
} 

var salesOffices ={}

installEvent(salesOffices) //salesOffices对象拥有了发布订阅功能

salesOffices.listen('squareMeter88',fn1=function(price){
    console.log('价格1：'+price)
})

//salesOffices.trigger('squareMeter88',20000)

salesOffices.remove('squareMeter88')

salesOffices.trigger('squareMeter88')


