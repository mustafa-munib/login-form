document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;

        const password = document.getElementById("password").value;

        const hashedPassword = CryptoJS.MD5(password).toString();

        const matchedUser = adminUser.find(user => 
            user.username === username && user.hashedPassword === hashedPassword);
        


        if ( matchedUser) {
            localStorage.setItem("loggedInUser",username);
            alert("Login successful. Welcome" + username + "!");
            console.log("Redirecting to dashboard");
            window.location.href ="dashbord.html";
        }else{
            alert("Login failed. Incorrect credentials.")
        }
    });
});