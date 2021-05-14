import React, { useState } from "react";
import "../../assets/css/FlexGrid.css";
import logonovopatent from "../../assets/img/logonovopatent.jpg";
import { InputText } from "primereact/inputtext";
import { alterLogoImg } from "../../utils/Strings";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";

export default function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [emailErrorSms, setEmailErrorSms] = useState("");
    const [passwordErrorSms, setPasswordErrorSms] = useState("");

    const [emailUIError, setEmailUIError] = useState("p-d-block");
    const [passwordUIError, setPasswordUIError] = useState("p-d-block");

    const [showDialog, setShowDialog] = useState(false)

    const login = () => {
        if (emailInput.length <= 0) {
            setEmailErrorSms("El email no debe estar vacío");
            setEmailUIError("p-invalid p-d-block");
        } else {
            setEmailErrorSms("");
            setEmailUIError("p-d-block");
        }
        if (passwordInput.length <= 0) {
            setPasswordErrorSms("El correo no debe estar vacio");
            setPasswordUIError("p-invalid p-d-block");
        } else {
            setPasswordErrorSms("");
            setPasswordUIError("p-d-block");
        }
        if (emailInput.length > 0 && passwordInput.length > 0) {
          setShowDialog(true)
        }
    };

    return (
        <div className="p-grid">
            <div className="p-col-12 p-md-6 p-lg-4">
                <div className="box p-shadow-2">
                    <div className="p-col p-p-0 p-text-center">
                        <img
                            src={logonovopatent}
                            alt={alterLogoImg}
                            height="70px"
                        />
                    </div>
                    <div className="p-col">
                        <div
                            className="p-text-center"
                            style={{ fontSize: "2em", fontWeight: "500" }}
                        >
                            Inicio de sesión
                        </div>
                        <div className="p-text-center">
                            Favor de llenar todos los campos
                        </div>

                        <div className="p-mx-6 p-my-4">
                            <div className="p-fluid">
                                <div className="p-field">
                                    <label
                                        htmlFor="emailInput"
                                        className="p-d-block"
                                    >
                                        Correo electrónico
                                    </label>
                                    <InputText
                                        className={emailUIError}
                                        id="emailInput"
                                        aria-describedby="emailInput-help"
                                        value={emailInput}
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
                                        Contraseña
                                    </label>
                                    <Password
                                        id="passwordInput"
                                        toggleMask
                                        className={passwordUIError}
                                        feedback={false}
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
                                    label="Iniciar sesión"
                                    icon="pi pi-sign-in"
                                    className="p-button-success"
                                    onClick={login}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                header="Confirmación de inicio de sesión"
                visible={showDialog}
                style={{ width: "50vw" }}
                >

                <div className="p-text-center" style={{ display: "block" }}>
                    <h3>Por favor espere</h3>
                    <ProgressSpinner />
                </div>
                
            </Dialog>
        </div>
    );
}
