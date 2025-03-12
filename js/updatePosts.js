
let cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver((mutations, obs) => {
        const postTable = document.getElementById("postTable");

        postTable &&
            ((cachedPosts.length === 0 ? getPosts() : renderPosts(cachedPosts)), obs.disconnect()) 
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Intervalo para verificar si la tabla está vacía
    setInterval(() => {
        const postTable = document.getElementById("postTable");

        postTable && postTable.innerHTML.trim() === "" && renderPosts(cachedPosts);
            
    }, 1000);

    // Detecta cuando la página es visible y actualiza si es necesario
    document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && document.getElementById("postTable")?.innerHTML.trim() === "" 
        && renderPosts(cachedPosts);
    });
});

async function getPosts() {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/notices/showNotices", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        let getPost = response.data.result?.data || [];

        if (!Array.isArray(getPost)) getPost = [getPost];

        cachedPosts = getPost;
        localStorage.setItem("posts", JSON.stringify(getPost));
        
        renderPosts(getPost);
        
    } catch(error) {
        console.error("Ocurrio un problema al cargar las noticias: ", error);
    }
}

function renderPosts(posts) {
    const postTable = document.getElementById("postTable");
    postTable.innerHTML = "";

    posts.forEach(post => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.fechaPublicacion}</td>
            <td colspan="2">
                <a href="" class="color--yellow" id="editarCampos">
                    <span><img src="../../img/icon/edit.png" alt="edit"></span> Editar
                </a>
                <a href="" class="color--red" id="eliminarCampos">
                    <span><img src="../../img/icon/delete.png" alt="delete"></span> Eliminar
                </a>
            </td>
        `;
        postTable.appendChild(row);
    });
}