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

// ? HomePage.jsx
export const backgroundWallpaper = "Fondo de portada",
    txtWelcome = "Hola, bienvenido(a) de nuevo",
    txtLastQueryPatent = "Última búsqueda de patentes: ",
    txtLastQueryBrand = "Última búsqueda de marcas: ",
    txtLastUpdateClients = "Última actualización en expedientes: ",
    txtBadgeClients ="Ingresar expedientes para poder realizar consultas";

// ? Header.jsx
export const txtConfirmExit = "¿Estás seguro de salir del sistema?",
    txtExit = "Salir",
    txtAltLogoImg = "Logo Novopatent",
    txtLogoutButton = "Salir";

// ? Login.jsx
export const txtEmailValid = "El email no debe estar vacío y debe ser válido",
    txtPasswordValid = "La contraseña no debe estar vacía",
    txtMessageSucces = {
        type: "success",
        title: "El código es correcto",
        description: "Redirigiendo...",
    },
    txtMessageLoading = {
        type: "info",
        title: "Cargando...",
        description: "Por favor espere",
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

// ? ProfilePage.jsx
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
        title: "Contraseña guardada correctamente",
        description: "La contraseña del usuario se han actualizado",
    },
    txtMessageUserPasswordError = {
        type: "error",
        title: "Las contraseñas no coinciden o están vacías",
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
        description: "Intente de nuevo",
    },
    txtTitlePersonalData = "Tu información",
    txtNameLabel = "Nombre:",
    txtNameHelp = " El nombre no debe estar vacío y debe ser válido",
    txtFistSurnameLabel = "Primer apellido:",
    txtFistSurnameHelp =
        " El primer apellido no debe estar vacío y debe ser válido",
    txtSecondSurnameLabel = "Segundo apellido:",
    txtDateOfBirthLabel = "Fecha de nacimiento:",
    txtDateOfBirthHelp =
        "La fecha de nacimiento no debe estar vacía y debe ser válida",
    txtEmailHelp =
        "El correo electrónico no debe estar vacío y debe ser válido",
    txtDesactiveActiveFieldsLabel = "Habilitar/Deshabilitar campos",
    txtUpdateInformationLabel = "Actualizar información",
    txtUpdatePassword = "Actualizar contraseña",
    txtPasswordCurrentlyLabel = "Contraseña actual:",
    txtPasswordCurrentlyHelp = "La contraseña actual no debe estar vacía",
    txtNewPasswordLabel = "Nueva contraseña:",
    txtNewPasswordHelp = "La contraseña nueva no debe estar vacía",
    txtRepeatNewPasswordLabel = "Repetir nueva contraseña:",
    txtRepeatNewPasswordHelp = "La contraseña nueva no debe estar vacía",
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

//  ? ClientPage.js
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
    txtClearButton = "Limpiar datos",
    txtNoDataLabel = "Sin ningún dato subido",
    txtClearMessages = "Limpiar mensajes";

// ? PatentPage.jsx
// ? BrandPage.jsx
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
        description: "Revisa si hubo coincidencias con los registros",
    },
    txtMessageSearchError = {
        type: "error",
        title: "Ocurrió un error de conexión",
        description: "Vuelve a intentarlo de nuevo",
    },
    txtSubtitleBrand = "Notificaciones de marcas",
    txtSubitlePatent1 = "Notificaciones de patentes",
    txtSubitlePatent2 = "Patentes, registros de modelos de utilidad y diseños industriales",
    txtSubitlePatent3 = "Requisitos de forma y fondo, y abandonos notificados",
    txtLodaing = "Realizando las búsquedas necesarias",
    txtStartSearch = "Iniciar búsqueda",
    txtInstructionsSearch =
        "Puedes colocar alguna fecha en especifico o ignorar y continuar con la búsqueda regular",
    txtDateStartLabel = "Fecha inicio:",
    txtDateEndLabel = "Fecha fin:",
    txtNoDataSearch = "No se encontraron coincidencias",
    txtDataSearch = "Se encontraron coincidencias"
