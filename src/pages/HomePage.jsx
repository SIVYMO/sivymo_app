import React, {useState, useEffect} from "react";
import "../assets/css/MyCustom.css";
import {
    txtWelcome,
    txtLastQueryPatent,
    txtLastQueryBrand,
    txtLastUpdateClients,
} from "../utils/Strings";
import ResumeService from "../service/ResumeService";
import moment from "moment";
import "moment/locale/es";
import {getUser, setHistory} from "../utils/LocalStorage";

moment.locale("es");

export default function HomePage() {
    const [userInfo, setUserInfo] = useState({});
    const [resume, setResume] = useState({
        ultimaBusquedaPatentes: "",
        ultimaBusquedaMarcas: "",
        ultimaModificacionClientes: "",
        clientesTotales: 0,
    });

    useEffect(() => {
        getResume();
        getPersonalInformation();
    }, []);


    function getPersonalInformation() {
        setUserInfo(getUser());
    }

    function getResume() {
        ResumeService.getResume()
            .then(({data}) => {
                setResume({...data});
                setHistory(data);
            })
            .catch((err) => console.error(err));
    }

    const Card = ({icon, text, value}) => (
        <div className="col-12 md:col-6 p-card shadow-2 ">
            <div className="flex justify-content-center align-items-center h-15rem">
                <div className='text-center'>
                    <i className={`${icon} text-4xl`}></i>
                    <div className='mb-2 mt-1 text-2xl'>{text}</div>
                    <div className='font-bold text-4xl'>{moment(value).format("LLLL")}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid">
            <h1 className='col-12'>{txtWelcome}{' '} {`${userInfo.nombre} ${userInfo.primerApellido}`}</h1>
            <div
                className={`col-12 md:col-6 p-card shadow-2 ${resume.clientesTotales === 0 ? 'bg-pink-100' : 'bg-green-200'}`}>
                <div className="flex justify-content-center align-items-center h-15rem">
                    <div className='text-center'>
                        <i className={`pi pi-user text-4xl`}></i>
                        <div className='mb-2 mt-1 text-2xl'>Total de expedientes:</div>
                        <div className='font-bold text-8xl'>{resume.clientesTotales}</div>
                    </div>
                </div>
            </div>
            <Card icon='pi pi-book' text={txtLastQueryPatent} value={resume.ultimaBusquedaPatentes}/>
            <Card icon='pi pi-globe' text={txtLastQueryBrand} value={resume.ultimaBusquedaMarcas}/>
            <Card icon='pi pi-folder-open' text={txtLastUpdateClients} value={resume.ultimaModificacionClientes}/>
        </div>
    );
}
