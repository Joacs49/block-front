
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver((mutations, obs) => {

        const name = document.getElementById("name_account");
        const email = document.getElementById("email");

        name && email (() => {
            loadUserData();
            obs.disconnect();
        })();
        
    });

    observer.observe(document.getElementById("dynamic-content"), { childList: true, subtree: true });

    setInterval(() => {
        const name = document.getElementById("name_account");
        const email = document.getElementById("email");

        name && email && name.value.trim() === "" && email.value.trim() === "" && variablesCache(name, email);
        
    }, 1000);

    document.addEventListener("visibilitychange", () => {
        const name = document.getElementById("name_account");
        const email = document.getElementById("email");   

        if (document.visibilityState === "visible") {
            variablesCache(name, email); 
        }
        
    });
});

async function loadUserData() {
    const token = localStorage.getItem("token");

    !token && alert("No tienes una cuenta activa.");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/showUser", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userData = response.data.result[0];

        document.getElementById("name_account").value = userData.name || "";
        document.getElementById("email").value = userData.email || "";

    } catch (error) {
        console.error("Error al obtener los datos del usuario: ", error);
    }
}

function variablesCache(name, email) {
    name.value = localStorage.getItem("name") || "";
    email.value = localStorage.getItem("email") || "";
}