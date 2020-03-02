var express = require('express')
var server = express()

server.use('/',function(req,res){

    var fn = req.query.callback
    var name = req.query.name
    var back = `${fn}(${JSON.stringify(name)})`
    res.send(back)
    console.log(back)
    res.end()
})


server.listen(8081)