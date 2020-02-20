/*
  clientListen 缓存列表，存放订阅者的回调函数
  listen 增加订阅者
  trigger 发布消息
  remove  取消订阅
*/

var Event = (function(){
    var clientListen={},
    listen,
    trigger,
    remove

    listen = function(key,fn){
        if(!clientListen[key]){
            clientListen[key]=[]
        }

        clientListen[key].push(fn)
    }

    trigger = function(){
         var key = Array.prototype.shift.call(arguments)
         var fns = clientListen[key]

         if(!fns||fns.length===0){
            return false 
         }

         for(var i=0,fn;fn=fns[i++];){
             
            fn.apply(this,arguments)
         }
    }

    remove = function(key,fn){
        
        var fns = clientListen[key]

        if(!fns){
            return false
        }

        if(!fn){
            fns&&(fns.length=0)
        }else{
            for(var j=fns.length-1;j>=0;j--){
                if(fns[j] ===fn){
                    fns.splice(j,1)
                }
            }
        }
    }

    return{
        listen:listen,
        trigger:trigger,
        remove:remove
    }
})()

Event.listen('88',fn1=function(price){
    console.log("价格1："+price)
})

Event.trigger('88',20000)