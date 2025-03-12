
document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver((mutations, obs) => {

        const cantidadPost = document.getElementById("cantidadPost");
        const cantidadView = document.getElementById("cantidadView");

        cantidadPost && cantidadView &&(() => {
            updatePost();
            shouldIncrementView() ? updateView() : getView();
            updateLastPost();
            //obs.disconnect();
        })();
    });
    observer.observe(document.body, {childList:true, subtree:true});
});

function shouldIncrementView() {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date().getTime();

    // Si no hay última visita o ha pasado más de 24 horas
    if (!lastVisit || now - lastVisit > 24 * 60 * 60 * 1000) { 
        localStorage.setItem("lastVisit", now); 
        return true;
    }
    return false;
}

async function updatePost() {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/notices/countNotices",
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        );

        const dataUser = response.data.result?.count ?? 0;

        document.getElementById("cantidadPost").textContent = dataUser ?? 0;

    } catch(error) {
        console.error("Ocurrio un problema al recibir los datos de la noticia: ", error)
    }
}

async function updateView() {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/interactions/insertView", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });

        const dataView = response.data.result?.views ?? 0;

        document.getElementById("cantidadView").textContent = dataView ?? 0;

    } catch(error) {
        console.error("Ocurrio un problema al cargar las vistas: ", error);
    }
}

async function getView() {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/interactions/getView", {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })

        const dataView = response.data.result?.views ?? 0;

        document.getElementById("cantidadView").textContent = dataView ?? 0;

    }catch(error) {
        console.error("Ocurrio un problema al cargar las vistas: ", error);
    }
}

async function updateLastPost() {
    const token = localStorage.getItem("token");

    const titleData = document.getElementById("titleData");
    const paragraphpData = document.getElementById("paragraphpData");
    const fechaPublicacion = document.getElementById("fechaPublicacion");
    const horaPublicacion = document.getElementById("horaPublicacion");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/notices/showLastNotices", {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });

        const noticesData = response.data.result;

        titleData.textContent = noticesData.title || null;
        paragraphpData.textContent = noticesData.paragraph || null;
        fechaPublicacion.textContent = noticesData.fechaPublicacion || null;
        horaPublicacion.textContent = noticesData.horaPublicacion || null;

    } catch(error) {
        console.error("Ocurrio un problema al cargar las vistas: ", error);
    }
}