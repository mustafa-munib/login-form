document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role })
            });
            const data = await response.json();
            if (response.ok) {
                message.style.color = "green";
                message.textContent = "Registration successful! Redirecting to login...";
                setTimeout(() => { window.location.href = "index.html"; }, 1500);
            } else {
                message.style.color = "red";
                message.textContent = data.message || "Registration failed.";
            }
        } catch (err) {
            message.style.color = "red";
            message.textContent = "Error connecting to server.";
        }
    });
}); 