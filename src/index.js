const a = require('./a');
import "./index.css";
import "./a.css";
console.log(a);

let logo = require('./1.jpg');
// Module {default: "bdf3bf1da3405725be763540d6601144.jpg", __esModule: true, Symbol(Symbol.toStringTag): "Module"}
// default: "bdf3bf1da3405725be763540d6601144.jpg"
// __esModule: true
// Symbol(Symbol.toStringTag): "Module"
// __proto__: Object
let img = new Image();
img.src = logo.default;
document.body.appendChild(img);

class Person {
    
}