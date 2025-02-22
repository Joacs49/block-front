
window.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("name") || "Usuario";
    document.getElementById("welcome-message").textContent = `Bienvenido ${userName}`;
});
