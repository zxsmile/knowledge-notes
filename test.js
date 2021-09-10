

async function fn2() {
      
    try{
        await Promise.reject(2)
    }catch(e){
        console.log(666)
    }
        
    
    
}



  fn2().then(res=>{
      
      console.log(777)
  },e=>{
      console.log(999)
  }).catch(err=>{
      console.log('555')
      //console.log(err)
  })