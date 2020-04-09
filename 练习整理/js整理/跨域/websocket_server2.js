var express = require('express')
var WebSocket = require('ws')
var server = express()
var wss = new WebSocket.Server({port:3000})

wss.on('connection',function(ws){

     ws.on('message',function(data){
         console.log(data)
         ws.send('服务器')
     })
})

server.use('/',function(req,res){
    
})
