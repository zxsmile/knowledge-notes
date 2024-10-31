export type WorkTag =
    | typeof FunctionComponent
    | typeof HostRoot
    | typeof HostComponent
    | typeof HostText;

export const FunctionComponent = 0;

//全局只有一个
export const HostRoot = 3;   // hsotroot代表生成的中间空节点

export const HostComponent = 5;   // 原生节点  div span等
// <div>123</div>
export const HostText = 6;