class hashRouter{
    constructor() {

    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = '';
    // 记录出现过的hash
    this.history = [];
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
    }

    
    route(path,callback) {
         this.routers[path] = callback || function() {}
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/'
        this.history.push(this.currentUrl)
        this.currentIndex++
        this.routers[this.currentUrl]()
    }

    backOff() {
        this.currentIndex = this.currentIndex<=0 ? 0:this.currentIndex-1
        location.hash = `#${this.history[this.currentIndex]}`
        this.refresh()
    }
}