/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {InputSwitch} from "primereact/inputswitch";
import {Dialog} from "primereact/dialog";
import {Badge} from "primereact/badge";
import Validations from "../utils/Validations";
import {
    txtMessageUserSuccess, txtMessageUserError, txtNameLabel,
    txtNameHelp, txtFistSurnameLabel, txtFistSurnameHelp,
    txtSecondSurnameLabel, txtDateOfBirthLabel, txtDateOfBirthHelp,
    txtEmailLabel, txtEmailHelp, txtMessageUserDelete, txtRestartPasswordTitle,
    txtRestartPasswordContent, txtYES, txtNO, txtCancelButton, txtSaveButton,
    txtNewUserButton, txtExport, txtSearch, txtTitleCrud, txtFooterTableLabel,
    txtUserDetails, txtSuperAdminLabel, txtDeleteUserTitle, txtDeleteUserContent,
    txtMessageUserPasswordReset, txtMessageErrorGeneral,
} from "../utils/Strings";
import UsuarioService from "../service/UsuarioService";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

let emptyUser = {
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    fechaDeNacimiento: "",
    correo: "",
    superAdmin: false,
};

export default function CrudUsers() {

    const [users, setUsers] = useState([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const [user, setUser] = useState(emptyUser);
    const [saveOrUpdate, setSaveOrUpdate] = useState(false);
    const [detailsUser, setDetailsUser] = useState(false);
    const [detailUserChange, setDetailUserChange] = useState({});
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
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
        UsuarioService.insertOne(user)
            .then((response) => {
                setDetailUserChange(response.data);
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
            .then(() => {
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
                    setDetailUserChange(response.data);
                    hideDetailsUser();
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

    const openNew = () => {
        setUser(emptyUser);
        setUserDialog(true);
        setSaveOrUpdate(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDetailsUser = () => setDetailsUser(!detailsUser);

    const saveUser = () => {
        const {nombre, primerApellido, segundoApellido, fechaDeNacimiento, correo,} = user;
        if (Validations.validateFormUser(nombre, primerApellido, segundoApellido, fechaDeNacimiento, correo)) {
            if (saveOrUpdate) {
                insertOne(user);
                hideDetailsUser();
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

    const editUser = (user) => {
        setUser({...user});
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        removeOne(user.correo);
        setDeleteUserDialog(false);
        setUser(emptyUser);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const resetPassword = (user) => {
        resetPasswordUser(user.correo);
        toast.current.clear();
    };

    const showConfirmResetPassword = (rowData) => {
        toast.current.show({
            severity: "warn",
            sticky: true,
            content: (
                <div className="p-flex p-flex-column" style={{flex: "1"}}>
                    <div className="text-center">
                        <i className="pi pi-exclamation-triangle" style={{fontSize: "3rem"}}></i>
                        <h4>{txtRestartPasswordTitle}</h4>
                        <p>{txtRestartPasswordContent}</p>
                    </div>
                    <div className="grid p-fluid">
                        <div className="col">
                            <Button
                                type="button"
                                label={txtYES}
                                className="p-button-success"
                                onClick={() => resetPassword(rowData)}
                            />
                        </div>
                        <div className="col">
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

    const showMessage = ({type, title, description}) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
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
            </>
        );
    };

    const adminBodyTemplate = (rowData) => {
        return (
            rowData.superAdmin ?
                (<Badge value={txtYES} severity="success" className="p-mr-2"/>) :
                (<Badge value={txtNO} className="p-mr-2" severity="danger"/>)
        );
    };

    const dateBirthBodyTemplate = (rowData) => <div>{moment(rowData.fechaDeNacimiento).format("LL")}</div>;

    const userDialogFooter = (
        <>
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
        </>
    );

    const deleteUserDialogFooter = (
        <>
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
        </>
    );

    const leftToolbarTemplate = () => <Button label={txtNewUserButton} icon="pi pi-plus"
                                              className="p-button-success p-mr-2" onClick={openNew}/>;

    const rightToolbarTemplate = () => <Button label={txtExport} icon="pi pi-download" className="p-button"
                                               style={{backgroundColor: "var(--teal-600)"}} onClick={exportCSV}/>;

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
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
        <div className="grid">
            <Toast ref={toast}/>
            <div className="col p-3">
                <h2>{txtTitleCrud}</h2>
                <div className="p-card">
                    <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}/>
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
                        emptyMessage="Sin ningun usuario aún">
                        <Column field="nombre" header="Nombre" sortable/>
                        <Column field="primerApellido" header="Primer apellido" sortable/>
                        <Column field="segundoApellido" header="Segundo apellido" sortable/>
                        <Column field="fechaDeNacimiento" header="Fecha de nacimiento" body={dateBirthBodyTemplate}
                                sortable/>
                        <Column field="correo" header="Correo electrónico" sortable/>
                        <Column field="superAdmin" header="Super administrador" body={adminBodyTemplate}/>
                        <Column header="Acciones" body={actionBodyTemplate}/>
                    </DataTable>
                    <Dialog
                        visible={userDialog}
                        style={{width: "600px"}}
                        header={txtUserDetails}
                        modal
                        className="p-fluid"
                        footer={userDialogFooter}
                        onHide={hideDialog}>
                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="nombre">{txtNameLabel}</label>
                                <InputText
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    value={user.nombre}
                                    onChange={(e) => {
                                        setUser({...user, nombre: e.target.value,});
                                    }}
                                    className={!user.nombre && "p-invalid"}
                                />
                                {!user.nombre && (
                                    <small id="nombre-help" className="p-error block">{txtNameHelp}</small>)}
                            </div>
                            <div className="field">
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
                                    className={!user.primerApellido && "p-invalid"}
                                />
                                {!user.primerApellido && (
                                    <small id="primerApellido-help" className="p-error block">
                                        {txtFistSurnameHelp}
                                    </small>
                                )}
                            </div>
                            <div className="field">
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
                            <div className="field">
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
                                    <small id="fechaDeNacimiento-help" className="p-error block">
                                        {txtDateOfBirthHelp}
                                    </small>
                                )}
                            </div>
                            <div className="field">
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
                                    <small id="correo-help" className="p-error block">
                                        {txtEmailHelp}
                                    </small>
                                )}
                            </div>
                            <div className="field text-center">
                                <label htmlFor="superAdmin">
                                    {txtSuperAdminLabel}
                                </label>
                                <br/>
                                <InputSwitch
                                    id="superAdmin"
                                    name="superAdmin"
                                    checked={user.superAdmin}
                                    onChange={() =>
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
                        style={{width: "450px"}}
                        header={txtDeleteUserTitle}
                        modal
                        footer={deleteUserDialogFooter}
                        onHide={hideDeleteUserDialog}>
                        <div className="confirmation-content">
                            {txtDeleteUserContent}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={detailsUser}
                        style={{width: "450px"}}
                        header={"Detalles de usuario"}
                        draggable={false}
                        onHide={hideDetailsUser}
                        footer={
                            <Button
                                label="¡Listo!"
                                className="p-button-success"
                                onClick={hideDetailsUser}
                            />
                        }>
                        <div>
                            Nombre completo:{" "}
                            <span>{`${detailUserChange.nombre} ${detailUserChange.primerApellido} ${detailUserChange.segundoApellido}`}</span>
                        </div>
                        <div>
                            Fecha de nacimiento:{" "}
                            <span>{`${moment(detailUserChange.fechaDeNacimiento).format("LLL")}`}</span>
                        </div>
                        <div>
                            Correo: <span>{`${detailUserChange.correo}`}</span>
                        </div>
                        <div>
                            Contraseña creada:{" "}
                            <span>{`${detailUserChange.contrasena}`}</span>
                            <p><i>Favor de guardar y cambiar la contraseña más tarde</i></p>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
