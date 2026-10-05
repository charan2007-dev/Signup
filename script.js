const API_URL = "/api/users";

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
    clearMessage();
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("signupTab").classList.add("active");
    clearMessage();
}

function showMessage(message, success) {
    const element = document.getElementById("message");
    element.textContent = message;
    element.style.color = success ? "green" : "red";
}

function clearMessage() {
    document.getElementById("message").textContent = "";
}

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const response = await fetch(API_URL + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, true);
            document.getElementById("signupForm").reset();
        } else {
            showMessage(data.message, false);
        }
    } catch (error) {
        console.error(error);
        showMessage("Unable to connect to server.", false);
    }
});

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, true);
        } else {
            showMessage(data.message, false);
        }
    } catch (error) {
        console.error(error);
        showMessage("Unable to connect to server.", false);
    }
});
