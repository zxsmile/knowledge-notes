function fetch(url,options={}){

    options={
        methods:options.methods||"GET",
        headers:options.headers||{
            'content-type':"application/json;charset=UTF-8"
        },
        body:options.body||'',
        credentials:options.credentials||'omit',
        mode:options.mode||'no-cros',

    }
    return new Promise((reslove,reject)=>{
           
         var Ajax = null
         if(window.XMLHttpRequest){
             Ajax = new XMLHttpRequest()
         }else if(window.ActiveXObject){
             Ajax = new ActiveXObject('Microsoft.XMLHTTPS')
         }

         Ajax.open(options.methods,url,true)
         if(options.body){
             Ajax.send(JSON.stringify(options.body))
         }else{
             Ajax.send()
         }
         
         Ajax.onreadystatechange=function(){
             if(Ajax.readyState==4){
                 if(Ajax.status==200){
                     reslove(Ajax.responseText)
                 }else{
                     reject()
                 }
             }
         }
    })
}



