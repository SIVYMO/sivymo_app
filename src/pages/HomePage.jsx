import React, {useState, useEffect} from "react";
import "../assets/css/MyCustom.css";
import {
    backgroundWallpaper,
    txtWelcome,
    txtLastQueryPatent,
    txtLastQueryBrand,
    txtLastUpdateClients,
} from "../utils/Strings";
import ResumeService from "../service/ResumeService";
import moment from "moment";
import "moment/locale/es";

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


    const Cover = () => (
        <img src="https://random.imagecdn.app/1080/720" alt={backgroundWallpaper}
             style={{width: "100%", height: "300px", objectFit: "cover"}}
        />
    );


    function getPersonalInformation() {
        setUserInfo(JSON.parse(localStorage.getItem("userActive")));
    }

    function getResume() {
        ResumeService.getResume()
            .then(({data}) => {
                setResume({...data});
                localStorage.setItem("resume", JSON.stringify(data));
            })
            .catch((err) => console.error(err));
    }

    const Card = ({icon, text, value}) => (
            <div className="p-col-12 p-sm-3 card p-shadow-2">
                <div className="p-d-flex p-d-flex p-jc-center p-ai-center" style={{height: '200px'}}>
                    <div className='p-text-center'>
                        <i className={icon} style={{'fontSize': '2em'}}></i>
                        <div className='p-mb-2 p-mt-1' style={{'fontSize': '1.5em'}}>{text}</div>
                        <div className='p-text-bold' style={{'fontSize': '1.6em'}}>{moment(value).format("LLLL")}</div>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <h1>{txtWelcome}{' '}<i>{`${userInfo.nombre} ${userInfo.primerApellido}`}</i></h1>
                </div>
                <div className="p-col"><Cover/></div>
            </div>
            <div className='p-grid p-mt-3'>
                <div className="p-col-12 p-sm-3 card p-shadow-2"
                     style={{backgroundColor: resume.clientesTotales === 0 ? 'var(--pink-100)' : 'var(--green-200)'}}>
                    <div className="p-d-flex p-d-flex p-jc-center p-ai-center" style={{height: '200px'}}>
                        <div className='p-text-center'>
                            <i className='pi pi-user' style={{'fontSize': '2em'}}></i>
                            <div className='p-mb-2 p-mt-1' style={{'fontSize': '1.5em'}}>Total de expedientes:</div>
                            <div className='p-text-bold' style={{'fontSize': '5em'}}>{resume.clientesTotales}</div>
                        </div>
                    </div>
                </div>
                <Card icon='pi pi-file' text={txtLastQueryPatent} value={resume.ultimaBusquedaPatentes}/>
                <Card icon='pi pi-globe' text={txtLastQueryBrand} value={resume.ultimaBusquedaMarcas}/>
                <Card icon='pi pi-id-card' text={txtLastUpdateClients} value={resume.ultimaModificacionClientes}/>
            </div>
        </>
    );
}
