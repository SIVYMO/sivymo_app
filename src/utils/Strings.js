// ? Textos para Locale
export const localLocation ={
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Claro',
    accept: 'Si',
    reject: 'No',
    choose: "Elija",
    upload: "Subir",
    cancel: "Cancelar",
    passwordPrompt: "Ingrese la contraseña", 
}

// ? Textos para MenuTop.jsx
export const 
    confirm_goout = "¿Estás seguro de salir del sistema?",
    exit = "Salir",
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
                window.location = "/informacion"
            }
        },
        {
            label: "Perfil",
            icon: "pi pi-fw pi-user",
            command: () => {
                window.location = "/perfil";
            },
        },
    ],
    alterLogoImg = "Logo Novopatent",
    logout = "Salir";


