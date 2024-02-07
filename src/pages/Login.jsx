import React, {useState, useRef} from "react";
import "../assets/css/MyCustom.css";
import Validations from "../utils/Validations";
import Logo from "../assets/img/logo.jpg";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
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
    txtMessageLoading
} from "../utils/Strings";
import UsuarioService from "../service/UsuarioService";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailErrorSms, setEmailErrorSms] = useState("");
    const [passwordErrorSms, setPasswordErrorSms] = useState("");
    const [emailUIError, setEmailUIError] = useState("block");
    const [passwordUIError, setPasswordUIError] = useState("block");
    const toastMessages = useRef(null);

    const login = () => {
        if (emailInput.length <= 0 || !Validations.validateEmail(emailInput)) {
            setEmailErrorSms(txtEmailValid);
            setEmailUIError("p-invalid block");
        } else {
            setEmailErrorSms("");
            setEmailUIError("block");
        }
        if (passwordInput.length <= 0) {
            setPasswordErrorSms(txtPasswordValid);
            setPasswordUIError("p-invalid block");
        } else {
            setPasswordErrorSms("");
            setPasswordUIError("block");
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
            showMessage(txtMessageLoading);
            UsuarioService.login(userLogin)
                .then((response) => {
                    clearMessages();
                    localStorage.setItem("userActive", JSON.stringify(response.data.usuario));
                    showMessage(txtMessageSucces);
                    navigate("/");
                })
                .catch((err) => {
                    clearMessages();
                    console.error(err)
                    showMessage(txtMessageLoginError);
                });
        }
    };

    const clearMessages = () => {
        toastMessages.current.clear();
    };

    const showMessage = ({type, title, description}) => {
        toastMessages.current.show({
            severity: type,
            summary: title,
            detail: description,
            sticky: true,
        });
    };

    return (
        <div className="w-screen h-screen pagelogin flex justify-content-center align-items-center">
            <div className="bg-white shadow-8 col-12 md:col-6 lg:col-4 border-round-2xl">
                <Toast ref={toastMessages}/>
                <div className="col text-center"><img src={Logo} alt={txtAltLogoImg} height="90px"/></div>
                <div className="col">
                    <div className="text-center" style={{fontSize: "2em", fontWeight: "500"}}>{txtLogin}</div>
                    <div className="text-center">{txtFillFields}</div>
                    <div className="mx-6 my-4">
                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="emailInput" className="block">
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
                                <small id="emailInput-help" className="p-error block">
                                    {emailErrorSms}
                                </small>
                            </div>
                        </div>
                        <div className="p-fluid">
                            <div className="field">
                                <label htmlFor="passwordInput" className="block">
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
                                <small id="passwordInput-help" className="p-error block">
                                    {passwordErrorSms}
                                </small>
                            </div>
                        </div>
                        <div className="text-center">
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
    );
}
