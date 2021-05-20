import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Validations from "../../utils/Validations";
import {
    txtMessageUserSuccess,
    txtMessageUserError,
    txtMessageUserPasswordSuccess,
    txtMessageUserPasswordError,
    txtTitlePersonalData,
    txtNameLabel,
    txtNameHelp,
    txtFistSurnameLabel,
    txtFistSurnameHelp,
    txtSecondSurnameLabel,
    txtDateOfBirthLabel,
    txtDateOfBirthHelp,
    txtEmailLabel,
    txtEmailHelp,
    txtDesactiveActiveFieldsLabel,
    txtUpdateInformationLabel,
    txtPasswordCurrentlyLabel,
    txtPasswordCurrentlyHelp,
    txtNewPasswordLabel,
    txtNewPasswordHelp,
    txtRepeatNewPasswordLabel,
    txtRepeatNewPasswordHelp,
    txtUpdatePassword,
} from "../../utils/Strings";

export default function PersonalData() {
    // ? Controla la habilitación y deshabilitación de todos los campos
    const [activePersonalFields, setActivePersonalFields] = useState(true);
    const [activePasswordFields, setActivePasswordFields] = useState(true);
    const toast = useRef(null);

    //? Aquí se guarda la información de la persona que está operando el sistema
    const [userInfo, setUserInfo] = useState({
        name: "Hector",
        firstSurname: "Saldaña",
        secondSurname: "Espinoza",
        dateOfBirth: "2001-02-05",
        email: "20193tn070@utez.edu.mx",
        superAdmin: true,
    });

    // ? Aquí se guarda la información del cambio de contraseña
    const [userPassword, setUserPassword] = useState({
        passwordCurrently: "****",
        newPassword: "****",
        repeatNewPassword: "****",
    });

    //? Guardar cada input o campo con el state de userInfo
    const handleFormInfoUser = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    //? Guardar cada campo de la contraseña en el state de userPassword
    const handleFormPasswordUser = (e) => {
        setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
    };

    //? Valida los valores de userInfo
    const checkFormInfoUser = () => {
        console.log(
            userInfo.dateOfBirth.substring(1, userInfo.dateOfBirth.length - 1)
        );
        const { name, firstSurname, secondSurname, dateOfBirth, email } =
            userInfo;
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
    };

    //? Valida los valores de userPassword
    const checkFormPasswordUser = () => {
        const { passwordCurrently, newPassword, repeatNewPassword } =
            userPassword;
        if (
            passwordCurrently !== "" &&
            newPassword !== "" &&
            repeatNewPassword !== ""
        ) {
            if (newPassword === repeatNewPassword) {
                showMessage(txtMessageUserPasswordSuccess);
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
        if (activePasswordFields) {
            setUserPassword({
                passwordCurrently: "",
                newPassword: "",
                repeatNewPassword: "",
            });
        } else {
            setUserPassword({
                passwordCurrently: "****",
                newPassword: "****",
                repeatNewPassword: "****",
            });
        }
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

    return (
        <div className="p-grid">
            <Toast ref={toast} />
            <div className="p-col p-p-3">
                <h2>{txtTitlePersonalData}</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">{txtNameLabel}</label>
                        <InputText
                            id="name"
                            name="name"
                            type="text"
                            disabled={activePersonalFields}
                            value={userInfo.name}
                            onChange={handleFormInfoUser}
                            className={!userInfo.name && "p-invalid"}
                        />
                        {!userInfo.name && (
                            <small id="name-help" className="p-error p-d-block">
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
                            disabled={activePersonalFields}
                            value={userInfo.firstSurname}
                            onChange={handleFormInfoUser}
                            className={!userInfo.firstSurname && "p-invalid"}
                        />
                        {!userInfo.firstSurname && (
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
                            disabled={activePersonalFields}
                            value={userInfo.secondSurname}
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
                            showIcon
                            yearRange="1950:2010"
                            dateFormat="yy-mm-dd"
                            placeholder={userInfo.dateOfBirth}
                            disabled={activePersonalFields}
                            value={userInfo.dateOfBirth}
                            onChange={(e) => {
                                setUserInfo({
                                    ...userInfo,
                                    dateOfBirth: JSON.stringify(e.value),
                                });
                            }}
                            className={!userInfo.dateOfBirth && "p-invalid"}
                        />
                        {!userInfo.dateOfBirth && (
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
                            disabled={activePersonalFields}
                            value={userInfo.email}
                            onChange={handleFormInfoUser}
                            className={!userInfo.email && "p-invalid"}
                        />
                        {!userInfo.email && (
                            <small
                                id="email-help"
                                className="p-error p-d-block"
                            >
                                {txtEmailHelp}
                            </small>
                        )}
                    </div>
                </div>
                <div className="p-text-center">
                    <Button
                        label={txtDesactiveActiveFieldsLabel}
                        className="p-button-link p-mr-2"
                        onClick={() => {
                            setActivePersonalFields(!activePersonalFields);
                        }}
                    />
                    <Button
                        label={txtUpdateInformationLabel}
                        className="p-button-success p-ml-2"
                        disabled={activePersonalFields}
                        onClick={checkFormInfoUser}
                    />
                </div>
            </div>
            <div className="p-col p-p-3">
                <h2>Cambio de contraseña</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="passwordCurrently">
                            {txtPasswordCurrentlyLabel}
                        </label>
                        <Password
                            id="passwordCurrently"
                            name="passwordCurrently"
                            toggleMask
                            feedback={false}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.passwordCurrently}
                            onChange={handleFormPasswordUser}
                            className={
                                !userPassword.passwordCurrently && "p-invalid"
                            }
                        />
                        {!userPassword.passwordCurrently && (
                            <small
                                id="passwordCurrently-help"
                                className="p-error p-d-block"
                            >
                                {txtPasswordCurrentlyHelp}
                            </small>
                        )}
                    </div>
                    <div className="p-field">
                        <label htmlFor="newPassword">
                            {txtNewPasswordLabel}
                        </label>
                        <Password
                            id="newPassword"
                            name="newPassword"
                            toggleMask
                            feedback={true}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.newPassword}
                            onChange={handleFormPasswordUser}
                            className={!userPassword.newPassword && "p-invalid"}
                        />
                        {!userPassword.newPassword && (
                            <small
                                id="newPassword-help"
                                className="p-error p-d-block"
                            >
                                {txtNewPasswordHelp}
                            </small>
                        )}
                    </div>
                    <div className="p-field">
                        <label htmlFor="repeatNewPassword">
                            {txtRepeatNewPasswordLabel}
                        </label>
                        <Password
                            id="repeatNewPassword"
                            name="repeatNewPassword"
                            toggleMask
                            feedback={true}
                            maxLength="50"
                            disabled={activePasswordFields}
                            value={userPassword.repeatNewPassword}
                            onChange={handleFormPasswordUser}
                            className={
                                !userPassword.repeatNewPassword && "p-invalid"
                            }
                        />
                        {!userPassword.repeatNewPassword && (
                            <small
                                id="repeatNewPassword-help"
                                className="p-error p-d-block"
                            >
                                {txtRepeatNewPasswordHelp}
                            </small>
                        )}
                    </div>
                </div>
                <div className="p-text-center">
                    <Button
                        label={txtDesactiveActiveFieldsLabel}
                        className="p-button-link p-mr-2"
                        onClick={() => {
                            handleContentPasswordUser();
                        }}
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
