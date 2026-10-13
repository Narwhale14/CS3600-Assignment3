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

    const user = document.getElementById("user").value.trim();
    if(user === "") {
        showError("user", "Please enter your username or email");
        valid = false;
    } else if(user.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
        showError("user", "Please enter a valid email");
        valid = false;
    } else {
        clearError("user");
    }

    const password = document.getElementById("password").value;
    if(password === "") {
        showError("password", "Please enter your password");
        valid = false;
    } else {
        clearError("password");
    }

    if(!valid) {
        event.preventDefault();
    }
});