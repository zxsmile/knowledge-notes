var express = require('express')
var server = express()

server.use('/',function(req,res){
     console.log(req.url)

     res.header("Access-Control-Allow-Origin",'http://localhost:8080')
     res.header('Access-Control-Allow-Headers',"X-Requested-With")
     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
     
})

server.listen(8081)