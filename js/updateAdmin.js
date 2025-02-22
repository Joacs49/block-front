
document.addEventListener("DOMContentLoaded", () => {
    const observe = new MutationObserver((mutations, obs) => {

        const form = document.getElementById("form-tools");

        if(form) {
            form.addEventListener("submit", async function (event) {
                event.preventDefault(); 

                const nameAccount = document.getElementById("name_account").value.trim();
                const emailAccount = document.getElementById("email").value.trim();
                const token = localStorage.getItem("token");
                const idAdmin = localStorage.getItem("id");

                !nameAccount || !emailAccount ? alert("No se encontraron los datos del usuario.") : null;

                !token && alert("Sesion no activa.")  

                try {
                    await axios.put(`http://127.0.0.1:8000/api/user/updateUser/${idAdmin}`,
                        { 
                            name: nameAccount, 
                            email: emailAccount 
                        },
                        { headers: 
                            { 
                                Authorization: `Bearer ${token}` 
                            } 
                        }
                      );
                      
                    localStorage.setItem("name", nameAccount); 
                    document.getElementById("welcome-message").textContent = `Bienvenido 
                    ${nameAccount}`;

                } catch(error) {
                    console.error("Ocurrio un problema al actualizar el usuario: ", error)
                }
            });
            obs.disconnect();
        }
    });
    observe.observe(document.body, { childList: true, subtree: true });
});

