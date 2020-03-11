// import _ from 'lodash';
// import('expose-loader?_!lodash');

// 全局变量
// import 方法无效
// require("expose-loader?_!lodash");
import "@/index.css";
// import "bootstrap";
import _ from 'lodash';
// console.log(process.env.NODE_ENV);


console.log(_.join(['a', 'b', 'c'], '@'));

console.log(PRODUCTION);
console.log(VERSION);
console.log(EXPRESSION);
console.log(COPYRIGHT);