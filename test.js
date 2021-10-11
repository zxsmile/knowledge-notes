try{
  new Promise((reslove,reject) =>{
    reject()
  }).then(res=>{},e=>{
    console.log('内部捕获')
  })
}catch(e){
  console.log('外部捕获')
}