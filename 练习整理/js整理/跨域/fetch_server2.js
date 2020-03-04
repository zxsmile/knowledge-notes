var express= require('express')
var server = express()

server.use('/',function(req,res){

    res.header('Access-Control-Allow-Origin','http://localhost:8080')
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS')
    res.send('22')
    console.log(req.query)
    res.end()
})

server.listen(8081)