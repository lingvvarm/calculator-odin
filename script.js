"use strict"

let current_upper = "";
let current_lower = "";

let a, b, oper;
let last_is_equal = false;

const upper = document.querySelector('.upper-text');
const lower = document.querySelector('.lower-text');
const clear_btn = document.querySelector('.clear');
const backspace_btn = document.querySelector('.backspace');
const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.oper-button');
const equal_btn = document.querySelector('.equal');
const negative_btn = document.querySelector('.neg');
const dot_btn = document.querySelector('.dot');


digits.forEach(digit => digit.addEventListener('click', function() {
    handle_digit(digit.textContent);
}));

function handle_digit(num) {
    if (last_is_equal == true) {
        clear();
        last_is_equal = false;
    }
    current_lower += num;
    update_display(current_upper, current_lower);
}

operations.forEach(operation => operation.addEventListener('click', function() {
    handle_operation(operation.textContent);
}));

function handle_operation(operation) {
    if (!current_lower) {
        oper = operation;
        current_upper = a + " " + oper;
        update_display(current_upper, "same");
        return
    }
    equal();
    if (current_lower) a = current_lower;
    oper = operation;
    current_upper = a + " " + oper;
    current_lower = "";
    update_display(current_upper, "same");
    last_is_equal = false
}

document.addEventListener('keydown', handle_keyboard);
equal_btn.onclick = () => equal();
negative_btn.onclick = () => negative();
dot_btn.onclick = () => dot();
clear_btn.onclick = () => clear();
backspace_btn.onclick = () => backspace();


function backspace() {
    current_lower = current_lower.slice(0, -1);
    update_display(current_upper, current_lower);
}

function dot() {
    if (current_lower.includes(".")) return
    current_lower += ".";
    update_display("same", current_lower);
}

function clear() {
    current_lower = "";
    current_upper = "";
    a = "";
    b = "";
    oper = "";
    update_display("", "0");
}

function equal() {
    if (current_lower) b = current_lower;
    if (a && b && oper) {
        current_upper = `${a} ${oper} ${b} =`;
        let res = operate(oper, a, b);
        current_lower = res;
        a = res;
        oper = "";
        b = "";
        update_display(current_upper, current_lower);
        last_is_equal = true;
    } 
}

function negative() {
    if (current_lower == "" || current_lower == "0") return; 
    if (current_lower[0] == "-") {
        current_lower = current_lower.slice(1);
    }
    else {
        current_lower = "-" + current_lower;
    }
    update_display("same", current_lower);
}

function update_display(upper_text, lower_text) {
    switch (upper_text) {
        case "same":
            {};
            break;
        default:
            upper.textContent = upper_text;
            break;
    }
    switch (lower_text) {
        case "same":
            {};
            break;
        default:
            lower.textContent = lower_text;
            break;
    }
}

function operate(oper, a, b) {
    a = Number(a);
    b = Number(b);
    switch (oper) {
        case "+":
            return add(a, b);
        case "−":
        case "-":
            return subtract(a, b);
        case "×":
        case "*":
            return multiply(a, b);
        case "÷":
        case "/":
            return divide(a, b);
        case "%":
            return mod(a, b);
    }
}

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
    return (b == 0) ? "error": (a / b).toFixed(2);
};
let mod = (a, b) => a % b;


function handle_keyboard(event) {
    if (event.ctrlKey && event.key == "-") {
        negative();
      }
    else if (["+", "-", "*", "/", "%"].includes(event.key)) handle_operation(event.key)
    if (event.key >= 0 && event.key <= 9) handle_digit(event.key);
    if (event.key == "Backspace") backspace();
    if (event.key == ".") dot();
    if (event.key == "Escape") clear();   
    if (event.key == "Enter" || event.key == "=") equal(); 
    
}