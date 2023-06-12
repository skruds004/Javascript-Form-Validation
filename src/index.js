const form = document.querySelector('#registration');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#passwordConfirmation');

const userPattern = /^\w{4,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordTemplate = "(?!.*[pP][aA][sS]{2}[wW][oO][rR][dD])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$";

username.addEventListener('change', function () {
    if(!userPattern.test(username.value)) {
        alert('Your username must not contain any whitespaces or special characters');
        username.style.color = 'red';
    }
    else {
        username.style.color = 'black';
    }

});

email.addEventListener('change', function () {
    if(!emailPattern.test(email.value)) {
        alert('This is not a valid email');
        email.style.color = "red";
    }
    else {
        email.style.color = "black";
    }
});

password.addEventListener('input', function (event) {
    event.preventDefault();
    const passwordPattern = new RegExp("^(?!.*" + username.value + ")" + passwordTemplate);
    console.log(passwordPattern);
    if(!passwordPattern.test(password.value)) { //|| password.value != passwordConfirmation.value) {
        password.style.color = "red";
    }
    else {
        password.style.color = "black";
    }

});

passwordConfirmation.addEventListener('input', function(event) {
    event.preventDefault();
    if(!(passwordConfirmation.value === password.value)) {
        passwordConfirmation.style.color = "red";   
    }
    else {
        passwordConfirmation.style.color = "black";
    }
});

form.addEventListener('submit', function (event) {
    preventDefault(event);
});

