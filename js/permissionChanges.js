
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver((mutations, obs) => {

        const changeState = document.getElementById("changeState");

        if(changeState) {
            changeState.addEventListener("click", async function(event){
                event.preventDefault();

                const name = document.getElementById("name_account");
                const email = document.getElementById("email");

                name.readOnly = !name.readOnly;
                email.readOnly = !email.readOnly;

                changeState.value = name.readOnly ? "Habilitar edición" : "Deshabilitar edición";
            });
        }
        obs.disconnect();
    });
    observer.observe(document.body, {childList:true, subtree:true});
});

