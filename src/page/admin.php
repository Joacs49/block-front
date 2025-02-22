<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="../../styles/diseñoAdmin.css">
</head>
<body>
    <?php include("../header/headerAdmin.html") ?> 
    
    <main>
        <section class="container-menu">
            <h1>Menú</h1>

            <nav class="container-nenu-nav">
                <ul>
                    <li><span><img src="../../img/icon/dashboard.png" alt="dashboard"></span>
                    <a href="./dashboard.php" class="menu-link">Dashboard</a></li>

                    <li><span><img src="../../img/icon/pencil.png" alt="posts"></span>
                    <a href="./posts.php" class="menu-link">Posts</a></li>

                    <li><span><img src="../../img/icon/tools.png" alt="tools"></span>
                    <a href="./tools.php" class="menu-link">Configuración</a></li>
                </ul>
            </nav>
        </section>

        <section class="container-data">
            <h1 id="welcome-message"></h1>
            
            <div id="dynamic-content">
            </div>

        </section>
    </main>

    <script src="../../js/uploadContent.js"></script>
    <script src="../../js/account.js"></script>
    <script src="../../js/returnName.js"></script>
    <script src="../../js/updateAdmin.js"></script>
    <script src="../../js/permissionChanges.js"></script>
    <script src="../../js/updateDashboard.js"></script>
    <script src="../../js//updatePosts.js"></script>
</body>
</html>