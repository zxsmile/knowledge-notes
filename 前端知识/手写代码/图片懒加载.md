(function(){
    var len = 0
    loadImg() //开始进入页面执行一次加载图片函数，来初始化可视区域图片
    function loadImg(){
        var imgs = document.getElementsByTagName('img')
                            
        //top=滚动条滚动的高度+可视区域的高度
        var top = document.documentElement.scrollTop +document.documentElement.clientHeight
                        
        for(var i=len;i<imgs.length;i++){
            if(imgs[i].offsetTop <= top){
                imgs[i].src =imgs[i].getAttribute('data-src')

                //记录加载到图片的位置，不能加载过的还继续加载
                len = i+1      
            }
        }
    }
                    
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
                    
    window.onscroll =  throttle(loadImg,1000)
})()
        
   