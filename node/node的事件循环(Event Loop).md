https://blog.csdn.net/gui951753/article/details/82345237 (I/O编程，非阻塞，阻塞，同步，异步)


一、node.js运行原理

应用程序的请求过程可以分为两个部分：CPU运算和I/O读写，

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现

