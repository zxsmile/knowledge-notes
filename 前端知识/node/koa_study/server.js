// 1.创建koa对象

const Koa = require('koa')
const app = new Koa()
// 2.编写响应函数（中间件）

app.use((ctx,next) => {
    console.log('第一层中间件')
    ctx.response.body='hello world'
    next()
    console.log('第一层中间件返回')
})
app.use((ctx,next) => {
    console.log('第二层中间件')
    ctx.response.body='hello world'
    next()
    console.log('第二层中间件返回')
})
app.use((ctx,next) => {
    console.log('第三层中间件')
    ctx.response.body='hello world'
    next()
    console.log('第三层中间件返回')
})

// 3.监听端口

app.listen(3000)