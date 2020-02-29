var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var server = express()
server.use(bodyParser.urlencoded({
    extended:false,
    limit:2*1024*1024*1024  // 2G
}))
server.use("/",function(req,res){
    
    // 读取ajax.html
    fs.readFile('.'+req.url,function(err,data){
        if(err){
            res.write('404')
        }else{
            res.write(data)
        }

        res.send()
    })

    // get
    Get=req.query
    Get.name
    Get.age
    
    //post

    Post = req.body

    console.log(Get,Post)
   


})

server.listen(8080)