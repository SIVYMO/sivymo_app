// ? Locale
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

// ? HomeTemplate.jsx
export const backgroundWallpaper = "Fondo de portada",
    txtWelcome = "Hola, bienvenido(a) de nuevo",
    txtLastQueryPatent = "Última búsqueda de patentes: ",
    txtLastQueryBrand = "Última búsqueda de marcas: ",
    txtLastQueryEjemplares = "Última búsqueda de ejemplares extraordinarios: ",
    txtLastUpdateClients = "Última actualización en expedientes: ",
    txtBadgeClients ="Ingresar expedientes para poder realizar consultas";

// ? MenuTop.jsx
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
            label: "Expedientes",
            icon: "pi pi-fw pi-id-card",
            command: () => {
                window.location = "/expedientes";
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

// ? Login.jsx
export const txtCodeMustBe = "El código es de 8 carácteres",
    txtEmailValid = "El email no debe estar vacío y debe ser valido",
    txtPasswordValid = "La contraseña no debe estar vacía",
    txtCodeValid = "El código no debe estár vacío o ser menor a 5 caracteres",
    txtMessageSucces = {
        type: "success",
        title: "El código es correcto",
        description: "Redirigiendo...",
    },
    txtMessageError = {
        type: "error",
        title: "El código es incorrecto",
        description: "Por favor verifíquelo nuevamente",
    },
    txtLogin = "Inicio de sesión",
    txtFillFields = "Favor de llenar todos los campos",
    txtEmailLabel = "Correo electrónico:",
    txtPasswordLabel = "Contraseña:",
    txtPleaseWait = "Por favor espere...",
    txtLoginButton = "Iniciar sesión",
    txtCodeVerification =
        "Ingrese el código de verificación que ha sido enviado a su correo electrónico",
    txtCodeVerificationLabel = "Código de verificación",
    txtCancelButton = "Cancelar",
    txtVerifyButton = "Verificar",
    txtMessageLoginError = {
        type: "error",
        title: "Correo electrónico y/o contraseña incorrectos",
        description: "Por favor verifíquelos nuevamente",
    };

// ? ErrorPage.jsx
export const txt404 = "404",
    txtPageNotFound = "Página no encontrada",
    txtPageError =
        "La página que estás buscando no existe o ha ocurrido un error";

// ? ProfileTemplate.jsx
export const txtMessageUserSuccess = {
        type: "success",
        title: "Usuario guardado correctamente",
        description: "Los datos del usuario se han actualizado",
    },
    txtMessageUserError = {
        type: "error",
        title: "Campos no válidos",
        description:
            "Algunos campos tienen caracteres especiales o están vacíos",
    },
    txtMessageUserDelete = {
        type: "success",
        title: "Usuario eliminado correctamente",
        description: "Los datos del usuario se han actualizado",
    },
    txtMessageUserPasswordSuccess = {
        type: "success",
        title: "Contraseña guardado correctamente",
        description: "La contraseña del usuario se han actualizado",
    },
    txtMessageUserPasswordError = {
        type: "error",
        title: "Las contraseña no coinciden o están vacías",
        description: "Verificar los campos de las contraseñas",
    },
    txtMessageUserPasswordReset = {
        type: "success",
        title: "Contraseña restablecida correctamente",
        description: "Se ha cambiado la contraseña",
    },
    txtMessageErrorGeneral = {
        type: "error",
        title: "No se ejecutó la operación",
        description: "Intentar de nuevo",
    },
    txtTitlePersonalData = "Tú información",
    txtNameLabel = "Nombre:",
    txtNameHelp = " El nombre no debe estar vacío y debe ser valido",
    txtFistSurnameLabel = "Primer apellido:",
    txtFistSurnameHelp =
        " El primer apellido no debe estar vacío y debe ser valido",
    txtSecondSurnameLabel = "Segundo apellido:",
    txtDateOfBirthLabel = "Fecha de nacimiento:",
    txtDateOfBirthHelp =
        "La fecha de nacimiento no debe estar vacía y debe ser valida",
    txtEmailHelp =
        "El correo electrónico no debe estar vacío y debe ser valido",
    txtDesactiveActiveFieldsLabel = "Habilitar/Deshabilitar campos",
    txtUpdateInformationLabel = "Actualizar información",
    txtUpdatePassword = "Actualizar contraseña",
    txtPasswordCurrentlyLabel = "Contraseña actual:",
    txtPasswordCurrentlyHelp = "La contraseña actual no debe estár vacía",
    txtNewPasswordLabel = "Nueva contraseña:",
    txtNewPasswordHelp = "La contraseña nueva no debe estár vacía",
    txtRepeatNewPasswordLabel = "Repetir nueva contraseña:",
    txtRepeatNewPasswordHelp = "La contraseña nueva no debe estár vacía",
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
    txtDeleteUserContent =
        "El usuario se eliminará permanente de la aplicación",
    txtTitleProfile = "Perfil",
    txtTabPersonalData = "Datos personales",
    txtTabUserTable = "Tabla de usuarios",
    txtCheckPasswords = "Verifica que la contraseña actual sea correcta"

//  ? ClientsTemplate.js
export const txtSmsLoading = [
        "Cargando",
        "Espere a que los datos estén listos",
    ],
    txtMessageClientsSaved = {
        type: "success",
        title: "Expedientes guardados",
        description: "Se han actualizado correctamente",
    },
    txtTitleClients = "Expedientes",
    txtClearButton = "Limpiar todo",
    txtNoDataLabel = "Sin ningún dato subido";

// ? SpecimensTemplate.jsx
// ? PatentTemplate.jsx
// ? BrandTemplate.jsx
export const txtExportButton = "Exportar resultados",
    txtStartSearchButton = "Iniciar con la búsqueda",
    txtNoData = "No hay datos",
    txtTitleExtraordinaryExamples = "Ejemplares extraordinarios",
    txtTitlePatents = "Patentes",
    txtTitleBrands = "Marcas",
    txtMessageNoClients = {
        type: "error",
        title: "No hay expedientes registrados",
        description: "Registra algunos para realizar búsquedas",
    },
    txtMessageSearchSuccess = {
        type: "success",
        title: "Búsqueda realizada con éxito",
        description: "Revisa si hubieron coincidencias con los registros",
    },
    txtMessageSearchError = {
        type: "error",
        title: "Ocurrió un error al realizar la búsqueda",
        description: "Vuelve a intentarlo de nuevo",
    },
    txtSubtitleBrand = "Notificaciones de marcas",
    txtSubitlePatent1 = "Notificaciones de patentes",
    txtSubitlePatent2 = "Patentes, registros de modelos de utilidad y diseños industriales",
    txtSubitlePatent3 = "Requisitos de forma y fondo, y abandono notificados",
    txtLodaing = "Realizando las búsquedas necesarias",
    txtStartSearch = "Iniciar búsqueda",
    txtInstructionsSearch =
        "Puedes colocar alguna fecha en especifico o ignorar y continuar con la búsqueda regular",
    txtDateStartLabel = "Fecha inicio:",
    txtDateEndLabel = "Fecha fin:",
    txtNoDataSearch = "No se encontraron coincidencias",
    txtDataSearch = "Se encontraron coincidencias"
