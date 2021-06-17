import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
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
        };
        await ScrapingService.getMarcas(objSend)
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
        if (data.data !== false) {
            setMarcas(data.data);
            showMessage({
                type: "info",
                title: txtSubtitleBrand,
                description: "Se encontraron coincidencias",
            });
        } else {
            showMessage({
                type: "warn",
                title: txtSubtitleBrand,
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
    };

    const clear = () => {
        setMarcas([]);
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
                className="p-button-info"
                onClick={clear}
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
                        rows={7}
                    >
                        <Column
                            field="Expediente"
                            header="Expediente"
                            sortable
                        />
                        <Column
                            field="Descripción del oficio"
                            header="Descripción del oficio"
                            sortable
                        />
                        <Column
                            field="Fecha del oficio"
                            header="Fecha del oficio"
                            sortable
                        />
                        <Column
                            field="Número del oficio"
                            header="Número del oficio"
                            sortable
                        />
                        <Column
                            field="Enlace electrónico"
                            header="Enlace electrónico"
                            sortable
                        />
                    </DataTable>
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
                                            placeholder="Ej. 2021/02/01"
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
                                            placeholder="Ej. 2021/02/05"
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
