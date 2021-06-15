import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/MyCustom.css";
import Validations from "../../utils/Validations";
import logonovopatent from "../../assets/img/logonovopatent.jpg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import {
    txtAltLogoImg,
    txtCodeMustBe,
    txtEmailValid,
    txtPasswordValid,
    txtCodeValid,
    txtMessageSucces,
    txtMessageError,
    txtLogin,
    txtFillFields,
    txtEmailLabel,
    txtPasswordLabel,
    txtLoginButton,
    txtCodeVerification,
    txtCodeVerificationLabel,
    txtCancelButton,
    txtVerifyButton,
} from "../../utils/Strings";
import useLogin from '../CustomHooks/useLogin'
import UsuarioService from "../../service/UsuarioService";

export default function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [codeInput, setCodeInput] = useState("");
    const [emailErrorSms, setEmailErrorSms] = useState("");
    const [passwordErrorSms, setPasswordErrorSms] = useState("");
    const [codeErrorSms, setCodeErrorSms] = useState(txtCodeMustBe);
    const [emailUIError, setEmailUIError] = useState("p-d-block");
    const [passwordUIError, setPasswordUIError] = useState("p-d-block");
    const [codeUIError, setCodeUIError] = useState("p-inputtext-lg p-d-block");
    const [showDialog, setShowDialog] = useState(false);
    const toastMessages = useRef(null);
    const [userData, setUserData] = useState({});

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
            showMessage({ type: "info", title: "Cargando..." });
            UsuarioService.login(userLogin)
                .then((response) => {
                    setUserData(response.data);
                    changeStateDialog(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const changeStateDialog = (b) => {
        setShowDialog(b);
    };

    const verifyCode = () => {
        if (codeInput.length <= 4) {
            setCodeErrorSms(txtCodeValid);
            setCodeUIError("p-invalid p-inputtext-lg p-d-block");
        } else {
            setCodeErrorSms(txtCodeMustBe);
            setCodeUIError("p-inputtext-lg p-d-block");
            if (codeInput === userData.codigo) {
                localStorage.setItem("userActive", JSON.stringify(userData.usuario));
                showMessage(txtMessageSucces);
                window.location = "/inicio";
            } else {
                showMessage(txtMessageError);
            }
        }
    };

    const showMessage = ({ type, title, description }) => {
        toastMessages.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    return (
        <div className="pagelogin">
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
                <Toast ref={toastMessages} />
                <Dialog
                    showHeader={false}
                    visible={showDialog}
                    style={{ width: "50vw" }}
                    draggable={false}
                    closable={false}
                    onHide={() => {}}
                >
                    <div>
                        <p
                            className="p-text-center"
                            style={{ fontSize: "1.2em", fontWeight: "500" }}
                        >
                            {txtCodeVerification}
                        </p>
                        <div className="p-fluid">
                            <div className="p-field">
                                <InputText
                                    id="codeInput"
                                    type="text"
                                    className={codeUIError}
                                    placeholder={txtCodeVerificationLabel}
                                    maxLength="5"
                                    value={codeInput}
                                    onChange={(e) => {
                                        setCodeInput(e.target.value);
                                    }}
                                />
                                <small
                                    id="codeInput-help"
                                    className=" p-d-block"
                                >
                                    {codeErrorSms}
                                </small>
                                <div className="p-mt-2">¿No ves el correo?, quizá esta en spam o intenta ver todos los correos</div>
                            </div>
                        </div>

                        <div className="p-d-flex p-jc-center">
                            <div className="p-mr-2">
                                <Button
                                    label={txtCancelButton}
                                    className="p-button-danger"
                                    onClick={() => {
                                        changeStateDialog(false);
                                    }}
                                />
                            </div>
                            <div className="p-mr-2 ">
                                <Button
                                    label={txtVerifyButton}
                                    className="p-button-success"
                                    onClick={() => {
                                        verifyCode();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
