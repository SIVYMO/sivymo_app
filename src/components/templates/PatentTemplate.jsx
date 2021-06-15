/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getResume = () => {
        setResume(JSON.parse(localStorage.getItem("resume")));
    };

    const confirmStartSearch = () => {
        setShowDialog(true);
    };

    const startSearch = () => {
        if (resume.clientesTotales > 0) {
            setData();
        } else {
            showMessage(txtMessageNoClients);
        }
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
        let dates = await getDates();
        let obj = {
            fechaInicio: dates[0],
            fechaFin: dates[1],
            datos: info,
        };
        await ScrapingService.getPatentes(obj)
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

    const showMessage = ({ type, title, description }) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    const viewData = (data) => {
        if (history) {
            saveHistory();
        }
        if (
            data[0].data !== "No hubo coincidencias" ||
            data[0].data.length !== 0
        ) {
            let allData = [];
            for (const key in data[0].data) {
                allData.push(data[0].data[key]);
            }
            setNotificaciones(allData);
        }

        if (
            data[1].data !== "No hubo coincidencias" ||
            data[1].data.length !== 0
        ) {
            let allData = [];
            for (const key in data[1].data) {
                allData.push(data[1].data[key]);
            }
            setPatentesRegistros(allData);
        }

        if (
            data[2].data !== "No hubo coincidencias" ||
            data[2].data.length !== 0
        ) {
            let allData = [];
            for (const key in data[2].data) {
                allData.push(data[2].data[key]);
            }
            setRequisitos(allData);
        }
    };

    const getDates = () => {
        return new Promise((reject) => {
            let r, y;
            if (inputFechaInicio === "" && inputFechaFin === "") {
                let d = resume.ultimaBusquedaPatentes.split("T")[0];
                r = d.replaceAll("-", "/");
                let f = JSON.stringify(new Date());
                let t = f.substring(1, f.length - 1);
                let x = t.split("T")[0];
                y = x.replaceAll("-", "/");
                setHistory(true);
            } else {
                r = inputFechaInicio;
                y = inputFechaFin;
            }
            setInputFechaInicio("");
            setInputFechaFin("");
            reject([r, y]);
        });
    };

    const getClients = () => {
        return ClienteService.getAll()
            .then((resp) => resp.data)
            .catch((err) => console.error(err));
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

    function NotificacionPatentes() {
        return (
            <div>
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
                        sortable
                    />
                    <Column field="Expediente" header="Expediente" sortable />
                </DataTable>
            </div>
        );
    }

    function PatentesIndustriales() {
        return (
            <div>
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
                        sortable
                    />
                    <Column
                        field="Número de concesión"
                        header="Número de concesión"
                        sortable
                    />
                    <Column
                        field="Tipo de documento"
                        header="Tipo de documento"
                        sortable
                    />
                    <Column
                        field="Número de solicitud"
                        header="Número de solicitud"
                        sortable
                    />
                    <Column
                        field="Fecha de presentación"
                        header="Fecha de presentación"
                        sortable
                    />
                    <Column
                        field="Fecha de concesión"
                        header="Fecha de concesión"
                        sortable
                    />
                    <Column field="Título" header="Título" sortable />
                    <Column
                        field="Inventor(es)"
                        header="Inventor(es)"
                        sortable
                    />
                    <Column field="Titular" header="Titular" sortable />
                    <Column field="Agente" header="Agente" sortable />
                </DataTable>
            </div>
        );
    }

    function PatentesNotificados() {
        return (
            <div>
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
