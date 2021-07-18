/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
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
    txtMessageUserPasswordReset,
    txtMessageErrorGeneral,
} from "../../utils/Strings";
import UsuarioService from "../../service/UsuarioService";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default function CrudUsers() {
    // ? Objeto con estructura de un usuario
    let emptyUser = {
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        fechaDeNacimiento: "",
        correo: "",
        superAdmin: false,
    };

    // ? State de lista de usuarios
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    //? Demás states
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [user, setUser] = useState(emptyUser);
    const [saveOrUpdate, setSaveOrUpdate] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        getAll();
        getPersonalInformation();
    }, []);

    function getPersonalInformation() {
        setUserInfo(JSON.parse(localStorage.getItem("userActive")));
    }

    // * Métodos CRUD
    function getAll() {
        UsuarioService.getAll()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    function insertOne(user) {
        console.log(user);
        UsuarioService.insertOne(user)
            .then((response) => {
                console.log(response.data);
                getAll();
                showMessage(txtMessageUserSuccess);
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    function updateOne(user) {
        UsuarioService.updateOne(user)
            .then((response) => {
                getAll();
                showMessage(txtMessageUserSuccess);
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    function removeOne(email) {
        UsuarioService.removeOne(email)
            .then((response) => {
                if (response.data) {
                    getAll();
                    showMessage(txtMessageUserDelete);
                } else {
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    function resetPasswordUser(email) {
        UsuarioService.resetPassword(email)
            .then((response) => {
                if (response.data) {
                    showMessage(txtMessageUserPasswordReset);
                } else {
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    // ? Al dar click al boton de usuario nuevo mapea un nuevo usuario
    const openNew = () => {
        setUser(emptyUser);
        setUserDialog(true);
        setSaveOrUpdate(true);
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
        const {
            nombre,
            primerApellido,
            segundoApellido,
            fechaDeNacimiento,
            correo,
        } = user;
        if (
            Validations.validateFormUser(
                nombre,
                primerApellido,
                segundoApellido,
                fechaDeNacimiento,
                correo
            )
        ) {
            if (saveOrUpdate) {
                insertOne(user);
            } else {
                updateOne(user);
            }
            setSaveOrUpdate(false);
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
        removeOne(user.correo);
        setDeleteUserDialog(false);
        setUser(emptyUser);
    };

    // ? Aqui se exporta la tabla a CSV
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    // ? Se procede a cambiar la contraseña de ese usuario
    const resetPassword = (user) => {
        resetPasswordUser(user.correo);
        toast.current.clear();
        if (Validations.validateSameEmail(user.correo, userInfo.correo)) {
            setTimeout(() => {
                localStorage.clear();
                window.location = "/";
            }, 3000);
        }
    };

    //? Confirmar al restablecer la contraseña
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

    // ? Muestra la columna  de fecha de nacimiento
    const dateBirthBodyTemplane = (rowData) => {
        return (
            <React.Fragment>
                <div>{moment(rowData.fechaDeNacimiento).format("LL")}</div>
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
                    style={{ backgroundColor: "var(--teal-600)" }}
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
                    />
                    <DataTable
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="correo"
                        paginator
                        rows={7}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate={txtFooterTableLabel}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage="Sin ningun usuario aún"
                    >
                        <Column field="nombre" header="Nombre" sortable />
                        <Column
                            field="primerApellido"
                            header="Primer apellido"
                            sortable
                        />
                        <Column
                            field="segundoApellido"
                            header="Segundo apellido"
                            sortable
                        />
                        <Column
                            field="fechaDeNacimiento"
                            header="Fecha de nacimiento"
                            body={dateBirthBodyTemplane}
                            sortable
                        />
                        <Column
                            field="correo"
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
                                <label htmlFor="nombre">{txtNameLabel}</label>
                                <InputText
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    value={user.nombre}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            nombre: e.target.value,
                                        });
                                    }}
                                    className={!user.nombre && "p-invalid"}
                                />
                                {!user.nombre && (
                                    <small
                                        id="nombre-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtNameHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="primerApellido">
                                    {txtFistSurnameLabel}
                                </label>
                                <InputText
                                    id="primerApellido"
                                    name="primerApellido"
                                    type="text"
                                    value={user.primerApellido}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            primerApellido: e.target.value,
                                        });
                                    }}
                                    className={
                                        !user.primerApellido && "p-invalid"
                                    }
                                />
                                {!user.primerApellido && (
                                    <small
                                        id="primerApellido-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtFistSurnameHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="segundoApellido">
                                    {txtSecondSurnameLabel}
                                </label>
                                <InputText
                                    id="segundoApellido"
                                    name="segundoApellido"
                                    type="text"
                                    value={user.segundoApellido}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            segundoApellido: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="p-field">
                                <label htmlFor="fechaDeNacimiento">
                                    {txtDateOfBirthLabel}
                                </label>
                                <Calendar
                                    id="fechaDeNacimiento"
                                    name="fechaDeNacimiento"
                                    monthNavigator
                                    yearNavigator
                                    yearRange="1950:2010"
                                    showIcon
                                    placeholder={
                                        user.fechaDeNacimiento.split("T")[0]
                                    }
                                    dateFormat="yy-mm-d"
                                    value={user.fechaDeNacimiento}
                                    onChange={(e) => {
                                        let result =
                                            Validations.convertOnlyInputDate(
                                                e.target.value
                                            );
                                        setUser({
                                            ...user,
                                            fechaDeNacimiento: result,
                                        });
                                    }}
                                />
                                {!user.fechaDeNacimiento && (
                                    <small
                                        id="fechaDeNacimiento-help"
                                        className="p-error p-d-block"
                                    >
                                        {txtDateOfBirthHelp}
                                    </small>
                                )}
                            </div>
                            <div className="p-field">
                                <label htmlFor="correo">{txtEmailLabel}</label>
                                <InputText
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    value={user.correo}
                                    onChange={(e) => {
                                        setUser({
                                            ...user,
                                            correo: e.target.value,
                                        });
                                    }}
                                    className={!user.correo && "p-invalid"}
                                />
                                {!user.correo && (
                                    <small
                                        id="correo-help"
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
