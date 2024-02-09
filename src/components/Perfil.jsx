import React, {useState, useRef, useEffect} from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import Validations from "../utils/Validations";
import {txtMessageUserSuccess, txtMessageUserError, txtMessageUserPasswordSuccess,
    txtMessageUserPasswordError, txtTitlePersonalData, txtNameLabel, txtNameHelp,
    txtFistSurnameLabel, txtFistSurnameHelp, txtSecondSurnameLabel, txtDateOfBirthLabel,
    txtDateOfBirthHelp, txtEmailLabel, txtEmailHelp, txtDesactiveActiveFieldsLabel,
    txtUpdateInformationLabel, txtPasswordCurrentlyLabel, txtPasswordCurrentlyHelp,
    txtNewPasswordLabel, txtNewPasswordHelp, txtRepeatNewPasswordLabel, txtRepeatNewPasswordHelp,
    txtUpdatePassword, txtMessageErrorGeneral, txtCheckPasswords,
} from "../utils/Strings";
import UsuarioService from "../service/UsuarioService";
import {useNavigate} from "react-router-dom";
import {cleanLocalStorage} from "../utils/LocalStorage";
import {getUser, setUser} from "../utils/LocalStorage";

export default function Perfil() {
    const toast = useRef(null);
    const navigate = useNavigate();

    // ? Controla la habilitación y deshabilitación de todos los campos
    const [activePersonalFields, setActivePersonalFields] = useState(true);
    const [activePasswordFields, setActivePasswordFields] = useState(true);

    //? Aquí se guarda la información de la persona que está operando el sistema
    const [userInfo, setUserInfo] = useState({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        fechaDeNacimiento: "",
        correo: "",
        superAdmin: false,
    });

    // ? Aquí se guarda la información del cambio de contraseña
    const [userPassword, setUserPassword] = useState({
        contrasenaActual: "****",
        nuevaContrasena: "****",
        repetirnuevaContrasena: "****",
    });


    useEffect(() => {
        setUserInfo(getUser());
    }, []);


    function changePassword({contrasenaActual, nuevaContrasena, repetirnuevaContrasena,}) {
        UsuarioService.changePassword(userInfo.correo, contrasenaActual, nuevaContrasena, repetirnuevaContrasena)
            .then((response) => {
                if (response.data) {
                    showMessage(txtMessageUserPasswordSuccess);
                    setTimeout(() => {
                        cleanLocalStorage();
                        navigate("/inicio-sesion");
                    }, 1000);
                } else {
                    txtMessageErrorGeneral.description = txtCheckPasswords;
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }

    function updateOne(user) {
        UsuarioService.updateOne(user)
            .then((response) => {
                setUserInfo(response.data);
                setUser(response.data);
                showMessage(txtMessageUserSuccess);
            })
            .catch((err) => {
                console.error(err);
                showMessage(txtMessageErrorGeneral);
            });
    }


    //? Valida los valores de userInfo y cambiar datos
    const checkFormInfoUser = () => {
        const {nombre, primerApellido, segundoApellido, fechaDeNacimiento, correo,} = userInfo;
        if (Validations.validateFormUser(nombre, primerApellido, segundoApellido, fechaDeNacimiento, correo)) {
            updateOne(userInfo);
        } else {
            showMessage(txtMessageUserError);
        }
    };

    //? Valida los valores de userPassword  y cambiar datos
    const checkFormPasswordUser = () => {
        const {contrasenaActual, nuevaContrasena, repetirnuevaContrasena} = userPassword;
        if (Validations.validatePassworsNoEmpty(contrasenaActual, nuevaContrasena, repetirnuevaContrasena)) {
            if (nuevaContrasena === repetirnuevaContrasena) {
                changePassword(userPassword);
            } else {
                showMessage(txtMessageUserPasswordError);
            }
        } else {
            showMessage(txtMessageUserPasswordError);
        }
    };

    //? Cambiar el contenido de los input (Solo es diseño)
    const handleContentPasswordUser = () => {
        setActivePasswordFields(!activePasswordFields);
        if (activePasswordFields) setUserPassword({contrasenaActual: "", nuevaContrasena: "", repetirnuevaContrasena: "",});
        else setUserPassword({contrasenaActual: "****", nuevaContrasena: "****", repetirnuevaContrasena: "****",});
    };

    //? Muestra los mensajes de los Toast
    const showMessage = ({type, title, description}) => {
        toast.current.show({severity: type, summary: title, detail: description, life: 3000,});
    };

    return (
        <div className="grid">
            <Toast ref={toast}/>
            <div className="col p-3">
                <h2>{txtTitlePersonalData}</h2>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="nombre">{txtNameLabel}</label>
                        <InputText
                            id="nombre"
                            name="nombre"
                            type="text"
                            disabled={activePersonalFields}
                            value={userInfo.nombre}
                            onChange={(e) => {setUserInfo({...userInfo, nombre: e.target.value,});}}
                            className={!userInfo.nombre && "p-invalid"}
                        />
                        {!userInfo.nombre && (<small id="nombre-help" className="p-error block">{txtNameHelp}</small>)}
                    </div>
                    <div className="field">
                        <label htmlFor="primerApellido">{txtFistSurnameLabel}</label>
                        <InputText
                            id="primerApellido"
                            name="primerApellido"
                            type="text"
                            disabled={activePersonalFields}
                            value={userInfo.primerApellido}
                            onChange={(e) => {setUserInfo({...userInfo, primerApellido: e.target.value,});}}
                            className={!userInfo.primerApellido && "p-invalid"}
                        />
                        {!userInfo.primerApellido && (<small id="primerApellido-help" className="p-error block">{txtFistSurnameHelp}</small>)}
                    </div>
                    <div className="field">
                        <label htmlFor="segundoApellido">{txtSecondSurnameLabel}</label>
                        <InputText
                            id="segundoApellido"
                            name="segundoApellido"
                            type="text"
                            disabled={activePersonalFields}
                            value={userInfo.segundoApellido}
                            onChange={(e) => {setUserInfo({...userInfo, segundoApellido: e.target.value,})}}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="fechaDeNacimiento">{txtDateOfBirthLabel}</label>
                        <Calendar
                            id="fechaDeNacimiento"
                            name="fechaDeNacimiento"
                            monthNavigator
                            yearNavigator
                            showIcon
                            yearRange="1950:2010"
                            dateFormat="yy-mm-dd"
                            placeholder={userInfo.fechaDeNacimiento.split("T")[0]}
                            disabled={activePersonalFields}
                            value={userInfo.fechaDeNacimiento}
                            onChange={(e) => {
                                let result = Validations.convertOnlyInputDate(e.target.value);
                                setUserInfo({...userInfo, fechaDeNacimiento: result,});
                            }}
                        />
                        {!userInfo.fechaDeNacimiento && (
                            <small id="fechaDeNacimiento-help" className="p-error block">{txtDateOfBirthHelp}</small>
                        )}
                    </div>
                    <div className="field">
                        <label htmlFor="correo">{txtEmailLabel}</label>
                        <InputText
                            id="correo"
                            name="correo"
                            type="correo"
                            disabled={activePersonalFields}
                            value={userInfo.correo}
                            onChange={(e) => {setUserInfo({...userInfo, correo: e.target.value,});}}
                            className={!userInfo.correo && "p-invalid"}
                        />
                        {!userInfo.correo && (<small id="correo-help" className="p-error block">{txtEmailHelp}</small>)}
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        label={txtDesactiveActiveFieldsLabel}
                        className="p-button-link p-mr-2"
                        onClick={() => {setActivePersonalFields(!activePersonalFields);}}
                    />
                    <Button
                        label={txtUpdateInformationLabel}
                        className="p-button-success p-ml-2"
                        disabled={activePersonalFields}
                        onClick={checkFormInfoUser}
                    />
                </div>
            </div>
            <div className="col p-3">
                <h2>Cambio de contraseña</h2>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="contrasenaActual">{txtPasswordCurrentlyLabel}</label>
                        <Password
                            id="contrasenaActual"
                            name="contrasenaActual"
                            toggleMask
                            feedback={false}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.contrasenaActual}
                            onChange={(e) => {setUserPassword({...userPassword, contrasenaActual: e.target.value,});}}
                        />
                        {!userPassword.contrasenaActual && (<small id="contrasenaActual-help" className="p-error block">{txtPasswordCurrentlyHelp}</small>)}
                    </div>
                    <div className="field">
                        <label htmlFor="nuevaContrasena">{txtNewPasswordLabel}</label>
                        <Password
                            id="nuevaContrasena"
                            name="nuevaContrasena"
                            toggleMask
                            feedback={true}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.nuevaContrasena}
                            onChange={(e) => {setUserPassword({...userPassword, nuevaContrasena: e.target.value,});}}
                        />
                        {!userPassword.nuevaContrasena && (<small id="nuevaContrasena-help" className="p-error block">{txtNewPasswordHelp}</small>)}
                    </div>
                    <div className="field">
                        <label htmlFor="repetirnuevaContrasena">{txtRepeatNewPasswordLabel}</label>
                        <Password
                            id="repetirnuevaContrasena"
                            name="repetirnuevaContrasena"
                            toggleMask
                            feedback={true}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.repetirnuevaContrasena}
                            onChange={(e) => {setUserPassword({...userPassword, repetirnuevaContrasena: e.target.value,});}}
                        />
                        {!userPassword.repetirnuevaContrasena && (<small id="repetirnuevaContrasena-help" className="p-error block">{txtRepeatNewPasswordHelp}</small>)}
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        label={txtDesactiveActiveFieldsLabel}
                        className="p-button-link p-mr-2"
                        onClick={handleContentPasswordUser}
                    />
                    <Button
                        label={txtUpdatePassword}
                        className="p-button-success p-ml-2"
                        disabled={activePasswordFields}
                        onClick={checkFormPasswordUser}
                    />
                </div>
            </div>
        </div>
    );
}
