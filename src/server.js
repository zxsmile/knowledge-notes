let express = require('express')
let server = express()
let fs = require('fs')
let path = require('path')

server.use('/',(req,res) => {
    fs.readFile('.'+req.url,(err,data) => {
        console.log('.'+req.url)
        if(err){
            res.write('err')
        }else{
            res.write(data)
        }
        res.send()
    })
})

server.use('/work.js',(req,res)=>{
    res.send('555')
})

server.listen(8080)