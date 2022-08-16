import foo from './foo';
import './style.css';

console.log(11, foo);

const add = (...args) => {
    return args.reduce((a, b) => a+ b, 0);
}

console.log(add(1, 2, 3, 4));
