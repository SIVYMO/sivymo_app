import Logo from "../assets/img/logo.jpg";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {txtConfirmExit, txtExit, txtAltLogoImg, txtLogoutButton} from "../utils/Strings";
import {useNavigate, Outlet} from "react-router-dom";
import {cleanLocalStorage} from "../utils/LocalStorage";

export default function Header() {
    const navigate = useNavigate();
    const MENU = [
        {label: "Inicio", icon: "pi pi-home", command: () => navigate("/"),},
        {label: "Patentes", icon: "pi pi-book", command: () => navigate("/patentes"),},
        {label: "Marcas", icon: "pi pi-globe", command: () => navigate("/marcas"),},
        {label: "Expedientes", icon: "pi pi-folder-open", command: () => navigate("/expedientes"),},
        {label: "Perfil", icon: "pi pi-user", command: () => navigate("/perfil"),},
    ];

    const confirmLogout = () => {
        confirmDialog({
            message: txtConfirmExit,
            header: txtExit,
            draggable: false,
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-success",
            rejectClassName: "p-button-plain p-button-text",
            accept: () => {
                cleanLocalStorage()
                navigate("/inicio-sesion");
            },
        });
    };

    const start = (
        <img alt={txtAltLogoImg} src={Logo} height="50" className="p-mr-2" onClick={() => navigate("/")}/>
    );

    const end = (
        <Button className="p-button-success" onClick={confirmLogout} label={txtLogoutButton} icon="pi pi-sign-out"/>
    );

    return (
        <>
            <ConfirmDialog/>
            <Menubar className='m-3' model={MENU} start={start} end={end}/>
            <div className="grid flex">
                <div className="col-12 md:col-10 md:col-offset-1">
                    <Outlet/>
                </div>
            </div>
        </>
    );
}
