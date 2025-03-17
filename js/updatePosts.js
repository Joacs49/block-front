let cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
let currentPage = 1;
const postsPerPage = 5; // Número de posts por página

document.addEventListener("DOMContentLoaded", function () {
    const observer = new MutationObserver((mutations, obs) => {
        const postTable = document.getElementById("postTable");

        postTable &&
            ((cachedPosts.length === 0 ? getPosts() : renderPosts(cachedPosts)), obs.disconnect());
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setInterval(() => {
        const postTable = document.getElementById("postTable");

        postTable && postTable.innerHTML.trim() === "" && renderPosts(cachedPosts);
    }, 1000);

    document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" &&
            document.getElementById("postTable")?.innerHTML.trim() === "" &&
            renderPosts(cachedPosts);
    });
});

async function getPosts(page = 1) {
    console.log("Solicitando datos para la página:", page); // Verifica la página solicitada
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notices/showNotices?page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const result = response.data.result || {};
        const posts = result.data || []; // Datos de la página actual
        const totalPages = result.last_page || 1; // Total de páginas

        console.log("Datos obtenidos:", posts);
        console.log("Total de páginas:", totalPages);

        cachedPosts = posts; // Actualiza los datos de la página actual
        renderPosts(posts, totalPages); // Renderiza los datos y la paginación
    } catch (error) {
        console.error("Ocurrió un problema al cargar las noticias: ", error);
    }
}

function renderPosts(posts, totalPages) {
    console.log("Renderizando posts:", posts); // Verifica los datos recibidos

    const postTable = document.getElementById("postTable");
    if (!postTable) {
        console.error("El elemento con ID 'postTable' no existe.");
        return;
    }

    postTable.innerHTML = "";

    // Renderizar los posts de la página actual
    posts.forEach((post) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${post.title || "Sin título"}</td>
            <td>${post.fechaPublicacion || "Sin fecha"}</td>
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

    // Renderizar los botones de paginación
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById("pagination");

    if (!pagination) {
        console.error("El elemento con ID 'pagination' no existe.");
        return;
    }

    pagination.innerHTML = "";

    // Botón "Anterior"
    const prevButton = document.createElement("button");
    prevButton.textContent = "←";
    prevButton.disabled = currentPage === 1; // Deshabilitar si es la primera página
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            console.log("Página anterior:", currentPage); // Verifica la página anterior
            getPosts(currentPage); // Solicitar la página anterior al backend
        }
    });
    pagination.appendChild(prevButton);

    // Botón "Siguiente"
    const nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.disabled = currentPage === totalPages; // Deshabilitar si es la última página
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            console.log("Página siguiente:", currentPage); // Verifica la página siguiente
            getPosts(currentPage); // Solicitar la página siguiente al backend
        }
    });
    pagination.appendChild(nextButton);
}