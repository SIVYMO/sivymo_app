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
    passwordPrompt: "Ingrese la contraseña",
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
            label: "Información",
            icon: "pi pi-fw pi-id-card",
            command: () => {
                window.location = "/informacion";
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
    txtEmailValid = "El email no debe estar vacío o debe ser valido",
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
    txtEmailLabel = "Correo electrónico",
    txtPasswordLabel = "Contraseña",
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
