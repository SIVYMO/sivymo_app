import React, {useState, useRef} from "react";
import "../../assets/css/MyCustom.css";
import Validations from "../../utils/Validations";
import Logo from "../../assets/img/logo.jpg";
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
} from "../../utils/Strings";
import UsuarioService from "../../service/UsuarioService";
import {useHistory} from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailErrorSms, setEmailErrorSms] = useState("");
    const [passwordErrorSms, setPasswordErrorSms] = useState("");
    const [emailUIError, setEmailUIError] = useState("p-d-block");
    const [passwordUIError, setPasswordUIError] = useState("p-d-block");
    const toastMessages = useRef(null);

    if (localStorage.getItem("userActive") !== null) history.push("/inicio");

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
            showMessage(txtMessageLoading);
            UsuarioService.login(userLogin)
                .then((response) => {
                    clearMessages();
                    localStorage.setItem("userActive", JSON.stringify(response.data.usuario));
                    showMessage(txtMessageSucces);
                    history.push("/inicio");
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
        <div className="pagelogin p-d-flex p-jc-center p-ai-center">
            <div className="card p-shadow-11 p-col-12 p-md-6 p-lg-4">
                <Toast ref={toastMessages}/>
                <div className="p-col p-text-center">
                    <img src={Logo} alt={txtAltLogoImg} height="90px"/>
                </div>
                <div className="p-col">
                    <div className="p-text-center" style={{fontSize: "2em", fontWeight: "500"}}>
                        {txtLogin}
                    </div>
                    <div className="p-text-center">{txtFillFields}</div>
                    <div className="p-mx-6 p-my-4">
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="emailInput" className="p-d-block">
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
                                <small id="emailInput-help" className="p-error p-d-block">
                                    {emailErrorSms}
                                </small>
                            </div>
                        </div>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="passwordInput" className="p-d-block">
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
                                <small id="passwordInput-help" className="p-error p-d-block">
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
    );
}
