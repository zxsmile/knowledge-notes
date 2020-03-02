var express = require('express')
var fs = require('fs')

var server = express()

server.use('/',function(req,res){
    fs.readFile('.'+req.url,function(error,data){
        if(error){
            res.write('404')
        }else{
            res.write(data)
        }

        res.end()
    })
})

server.listen(8080)