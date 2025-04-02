## 一、为什么使用 React Hooks

- React Hooks 是由React团队发明的，用于在函数组件中引入状态管理和生命周期方法。如果我们希望一个React函数组件可以拥有状态管理和生命周期方法，我不需要再去将一个React函数组件重构成一个 React 类组件。React Hooks让我们可以仅使用函数组件就可以完成一个React应用。

## 二、function组件和class组件本质的区别

```
class Index extends React.Component<any,any>{
    constructor(props){
        super(props)
        this.state={
            number:0
        }
    }
    handerClick=()=>{
    for(let i = 0 ;i<5;i++){
        setTimeout(()=>{
            this.setState({ number:this.state.number+1 })
            console.log(this.state.number)
        },1000)
    }
    }

    render(){
        return <div>
            <button onClick={ this.handerClick } >num++</button>
        </div>
    }
}

再来看看函数组件中：
function Index(){
    const [ num ,setNumber ] = React.useState(0)
    const handerClick=()=>{
        for(let i=0; i<5;i++ ){
        setTimeout(() => {
                setNumber(num+1)
                console.log(num)
        }, 1000)
        }
    }
    return <button onClick={ handerClick } >{ num }</button>
}

```

- 打印结果？
  - 在第一个例子🌰打印结果：1 2 3 4 5
  - 在第二个例子🌰打印结果：0 0 0 0 0

