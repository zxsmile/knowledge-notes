//importScripts('./data.js')
onmessage = e => {
    const message = e.data;
   // console.log(message);
    
  };
 onerror = (e) => {
    console.log('sworker线程出错了'+e)
}