import React from "react";
import logonovopatent from "../../assets/img/logonovopatent.jpg";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { confirm_goout, exit, alterLogoImg, logout } from "../../utils/Strings";
import {itemsMenuTop} from '../../utils/Strings'

export default function MenuTop() {
   
    const confirmLogout = () => {
        confirmDialog({
            message: confirm_goout,
            header: exit,
            icon: "pi pi-exclamation-triangle",
            acceptClassName:"p-button-success",
            rejectClassName: "p-button-plain p-button-text",
            accept: () => {
                console.log("acepto");
            },
            reject: () => {
                console.error("no acepto");
            },
        });
    };

    const start = (
        <img
            alt={alterLogoImg}
            src={logonovopatent}
            height="50"
            className="p-mr-2"
            onClick={() => { window.location = "/inicio"}}
        />
    );

    const end = (
        <Button
            className="p-button-success"
            onClick={confirmLogout}
            label={logout}
            icon="pi pi-sign-out"
        />
    );

    return (
        <div className="p-grid p-m-1">
            <div className="p-col">
                <div className="card">
                    <Menubar model={itemsMenuTop} start={start} end={end} />
                </div>
            </div>
        </div>
    );
}