- 再看一个例子，一个很小的需求，发送手机验证码，60s 的倒计时。我是这样写的，发现 count60-59-59....59,后面一直是 59

  ```
  const Parent =  () => {
      const [count, setCount] = useState(60);
  
      const useCountDown = () => {
      let timer = setInterval(() => {
          if (count === 0) {
          // 清除定时器等操作
          clearInterval(timer)
          }
          setCount(count - 1);
      }, 1000);
      };
      return (
      <div>
          <button onClick={useCountDown}>点我</button>
          <div>{count}</div>
      </div>
          
      );
  };
  
  ```

  - 探究原因：

    - 1.由一个简单的例子开始

      ```
      function Counter() {
              const [count, setCount] = useState(0);
              return (
                  <div>
                  <p>You clicked {count} times</p>
                  <button onClick={() => setCount(count + 1)}>click me</button>
                  </div>
              );
          }
      
      ```

      * 我以为Counter 函数就执行了一次，执行的时候 React 把 count 这个变量存起来，并且开启了对 count 的监听。当 count 变化的时候，React 主动触 dom 节点（即 return 的部分)的更新。

      * 误区关键点：

        - 函数只执行一次，dom 节点渲染多次
        - 存在监听的模式

      * 实际上，count 只是一个数字。它不是神奇的“数据绑定”、“观察者”、“代理”或其他任何“魔法”。如下所示：

        ```
        const count = 42;
        /* ... */
        <p>You clicked {count} times</p>;
        /* ... */
        
        ```

    - 我们的组件第一次渲染时，count 初始化为 0。当我们每次调用 setCount(x)时，React 重新执行 Counter 函数(即重新调用了 Counter 组件)。每次 count 的值都是通过 useState 返回的一个常量。 如下所示：

      ```
       // 第一次渲染
      function Counter() {
          const count = 0; // useState() 返回
          /* ... */
          <p>You clicked {count} times</p>;
          /* ... */
          }
      
          // 点击一次后，整个函数又运行了一遍
          function Counter() {
          const count = 1; // useState() 返回
          /* ... */
          <p>You clicked {count} times</p>;
          /* ... */
      }
      
      // 再次点击，整个函数再次运行
      function Counter() {
          const count = 2; // useState() 返回
          /* ... */
          <p>You clicked {count} times</p>;
          /* ... */
      }
      ```

    -  对比误区，正确的理解：

      - 初次渲染和 setCount 的时候，都会重新执行一次 Counter 函数。
      -  不存在观察 count。《p》 You clicked {count} times 《/p》 这行代码没有数据绑定！count 每次都是函数内部的一个常量，由 useState 返回。count 不会随时间变化，组件每个渲染“看到”它自己的 count 值，组件中任何变量在渲染之间都是被隔离的。

    - 在这个过程中 React 做了什么？

      - 触发 Counter 重新执行的“开关”是 setCount ，当我们调用 setCount，React 再次使用不同的 count 值通过 useState 返回给组件。然后 React 更新 DOM 以匹配我们最新的渲染输出。

    - 2.再换个形式理解一下

      ```
       function Counter() {
              const [count, setCount] = useState(0);
      
              function delayAlertCount() {
                  setTimeout(() => {
                  alert("You clicked on: " + count);
                  }, 3000);
              }
      
              return (
                  <div>
                  <p>You clicked {count} times</p>
                  <button onClick={() => setCount(count + 1)}>Click me</button>
                  <button onClick={delayAlertCount}>Show alert</button>
                  </div>
              );
          }
      ```

      -  点击一下“show alert”按钮，然后点一下“click me”。alert 结果是0

      - 结合上面的理解，其实每次渲染可以提取成以下:

        ```
        // 首次渲染(点击了“show alert”按钮，3s后执行回调)
        function Counter() {
            const count = 0;
            /* ... */
            function handleAlertClick() {
                setTimeout(() => {
                    alert("You clicked on: " + count);
                    }, 3000);
                }
                /* ... */
        }
        
        // +1 后渲染
        function Counter() {
            const count = 1;
            /* ... */
            function handleAlertClick() {
                setTimeout(() => {
                alert("You clicked on: " + count);
                }, 3000);
            }
            /* ... */
        }
        ```

      - 以此类推，每个渲染都会拥有它自己的 count 和 handleAlertClick，这些版本中的每一个都“记住”了

    - 3.再回到开头的倒计时问题

      ```
       // 首次渲染 点击按钮开始 setInterval
          export default () => {
              const count = 60;
      
              const useCountDown = () => {
                  setInterval(() => {
                      if (count === 0) {
                          // 清除定时器等操作
                      }
                      setCount(count - 1);
                  }, 1000);
              };
              return (
                  <>
                  <span>{count}</span>
                  <button onClick={useCountDown}></button>
                  </>
              );
          };
      
       // 1s 后，执行了setCount(59)。进行第二次渲染
          export default () => {
          const count = 59; // 这个 59 没有排上用场！！
      
          const useCountDown = () => {
              /* 这次没有执行这个函数，省略这部分代码 */
          };
      
          return (
              <>
              <span>{count}</span>
              <button onClick={useCountDown}></button>
              </>
          );
          };
          
          // 2s 后,又执行了 setCount(59)。
          // ...
          // ns 后，又执行了 setCount(59)。
      ```

      -  通过上面的原因分析，我们知道了由于 useCountDown 只执行了一次，setInterval 的回调函数 (下文简称‘cb’) 这个闭包中的 count 变量始终是调用 useCountDown 那次渲染时的 count，count 不变所以计时器数值不更新。

    - 4.解决倒计时问题

      - 我们就从 count 这个点切入，让 count 跳出一次渲染（以下“一次渲染”称为“快照”）的限制，成为组件整个生命周期都一直存在的，这样每秒执行回调函数的时候，去读取 count 的值，就是不同的。跳出快照的限制，在整个生命周期中一直存在，你一定想要了 ref 吧，就用它！不过呢，ref 有个限制，那就是 ref 的 current 值改变的时候，并不会重新触发渲染。所以我们不能完全抛弃 useState 而只用 useRef，要两者结合使用！

        ```
         export default () => {
            const countSaver = useRef(60);
            const [count, setCount] = useState(countSaver.current);
        
            const useCountDown = () => {
                setInterval(() => {
                    // 这里的 count 永远是 60，但是 countSaver.current 是随时间改变的
                    if (countSaver.current === 0) {
                        // 清除定时器等操作
                    }
                    // console.log("tick", countSaver.current);
                    countSaver.current = countSaver.current - 1;
                    setCount(countSaver.current); //触发下一次渲染
                    }, 1000);
                };
        
                return (
                    <>
                    <span>{count}</span>
                    <button onClick={useCountDown}>倒计时</button>
                    </>
                );
            };
        ```

    - 我们也可以做一些小的改变，还是借助 ref，这次我们 current 不用来存 count，直接用来存 cb。每个快照都重新给 current 赋值， 这样每秒执行的 cb 都是一个新的 cb，每个新的 cb 中都使用了新的 count，而不再是调用 useCountDown 那个快照中的 count。

      ```
      export default () => {
              const cbSaver = useRef();
              const [count, setCount] = useState(60);
      
              cbSaver.current = () => {
                  if (count === 0) {
                  // 清除定时器等操作
                  }
                  setCount(count - 1);
              };
      
              const useCountDown = () => {
                  setInterval(() => {
                  cbSaver.current();
                  }, 1000);
              };
      
              return (
                  <>
                  <span>{count}</span>
                  <button onClick={useCountDown}>倒计时</button>
                  </>
              );
          };
      ```

    - 在class状态中，通过一个实例化的class，去维护组件中的各种状态；但是在function组件中，没有一个状态去保存这些信息，每一次函数上下文执行，所有变量，常量都重新声明，执行完毕，再被垃圾机制回收。所以如上，无论setTimeout执行多少次，都是在当前函数上下文执行,此时num = 0不会变，之后setNumber执行，函数组件重新执行之后，num才变化。

    - 所以， 对于class组件，我们只需要实例化一次，实例中保存了组件的state等状态。对于每一次更新只需要调用render方法就可以。但是在function组件中，每一次更新都是一次新的函数执行,为了保存一些状态,执行一些副作用钩子,react-hooks应运而生，去帮助记录组件的状态，处理一些额外的副作用。

