let str = 'abadefghiDF.1'
let map = new Map()
if(str.length<8 && str.length>16){
    console.log('NG')
}
let s = [0,0,0,0]
let i=0
let flag = 0
while(i<str.length){
    kind(str[i],s)
    for(var j=0;j<i;j++){
        if(str[i]===str[j]&&ispad(str,j,i)){
             flag = 1
             break;
        }
    }
    if(flag===1){
        break;
    }
    i++
}
if(s[0]+s[1]+s[2]+s[3]>=4 && flag===0 && (map.size===str.length)){
    console.log('OK 超棒')
}else if(s[0]+s[1]+s[2]+s[3]>=3 && flag===0){
    console.log('OK 复杂')
}else if(s[0]+s[1]+s[2]+s[3]>=2 && flag===0){
    console.log('OK 简单')
}else{
    console.log('NG')
}
    
function kind(c,a){
    if(c.charCodeAt()>=97&& c.charCodeAt()<=122){
        s[0]=1
    }else if(c.charCodeAt()>=65&& c.charCodeAt()<=90){
        s[1]=1
    }else if(c.charCodeAt()>=48&& c.charCodeAt()<=57){
        s[2]=1
    }else{
        s[3]=1
    }
    if(!map.get(c)){
        map.set(c,1)
    }
}
function ispad(str,a,b){
    if(b-a<=2){
        return false
    }
    let i=0
    while(i<3){
        if(b+i>=str){
            return false
        }
        if(s[a+i]!==a[b+i]){
            return false
        }
        i++
    }
    return true
}

console.log(map.size)
