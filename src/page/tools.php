<head>
    <link rel="stylesheet" href="../../styles/diseñoTools.css">
</head>
<h1>Configuración General</h1>

<form class="form-tools" id="form-tools" autocomplete="off">
    <label for="name_account">Nombre de la Cuenta</label>
    <input type="text" name="name_account" id="name_account" 
    placeholder="Ingrese el nombre de la cuenta" required autocomplete="off" readonly>
    
    <label for="email">Email del Administrador</label>
    <input type="email" name="email" id="email" placeholder="Ingrese su correo" 
    required autocomplete="off" readonly>

    <div>
        <input type="button" id="changeState" value="Habilitar edición" class="button--space">

        <input type="submit" value="Guardar Cambios" class="button--space">
    </div>

</form>