## 三、初识：揭开hooks的面纱

- hooks 就是通过把数据挂载到组件对应的 fiber 节点上来实现的。fiber 节点是一个对象，hooks 把数据挂载在哪个属性呢？我们可以 debugger 看下。准备这样一个函数组件

  ```
  import {useState,useCallback,useEffect,useRef,useMemo} from 'react' 
  function Parent() { 
     const [name, setName] = useState("guang"); 
     useState('dong');
     const handler = useCallback((evt) => {
          setName('dong');
      },[1]);
  
      useEffect(() => {
      console.log(1);
      });
  
      useRef(1);
  
      useMemo(() => {
      return 'guang and dong';
      })
  
      return (
      <div className="App">
          <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p onClick={handler}>
              {name}
          </p>
          </header>
      </div>
      );
      
   }
   export default Parent
  ```

- 在函数打个断点，我们看下调用栈：
  - 上一个函数是 renderWithHooks，里面有个 workingInProgress 的对象就是当前的 fiber 节点：
  - fiber 节点的 memorizedState 就是保存 hooks 数据的地方,它是一个通过 next 串联的链表，展开看一下：
  - 链表一共六个元素，这和我们在 function 组件写的 hooks 不就对上了么：
  - 这就是 hooks 存取数据的地方，执行的时候各自在自己的那个 memorizedState 上存取数据，完成各种逻辑，这就是 hooks 的原理。

## 四、创建 memorizedState 链表

- 这个 memorizedState 链表是什么时候创建的呢？

     - 好问题，确实有个链表创建的过程，也就是 mountXxx。链表只需要创建一次，后面只需要 update。所以第一次调用 useState 会执行 mountState，后面再调用 useState 会执行 updateState。
     - 所以第一次调用 useState 会执行 mountState，后面再调用 useState 会执行 updateState。

