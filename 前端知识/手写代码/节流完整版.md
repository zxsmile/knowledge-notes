/* 节流就是在一段时间内只执行一次函数
    使用场景：1.懒加载，滚动加载，加载更多或者监听滚动条位置
             2.百度搜索框，搜索联想功能
             3.防止高频点击提交，防止表单重复提交
*/


/*1.时间戳来实现:使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，
                如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
*/

let throttle =function(func,delay){
    let preTime = +new Date()
    return function(){
        let context = this
        let args = arguments
        let nowTime = +new Date()    /*
                                        js中单独调用new Date();  显示这种格式  Mar 31 10:10:43 UTC+0800 2012 
                                        但是用new Date() 参与计算会自动转换为从1970.1.1开始的毫秒数，
                                        所以+new Date()会返回毫秒数

                                        获取当前毫秒数的方法有：
                                        var timestamp =Date.parse(new Date()); 结果：1280977330000 //不推荐; 毫秒改成了000显示 
                                        var timestamp =(new Date()).valueOf(); 结果：1280977330748  //推荐;  
                                        var timestamp=new Date().getTime();    结果：1280977330748  //推荐;  

                                    */
        if(nowTime - preTime>delay){
           func.apply(context,args)
           preTime = nowTime
        }
    }
}


/* 2.定时器来实现：当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，
                  清空定时器，这样就可以设置下个定时器。
*/

let throttle = function(func,delay){
    let timeout 
    return function(){
        let context = this
        let args = arguments
        if(!timeout){
            timeout = setTimeout(function(){
                func.apply(context,args)
                timeout = null
            },delay)
        }
    }
}

/* 3.时间戳+定时器
*/

let throttle = function(func,delay){
    let timeout
    let startTime = +new Date()
    return function(){
        let nowTime = +new Date()
        let timing = delay-(nowTime-startTime)
        let context = this
        let args = arguments
        clearTimeout(timeout)
        if(timing<=0){
            func.apply(context,args)
            startTime = nowTime 
        }else{
            timeout = setTimeout(function(){
                func.apply(context,args)
            },timing)
        }
    }
}