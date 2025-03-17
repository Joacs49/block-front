document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.getElementById("newsContainer");

    try {
        // Realiza la solicitud a tu API
        const response = await axios.get("http://127.0.0.1:8000/api/notices/showNoticesAll");

        const news = response.data.result || []; // Obtén las noticias de la respuesta
        console.log("Noticias obtenidas:", news);

        // Genera dinámicamente el contenido para cada noticia
        news.forEach((item) => {
            const article = document.createElement("article");
            article.classList.add("container-article");

            article.innerHTML = `
                <figure class="container-image">
                    <img src="${item.img || './img/default.jpg'}" alt="imagen de la noticia">
                </figure>
                <h1>${item.title || "Sin título"}</h1>
                <p>${item.paragraph || "Sin contenido disponible."}</p>
                <a href="${item.url || '#'}" target="_blank">Leer más</a>
            `;

            newsContainer.appendChild(article);
        });
    } catch (error) {
        console.error("Error al obtener las noticias:", error);
        newsContainer.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
    }
});