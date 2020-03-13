console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./dist/flexible-rem.js');
} else {
    module.exports = require('./dist/flexible-rem.min.js');
}