var express = require('express')
var bodyParser = require('body-parser')
var server = express()

server.use(bodyParser.urlencoded({
    extended:false,
    limit:2*1024*1024*1024  // 2G
}))
server.use('/',function(req,res){

     res.header("Access-Control-Allow-Origin",'http://localhost:8080') //设置请求来源不受限制
     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS') //请求方式
     res.header('Access-Control-Allow-Headers',"X-Requested-With")  // 指定浏览器CORS请求会额外发送的头信息字段

      // get
    Get=req.query
    Get.name
    Get.age
    
    //post

    Post = req.body

    console.log(Get,Post)
   
     res.end()
})

server.listen(8081)