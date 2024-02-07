import Logo from "../assets/img/logo.jpg";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import { confirmDialog } from 'primereact/confirmdialog';
import {txtConfirmExit, txtExit, txtAltLogoImg, txtLogoutButton} from "../utils/Strings";
import {useNavigate, Outlet} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const MENU = [
        {
            label: "Inicio",
            icon: "pi pi-fw pi-home",
            command: () => navigate("/"),
        },
        {
            label: "Patentes",
            icon: "pi pi-fw pi-file",
            command: () => navigate("/patentes"),
        },
        {
            label: "Marcas",
            icon: "pi pi-fw pi-globe",
            command: () => navigate("/marcas"),
        },
        {
            label: "Expedientes",
            icon: "pi pi-fw pi-id-card",
            command: () => navigate("/expedientes"),
        },
        {
            label: "Perfil",
            icon: "pi pi-fw pi-user",
            command: () => navigate("/perfil"),
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
                navigate("/inicio-sesion");
            },
        });
    };

    const start = (
        <img
            alt={txtAltLogoImg}
            src={Logo}
            height="50"
            className="p-mr-2"
            onClick={() => navigate("/")}
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
        <>
            <div className="p-grid p-m-1">
                <div className="p-col">
                    <div className="card">
                        <Menubar model={MENU} start={start} end={end}/>
                    </div>
                </div>
            </div>
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
