var express = require('express')

var server = express()

server.use('/',function(req,res){
   console.log(req.query.name)
   res.send('666')
})

server.listen(8081)