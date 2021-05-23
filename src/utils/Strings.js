// ? Textos para Locale
export const localLocation = {
    firstDayOfWeek: 1,
    dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "Mi", "J", "V", "S"],
    monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ],
    monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ],
    today: "Hoy",
    clear: "Claro",
    accept: "Si",
    reject: "No",
    choose: "Elija",
    upload: "Subir",
    cancel: "Cancelar",
    passwordPrompt: "Ingrese contraseña",
    weak: "Débil",
    medium: "Normal",
    strong: "Fuerte",
};

// ? Textos para MenuTop.jsx
export const txtConfirmExit = "¿Estás seguro de salir del sistema?",
    txtExit = "Salir",
    itemsMenuTop = [
        {
            label: "Inicio",
            icon: "pi pi-fw pi-home",
            command: () => {
                window.location = "/inicio";
            },
        },
        {
            label: "Patentes",
            icon: "pi pi-fw pi-file",
            command: () => {
                window.location = "/patentes";
            },
        },
        {
            label: "Marcas",
            icon: "pi pi-fw pi-globe",
            command: () => {
                window.location = "/marcas";
            },
        },
        {
            label: "Ejemplares extraordinarios",
            icon: "pi pi-fw pi-copy",
            command: () => {
                window.location = "/ejemplares";
            },
        },
        {
            label: "Clientes",
            icon: "pi pi-fw pi-id-card",
            command: () => {
                window.location = "/clientes";
            },
        },
        {
            label: "Perfil",
            icon: "pi pi-fw pi-user",
            command: () => {
                window.location = "/perfil";
            },
        },
    ],
    txtAltLogoImg = "Logo Novopatent",
    txtLogoutButton = "Salir";

// ? Textos para Login.jsx
export const txtCodeMustBe = "El código es de 5 carácteres",
    txtEmailValid = "El email no debe estar vacío y debe ser valido",
    txtPasswordValid = "La contraseña no debe estar vacia",
    txtCodeValid = "El código no debe estár vacio o ser menor a 5 caracteres",
    txtMessageSucces = {
        type: "success",
        title: "El código es correcto",
        description: "Redireccionando...",
    },
    txtMessageError = {
        type: "error",
        title: "El código es incorrecto",
        description: "Por favor verifiquelo nuevamente",
    },
    txtLogin = "Inicio de sesión",
    txtFillFields = "Favor de llenar todos los campos",
    txtEmailLabel = "Correo electrónico:",
    txtPasswordLabel = "Contraseña:",
    txtPleaseWait = "Por favor espere...",
    txtLoginButton = "Iniciar sesión",
    txtCodeVerification =
        "Ingrese el código de verificación que fue enviado a su correo electrónico",
    txtCodeVerificationLabel = "Código de verificación",
    txtCancelButton = "Cancelar",
    txtVerifyButton = "Verificar";

// ? Textos para ErrorPage.jsx
export const txt404 = "404",
    txtPageNotFound = "Página no encontrada",
    txtPageError =
        "La página que estás buscando no existe o ha ocurrido un error";

// ? Textos para ProfileTemplate.jsx
export const txtMessageUserSuccess = {
        type: "success",
        title: "Usuario guardado correctamente",
        description: "Los datos del usuario se han actualizado",
    },
    txtMessageUserError = {
        type: "error",
        title: "Campos no válidos",
        description:
            "Algunos campos tienen caracteres especiales o estan vacios",
    },
    txtMessageUserDelete = {
        type: "success",
        title: "Usuario elimiado correctamente",
        description: "Los datos del usuario se han actualizado",
    },
    txtMessageUserPasswordSuccess = {
        type: "success",
        title: "Contraseña guardado correctamente",
        description: "La contraseña del usuario se han actualizado",
    },
    txtMessageUserPasswordError = {
        type: "error",
        title: "Las contraseña no coinciden o estan vacías",
        description: "Verificar los campos de las contraseñas",
    },
    txtTitlePersonalData = "Tú información",
    txtNameLabel = "Nombre:",
    txtNameHelp = " El nombre no debe estar vacio y debe ser valido",
    txtFistSurnameLabel = "Primer apellido:",
    txtFistSurnameHelp =
        " El primer apellido no debe estar vacio y debe ser valido",
    txtSecondSurnameLabel = "Segundo apellido:",
    txtDateOfBirthLabel = "Fecha de nacimiento:",
    txtDateOfBirthHelp =
        "La fecha de nacimiento no debe estar vacia y debe ser valida",
    txtEmailHelp =
        "El correo electrónico no debe estar vacio y debe ser valido",
    txtDesactiveActiveFieldsLabel = "Habilitar/Deshabilitar campos",
    txtUpdateInformationLabel = "Actualizar información",
    txtUpdatePassword = "Actualizar contraseña",
    txtPasswordCurrentlyLabel = "Contraseña actual:",
    txtPasswordCurrentlyHelp = "La contraseña actual no debe estár vacia",
    txtNewPasswordLabel = "Nueva contraseña:",
    txtNewPasswordHelp = "La contraseña nueva no debe estár vacia",
    txtRepeatNewPasswordLabel = "Repetir nueva contraseña:",
    txtRepeatNewPasswordHelp = "La contraseña nueva no debe estár vacia",
    txtRestartPasswordTitle = "¿Restablecer la contraseña de este usuario?",
    txtRestartPasswordContent =
        " Se le enviará un correo electrónico a esa persona con la nueva contraseña",
    txtYES = "Si",
    txtNO = "No",
    txtSaveButton = "Guardar",
    txtNewUserButton = "Nuevo usuario",
    txtExport = "Exportar en CSV",
    txtSearch = "Buscar...",
    txtTitleCrud = "Tabla de usuarios",
    txtFooterTableLabel =
        "Mostrando {first} a {last} de {totalRecords} usuarios",
    txtUserDetails = "Detalles de usuario",
    txtSuperAdminLabel = "Super administrador:",
    txtDeleteUserTitle = "¿Eliminar usuario?",
    txtDeleteUserContent="El usuario se eliminará permanente de la aplicación"