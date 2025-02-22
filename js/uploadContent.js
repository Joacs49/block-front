
window.addEventListener("DOMContentLoaded", function () {
    const defaultUrl = "dashboard.php"; 

    const links = document.querySelectorAll('.menu-link');

    links.forEach(link => link.classList.remove('menu-link--active'));
    
    const firstLink = document.querySelector('.menu-link');
    
    firstLink ? firstLink.classList.add('menu-link--active') : null;

    fetch(defaultUrl)
        .then(response => response.text())
        .then(html => {
            document.querySelector("#dynamic-content").innerHTML = html;
    })
    .catch(error => console.error("Error al cargar el Dashboard: ", error));
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.menu-link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            links.forEach(link => link.classList.remove('menu-link--active'));

            this.classList.add('menu-link--active');

            const url = this.href;

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    document.querySelector("#dynamic-content").innerHTML = html;
                })
                .catch(error => console.error("Error: ", error));
        });
    });
});
