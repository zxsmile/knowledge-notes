import { Props, Key, Ref, ReactElementType } form '@/shared/ReactTypes'
import { FunctionComponent, HostComponent, WorkTag } form './workTag'
import {Flags, NoFlags} from './fiberFlags';
import {Container} from '@/react-dom/hostConfig'

export class FiberNode {
    // 元素类型，函数式组件就是函数本身
    type: any;   // div span li ul

    // 组件对象类型
    tag: WorkTag;

    // 组件初始props
    pendingProps: Props;
    key: Key;

    // 真实dom
    stateNode: any;
    ref: Ref;

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;

    // 更新后的props状态
    memoizedProps: Props | null;
    memoizedState: any;

    // 连体婴儿  双缓存机制
    alternate: FiberNode | null;    

    // 副作用标记
    flags: Flags;
    subtreeFlags: Flags;
    updateQueue: unknown;
    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        // 实例
        this.tag = tag;
        this.key = key;
        // HostComponent <div> div DOM
        this.stateNode = null;
        // FunctionComponent () => {}
        this.type = null;

        // 构成树状结构
        this.return = null;
        this.sibling = null;
        this.child = null;
        this.index = 0;

        this.ref = null;

        // 作为工作单元
        this.pendingProps = pendingProps;
        this.memoizedProps = null;
        this.memoizedState = null;
        this.updateQueue = null;

        this.alternate = null;

        // 副作用, 更新元素的标记
        this.flags = NoFlags;
        this.subtreeFlags = NoFlags;
    }
}

//current代表子元素的指针
//fiberRootNode(根节点) => hostRootFiber(rootDom) => App

export class FiberRootNode {
   container: Container;
   current:FiberNode;
   finishedWork: FiberNode | null;
  
   //container真实根div     hostRootFiber  空fiber对象 tag=hostRoot
   constructor(container:Container, hostRootFiber:FiberNode) {
       this.container = container;
       this.current = hostRootFiber;
       hostRootFiber.stateNode = this;
       this.finishedWork = null
   }

}