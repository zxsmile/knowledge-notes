一、轮询

轮询：客户端是按照规定时间（这个时间由你设定，此处默认为1秒）像服务端发送请求，前一次请求完成后，无论有无结果返回，一秒之后下一次请求又会发出。这就叫做Ajax轮询

二、Ajax轮询---定时的通过Ajax查询服务器

1.原理：客户端是按照规定时间（这个时间由你设定，此处默认为1秒）像服务端发送请求，前一次请求完成后，无论有无结果返回，一秒之后下一次请求又会发出。这就叫做Ajax轮询

2.实现

	function ajax(url,sucss,faild){
	    var xhr = null
	    if(window.XMLHttpRequest){
	       xhr = new XMLHttpRequest()
	    }else{
	        xhr = new ActiveXObject("Microsoft.XMLHTTP")
	    }
	    
	     xhr.open('put',url,true)
	     xhr.send()
	     xhr.onreadystatechange=function(){
	         if(xhr.readyState==4){
	             if(xhr.status==200){
	                 sucss()
	             }else{
	                 if(faild){
	                     faild()
	                 }
	             }
	         }
	     }
	
	}
	
	setInterval(function(){
	    ajax('http://localhost:8080',function(){
	        console.log('成功')
	        },function(){
	            console.log('失败')
	    })
	},1000)


无论有无结果返回，每隔一秒都会发一次ajax请求

三、ajax长轮询

1.概念：在发送ajax后,服务器端会阻塞请求直到有数据传递或超时才返回。 客户端JavaScript响应处理函数会在处理完服务器返回的信息后，再次发出请求，客户端再次建立连接，周而复始

	如：function ajax(url,fuSucc,fnFaild,timeout){
		    var oAjax=null;
		    if(window.XMLHttpRequest){
		        oAjax=new XMLHttpRequest();
		    }else{
		        oAjax=new ActiveXObject("Microsoft.XMLHTTP");
		    }
		    
		    oAjax.open("put",url,true);
		    oAjax.send();
		    oAjax.onreadystatechange=function(){
		      
		          if(oAjax.readyState==4){
		              clearTimeout(timeoutFlag)
		              if(oAjax.status==200){
		                fuSucc(oAjax.responseText);
		              }else{
		                if(fnFaild){
		                    fnFaild();
		                }
		                
		              }
		          }
		    };
		
		    timeoutFlag = setTimeout(function(){
		        clearTimeout(timeoutFlag)
		        oAjax.abort()
				ajax('http://localhost:8080') //超时了再次发起ajax请求
		        //fnFaild();
		        console.log('超时了')
		    },timeout)
	
	}


	<body>
        <input id="butn1" type="button" value="提交">
        <script src='ajax.js'></script>
        <script >
       
            var oBtn=document.getElementById("butn1");
            oBtn.onclick=function(){
                ajax("http://localhost:8080?name=milk",function(){
                  
                    ajax('http://localhost:8080') //成功了之后再次发起请求

                },function(){
                    alert("faild");
                },3000)
            }
         
        </script>
    </body>