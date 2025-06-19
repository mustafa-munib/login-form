document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const loginMessage = document.getElementById("loginMessage");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("loggedInUser", username);
                localStorage.setItem("userRole", data.role);
                if (data.role === "admin") {
                    window.location.href = "dashbord.html";
                } else {
                    window.location.href = "user.html";
                }
            } else {
                loginMessage.style.color = "red";
                loginMessage.textContent = data.message || "Login failed.";
            }
        } catch (err) {
            loginMessage.style.color = "red";
            loginMessage.textContent = "Error connecting to server. Please try again later.";
        }
    });
});