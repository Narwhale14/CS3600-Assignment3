const form = document.querySelector("form");

function showError(id, message) {
    document.getElementById(id).classList.add("invalid");
    document.getElementById(id + "-error").textContent = message;
}

function clearError(id) {
    document.getElementById(id).classList.remove("invalid");
    document.getElementById(id + "-error").textContent = "";
}

form.addEventListener("submit", (event) => {
    let valid = true;

    const username = document.getElementById("username").value.trim();
    if(username === "") {
        showError("username", "Username is required");
        valid = false;
    } else if(!/^[a-zA-Z0-9_]+$/.test(username)) {
        showError("username", "Username can only contain letters, numbers and underscores");
        valid = false;
    } else {
        clearError("username");
    }

    const email = document.getElementById("email");
    if(email.validity.valueMissing) {
        showError("email", "Email is required");
        valid = false;
    } else if(email.validity.typeMismatch) {
        showError("email", "Please enter a valid email");
        valid = false;
    } else {
        clearError("email")
    }

    const password = document.getElementById("password").value;
    if(password === "") {
        showError("password", "Password is required");
        valid = false;
    } else if(password.length < 8) {
        showError("password", "Password must be at least 8 characters");
        valid = false;
    } else {
        clearError("password");
    }

    const confirm_password = document.getElementById("confirm-password").value;
    if(confirm_password === "") {
        showError("confirm-password", "Please confirm your password");
        valid = false;
    } else if(confirm_password !== password) {
        showError("confirm-password", "Passwords do not match");
        valid = false;
    } else {
        clearError("confirm-password")
    }

    if(!valid) {
        event.preventDefault();
    }
});

const params = new URLSearchParams(location.search);
if(params.get("error") == "taken") {
    showError("username", "Username or email is already taken");
}