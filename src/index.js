const register = document.querySelector('#registration');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirmation = document.querySelector('#passwordConfirmation');
const checkbox = document.querySelector('#terms');
let validUser = false;
let validEmail = false;
let validPassword = false;
let validPasswordConfirmation = false;

const userPattern = /^\w{4,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@(?!.*example\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordTemplate = "(?!.*[pP][aA][sS]{2}[wW][oO][rR][dD])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&()\\-`.+,/\"]).{12,}$";

username.addEventListener('change', function () {
    if(!userPattern.test(username.value)) {
        alert('Your username must not contain any whitespaces or special characters');
        username.style.color = 'red';
        validUser = false;
    }
    else {
        username.style.color = 'black';
        validUser = true;
    }

});

email.addEventListener('change', function () {
    if(!emailPattern.test(email.value)) {
        alert('This is not a valid email');
        email.style.color = "red";
        validEmail = false;
    }
    else {
        email.style.color = "black";
        validEmail = true;
    }
});

password.addEventListener('input', function (event) {
    event.preventDefault();
    const passwordPattern = new RegExp("^(?!.*" + username.value + ")" + passwordTemplate);
    if(!passwordPattern.test(password.value)) {
        password.style.color = "red";
        validPassword = false;
    }
    else {
        password.style.color = "black";
        validPassword = true;
    }

});

passwordConfirmation.addEventListener('input', function(event) {
    event.preventDefault();
    if(!(passwordConfirmation.value === password.value)) {
        passwordConfirmation.style.color = "red";   
        validPasswordConfirmation = false;
    }
    else {
        passwordConfirmation.style.color = "black";
        validPasswordConfirmation = true;
    }
});

register.addEventListener('submit', function (event) {
    event.preventDefault();
    let errors = [];
    let hasError = false;
    if(!validUser) {
        errors.push("Username must be 4 or more characters long and contain no special characters or whitespace");
        hasError = true;
    }
    if(!validEmail) {
        errors.push("Invalid email address");
        hasError = true;
    }
    if(!validPassword) {
        errors.push("Password must be at least 12 characters long and contain one uppercase and one lowercase letter, and contain at least one special character and number. Furthermore it must not contain the word password or your username");
        hasError = true;
    }
    if(!validPasswordConfirmation) {
        errors.push("Passwords must match");
        hasError = true;
    }
    if(checkbox.checked == 0) {
        errors.push("You must agree to the terms of use");
        hasError = true;
    }

    if(hasError) {
        alert(errors.join("\n\n"));
    }
    else {
        addUser();
    }

});

function addUser() {
    let newUser = username.value.toLowerCase();
    let newEmail = email.value.toLowerCase();
    let newPassword = password.value;

    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    let isExistingUser = existingUsers.some(function(user) {
        return user.user === newUser; 
    });
    console.log(isExistingUser);
    if(isExistingUser) {
        alert("That username is already taken");
    }
    else {
        existingUsers.push({user: newUser, email: newEmail, password: newPassword});
        localStorage.setItem("users", JSON.stringify(existingUsers));
        alert("Registration Successful");
        console.log(existingUsers);
    }
    username.value = "";
    email.value = "";
    password.value = "";
    passwordConfirmation.value = "";
}

