function _render(vnode){

    //如果是数字类型的转为字符串
    if(typeof vnode === 'number'){
       vnode = String(vnode)
    }
    
    // 字符串类型直接就是文本节点
    if(typeof vnode === 'string'){
       return document.createTextNode(vnode)
    }
 
    //普通dom
 
    const dom = document.createElement(vnode.tag)
    if(vnode.attrs){
 
       //遍历属性
 
       Object.keys(vnode.attrs).forEach(key => {
          const value = vnode.attrs[key]
          dom.setAttribute(key,value)
       })
    }
 
    vnode.children.forEach(child => {
       dom.appendChild(_rend(child))
    })
 
    return dom
 }