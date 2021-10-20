let template = '<h1>我的名字是{{name}},年龄是{{age}}</h1>'
let data={
           name:'小米',
           age:18
          }

let TemplateEngine=function(tpl,data){
    let reg = /\{\{(.+?)\}\}/
    if(reg.test(tpl)){
        let match = reg.exec(tpl)
        tpl = tpl.replace(match[0],data[match[1]])
        return TemplateEngine(tpl,data)
    }
    return tpl
}

console.log(TemplateEngine(template,data))

// '+?'：表示惰性匹配，不会匹配到这种形式{{name}},年龄是{{age}}