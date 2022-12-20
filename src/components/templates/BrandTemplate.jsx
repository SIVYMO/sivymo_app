/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import ClienteService from "../../service/ClienteService";
import ScrapingService from "../../service/ScrapingService";
import HistorialService from "../../service/HistorialService";
import {
    txtExportButton,
    txtStartSearchButton,
    txtNoData,
    txtTitleBrands,
    txtClearButton,
    txtMessageNoClients,
    txtMessageSearchSuccess,
    txtMessageSearchError,
    txtLastQueryBrand,
    txtSubtitleBrand,
    txtSmsLoading,
    txtStartSearch,
    txtLodaing,
    txtInstructionsSearch,
    txtDateStartLabel,
    txtDateEndLabel,
    txtNoDataSearch,
    txtDataSearch,
    txtClearMessages,
} from "../../utils/Strings";
import { dark_sea_green } from "../../utils/Colors";
import Validations from "../../utils/Validations";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default function BrandTemplate() {
    const [showDialog, setShowDialog] = useState(false);
    const [resume, setResume] = useState({});
    const [marcas, setMarcas] = useState([]);
    const [inputFechaInicio, setInputFechaInicio] = useState("");
    const [inputFechaFin, setInputFechaFin] = useState("");
    const [filesReady, setFilesReady] = useState(false);
    const [history, setHistory] = useState(false);
    const toast = useRef(null);
    const dt1 = useRef(null);

    useEffect(() => {
        getResume();
    }, []);

    const getResume = () => {
        setResume(JSON.parse(localStorage.getItem("resume")));
    };

    const confirmStartSearch = () => {
        setFilesReady(false);
        setInputFechaFin(Validations.convertInputDate(new Date()));
        setInputFechaInicio(
            Validations.convertAPIDate(resume.ultimaBusquedaMarcas)
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
        HistorialService.insertOne("2")
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
            descargado: filesReady,
        };
        await ScrapingService.getMarcas(objSend)
            .then((resp) => {
                viewData(resp.data);
                showMessage(txtMessageSearchSuccess);
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
        if (data.data !== false) {
            setMarcas(data.data);
            showMessage({
                type: "info",
                title: txtSubtitleBrand,
                description: txtDataSearch,
            });
            window.onbeforeunload = () => "¿Seguro que quieres salir?";
        } else {
            showMessage({
                type: "warn",
                title: txtSubtitleBrand,
                description: txtNoDataSearch,
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
    };

    const clear = () => {
        setMarcas([]);
    };

    const clearMessages = () => {
        toast.current.clear();
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

    const headerExport = (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button
                type="button"
                icon="pi pi-download"
                className="p-mr-2"
                label={txtExportButton}
                style={{ backgroundColor: "var(--teal-600)" }}
                onClick={exports}
            />

            <Button
                type="button"
                icon="pi pi-times"
                label={txtClearButton}
                className="p-button-info p-mr-2"
                onClick={clear}
            />
            <Button
                type="button"
                icon="pi pi-comments"
                label={txtClearMessages}
                className="p-button-info"
                onClick={clearMessages}
            />
        </div>
    );

    const showMessage = ({ type, title, description }) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            sticky: true,
        });
    };

    return (
        <>
            <BreadCrumb
                model={[{ label: txtTitleBrands }]}
                home={{ icon: "pi pi-home" }}
            />
            <Toast ref={toast} />
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>{txtTitleBrands}</h1>
                    <div>
                        {txtLastQueryBrand}
                        {moment(resume.ultimaBusquedaMarcas).format("LLLL")}
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
                    <h2>{txtSubtitleBrand}</h2>
                    <DataTable
                        value={marcas}
                        ref={dt1}
                        header={headerExport}
                        emptyMessage={txtNoData}
                        paginator
                        scrollable
                        rows={7}
                    >
                        <Column
                            field="Expediente"
                            header="Expediente"
                            headerStyle={{ width: "20vh" }}
                            sortable
                        />
                        <Column
                            field="Descripción del oficio"
                            header="Descripción del oficio"
                            headerStyle={{ width: "20vh" }}
                            sortable
                        />
                        <Column
                            field="Fecha del oficio"
                            header="Fecha del oficio"
                            headerStyle={{ width: "20vh" }}
                            sortable
                        />
                        <Column
                            field="Número del oficio"
                            header="Número del oficio"
                            headerStyle={{ width: "20vh" }}
                            sortable
                        />
                        <Column
                            field="Enlace electrónico"
                            header="Enlace electrónico"
                            headerStyle={{ width: "20vh" }}
                            body={enlaceBodyTemplate}
                            sortable
                        />
                    </DataTable>
                </div>
            </div>

            <Dialog
                showHeader={false}
                visible={showDialog}
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
                                        <Calendar
                                            id="dateStartInput"
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
                                                    Validations.convertInputDate(
                                                        e.target.value
                                                    );
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
                                            Ya cuento con los archivos
                                            descargados
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