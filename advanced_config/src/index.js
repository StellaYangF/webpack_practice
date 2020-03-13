import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import "flexible-rem";
import str from "./a.js";
console.log(str);
const Button = function() {
    const handleClick = () => import('./hello.js');
    return (
        <button onClick={ handleClick }>import hello.js</button>
    )
}
ReactDOM.render(<Button />, document.getElementById('root'));