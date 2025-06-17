document.addEventListener("DOMContentLoaded", function(){
    const username = localStorage.getItem("loggedInUser");
    const WelcomeText = document.getElementById("welcomeUser");

    if (username){
        WelcomeText.textContent = `Welcome, ${username}`;

    }
    else{
        window.location.href = "index.html";
    }
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
});