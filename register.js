document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    // Check if admin exists when page loads
    checkAdminExists();

    async function checkAdminExists() {
        try {
            const response = await fetch("/admin/exists");
            const data = await response.json();
            if (data.adminExists) {
                message.style.color = "#666";
                message.textContent = "Register as a new user. Admin already exists.";
            } else {
                message.style.color = "#2c5530";
                message.textContent = "First user will be registered as admin.";
            }
        } catch (err) {
            console.error("Error checking admin status:", err);
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                message.style.color = "green";
                const roleText = data.role === 'admin' ? 'Admin' : 'User';
                message.textContent = `${roleText} registration successful! Redirecting to login...`;
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