// import "./index.css";

function readonly(target, property, descriptor) {
    descriptor.writable = false;
}
class A {
    @readonly PI = 3.14;
}

let a = new A();
a.PI = 3.15;