- mountXxx 是创建 memorizedState 链表的过程，每个 hooks api 都是这样的：

    - 它的实现也很容易想到，就是创建对应的 memorizedState 对象，然后用 next 串联起来，也就是这段代码：

      ```
       function mountWorkInProgressHook() {
              const hook: Hook = {
                  memoizedState: null,  // useState中 保存 state信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和deps ｜ useRef中保存的是ref 对象
                  baseState: null,
                  baseQueue: null,
                  queue: null,
                  next: null,
              };
              if (workInProgressHook === null) { // 例子中的第一个`hooks`-> useState(0) 走的就是这样。
                  currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
              } else {
                  workInProgressHook = workInProgressHook.next = hook;
              }
              return workInProgressHook;
          }
      
      ```

  - mountWorkInProgressHook这个函数做的事情很简单，首先每次执行一个hooks函数，都产生一个hook对象，里面保存了当前hook信息,然后将每个hooks以链表形式串联起来，并赋值给workInProgress的memoizedState。也就证实了上述所说的，函数组件用memoizedState存放hooks链表。

  -  至于hook对象中都保留了那些信息？我这里先分别介绍一下:

    - memoizedState： useState中 保存 state 信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和 deps ｜ useRef 中保存的是 ref 对象。
    - baseQueue : usestate和useReducer中 保存最新的更新队列。
    - baseState ： usestate和useReducer中,一次更新中 ，产生的最新state值。
    - queue ： 保存待更新队列 pendingQueue ，更新函数 dispatch 等信息。
    - next: 指向下一个 hooks对象。

  - 就是因为是以这种方式进行state的存储，所以useState（包括其他的Hooks）都必须在FunctionalComponent的根作用域中声明，也就是不能在if或者循环中声明，比如:

    ```
    if (something) {
     const [state1] = useState(1)
    }
    
    // or
    
    for (something) {
     const [state2] = useState(2)
    }
    ```

  - 最主要的原因就是你不能确保这些条件语句每次执行的次数是一样的，也就是说如果第一次我们创建了state1 => hook1, state2 => hook2, state3 => hook3这样的对应关系之后，下一次执行因为something条件没达成，导致useState(1)没有执行，那么运行useState(2)的时候，拿到的hook对象是state1的，那么整个逻辑就乱套了，所以这个条件是必须要遵守的！ 

## 五、hooks初始化

- 每种 hooks api 都有不同的使用这些 memorizedState 数据的逻辑，有的比较简单，比如 useRef、useCallback、useMemo，有的没那么简单，比如 useState、useEffect。为什么这么说呢？我们看下它们的实现再说吧。

- useRef

  - 每个 useXxx 的 hooks 都有 mountXxx 和 updateXxx 两个阶段，比如 ref 就是 mountRef 和 updateRef。它的代码是最简单的，只有这么几行

    ```
    function mountRef(initialValue) {
        const hook = mountWorkInProgressHook();
        const ref = {current: initialValue};
        hook.memoizedState = ref;
        return ref;
    }
    ```

  - 那 ref 在 memorizedState 上挂了什么呢？

  - 可以看到是把传进来的 value 包装了一个有 current 属性的对象，冻结了一下，然后放在 memorizedState 属性上。

  - 所以，useRef 的功能就很容易猜到了：useRef 可以保存一个数据的引用，这个引用不可变。这个 hooks 是最简单的 hooks 了，给我们一个地方存数据，我们也能轻易的实现 useRef 这个 hooks。

