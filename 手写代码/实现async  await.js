/*
 * async/await自带执行器，不需要手动调用next()就能自动执行下一步
 * async函数返回值是Promise对象
 * await能够返回Promise的resolve/reject的值,如果不报错继续执行，如果报错则将错误抛出
 * yield后面不一定跟的就是Promise，所以使用Promise.resolve包装yield后面的值
 */

function myAsync(gen){
    return new Promise((resolve,reject)=>{
         var g = gen()
        function run(val){
          try{
           var res = g.next(val)  //next里面传的值就是上一个next表达式的返回值，所以相当于await后面跟的值（不是promise）
                                  //就是await表达式的返回值,如果为promise，如果是resolve状态，值就是resolve参数。
                                  //如果是reject状态，会将错误抛出

          }catch(err){
            return reject(err) // 抛出错误
          }
          if(res.done){
              return res.value
          }
          Promise.resolve(res.value).then(val=>{
              run(val)
          },err=>{
             g.throw(err) // 使用Generator.prototype.throw()将错误抛出
          })
        }
        run()
    })
}

function *gen(){
    yield new Promise((resolve,reject)=>{

    })
    console.log(6)
}

myAsync(gen)
console.log(3)