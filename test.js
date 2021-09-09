function run(gen){
    return new Promise((resolve,reject)=>{
        var g = gen()

      function _next(val){
        try{
          let res = g.next(val)
        }catch(err){
          return reject(err)
        }
        
        if(res.done) return res.value
        Promise.resolve(res.value).then(val=>{
            _next(val)
        })
    }

    _next()
    })
}