- useState

  ```
   function mountState(initialState){
      const hook = mountWorkInProgressHook();
      if (typeof initialState === 'function') {
          // 如果 useState 第一个参数为函数，执行函数得到state
          initialState = initialState();
      }
      hook.memoizedState = hook.baseState = initialState;
      const queue = (hook.queue = {
          pending: null,  // 带更新的
          dispatch: null, // 负责更新函数
          lastRenderedReducer: basicStateReducer, //用于得到最新的 state ,
          lastRenderedState: initialState, // 最后一次得到的 state
      });
  
      const dispatch = (queue.dispatch = (dispatchAction.bind( // 负责更新的函数
          null,
          currentlyRenderingFiber,
          queue,
      )))
      return [hook.memoizedState, dispatch];
  }
  
  ```

  -  mountState到底做了些什么，首先会得到初始化的state，将它赋值给mountWorkInProgressHook产生的hook对象的 memoizedState和baseState属性，然后创建一个queue对象，里面保存了负责更新的信息。

  - 这里先说一下，在无状态组件中，useState和useReducer触发函数更新的方法都是dispatchAction,useState，可以看成一个简化版的useReducer,至于dispatchAction怎么更新state，更新组件的，我们接着往下研究dispatchAction。

  - 在研究之前 我们先要弄明白dispatchAction是什么?

    ```
     function dispatchAction<S, A>(
        fiber: Fiber,
        queue: UpdateQueue<S, A>,
        action: A,
    )
    
    const [ number , setNumber ] = useState(0)
    ```

  - dispatchAction 就是 setNumber , dispatchAction 第一个参数和第二个参数，已经被bind给改成currentlyRenderingFiber和 queue,我们传入的参数是第三个参数action

    ```
      function dispatchAction(fiber, queue, action) {
    
            // 计算 expirationTime 过程略过。
            /* 创建一个update */
            const update= {
                expirationTime,
                suspenseConfig,
                action,
                eagerReducer: null,
                eagerState: null,
                next: null,
            }
            /* 把创建的update */
            const pending = queue.pending;
            if (pending === null) {  // 证明第一次更新
                update.next = update;
            } else { // 不是第一次更新
                update.next = pending.next;
                pending.next = update;
            }
    
            queue.pending = update;
            const alternate = fiber.alternate;
            /* 判断当前是否在渲染阶段 */
            if ( fiber === currentlyRenderingFiber || (alternate !== null && alternate === currentlyRenderingFiber)) {
                didScheduleRenderPhaseUpdate = true;
                update.expirationTime = renderExpirationTime;
                currentlyRenderingFiber.expirationTime = renderExpirationTime;
            } else { /* 当前函数组件对应fiber没有处于调和渲染阶段 ，那么获取最新state , 执行更新 */
                if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
                const lastRenderedReducer = queue.lastRenderedReducer;
                if (lastRenderedReducer !== null) {
                    let prevDispatcher;
                    try {
                    const currentState = queue.lastRenderedState; /* 上一次的state */
                    const eagerState = lastRenderedReducer(currentState, action); /**/
                    update.eagerReducer = lastRenderedReducer;
                    update.eagerState = eagerState;
                    if (is(eagerState, currentState)) { 
                        return
                    }
                    } 
                }
                }
                scheduleUpdateOnFiber(fiber, expirationTime);
            }
        }
    ```

  - 无论是类组件调用setState,还是函数组件的dispatchAction ，都会产生一个 update对象，里面记录了此次更新的信息，然后将此update放入待更新的pending队列中，dispatchAction第二步就是判断当前函数组件的fiber对象是否处于渲染阶段，如果处于渲染阶段，那么不需要我们在更新当前函数组件，只需要更新一下当前update的expirationTime即可。

  - 如果当前fiber没有处于更新阶段。那么通过调用lastRenderedReducer获取最新的state,和上一次的currentState，进行浅比较，如果相等，那么就退出，这就证实了为什么useState，两次值相等的时候，组件不渲染的原因了，这个机制和Component模式下的setState有一定的区别。

  - 如果两次state不相等，那么调用scheduleUpdateOnFiber调度渲染当前fiber，scheduleUpdateOnFiber是react渲染更新的主要函数。

- useEffect 

  - 上述讲到了无状态组件中fiber对象memoizedState保存当前的hooks形成的链表。那么updateQueue保存了什么信息呢，我们会在接下来探索useEffect过程中找到答案。当我们调用useEffect的时候，在组件第一次渲染的时候会调用mountEffect方法，这个方法到底做了些什么？

  - 同样的，effect 传入的函数也是被 React 所调度的，当然，这里的调度不是 fiber 那个调度，而是单独的 effect 调度：

    ```
     function mountEffect(create,deps) {
        const hook = mountWorkInProgressHook();
        const nextDeps = deps === undefined ? null : deps;
        hook.memoizedState = pushEffect(
            HookHasEffect | hookEffectTag, 
            create, // useEffect 第一次参数，就是副作用函数
            undefined,
            nextDeps, // useEffect 第二次参数，deps
        );
    }
    
    ```

  - hooks 负责把这些 effect 串联成一个 updateQueue 的链表，然后让 React 去调度执行。

    ```
    function pushEffect(tag, create, destroy, deps) {
        const effect = {
            tag,
            create,
            destroy,
            deps,
            next: null,
        };
        let componentUpdateQueue = currentlyRenderingFiber.updateQueue
        if (componentUpdateQueue === null) { // 如果是第一个 useEffect
            componentUpdateQueue = {  lastEffect: null  }
            currentlyRenderingFiber.updateQueue = componentUpdateQueue
            componentUpdateQueue.lastEffect = effect.next = effect;
        } else {  // 存在多个effect
            const lastEffect = componentUpdateQueue.lastEffect;
            if (lastEffect === null) {
            componentUpdateQueue.lastEffect = effect.next = effect;
            } else {
            const firstEffect = lastEffect.next;
            lastEffect.next = effect;
            effect.next = firstEffect;
            componentUpdateQueue.lastEffect = effect;
            }
        }
        return effect;
    }
    ```

  - 这一段实际很简单，首先创建一个 effect ，判断组件如果第一次渲染，那么创建 componentUpdateQueue ，就是workInProgress的updateQueue。然后将effect放入updateQueue中。

