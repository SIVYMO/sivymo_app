import React from "react";
import Logo from "../../assets/img/logo.jpg";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {confirmDialog} from "primereact/confirmdialog";
import {txtConfirmExit, txtExit, txtAltLogoImg, txtLogoutButton} from "../../utils/Strings";
import {useHistory} from "react-router-dom";

export default function MenuTop() {
    const history = useHistory();
    const itemsMenuTop = [
        {
            label: "Inicio",
            icon: "pi pi-fw pi-home",
            command: () => {
                history.push("/inicio");
            },
        },
        {
            label: "Patentes",
            icon: "pi pi-fw pi-file",
            command: () => {
                history.push("/patentes");
            },
        },
        {
            label: "Marcas",
            icon: "pi pi-fw pi-globe",
            command: () => {
                history.push("/marcas");
            },
        },
        {
            label: "Expedientes",
            icon: "pi pi-fw pi-id-card",
            command: () => {
                history.push("/expedientes");
            },
        },
        {
            label: "Perfil",
            icon: "pi pi-fw pi-user",
            command: () => {
                history.push("/perfil");
            },
        },
    ];

    const confirmLogout = () => {
        confirmDialog({
            message: txtConfirmExit,
            header: txtExit,
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-success",
            rejectClassName: "p-button-plain p-button-text",
            accept: () => {
                localStorage.clear();
                history.push("/");
            },
        });
    };

    const start = (
        <img
            alt={txtAltLogoImg}
            src={Logo}
            height="50"
            className="p-mr-2"
            onClick={() => {history.push("/inicio");}}
        />
    );

    const end = (
        <Button
            className="p-button-success"
            onClick={confirmLogout}
            label={txtLogoutButton}
            icon="pi pi-sign-out"
        />
    );

    return (
        <div className="p-grid p-m-1">
            <div className="p-col">
                <div className="card">
                    <Menubar model={itemsMenuTop} start={start} end={end}/>
                </div>
            </div>
        </div>
    );
}
