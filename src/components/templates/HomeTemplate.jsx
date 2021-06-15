import React, { useState, useEffect } from "react";
import "../../assets/css/MyCustom.css";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import {
    backgroundWallpaper,
    txtWelcome,
    txtLastQueryPatent,
    txtLastQueryBrand,
    txtLastQueryEjemplares,
    txtLastUpdateClients,
} from "../../utils/Strings";
import ResumeService from "../../service/ResumeService";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

function Logo() {
    return (
        <img
            src="https://picsum.photos/1080/720"
            alt={backgroundWallpaper}
            style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
            }}
        />
    );
}

function LastDateCategory({ icon, last_search_info, last_date }) {
    return (
        <div className="p-col-12 p-md-6 p-xl-6">
            <div className="p-grid">
                <div>
                    <Avatar icon={icon} className="p-mr-2" size="xlarge" />
                </div>
                <div className="p-col">
                    <div style={{ fontSize: "1.2em", fontWeight: "lighter" }}>
                        {last_search_info}
                    </div>
                    <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                        {moment(last_date).format('LLLL')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomeTemplate() {

    const [userInfo, setUserInfo] = useState({});

    const [resume, setResume] = useState({
        ultimaBusquedaPatentes: "",
        ultimaBusquedaMarcas: "",
        ultimaBusquedaEjemplares: "",
        ultimaModificacionClientes: "",
        clientesTotales: 0,
    });

    useEffect(() => {
        getResume();
        getPersonalInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getPersonalInformation(){
        setUserInfo(JSON.parse(localStorage.getItem("userActive")));
    }

    function getResume() {
        ResumeService.getResume()
            .then((response) => {
                setResume({ ...response.data });
                localStorage.setItem("resume", JSON.stringify(response.data));
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div>
            <div className="p-grid">
                <div className="p-col">
                    <Logo />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-xl-6">
                    <h1>
                        {txtWelcome} <i>{`${userInfo.nombre} ${userInfo.primerApellido}`}</i>
                    </h1>
                </div>
                <div className="p-col-12 p-md-6 p-xl-6">
                    <h1>
                        <Badge
                            value={`Existen ${resume.clientesTotales} clientes guardados en la nube`}
                            size="xlarge"
                            severity={resume.clientesTotales<=0?"danger":"success"}
                        />
                    </h1>
                    {resume.clientesTotales<=0&&(<Badge value="Ingresar clientes para poder realizar consultas" severity="warning" className="p-mr-2"></Badge>)}
                </div>
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-file"
                    last_search_info={txtLastQueryPatent}
                    last_date={resume.ultimaBusquedaPatentes}
                />
                <LastDateCategory
                    icon="pi pi-globe"
                    last_search_info={txtLastQueryBrand}
                    last_date={resume.ultimaBusquedaMarcas}
                />
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-copy"
                    last_search_info={txtLastQueryEjemplares}
                    last_date={resume.ultimaBusquedaEjemplares}
                />
                <LastDateCategory
                    icon="pi pi-id-card"
                    last_search_info={txtLastUpdateClients}
                    last_date={resume.ultimaModificacionClientes}
                />
            </div>
        </div>
    );
}