- useMemo 

  ```
  function mountMemo(nextCreate,deps){
      const hook = mountWorkInProgressHook();
      const nextDeps = deps === undefined ? null : deps;
      const nextValue = nextCreate();
      hook.memoizedState = [nextValue, nextDeps];
      return nextValue;
  }
  ```

  - 初始化useMemo，就是创建一个hook，然后执行useMemo的第一个参数,得到需要缓存的值，然后将值和deps记录下来，赋值给当前hook的memoizedState。整体上并没有复杂的逻辑。

- 我们来总结一下初始化阶段,react-hooks做的事情，在一个函数组件第一次渲染执行上下文过程中，每个react-hooks执行，都会产生一个hook对象，并形成链表结构，绑定在workInProgress的memoizedState属性上，然后react-hooks上的状态，绑定在当前hooks对象的memoizedState属性上。对于effect副作用钩子，会绑定在workInProgress.updateQueue上，等到commit阶段，dom树构建完成，在执行每个 effect 副作用钩子。

## 六、hooks更新阶段

- 对于更新阶段，说明上一次 workInProgress 树已经赋值给了 current 树。存放hooks信息的memoizedState，此时已经存在current树上，react对于hooks的处理逻辑和fiber树逻辑类似。对于一次函数组件更新，当再次执行hooks函数的时候，比如 useState(0) ，首先要从current的hooks中找到与当前workInProgressHook，对应的currentHooks，然后复制一份currentHooks给workInProgressHook,接下来hooks函数执行的时候,把最新的状态更新到workInProgressHook，保证hooks状态不丢失。所以函数组件每次更新，每一次react-hooks函数执行，都需要有一个函数去做上面的操作，这个函数就是updateWorkInProgressHook,我们接下来一起看这个updateWorkInProgressHook。

- 1.updateWorkInProgressHook

  ```
  function updateWorkInProgressHook() {
      let nextCurrentHook;
      if (currentHook === null) {  /* 如果 currentHook = null 证明它是第一个hooks */
          const current = currentlyRenderingFiber.alternate;
          if (current !== null) {
          nextCurrentHook = current.memoizedState;
          } else {
          nextCurrentHook = null;
          }
      } else { /* 不是第一个hooks，那么指向下一个 hooks */
          nextCurrentHook = currentHook.next;
      }
      let nextWorkInProgressHook
      if (workInProgressHook === null) {  //第一次执行hooks
          // 这里应该注意一下，当函数组件更新也是调用 renderWithHooks ,memoizedState属性是置空的
          nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
      } else { 
          nextWorkInProgressHook = workInProgressHook.next;
      }
  
      if (nextWorkInProgressHook !== null) { 
          /* 这个情况说明 renderWithHooks 执行 过程发生多次函数组件的执行 ，我们暂时先不考虑 */
          workInProgressHook = nextWorkInProgressHook;
          nextWorkInProgressHook = workInProgressHook.next;
          currentHook = nextCurrentHook;
      } else {
          invariant(
          nextCurrentHook !== null,
          'Rendered more hooks than during the previous render.',
          );
          currentHook = nextCurrentHook;
          const newHook = { //创建一个新的hook
          memoizedState: currentHook.memoizedState,
          baseState: currentHook.baseState,
          baseQueue: currentHook.baseQueue,
          queue: currentHook.queue,
          next: null,
          };
          if (workInProgressHook === null) { // 如果是第一个hooks
          currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
          } else { // 重新更新 hook
          workInProgressHook = workInProgressHook.next = newHook;
          }
      }
      return workInProgressHook;
  }
  
  ```

  - 这一段的逻辑大致是这样的：

    - 首先如果是第一次执行hooks函数，那么从current树上取出memoizedState ，也就是旧的hooks。然后声明变量nextWorkInProgressHook，这里应该值得注意，正常情况下，一次renderWithHooks执行，workInProgress上的memoizedState会被置空，hooks函数顺序执行，nextWorkInProgressHook应该一直为null，那么什么情况下nextWorkInProgressHook不为null,也就是当一次renderWithHooks执行过程中，执行了多次函数组件，也就是在renderWithHooks中这段逻辑。

    ```
    if (workInProgress.expirationTime === renderExpirationTime) { 
            // ....这里的逻辑我们先放一放
        }
    ```

  - 这里面的逻辑，实际就是判定，如果当前函数组件执行后，当前函数组件的还是处于渲染优先级，说明函数组件又有了新的更新任务，那么循坏执行函数组件。这就造成了上述的，nextWorkInProgressHook不为 null 的情况。最后复制current的hooks，把它赋值给workInProgressHook,用于更新新的一轮hooks状态。

  - 接下来我们看一下四个种类的hooks，在一次组件更新中，分别做了那些操作。

