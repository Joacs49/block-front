
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (token) (window.location.href = "admin.php");
});

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
            email: email,
            password: pass
        });

        console.log("Respuesta del servidor: ", response.data);

        const userData = response.data.result?.user
        
        response.data.result?.token ? (() => {
            localStorage.setItem("token", response.data.result.token);
            localStorage.setItem("email", email);
            localStorage.setItem("name", userData.name || "");
            localStorage.setItem("id", Number(userData.user_id ?? 0));
            window.location.href = "admin.php";
        })()
        : alert("Credenciales Incorrectas.");
    
    } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error);
        alert("Error al iniciar sesión");
    }
});