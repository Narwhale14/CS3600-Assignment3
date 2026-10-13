fetch("session.php").then(res => res.json()).then(data => {
    if(data.loggedIn) {
        document.getElementById("status").textContent = "You are logged in as " + data.username;
    }
});

for(const id of ["login-link", "signup-link"]) {
    const link = document.getElementById(id);
    link.removeAttribute("href");
    link.classList.add("disabled")
}