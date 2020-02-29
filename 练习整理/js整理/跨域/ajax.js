/*
  1.创建Ajax对象
  2.连接服务器
  3.发送请求
  4.接受返回
*/

function Ajax(url,fnSucc,fnFaild){
    
    var oAjax = null
    if(window.XMLHttpRequest){
        oAjax = new XMLHttpRequest()
    }else if(window.ActiveXObject){
        oAjax = new ActiveXObject("Microsoft.XMLHTTP")
    }

    oAjax.open("post",url,true) // true表示异步

    oAjax.send('name=milk&age=18') //用于post传参，形式："a=1&b=2"，而get传参就在url后面用“?”拼接

    oAjax.onreadystatechange=function(){

        if(oAjax.readyState ==4){
           
            /* 
            readyState
                0: 请求未初始化
                1: 服务器连接已建立
                2: 请求已接收
                3: 请求处理中
                4: 请求已完成，且响应已就绪
            */
        if(oAjax.status==200){
            fnSucc(oAjax.responseText)
        }else if(fnFaild){

            fnFaild()
        }

        }


    }
}

