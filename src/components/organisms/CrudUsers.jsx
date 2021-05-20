import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import Validations from "../../utils/Validations";
import {
    txtMessageUserSuccess,
    txtMessageUserError,
    txtNameLabel,
    txtNameHelp,
    txtFistSurnameLabel,
    txtFistSurnameHelp,
    txtSecondSurnameLabel,
    txtDateOfBirthLabel,
    txtDateOfBirthHelp,
    txtEmailLabel,
    txtEmailHelp,
    txtMessageUserDelete,
    txtRestartPasswordTitle,
    txtRestartPasswordContent,
    txtYES,
    txtNO,
    txtCancelButton,
    txtSaveButton,
    txtNewUserButton,
    txtExport,
    txtSearch,
    txtTitleCrud,
    txtFooterTableLabel,
    txtUserDetails,
    txtSuperAdminLabel,
    txtDeleteUserTitle,
    txtDeleteUserContent,
} from "../../utils/Strings";

export default function CrudUsers() {
    // ? Objeto con estructura de un usuario
    let emptyUser = {
        name: "",
        firstSurname: "",
        secondSurname: "",
        dateOfBirth: "",
        email: "",
        superAdmin: false,
    };

    // ? State de lista de usuarios
    const [users, setUsers] = useState([
        {
            name: "Hector",
            firstSurname: "Saldaña",
            secondSurname: "Espinoza",
            dateOfBirth: "2020-05-08",
            email: "2019@gmail.com",
            superAdmin: false,
        },
        {
            name: "Grecia",
            firstSurname: "Saldaña",
            secondSurname: "Espinoza",
            dateOfBirth: "2001-05-08",
            email: "grey@gmail.com",
            superAdmin: true,
        },
    ]);

    //? Demás states
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const toast = useRef(null);
    const dt = useRef(null);

    // ? Al dar click al boton de usuario nuevo mapea un nuevo usuario
    const openNew = () => {
        setUser(emptyUser);
        setUserDialog(true);
    };

    // ? Oculta dialogo del formulario del usuario
    const hideDialog = () => {
        setUserDialog(false);
    };

    // ? Oculta dialogo del mensaje eliminación del usuario
    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    // ? Se ejecuta cuando se guarda el formulario
    const saveUser = () => {
        const { name, firstSurname, secondSurname, dateOfBirth, email } = user;
        if (
            Validations.validateNames(name) &&
            Validations.validateNames(firstSurname) &&
            Validations.validateSecondSurname(secondSurname) &&
            dateOfBirth !== "" &&
            Validations.validateEmail(email)
        ) {
            showMessage(txtMessageUserSuccess);
        } else {
            showMessage(txtMessageUserError);
        }

        setUserDialog(false);
        setUser(emptyUser);
    };

    // ? Al dar click al boton del lápiz mapea los datos al formulario del usuario
    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    // ? Mensaje de eliminación cuando se da click en el bote de basura
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    // ? Aqui procedemos a elimiar el usuario, ya tenemos los datos
    const deleteUser = () => {
        console.log(user);
        setDeleteUserDialog(false);
        setUser(emptyUser);
        showMessage(txtMessageUserDelete);
    };

    // ? Aqui se exporta la tabla a CSV
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    //? Guardar cada input o campo con el state de setUser
    const handleFormInfoUser = (e) => {
        setUser({ ...setUser, [e.target.name]: e.target.value });
    };

    // ? Se procede a cambiar la contraseña de ese usuario
    const resetPassword = (user) => {
        console.log(user);
    };

    const showConfirmResetPassword = (rowData) => {
        toast.current.show({
            severity: "warn",
            sticky: true,
            content: (
                <div className="p-flex p-flex-column" style={{ flex: "1" }}>
                    <div className="p-text-center">
                        <i
                            className="pi pi-exclamation-triangle"
                            style={{ fontSize: "3rem" }}
                        ></i>
                        <h4>{txtRestartPasswordTitle}</h4>
                        <p>{txtRestartPasswordContent}</p>
                    </div>
                    <div className="p-grid p-fluid">
                        <div className="p-col">
                            <Button
                                type="button"
                                label={txtYES}
                                className="p-button-success"
                                onClick={() => resetPassword(rowData)}
                            />
                        </div>
                        <div className="p-col">
                            <Button
                                type="button"
                                label={txtNO}
                                className="p-button-danger"
                                onClick={() => {
                                    toast.current.clear();
                                }}
                            />
                        </div>
                    </div>
                </div>
            ),
        });
    };

    //? Muestra los mensajes de los Toast
    const showMessage = ({ type, title, description }) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    //? Muestra la columna de las acciones de modificar y eliminar
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info p-mr-2"
                    onClick={() => editUser(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-mr-2"
                    onClick={() => confirmDeleteUser(rowData)}
                />
                <Button
                    icon="pi pi-replay"
                    className="p-button-rounded p-button-warning"
                    onClick={() => showConfirmResetPassword(rowData)}
                />
            </React.Fragment>
        );
    };

    //? Muestra la columna de si es super administrador
    const adminBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.superAdmin ? (
                    <Badge
                        value={txtYES}
                        severity="success"
                        className="p-mr-2"
                    />
                ) : (
                    <Badge value={txtNO} className="p-mr-2" severity="danger" />
                )}
            </React.Fragment>
        );
    };

    //? Muestra los botones de la parte de abajo del formulario del usuario
    const userDialogFooter = (
        <React.Fragment>
            <Button
                label={txtCancelButton}
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label={txtSaveButton}
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveUser}
            />
        </React.Fragment>
    );

    //? Muestra los botones de la parte de abajo de la eliminación del usuario
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button
                label={txtNO}
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteUserDialog}
            />
            <Button
                label={txtYES}
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteUser}
            />
        </React.Fragment>
    );

    //? Muestra el boton de nuevo usuario
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label={txtNewUserButton}
                    icon="pi pi-plus"
                    className="p-button-success p-mr-2"
                    onClick={openNew}
                />
            </React.Fragment>
        );
    };

    //? Muestra el boton de exportar
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label={txtExport}
                    icon="pi pi-download"
                    className="p-button"
                    onClick={exportCSV}
                />
            </React.Fragment>
        );
    };

    //? Muestra el campo para hacer busquedass
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    value={globalFilter}
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder={txtSearch}
                />
            </span>
        </div>
    );

    return (
        <div className="p-grid">
            <Toast ref={toast} />
            <div className="p-col p-p-3">
                <h2>{txtTitleCrud}</h2>
                <div className="card">
                    <Toolbar
                        className="p-mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="email"
                        paginator
                        rows={7}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate={txtFooterTableLabel}
                        globalFilter={globalFilter}
                        header={header}
                    >
                        <Column field="name" header="Nombre" sortable />
                        <Column
                            field="firstSurname"
                            header="Primer apellido"
                            sortable
                        />
                        <Column
                            field="secondSurname"
                            header="Segundo apellido"
                            sortable
                        />
                        <Column
                            field="dateOfBirth"
                            header="Fecha de nacimiento"
                            sortable
                        />
                        <Column
                            field="email"
                            header="Correo electrónico"
                            sortable
                        />
                        <Column
                            field="superAdmin"
                            header="Super administrador"
                            body={adminBodyTemplate}
                        />

                        <Column header="Acciones" body={actionBodyTemplate} />
                    </DataTable>
                    <Dialog
                        visible={userDialog}
                        style={{ width: "450px" }}
                        header={txtUserDetails}
                        modal
                        className="p-fluid"
                        footer={userDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="name">{txtNameLabel}</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={user.name}
                                    onChange={handleFormInfoUser}
                                    className={!user.name && "p-invalid"}
                                />
                                {!user.name && (
                                    <small
                                        id="name-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtNameHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="firstSurname">
                                    {txtFistSurnameLabel}
                                </label>
                                <InputText
                                    id="firstSurname"
                                    name="firstSurname"
                                    type="text"
                                    value={user.firstSurname}
                                    onChange={handleFormInfoUser}
                                    className={
                                        !user.firstSurname && "p-invalid"
                                    }
                                />
                                {!user.firstSurname && (
                                    <small
                                        id="firstSurname-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtFistSurnameHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="secondSurname">
                                    {txtSecondSurnameLabel}
                                </label>
                                <InputText
                                    id="secondSurname"
                                    name="secondSurname"
                                    type="text"
                                    value={user.secondSurname}
                                    onChange={handleFormInfoUser}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="dateOfBirth">
                                    {txtDateOfBirthLabel}
                                </label>
                                <Calendar
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    monthNavigator
                                    yearNavigator
                                    yearRange="1950:2010"
                                    showIcon
                                    dateFormat="yy-mm-d"
                                    value={user.dateOfBirth}
                                    onChange={handleFormInfoUser}
                                    className={!user.dateOfBirth && "p-invalid"}
                                />
                                {!user.dateOfBirth && (
                                    <small
                                        id="dateOfBirth-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtDateOfBirthHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="email">{txtEmailLabel}</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={handleFormInfoUser}
                                    className={!user.email && "p-invalid"}
                                />
                                {!user.email && (
                                    <small
                                        id="email-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtEmailHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field p-text-center">
                                <label htmlFor="superAdmin">
                                    {txtSuperAdminLabel}
                                </label>
                                <br />
                                <InputSwitch
                                    id="superAdmin"
                                    name="superAdmin"
                                    checked={user.superAdmin}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            superAdmin: !user.superAdmin,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteUserDialog}
                        style={{ width: "450px" }}
                        header={txtDeleteUserTitle}
                        modal
                        footer={deleteUserDialogFooter}
                        onHide={hideDeleteUserDialog}
                    >
                        <div className="confirmation-content">
                            {txtDeleteUserContent}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
