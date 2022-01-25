import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/MyCustom.css";
import Validations from "../../utils/Validations";
import logonovopatent from "../../assets/img/logonovopatent.jpg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
    txtAltLogoImg,
    txtEmailValid,
    txtPasswordValid,
    txtLogin,
    txtFillFields,
    txtEmailLabel,
    txtPasswordLabel,
    txtLoginButton,
    txtMessageLoginError,
    txtMessageSucces,
} from "../../utils/Strings";
import useLogin from "../CustomHooks/useLogin";
import UsuarioService from "../../service/UsuarioService";

export default function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailErrorSms, setEmailErrorSms] = useState("");
    const [passwordErrorSms, setPasswordErrorSms] = useState("");
    const [emailUIError, setEmailUIError] = useState("p-d-block");
    const [passwordUIError, setPasswordUIError] = useState("p-d-block");
    const toastMessages = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useLogin();
    }, []);

    const login = () => {
        if (emailInput.length <= 0 || !Validations.validateEmail(emailInput)) {
            setEmailErrorSms(txtEmailValid);
            setEmailUIError("p-invalid p-d-block");
        } else {
            setEmailErrorSms("");
            setEmailUIError("p-d-block");
        }
        if (passwordInput.length <= 0) {
            setPasswordErrorSms(txtPasswordValid);
            setPasswordUIError("p-invalid p-d-block");
        } else {
            setPasswordErrorSms("");
            setPasswordUIError("p-d-block");
        }
        if (
            emailInput.length > 0 &&
            passwordInput.length > 0 &&
            Validations.validateEmail(emailInput)
        ) {
            let userLogin = {
                correo: emailInput,
                contrasena: passwordInput,
            };
            showMessage({
                type: "info",
                title: "Cargando...",
                description: "Por favor espere",
            });
            UsuarioService.login(userLogin)
                .then((response) => {
                    clearMessages();
                    localStorage.setItem(
                        "userActive",
                        JSON.stringify(response.data.usuario)
                    );
                    showMessage(txtMessageSucces);
                    window.location = "/inicio";
                })
                .catch((err) => {
                    clearMessages();
                    showMessage(txtMessageLoginError);
                });
        }
    };

    const clearMessages = () => {
        toastMessages.current.clear();
    };

    const showMessage = ({ type, title, description }) => {
        toastMessages.current.show({
            severity: type,
            summary: title,
            detail: description,
            sticky: true,
        });
    };

    return (
        <div className="pagelogin">
            <Toast ref={toastMessages} />
            <div className="p-d-flex p-jc-center">
                <div className="p-col-12 p-md-6 p-lg-4 p-mt-6 card p-shadow-11">
                    <div className="p-col p-p-0 p-text-center">
                        <img
                            src={logonovopatent}
                            alt={txtAltLogoImg}
                            height="70px"
                        />
                    </div>
                    <div className="p-col">
                        <div
                            className="p-text-center"
                            style={{ fontSize: "2em", fontWeight: "500" }}
                        >
                            {txtLogin}
                        </div>
                        <div className="p-text-center">{txtFillFields}</div>

                        <div className="p-mx-6 p-my-4">
                            <div className="p-fluid">
                                <div className="p-field">
                                    <label
                                        htmlFor="emailInput"
                                        className="p-d-block"
                                    >
                                        {txtEmailLabel}
                                    </label>
                                    <InputText
                                        className={emailUIError}
                                        id="emailInput"
                                        aria-describedby="emailInput-help"
                                        value={emailInput}
                                        maxLength="50"
                                        onChange={(e) => {
                                            setEmailInput(e.target.value);
                                        }}
                                    />
                                    <small
                                        id="emailInput-help"
                                        className="p-error p-d-block"
                                    >
                                        {emailErrorSms}
                                    </small>
                                </div>
                            </div>
                            <div className="p-fluid">
                                <div className="p-field">
                                    <label
                                        htmlFor="passwordInput"
                                        className="p-d-block"
                                    >
                                        {txtPasswordLabel}
                                    </label>
                                    <Password
                                        id="passwordInput"
                                        toggleMask
                                        className={passwordUIError}
                                        feedback={false}
                                        maxLength="50"
                                        value={passwordInput}
                                        onChange={(e) => {
                                            setPasswordInput(e.target.value);
                                        }}
                                    />
                                    <small
                                        id="passwordInput-help"
                                        className="p-error p-d-block"
                                    >
                                        {passwordErrorSms}
                                    </small>
                                </div>
                            </div>
                            <div className="p-text-center">
                                <Button
                                    label={txtLoginButton}
                                    icon="pi pi-sign-in"
                                    className="p-button-success"
                                    onClick={login}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
