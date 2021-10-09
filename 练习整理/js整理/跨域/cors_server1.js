var express = require('express')
var fs = require('fs')


var server = express()

server.use("/",function(req,res){
   
    // 读取ajax.html
    fs.readFile('..'+req.url,function(err,data){
        if(err){
            res.write('404')
        }else{
            res.write(data)
        }

        res.send()
    })


})

server.listen(8081)