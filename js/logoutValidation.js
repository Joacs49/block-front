
document.querySelector(".logout").addEventListener("click" ,async function(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); 
    const pass = localStorage.getItem("pass"); 

    if(!token || !email || !pass) alert("No hay sesión activa.");
    
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/auth/logout", 
        {
            email: email,
            password: pass
        }, 
        {
            headers: 
            {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Respuesta del servidor: ", response.data);

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("posts");
        localStorage.removeItem("lastVisit");
        
        window.location.href = "../page/login.html";

    } catch (error) {
        console.error("Error al cerrar la sesion: ", error.response?.data || error);
        alert("Error al iniciar sesion.");
    }
});