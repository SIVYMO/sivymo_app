import React, {useState, useEffect, useRef, Fragment} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {BreadCrumb} from "primereact/breadcrumb";
import {ProgressBar} from "primereact/progressbar";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {Checkbox} from "primereact/checkbox";
import {Calendar} from "primereact/calendar";
import ClienteService from "../../service/ClienteService";
import ScrapingService from "../../service/ScrapingService";
import HistorialService from "../../service/HistorialService";
import {
    txtNoData,
    txtTitlePatents,
    txtStartSearchButton,
    txtExportButton,
    txtClearButton,
    txtMessageNoClients,
    txtMessageSearchSuccess,
    txtMessageSearchError,
    txtSubitlePatent1,
    txtSubitlePatent2,
    txtSubitlePatent3,
    txtLastQueryPatent,
    txtSmsLoading,
    txtLodaing,
    txtStartSearch,
    txtInstructionsSearch,
    txtDateStartLabel,
    txtDateEndLabel,
    txtNoDataSearch,
    txtDataSearch,
    txtClearMessages
} from "../../utils/Strings";
import {dark_sea_green} from "../../utils/Colors";
import Validations from "../../utils/Validations";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

export default function PatentTemplate() {
    const [showDialog, setShowDialog] = useState(false);
    const [resume, setResume] = useState({});
    const [notificaciones, setNotificaciones] = useState([]);
    const [patentesRegistros, setPatentesRegistros] = useState([]);
    const [requisitos, setRequisitos] = useState([]);
    const [history, setHistory] = useState(false);
    const [filesReady, setFilesReady] = useState(false);
    const [inputFechaInicio, setInputFechaInicio] = useState("");
    const [inputFechaFin, setInputFechaFin] = useState("");
    const toast = useRef(null);
    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

    useEffect(() => {
        getResume();
    }, []);

    const getResume = () => {
        setResume(JSON.parse(localStorage.getItem("resume")));
    };

    const confirmStartSearch = () => {
        setFilesReady(false);
        setInputFechaFin(Validations.convertInputDate(new Date()));
        setInputFechaInicio(Validations.convertAPIDate(resume.ultimaBusquedaPatentes));
        if (resume.clientesTotales > 0) {
            setShowDialog(true);
        } else {
            showMessage(txtMessageNoClients);
        }
    };

    const startSearch = () => {
        setHistory(true);
        setData();
    };

    function saveHistory() {
        HistorialService.insertOne(1)
    }

    const setData = async () => {
        let info = await getClients();
        let objSend = {
            fechaInicio: inputFechaInicio,
            fechaFin: inputFechaFin,
            datos: info,
            descargado: filesReady,
        };
        await ScrapingService.getPatentes(objSend)
            .then((resp) => {
                viewData(resp.data);
                showMessage(txtMessageSearchSuccess);
                saveHistory();
            })
            .catch((err) => {
                setShowDialog(false);
                showMessage(txtMessageSearchError);
                console.log(err);
            });
        setShowDialog(false);
        setHistory(false);
    };

    const viewData = (data) => {
        if (data[0].data !== false) {
            window.onbeforeunload = () => "¿Seguro que quieres salir?";
            setNotificaciones(data[0].data);
            showMessage({type: "info", title: txtSubitlePatent1, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent1, description: txtNoDataSearch,});

        if (data[1].data !== false) {
            window.onbeforeunload = () => "¿Seguro que quieres salir?";
            setPatentesRegistros(data[1].data);
            showMessage({type: "info", title: txtSubitlePatent2, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent2, description: txtNoDataSearch,});

        if (data[2].data !== false) {
            window.onbeforeunload = () => "¿Seguro que quieres salir?";
            setRequisitos(data[2].data);
            showMessage({type: "info", title: txtSubitlePatent3, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent3, description: txtNoDataSearch,});

    };

    const getClients = () => {
        return ClienteService.getAll()
            .then((resp) => resp.data)
            .catch((err) => console.error(err));
    };

    const datesValidation = () => Validations.validateDateStartEnd(inputFechaInicio, inputFechaFin);


    const exports = () => {
        dt1.current.exportCSV();
        dt2.current.exportCSV();
        dt3.current.exportCSV();
    };

    const clear = () => {
        setNotificaciones([]);
        setPatentesRegistros([]);
        setRequisitos([]);
    };

    const showMessage = ({type, title, description}) => {
        toast.current.show({severity: type, summary: title, detail: description, sticky: true});
    };

    const clearMessages = () => {
        toast.current.clear();
    }

    const enlaceBodyTemplate = (rowdata) => {
        return (
            <Fragment>
                <a href={rowdata["Enlace electrónico"]} target="_blank" rel="noreferrer">
                    {rowdata["Enlace electrónico"]}
                </a>
            </Fragment>
        );
    };

    function NotificacionPatentes() {
        return (
            <div className="p-grid p-col"><h2>{txtSubitlePatent1}</h2>
                <DataTable ref={dt1} emptyMessage={txtNoData} paginator rows={7} value={notificaciones}>
                    <Column field="Número del Oficio" header="Número del Oficio" sortable/>
                    <Column field="Fecha del Oficio" header="Fecha del Oficio" sortable/>
                    <Column field="Descripción general del asunto" header="Descripción general del asunto" sortable/>
                    <Column field="Enlace electrónico" header="Enlace electrónico" body={enlaceBodyTemplate} sortable/>
                    <Column field="Expediente" header="Expediente" sortable/>
                </DataTable>
            </div>
        );
    }

    function PatentesIndustriales() {
        return (
            <div className="p-grid p-col"><h2>{txtSubitlePatent2}</h2>
                <DataTable ref={dt2} emptyMessage={txtNoData} paginator rows={7} scrollable value={patentesRegistros}>
                    <Column field="Oficina, No de Patente y Tipo de documento"
                            header="Oficina, No de Patente y Tipo de documento" headerStyle={{width: "17vh"}} sortable/>
                    <Column field="Número de concesión" header="Número de concesión" headerStyle={{width: "17vh"}}
                            sortable/>
                    <Column field="Tipo de documento" header="Tipo de documento" headerStyle={{width: "17vh"}}
                            sortable/>
                    <Column field="Número de solicitud" header="Número de solicitud" headerStyle={{width: "17vh"}}
                            sortable/>
                    <Column field="Fecha de presentación" header="Fecha de presentación" headerStyle={{width: "17vh"}}
                            sortable/>
                    <Column field="Fecha de concesión" header="Fecha de concesión" headerStyle={{width: "17vh"}}
                            sortable/>
                    <Column field="Título" header="Título" headerStyle={{width: "17vh"}} sortable/>
                    <Column field="Inventor(es)" header="Inventor(es)" headerStyle={{width: "17vh"}} sortable/>
                    <Column field="Titular" header="Titular" headerStyle={{width: "17vh"}} sortable/>
                    <Column field="Agente" header="Agente" headerStyle={{width: "17vh"}} sortable/>
                </DataTable>
            </div>
        );
    }

    function PatentesNotificados() {
        return (
            <div className="p-grid p-col"><h2>{txtSubitlePatent3}</h2>
                <DataTable ref={dt3} emptyMessage={txtNoData} paginator rows={7} value={requisitos}>
                    <Column field="Número de expediente" header="Número de expediente" sortable/>
                    <Column field="Solicitante(s)" header="Solicitante(s)" sortable/>
                    <Column field="Número del Oficio" header="Número del Oficio" sortable/>
                    <Column field="Agente" header="Agente" sortable/>
                </DataTable>
            </div>
        );
    }

    return (
        <>
            <BreadCrumb model={[{label: txtTitlePatents}]} home={{icon: "pi pi-home"}}/>
            <Toast ref={toast}/>
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>{txtTitlePatents}</h1>
                    <div>
                        {txtLastQueryPatent}
                        {moment(resume.ultimaBusquedaPatentes).format("LLLL")}
                    </div>
                </div>
                <div className="p-d-flex p-ai-center p-py-2">
                    <Button label={txtStartSearchButton} icon="pi pi-search" className="p-button-lg p-ml-auto"
                            style={{backgroundColor: "var(--green-600)"}} onClick={confirmStartSearch}/>
                </div>
            </div>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <div className="p-d-flex p-ai-center export-buttons">
                        <Button type="button" className="p-mr-2" icon="pi pi-download" label={txtExportButton}
                                style={{backgroundColor: "var(--teal-600)"}} onClick={exports}/>
                        <Button type="button" icon="pi pi-times" label={txtClearButton}
                                className="p-button-info  p-mr-2" onClick={clear}/>
                        <Button type="button" icon="pi pi-comments" label={txtClearMessages} className="p-button-help"
                                onClick={clearMessages}/>
                    </div>
                </div>
                <div className="p-col"><NotificacionPatentes/></div>
                <div className="p-col"><PatentesIndustriales/></div>
                <div className="p-col"><PatentesNotificados/></div>
            </div>
            <Dialog
                showHeader={false}
                visible={showDialog}
                draggable={false}
                closable={false}
                onHide={() => {
                }}>
                <div className="p-grid">
                    <div className="p-col">
                        {history ? (
                            <>
                                <div className="p-col p-col-align-center">
                                    <h1>{txtSmsLoading[0]}</h1>
                                    <div>{txtLodaing}</div>
                                    <ProgressBar
                                        mode="indeterminate"
                                        color={dark_sea_green}
                                        style={{height: "6px"}}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>{txtStartSearch}</h1>
                                <p>{txtInstructionsSearch}</p>
                                <div className="p-text-center">
                                    <div className="p-field">
                                        <label
                                            htmlFor="dateStartInput"
                                            className="p-d-block"
                                        >
                                            {txtDateStartLabel}
                                        </label>
                                        <Calendar
                                            id="dateStartInput"
                                            touchUI
                                            dateFormat="yy/mm/dd"
                                            mask="9999/99/99"
                                            value={inputFechaInicio}
                                            monthNavigator
                                            yearNavigator
                                            yearRange="2010:2030"
                                            placeholder={inputFechaInicio}
                                            disabled={filesReady}
                                            onChange={(e) => {
                                                let dateFormat =
                                                    Validations.convertInputDate(e.target.value);
                                                setInputFechaInicio(dateFormat);
                                            }}
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label
                                            htmlFor="dateEndInput"
                                            className="p-d-block"
                                        >
                                            {txtDateEndLabel}
                                        </label>
                                        <Calendar
                                            id="dateEndInput"
                                            touchUI
                                            dateFormat="yy/mm/dd"
                                            mask="9999/99/99"
                                            value={inputFechaFin}
                                            monthNavigator
                                            yearNavigator
                                            yearRange="2010:2030"
                                            placeholder={inputFechaFin}
                                            disabled={filesReady}
                                            onChange={(e) => {
                                                let dateFormat =
                                                    Validations.convertInputDate(
                                                        e.target.value
                                                    );
                                                setInputFechaFin(dateFormat);
                                            }}
                                        />
                                    </div>

                                    <div className=" p-field-checkbox">
                                        <Checkbox
                                            inputId="filesReady"
                                            checked={filesReady}
                                            onChange={(e) =>
                                                setFilesReady(e.checked)
                                            }
                                        />
                                        <label htmlFor="filesReady">
                                            Ya cuento con los archivos descargados
                                        </label>
                                    </div>
                                </div>
                                <div className="p-ai-center p-text-center">
                                    <Button
                                        type="button"
                                        className="p-mr-2 p-button-danger"
                                        label="Cancelar"
                                        onClick={() => {
                                            setShowDialog(false);
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        className="p-mr-2 p-button-success"
                                        label="Buscar"
                                        disabled={datesValidation()}
                                        onClick={startSearch}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    );
}
