var LogoutButton = document.getElementById("LogoutButton");
var WelcomeMessage = document.getElementById("WelcomeMessage");

var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));

if (LogoutButton) {
    LogoutButton.addEventListener("click", function() {
        localStorage.removeItem("CurrentUser");
        window.location.href = "signin.html";
    });
}

if (!currentUser) {
    window.location.href = "signin.html";
}

if (currentUser && WelcomeMessage) {
    WelcomeMessage.innerHTML = `Welcome, ${currentUser}!`;
}