- 2.updateState

  ```
  function updateReducer(reducer,initialArg,init){
      const hook = updateWorkInProgressHook();
      const queue = hook.queue;
      queue.lastRenderedReducer = reducer;
      const current = currentHook;
      let baseQueue = current.baseQueue;
      const pendingQueue = queue.pending;
      if (pendingQueue !== null) {
          // 这里省略... 第一步：将 pending  queue 合并到 basequeue
      }
      if (baseQueue !== null) {
          const first = baseQueue.next;
          let newState = current.baseState;
          let newBaseState = null;
          let newBaseQueueFirst = null;
          let newBaseQueueLast = null;
          let update = first;
          do {
          const updateExpirationTime = update.expirationTime;
          if (updateExpirationTime < renderExpirationTime) { //优先级不足
              const clone  = {
              expirationTime: update.expirationTime,
              ...
              };
              if (newBaseQueueLast === null) {
              newBaseQueueFirst = newBaseQueueLast = clone;
              newBaseState = newState;
              } else {
              newBaseQueueLast = newBaseQueueLast.next = clone;
              }
          } else {  //此更新确实具有足够的优先级。
              if (newBaseQueueLast !== null) {
              const clone= {
                  expirationTime: Sync, 
                  ...
              };
              newBaseQueueLast = newBaseQueueLast.next = clone;
              }
              /* 得到新的 state */
              newState = reducer(newState, action);
          }
          update = update.next;
          } while (update !== null && update !== first);
          if (newBaseQueueLast === null) {
          newBaseState = newState;
          } else {
          newBaseQueueLast.next = newBaseQueueFirst;
          }
          hook.memoizedState = newState;
          hook.baseState = newBaseState;
          hook.baseQueue = newBaseQueueLast;
          queue.lastRenderedState = newState;
      }
      const dispatch = queue.dispatch
      return [hook.memoizedState, dispatch];
  }
  
  ```

  - 这一段看起来很复杂，让我们慢慢吃透，首先将上一次更新的pending queue 合并到 basequeue，为什么要这么做，比如我们再一次点击事件中这么写

    ```
    function Index(){
        const [ number ,setNumber ] = useState(0)
        const handerClick = ()=>{
            //    setNumber(1)
            //    setNumber(2)
            //    setNumber(3)
            setNumber(state=>state+1)
            // 获取上次 state = 1 
            setNumber(state=>state+1)
            // 获取上次 state = 2
            setNumber(state=>state+1)
        }
        console.log(number) // 3 
        return <div>
            <div>{ number }</div>
            <button onClick={ ()=> handerClick() } >点击</button>
        </div>
      }
    
    ```

  - 点击按钮， 打印 3

  - 三次setNumber产生的update会暂且放入pending queue，在下一次函数组件执行时候，三次 update被合并到 baseQueue

  - 接下来会把当前useState或是useReduer对应的hooks上的baseState和baseQueue更新到最新的状态。会循环baseQueue的update，复制一份update,更新expirationTime，对于有足够优先级的update（上述三个setNumber产生的update都具有足够的优先级），我们要获取最新的state状态。，会一次执行useState上的每一个action。得到最新的state。

  - 这里有会有两个疑问🤔️:

    - 问题一：这里不是执行最后一个action不就可以了嘛?

      - 答案： 原因很简单，上面说了 useState逻辑和useReducer差不多。如果第一个参数是一个函数，会引用上一次 update产生的 state, 所以需要循环调用，每一个update的reducer，如果setNumber(2)是这种情况，那么只用更新值，如果是setNumber(state=>state+1),那么传入上一次的 state 得到最新state。

       - 问题二：什么情况下会有优先级不足的情况(updateExpirationTime < renderExpirationTime)？
         - 答案： 这种情况，一般会发生在，当我们调用setNumber时候，调用scheduleUpdateOnFiber渲染当前组件时，又产生了一次新的更新，所以把最终执行reducer更新state任务交给下一次更新。

