import React, {useState, useEffect, useRef, Fragment} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {BreadCrumb} from "primereact/breadcrumb";
import {Toast} from "primereact/toast";
import ScrapingService from "../service/ScrapingService";
import HistorialService from "../service/HistorialService";
import {
    txtExportButton, txtNoData, txtTitleBrands, txtClearButton,
    txtMessageSearchError, txtLastQueryBrand, txtSubtitleBrand,
    txtNoDataSearch, txtDataSearch, txtClearMessages,
} from "../utils/Strings";

import moment from "moment";
import "moment/locale/es";
import {getHistory} from "../utils/LocalStorage";
import SearchDialog from "../components/SearchDialog";

moment.locale("es");

export default function BrandPage() {

    const [payload, setPayload] = useState({datos: [], fechaInicio: "", fechaFin: "", descargado: false,})
    const [startSearch, setStartSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [resume, setResume] = useState({});
    const [data, setData] = useState([])
    const toast = useRef(null);
    const dt1 = useRef(null);

    useEffect(() => {
        setResume(getHistory());
    }, []);

    useEffect(() => {
        if (payload.fechaFin !== "" && payload.fechaInicio !== "" && payload.datos.length > 0 && startSearch) {
            getScrapingData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startSearch]);

    const getScrapingData = () => {
        ScrapingService.getMarcas(payload)
            .then((resp) => {
                viewData(resp.data);
                HistorialService.insertOne(2)
            })
            .catch((err) => {
                showMessage(txtMessageSearchError);
                console.log(err);
            }).finally(() => {
                setLoading(false);
                setStartSearch(false);
                setShowDialog(false);
        });
    };

    const viewData = (data) => {
        if (data.code === 200 && data.data.length > 0) {
            setData(data.data);
            showMessage({type: "info", title: txtSubtitleBrand, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubtitleBrand, description: txtNoDataSearch,});
    };


    const exports = () => {
        dt1.current.exportCSV();
    };

    const clear = () => {
        setData([])
    };

    const clearMessages = () => {
        toast.current.clear()
    };

    const showMessage = ({type, title, description}) => {
        toast.current.show({severity: type, summary: title, detail: description, sticky: true,});
    };

    return (
        <>
            <BreadCrumb model={[{label: txtTitleBrands}]} home={{icon: "pi pi-home"}}/>
            <Toast ref={toast}/>
            <div className="grid">
                <div className="col p-3">
                    <h1>{txtTitleBrands}</h1>
                    <div>{txtLastQueryBrand}{moment(resume.ultimaBusquedaMarcas).format("LLLL")}</div>
                </div>
                <SearchDialog payload={payload} setPayload={setPayload} resume={resume} loading={loading}
                              setLoading={setLoading} setStartSearch={setStartSearch} showDialog={showDialog} setShowDialog={setShowDialog}/>
            </div>

            <div className="grid">
                <div className="col-12">
                    <div className="flex justify-content-between">
                        <Button type="button" icon="pi pi-download" className="bg-teal-600" label={txtExportButton}
                                onClick={exports}/>
                        <Button type="button" icon="pi pi-times" label={txtClearButton} className="p-button-info"
                                onClick={clear}/>
                        <Button type="button" icon="pi pi-comments" label={txtClearMessages} className="p-button-help"
                                onClick={clearMessages}/>
                    </div>
                </div>
                <div className="col-12">
                    <h2>{txtSubtitleBrand}</h2>
                    <DataTable value={data} ref={dt1} emptyMessage={txtNoData} paginator scrollable rows={10}
                               loading={loading}>
                        <Column field="Expediente" header="Expediente" headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Registro de Marca" header="Registro de Marca" headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Serie del expediente" header="Serie del expediente" headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Descripción del oficio" header="Descripción del oficio"
                                headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Número del oficio" header="Número del oficio" headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Fecha del oficio" header="Fecha del oficio" headerStyle={{width: "20vh"}} sortable/>
                        <Column field="Enlace electrónico" header="Enlace electrónico" headerStyle={{width: "20vh"}}
                                sortable
                                body={(rowdata) => <a href={rowdata["Enlace electrónico"]} target="_blank"
                                                      rel="noreferrer">{rowdata["Enlace electrónico"]}</a>}/>
                    </DataTable>
                </div>
            </div>
        </>
    );
}
