fetch("session.php").then(res => res.json()).then(data => {
    if(data.loggedIn) {
        document.getElementById("status").textContent = "You are logged in as " + data.username;
    }
});