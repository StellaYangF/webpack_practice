/**
 * BailHook中的回调函数也是顺序执行的
 * 调用call时传入的参数也可以传给回调函数
 * 当回调函数返回非undefined值的时候会停止调用后续的回调 
*/ 

// const { SyncBailHook } = require('tapable');

class SyncBailHook {
    constructor(args) {
        this._args = args;
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    call() {
        const length = this._args.length;
        for(let i =0; i < this.taps.length; i++) {
            let result = this.taps[i](...Array.from(arguments).slice(0, length));
            if (typeof result !== undefined) {
                return;
            }
        }
    }
}

const hook = new SyncBailHook(['name', 'age']);

hook.tap('1', (name, age) => {
    console.log('1', name, age);
    return true;
})


hook.tap('2', (name, age) => {
    console.log('2', name, age);
})

hook.tap('2', (name, age) => {
    console.log('3', name, age);
})

hook.call('Stella', 18);