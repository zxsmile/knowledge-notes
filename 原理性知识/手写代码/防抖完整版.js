/* 持续触发事件时，一定时间段内没有再次触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
   使用场景：1.比如我们在用户注册时验证用户名是否被占用为例，在输入的时候就在判断这个用户名是否已被注册，很明显，
            这样的做法不好的是当用户输入第一个字符的时候，就开始请求判断了，不仅对服务器的压力增大了，对用户体验也未必比原来的好。
            而理想的做法应该是这样的，当用户输入第一个字符后的一段时间内如果还有字符输入的话，那就暂时不去请求判断用户名是否被占用
            2.手机号，邮箱号的输入验证
*/

/*第一版*/

function debounce(func,delay){
      var timeout 
      return function(){
          var context = this
          var args = arguments
          if(timeout){
            clearTimeout(timeout)
          }
          timeout = setTimeout(function(){
             func.apply(context,args)
          },delay)
      }
}

/*代码解读：只有首次执行的时候，不存在timeout，后面触发都存在timeout，所以都会使用clearTimeout(timeout)来清除掉上次定时，
           重新开始定时
*/


/*第二版：我不希望非要等到事件停止触发之后才执行，我希望立刻执行函数，等到停止触发n秒后，才可以重新触发执行
          加个 immediate 参数判断是否是立刻执行
*/

function debounce(func,delay,immediate){
    let timeout
    return function(){
        let context = this
        let args = arguments
        if(timeout){
            clearTimeout(timeout)
        }
        if(immediate){
            //用callNow变量来判断要在immediate为true并且离上一次执行之后已经超过了delay时间才会立即执行func
            let callNow = !timeout
            timeout = setTimeout(function(){
                timeout = null
            },delay)
            if(callNow){
                func.apply(context,args)
            }
        }else{
            timeout = setTimeout(function(){
                func.apply(context,args)
            },delay)
        }
    }

}

/*代码解读：在第一次触发了函数之后，函数立即执行，在delay时间之内再次触发都不会再执行函数，
           直到过了delay时间之后再次触发才会执行函数
*/
 

/*第三版:添加取消按钮，比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true，这样的话，我只有等 10 秒后才能重新触发事件，
        现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行啦
 */

function debounce(func,delay,immediate){
    let timeout
    let debounced = function(){
        let context = this
        let args = arguments
        if(timeout){
            clearTimeout(timeout)
        }
        if(immediate){
            //用callNow变量来判断要在immediate为true并且离上一次执行之后已经超过了delay时间才会立即执行func
            let callNow = !timeout
            timeout = setTimeout(function(){
                timeout = null
            },delay)
            if(callNow){
                func.apply(context,args)
            }
        }else{
            timeout = setTimeout(function(){
                func.apply(context,args)
            },delay)
        }
    }

    debounced.concel=function(){
        clearTimeout(timeout);
        timeout = null;
    }
    
    return debounced
}

/*使用：

       <button>点击<button>
       <button>取消<button>

       let btn1 = document.getElementsByTagName('button')[0]
        var setUseAction = debounce(btnClick,5000,true)
        btn.onclick=setUseAction
        let btn2 = document.getElementsByTagName('button')[1]
        btn2.onclick=setUseAction.concel
*/