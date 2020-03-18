const path = require('path');
const resolve = (...filenames) => path.resolve(__dirname, ...filenames);
const fs = require('fs');
const readFile = fs.readFileSync;
const entry = "./src/index.js";

const config = {
    resource: resolve(entry),
    loaders: [
        resolve('loaders', 'a-loader.js'),
        resolve('loaders', 'b-loader.js'),
        resolve('loaders', 'c-loader.js'),
    ]
};

function createLoaderObject(loaderPath) {
    let loaderObject = { data: {} };
    loaderObject.path = loaderObject;
    loaderObject.normal = require(loaderPath);
    loaderContext.pitch = loaderObject.normal.path;
    return loaderObject;
}

function runLoaders(options, finalCallback) {
    let loaderContext = {};
    loaderContext.resource = options.resource;
    loaderContext.loaders = options.loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;
    loaderContext.readResource = options.readResource;

    Object.defineProperties(loaderContext, {
        'request': {
            get() {
                return loaderContext.loaders.map(loaderObject => loaderObject.path);
            }
        },
        'previousRequest': {
            get() {
                return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loaderObject => loaderObject.path);
            }
        },
        'remainingRequest': {
            get() {
                return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loaderContext => loaderContext.path);
            }
        },
        'data': {
            get() {
                return loaderContext.loaders[loaderContext.loaderIndex].data;
            }
        }
    });

    iteratePitchingLoaders(loaderContext, finalCallback);

    function iteratePitchingLoaders(loaderContext, finalCallback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            loaderContext.loaderIndex --;
            return processResource(loaderContext, finalCallback);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let pitchFn = currentLoaderObject.pitch;
        if (!pitchFn) {
            loaderContext.loaderIndex ++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
        let args = pitchFn.call(loaderContext, loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data);
        if (args) {
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {
            loaderContext.loaderIndex ++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
    }
    function iterateNormalLoaders(loaderContext, args, finalCallback) {
        if (loaderContext.loaderIndex < 0) {
            return finalCallback(null, args);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let normalFn = currentLoaderObject.normal;
        let isSync = true;
        const innerCallback = loaderContext.callback = (err, args) => {
            loaderContext.loaderIndex --;
            iterateNormalLoaders(loaderContext, args, finalCallback);
        };
        loaderContext.async = () => {
            isSync = false;
            return innerCallback;
        }
        args = convertArgs(args, normalFn.raw);
        args = normalFn.call(loaderContext, args);
        if (isSync) {
            loaderContext.loaderIndex ++;
            iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {}
    }
    function convertArgs(args, isRaw) {
        if (!isRaw && Buffer.isBuffer(args)){
            args = args.toString('utf8');
        } else if (isRaw && typeof args === 'string'){
            args = new Buffer(args, 'utf8');
        }
    }
    function processResource(loaderContext, finalCallback) {
        let buffer = loaderContext.readResource(loaderContext.resource);
        iterateNormalLoaders(loaderContext, buffer, finalCallback);
    }
}

console.time('cost');
runLoaders({
    resource: "",
    loader: [],
    context: {},
    readResource: readFile,
}, (error, result) => {
    console.log('经过 loader 编译后的结果', result);
    console.timeEnd('cost');
})