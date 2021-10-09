let express = require('express')
let fs = require('fs')

let http = express()

http.use('/',(req,res) => {
    fs.readFile('.'+req.url,(err,data) => {
 
       if(err){
         res.write('404')
       }else{
         res.write(data)
       }

       res.send()
    })
})

http.listen(8080)