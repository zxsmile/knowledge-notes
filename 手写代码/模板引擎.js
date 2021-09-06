let template = '<h1>我的名字是{{name}},年龄是{{age}}'
let data={
           name:'小米',
           age:18
          }

let TemplateEngine=function(tpl,data){
    let reg = /^\{\{(\w+)\}\}$/
    if(reg.test(tpl)){
        let match = reg.exec(tpl)
        template = template.replace(match[1],data[match[1]])
        return TemplateEngine(template,data)
    }
    return template
}

console.log(TemplateEngine(template,data))