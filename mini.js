//////////////////////////////////////////
// Sign Up Module
var NameInput = document.getElementById("NameInput");
var EmailInput = document.getElementById("EmailInput");
var PasswordInput = document.getElementById("PasswordInput");
var SignUpButton = document.getElementById("SignUpButton");
var ValidationMessage = document.getElementById("ValidationMessage");
var SignInLink = document.getElementById("SignInLink");

let usersList = [];
if (JSON.parse(localStorage.getItem("UserData")) !== null) {
    usersList = JSON.parse(localStorage.getItem("UserData"));
}

if (SignUpButton) {
    ValidationMessage.innerHTML = "";
    SignUpButton.addEventListener("click", function() {
        if (NameInput.value !== "" && 
            EmailInput.value !== "" && 
            PasswordInput.value !== "" && 
            !usersList.some(user => user.email === EmailInput.value)) {
            
            var newUser = {
                name: NameInput.value.trim(),
                email: EmailInput.value,
                password: PasswordInput.value
            };
            
            usersList.push(newUser);
            localStorage.setItem("UserData", JSON.stringify(usersList));
            ValidationMessage.innerHTML = "Registration Successful!";
            ClearFormFields();
        } else if(NameInput.value == "" && 
            EmailInput.value == "" && 
            PasswordInput.value == "" ) {

            ValidationMessage.innerHTML = "Please fill in the fields.";

            }else{
            ValidationMessage.innerHTML = "This email is already registered.";
        }
    });
}

function ClearFormFields() {
    NameInput.value = "";
    EmailInput.value = "";
    PasswordInput.value = "";
}

const ValidationPatterns = {
    name: /^[a-zA-Z0-9_]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
};

function ValidateInput(fieldType, inputElement) {
    if (ValidationPatterns[fieldType.toLowerCase()].test(inputElement.value)) {
        inputElement.classList.add("is-valid");
        inputElement.classList.remove("is-invalid");
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
    }
    UpdateButtonState();
}

function UpdateButtonState() {
    if (NameInput.classList.contains("is-valid") &&
        EmailInput.classList.contains("is-valid") &&
        PasswordInput.classList.contains("is-valid")) {
        SignUpButton.removeAttribute('disabled');
        SignUpButton.classList.remove("bg-black");
    } else {
        SignUpButton.setAttribute('disabled', true);
        SignUpButton.classList.add("bg-black");
    }
}

//////////////////////////////////////////
// Sign In Module
const SignInEmail = document.getElementById("EmailInput");
const SignInPassword = document.getElementById("PasswordInput");
const SignInButton = document.getElementById("SignInButton");
const SignInValidationMsg = document.getElementById("ValidationMessage");

if (SignInButton) {
    SignInValidationMsg.innerHTML = "";

    SignInButton.addEventListener("click", function() {
        const userData = JSON.parse(localStorage.getItem("UserData")) || [];
        const foundUser = userData.find(user => user.email === SignInEmail.value);
        
        if (foundUser && foundUser.password === SignInPassword.value) {
            localStorage.setItem("CurrentUser", JSON.stringify(foundUser.name));
            window.location.href = "index.html";
        } else {
            SignInValidationMsg.innerHTML = "Invalid email or password. Please try again.";
        }
    });
}