/**
 * SyncWaterfallHook表示如果上一个回调函数的结果不为undefined,则可以作为下一个回调函数的第一个参数
 * 回调函数接受的参数来自于上一个函数的结果
 * 调用call传入的第一个参数，会被上一个函数的非undefined结果替换
 * 当回调函数返回非undefined不会停止回调栈的调用
*/ 

 const { SyncWaterfallHook } = require('tapable');

class SyncWaterfallHook1 {
    constructor(args) {
        this._args = args;
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    call() {
        let args = slice.call(arguments, 0, this.args.length);
        let first = args[0];
        let result; 
        let i = 0;
        do {
            result = this.taps[i](result || first, args.slice(1));
        } while(++i < this.taps.length)
    }
}

const hook = new SyncWaterfallHook(['name', 'age']);

hook.tap('1', (name, age) => {
    console.log('1', name, age);
    return Symbol();
})


hook.tap('2', (name, age) => {
    console.log('2', name, age);
})

hook.tap('2', (name, age) => {
    console.log('3', name, age);
})

hook.call('Stella', 18);