- 3 updateEffect

  ```
  function updateEffect(create, deps): void {
      const hook = updateWorkInProgressHook();
      const nextDeps = deps === undefined ? null : deps;
      let destroy = undefined;
      if (currentHook !== null) {
          const prevEffect = currentHook.memoizedState;
          destroy = prevEffect.destroy;
          if (nextDeps !== null) {
          const prevDeps = prevEffect.deps;
          if (areHookInputsEqual(nextDeps, prevDeps)) {
              pushEffect(hookEffectTag, create, destroy, nextDeps);
              return;
          }
          }
      }
      currentlyRenderingFiber.effectTag |= fiberEffectTag
      hook.memoizedState = pushEffect(
          HookHasEffect | hookEffectTag,
          create,
          destroy,
          nextDeps,
      );
  }
  ```

  - useEffect 做的事很简单，判断两次deps 相等，如果相等说明此次更新不需要执行，则直接调用 pushEffect,这里注意 effect的标签，hookEffectTag,如果不相等，那么更新  effect ,并且赋值给hook.memoizedState，这里标签是 HookHasEffect | hookEffectTag,然后在commit阶段，react会通过标签来判断，是否执行当前的 effect 函数。

- 4.updateMemo

  ```
  function updateMemo(
      nextCreate,
      deps,
      ) {
      const hook = updateWorkInProgressHook();
      const nextDeps = deps === undefined ? null : deps; // 新的 deps 值
      const prevState = hook.memoizedState; 
      if (prevState !== null) {
          if (nextDeps !== null) {
          const prevDeps = prevState[1]; // 之前保存的 deps 值
          if (areHookInputsEqual(nextDeps, prevDeps)) { //判断两次 deps 值
              return prevState[0];
          }
          }
      }
      const nextValue = nextCreate();
      hook.memoizedState = [nextValue, nextDeps];
      return nextValue;
  }
  ```

  - 在组件更新过程中，我们执行useMemo函数，做的事情实际很简单，就是判断两次 deps是否相等，如果不想等，证明依赖项发生改变，那么执行 useMemo的第一个函数，得到新的值，然后重新赋值给hook.memoizedState,如果相等 证明没有依赖项改变，那么直接获取缓存的值。
  - 不过这里有一点，值得注意，nextCreate()执行，如果里面引用了usestate等信息，变量会被引用，无法被垃圾回收机制回收，就是闭包原理，那么访问的属性有可能不是最新的值，所以需要把引用的值，添加到依赖项 dep 数组中。每一次dep改变，重新执行，就不会出现问题了。
  - 温馨小提示： 有很多同学说 useMemo怎么用，到底什么场景用，用了会不会起到反作用，通过对源码原理解析，我可以明确的说，基本上可以放心使用，说白了就是可以定制化缓存，存值取值而已。

- 5.updateRef

  ```
  function updateRef(initialValue){
      const hook = updateWorkInProgressHook()
      return hook.memoizedState
  }
  ```

  - 函数组件更新useRef做的事情更简单，就是返回了缓存下来的值，也就是无论函数组件怎么执行，执行多少次，hook.memoizedState内存中都指向了一个对象，所以解释了useEffect,useMemo 中，为什么useRef不需要依赖注入，就能访问到最新的改变值。

