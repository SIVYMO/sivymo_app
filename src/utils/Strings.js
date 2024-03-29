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
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ],
    monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
    accept: "Si",
    reject: "No",
    choose: "Elija",
    upload: "Subir",
    cancel: "Cancelar",
    passwordPrompt: "Ingrese contraseña",
    weak: "Débil",
    medium: "Normal",
    strong: "Fuerte",
    matchAll: "Coincide con todo",
    matchAny: "Coincide con cualquier",
    addRule: "Agregar regla",
    removeRule: "Eliminar regla",
    rangeStart: "Inicio",
    rangeEnd: "Fin",
    startsWith: "Empieza con",
    contains: "Contiene",
    notContains: "No contiene",
    endsWith: "Termina con",
    equals: "Igual",
    notEquals: "No igual",
    apply: "Aplicar",
};

// ? HomePage.jsx
export const txtWelcome = "Hola, bienvenido(a) de nuevo",
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
    txtLoginButton = "Iniciar sesión",
    txtCancelButton = "Cancelar",
    txtMessageLoginError = {
        type: "error",
        title: "Correo electrónico y/o contraseña incorrectos",
        description: "Por favor verifíquelos nuevamente",
    };

// ? ErrorPage.jsx
export const txt404 = "404",
    txtPageNotFound = "Página no encontrada";

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
    txtClearMessages = "Limpiar mensajes",
    txtSaveClientsButton = "Guardar expedientes";

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
    txtSubtitleBrand = "Notificación de Resoluciones, Requerimientos y demás Actos",
    txtSubitlePatent1 = "Notificaciones de la Dirección Divisional de Patentes",
    txtSubitlePatent2 = "Patentes, Registros de Modelos de Utilidad y de Diseños Industriales",
    txtSubitlePatent3 = "Requisitos de Examen de Forma y Fondo, Abandonos de Solicitudes de Patentes y Registros",
    txtLodaing = "Realizando las búsquedas necesarias",
    txtStartSearch = "Iniciar búsqueda",
    txtInstructionsSearch =
        "Puedes colocar alguna fecha en especifico o ignorar y continuar con la búsqueda regular",
    txtDateStartLabel = "Fecha inicio:",
    txtDateEndLabel = "Fecha fin:",
    txtDatesRange = 'Rango de fechas',
    txtNoDataSearch = "No se encontraron coincidencias",
    txtDataSearch = "Se encontraron coincidencias"
