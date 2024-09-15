一、什么是生命周期和调度？

   - React有一套合理的运行机制去控制程序在指定的时刻该做什么事，当一个生命周期钩子被触发后，紧接着会有下一个钩子，直到整个生命周期结束。
   
   1.生命周期

      - 生命周期代表着每个执行阶段，比如组件初始化，更新完成，马上要卸载等等，React会在指定的时机执行相关的生命周期钩子，使我们可以有机在程序运行中会插入自己的逻辑。

   2.调度

      - 我们写代码的时候往往会有很多组件以及他们的子组件，各自调用不同的生命周期，这时就要解决谁先谁后的问题，在reactv16之前采用了递归调用的方式一个一个的执行，而现在v16的版本中，则采用了与之完全不同的处理方式，名叫fiber，这个东西faceback做了有两年时间，实现非常复杂。
      
二、react生命周期详解

   - 首先看一下ReactV16.4的生命周期概况：图
   - 从横向看，react分为三个阶段

       - 创建时：
            - constructor()-类构造器初始化
            - static getDervdStateFromProps()-组件初始化时主动触发
            - render()-递归生成虚拟DOM
            - componentDidMount()-完成首次DOM渲染
   
       - 更新时：
            - static getDervdStateFromProps()-每次render()之前执行
            - shouldComponentUpdate()-校验是否需要执行更新操作
            - render()-递归生成虚拟DOM
            - getSnapshotBeforeUpdate()-在渲染真实DOM之前
            - componentDidUpdate()-完成DOM渲染
            
       - 卸载时
            - componentWillUnmount()-组件销毁之前被直接调用

    - 一些干活
 
        - 有三种方式可以触发React更新，props发生改变，调用setState()和调用forceUpdate()
        - static getDerivedStateFromProps()这个钩子会在每个更新操作之前（即使props没有改变）执行一次，使用时应该保持谨慎。
        - componentDidMount()和componentDidUpdate()执行的时机是差不多的，都在render之后，只不过前者只在首次渲染后执行，后者首次渲染不会执行
        - getSnapshotBeforeUpdate()执行时可以获得只读的新DOM树，此函数的返回值为componentDidUpdate(prevProps,prevState,snapshot)的第三个参数

三、尝试理解fiber

    1.背景

       - 我们知道React是通过递归的方式来渲染组件的，在V16版本之前的版本里，当一个状态发生变更时，react会从当前组件开始，依次递归调用所有的子组件生命周期钩子，而且这个过程是