function disableLink(href) {
    const link = document.querySelector(`.header a[href="${href}"]`);
    if(link) {
        link.removeAttribute("href");
        link.classList.add("disabled");
    }
}

fetch("session.php").then(res => res.json()).then(data => {
    if(data.loggedIn) {
        disableLink("login.html");
        disableLink("signup.html");
    } else {
        disableLink("logout.html");
    }
});