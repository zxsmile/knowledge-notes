import {jsx} from './react/jsx'


const App:any = function() {
    return (
        <h1>
            <h2>
                <h3>333333</h3>
            </h2>
        </h1>
    )
}


import ReactDom from '@/react-dom'
const root:any = document.querySelector('#root')

debugger//断点
ReactDom.createRoot(root).render(App)
