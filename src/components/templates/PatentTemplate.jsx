/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import ClienteService from "../../service/ClienteService";
import ScrapingService from "../../service/ScrapingService";
import HistorialService from "../../service/HistorialService";
import { Toast } from "primereact/toast";
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
} from "../../utils/Strings";
import { dark_sea_green } from "../../utils/Colors";
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
        setInputFechaFin(Validations.convertInputDate(new Date()));
        setInputFechaInicio(
            Validations.convertAPIDate(resume.ultimaBusquedaPatentes)
        );
        if (resume.clientesTotales > 0) {
            setShowDialog(true);
        } else {
            showMessage(txtMessageNoClients);
        }
    };

    const startSearch = () => {
        setHistory(true);
        saveHistory();
        setData();
    };

    function saveHistory() {
        HistorialService.insertOne("1")
            .then((response) => {})
            .catch((err) => {
                console.error(err);
            });
    }

    const setData = async () => {
        let info = await getClients();
        let objSend = {
            fechaInicio: inputFechaInicio,
            fechaFin: inputFechaFin,
            datos: info,
        };
        await ScrapingService.getPatentes(objSend)
            .then((resp) => {
                viewData(resp.data);
                showMessage(txtMessageSearchSuccess);
            })
            .catch((err) => {
                showMessage(txtMessageSearchError);
                console.log(err);
            });
        setShowDialog(false);
        setHistory(false);
    };

    const viewData = (data) => {
        if (data[0].data !== false) {
            setNotificaciones(data[0].data);
            showMessage({
                type: "info",
                title: txtSubitlePatent1,
                description: "Se encontraron coincidencias",
            });
        } else {
            showMessage({
                type: "warn",
                title: txtSubitlePatent1,
                description: "No se encontraron coincidencias",
            });
        }
        if (data[1].data !== false) {
            setPatentesRegistros(data[1].data);
            showMessage({
                type: "info",
                title: txtSubitlePatent2,
                description: "Se encontraron coincidencias",
            });
        } else {
            showMessage({
                type: "warn",
                title: txtSubitlePatent2,
                description: "No se encontraron coincidencias",
            });
        }
        if (data[2].data !== false) {
            setRequisitos(data[2].data);
            showMessage({
                type: "info",
                title: txtSubitlePatent3,
                description: "Se encontraron coincidencias",
            });
        } else {
            showMessage({
                type: "warn",
                title: txtSubitlePatent3,
                description: "No se encontraron coincidencias",
            });
        }
    };

    const getClients = () => {
        return ClienteService.getAll()
            .then((resp) => resp.data)
            .catch((err) => console.error(err));
    };

    const datesValidation = () => {
        return Validations.validateDateStartEnd(
            inputFechaInicio,
            inputFechaFin
        );
    };

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

    const showMessage = ({ type, title, description }) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            sticky: true,
        });
    };

    const enlaceBodyTemplate = (rowdata) => {
        return (
            <Fragment>
                <a
                    href={rowdata["Enlace electrónico"]}
                    target="_blank"
                    rel="noopener"
                >
                    {rowdata["Enlace electrónico"]}
                </a>
            </Fragment>
        );
    };

    function NotificacionPatentes() {
        return (
            <div className="p-grid p-col">
                <h2>{txtSubitlePatent1}</h2>
                <DataTable
                    ref={dt1}
                    emptyMessage={txtNoData}
                    paginator
                    rows={7}
                    value={notificaciones}
                >
                    <Column
                        field="Número del Oficio"
                        header="Número del Oficio"
                        sortable
                    />
                    <Column
                        field="Fecha del Oficio"
                        header="Fecha del Oficio"
                        sortable
                    />
                    <Column
                        field="Descripción general del asunto"
                        header="Descripción general del asunto"
                        sortable
                    />
                    <Column
                        field="Enlace electrónico"
                        header="Enlace electrónico"
                        body={enlaceBodyTemplate}
                        sortable
                    />
                    <Column field="Expediente" header="Expediente" sortable />
                </DataTable>
            </div>
        );
    }

    function PatentesIndustriales() {
        return (
            <div className="p-grid p-col">
                <h2>{txtSubitlePatent2}</h2>
                <DataTable
                    ref={dt2}
                    emptyMessage={txtNoData}
                    paginator
                    rows={7}
                    scrollable
                    value={patentesRegistros}
                >
                    <Column
                        field="Oficina, No de Patente y Tipo de documento"
                        header="Oficina, No de Patente y Tipo de documento"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Número de concesión"
                        header="Número de concesión"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Tipo de documento"
                        header="Tipo de documento"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Número de solicitud"
                        header="Número de solicitud"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Fecha de presentación"
                        header="Fecha de presentación"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Fecha de concesión"
                        header="Fecha de concesión"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Título"
                        header="Título"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Inventor(es)"
                        header="Inventor(es)"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Titular"
                        header="Titular"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                    <Column
                        field="Agente"
                        header="Agente"
                        headerStyle={{ width: "17vh" }}
                        sortable
                    />
                </DataTable>
            </div>
        );
    }

    function PatentesNotificados() {
        return (
            <div className="p-grid p-col">
                <h2>{txtSubitlePatent3}</h2>
                <DataTable
                    ref={dt3}
                    emptyMessage={txtNoData}
                    paginator
                    rows={7}
                    value={requisitos}
                >
                    <Column
                        field="Número de expediente"
                        header="Número de expediente"
                        sortable
                    />
                    <Column
                        field="Solicitante(s)"
                        header="Solicitante(s)"
                        sortable
                    />
                    <Column
                        field="Número del Oficio"
                        header="Número del Oficio"
                        sortable
                    />
                    <Column field="Agente" header="Agente" sortable />
                </DataTable>
            </div>
        );
    }

    return (
        <>
            <BreadCrumb
                model={[{ label: txtTitlePatents }]}
                home={{ icon: "pi pi-home" }}
            />
            <Toast ref={toast} />
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>{txtTitlePatents}</h1>
                    <div>
                        {txtLastQueryPatent}
                        {moment(resume.ultimaBusquedaPatentes).format("LLLL")}
                    </div>
                </div>
                <div className="p-d-flex p-ai-center p-py-2">
                    <Button
                        label={txtStartSearchButton}
                        icon="pi pi-search"
                        className="p-button-lg p-ml-auto"
                        style={{ backgroundColor: "var(--green-600)" }}
                        onClick={confirmStartSearch}
                    />
                </div>
            </div>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <div className="p-d-flex p-ai-center export-buttons">
                        <Button
                            type="button"
                            className="p-mr-2"
                            icon="pi pi-download"
                            label={txtExportButton}
                            style={{ backgroundColor: "var(--teal-600)" }}
                            onClick={exports}
                        />
                        <Button
                            type="button"
                            icon="pi pi-times"
                            label={txtClearButton}
                            className="p-button-info"
                            onClick={clear}
                        />
                    </div>
                    <NotificacionPatentes />
                </div>
                <div className="p-col">
                    <PatentesIndustriales />
                </div>
                <div className="p-col">
                    <PatentesNotificados />
                </div>
            </div>

            <Dialog
                showHeader={false}
                visible={showDialog}
                style={{ width: "40vw" }}
                draggable={false}
                closable={false}
                onHide={() => {}}
            >
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
                                        style={{ height: "6px" }}
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
                                        <InputText
                                            id="dateStartInput"
                                            type="text"
                                            placeholder="2021/02/01"
                                            maxLength="10"
                                            value={inputFechaInicio}
                                            onChange={(e) => {
                                                setInputFechaInicio(
                                                    e.target.value
                                                );
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
                                        <InputText
                                            id="dateEndInput"
                                            type="text"
                                            placeholder="2021/02/05"
                                            maxLength="10"
                                            value={inputFechaFin}
                                            onChange={(e) => {
                                                setInputFechaFin(
                                                    e.target.value
                                                );
                                            }}
                                        />
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
                                        label="Búscar"
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
