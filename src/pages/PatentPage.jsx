import React, {useState, useEffect, useRef, Fragment} from "react";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {BreadCrumb} from "primereact/breadcrumb";
import {Toast} from "primereact/toast";
import ScrapingService from "../service/ScrapingService";
import HistorialService from "../service/HistorialService";
import {txtNoData, txtTitlePatents, txtExportButton, txtClearButton,
    txtMessageSearchError, txtSubitlePatent1, txtSubitlePatent2, txtNoDataSearch,
    txtSubitlePatent3, txtLastQueryPatent, txtClearMessages, txtDataSearch
} from "../utils/Strings";
import moment from "moment";
import "moment/locale/es";
import {getHistory} from "../utils/LocalStorage";
import SearchDialog from "../components/SearchDialog";

moment.locale("es");

export default function PatentPage() {

    const [payload, setPayload] = useState({datos: [], fechaInicio: "", fechaFin: "", descargado: false,})
    const [startSearch, setStartSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [resume, setResume] = useState({});
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const toast = useRef(null);
    const dt1 = useRef(null);
    const dt2 = useRef(null);
    const dt3 = useRef(null);

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
        ScrapingService.getPatentes(payload)
            .then((resp) => {
                viewData(resp.data);
                HistorialService.insertOne(1)
            })
            .catch((err) => {
                showMessage(txtMessageSearchError);
                console.log(err);
            }).finally(() => {
            setLoading(false);
            setStartSearch(false);
            setShowDialog(false);
        });
    }

    const viewData = (data) => {
        console.log(data)
        if (data[0].code === 200 && data[0].data.length > 0) {
            setData1(data[0].data);
            showMessage({type: "info", title: txtSubitlePatent1, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent1, description: txtNoDataSearch,});
        if (data[1].code === 200 && data[1].data.length > 0) {
            setData2(data[1].data);
            showMessage({type: "info", title: txtSubitlePatent2, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent2, description: txtNoDataSearch,});
        if (data[2].code === 200 && data[2].data.length > 0) {
            setData3(data[2].data);
            showMessage({type: "info", title: txtSubitlePatent3, description: txtDataSearch,});
        } else showMessage({type: "warn", title: txtSubitlePatent3, description: txtNoDataSearch,});
    };

    const exports = () => {
        dt1.current.exportCSV();
        dt2.current.exportCSV();
        dt3.current.exportCSV();
    };

    const clear = () => {
        setData1([]);
        setData2([]);
        setData3([]);
    };

    const showMessage = ({type, title, description}) => {
        toast.current.show({severity: type, summary: title, detail: description, sticky: true});
    };

    const clearMessages = () => {
        toast.current.clear();
    }

    return (
        <>
            <BreadCrumb model={[{label: txtTitlePatents}]} home={{icon: "pi pi-home"}}/>
            <Toast ref={toast}/>
            <div className="grid">
                <div className="col p-3">
                    <h1>{txtTitlePatents}</h1>
                    <div>{txtLastQueryPatent}{moment(resume.ultimaBusquedaPatentes).format("LLLL")}</div>
                </div>
                <SearchDialog payload={payload} setPayload={setPayload} resume={resume} loading={loading}
                              setLoading={setLoading} setStartSearch={setStartSearch} showDialog={showDialog} setShowDialog={setShowDialog}/>
            </div>
            <div className="grid ">
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
                    <h2>{txtSubitlePatent1}</h2>
                    <DataTable ref={dt1} emptyMessage={txtNoData} paginator rows={10} value={data1} loading={loading}>
                        <Column field="Descripción general del asunto" header="Descripción general del asunto" sortable/>
                        <Column field="Expediente" header="Expediente" sortable/>
                        <Column field="Número de concesión" header="Número de concesión" sortable/>
                        <Column field="Fecha del Oficio" header="Fecha del Oficio" sortable/>
                        <Column field="Número del Oficio" header="Número del Oficio" sortable/>
                        <Column field="Enlace electrónico" header="Enlace electrónico" sortable body={(rowdata) => <a href={rowdata["Enlace electrónico"]} target="_blank" rel="noreferrer">{rowdata["Enlace electrónico"]}</a>}/>
                    </DataTable>
                </div>
                <div className="col-12">
                    <h2>{txtSubitlePatent2}</h2>
                    <DataTable ref={dt2} emptyMessage={txtNoData} paginator rows={10} scrollable value={data2} loading={loading}>
                        <Column field="Oficina, No de Patente y Tipo de documento" header="Oficina, No de Patente y Tipo de documento" sortable/>
                        <Column field="Tipo de documento" header="Tipo de documento"  sortable/>
                        <Column field="Fecha de concesión" header="Fecha de concesión"  sortable/>
                        <Column field="Número de solicitud" header="Número de solicitud"  sortable/>
                        <Column field="Fecha de presentación" header="Fecha de presentación"  sortable/>
                        <Column field="Número de solicitud internacional" header="Número de solicitud internacional"  sortable/>
                        <Column field="Fecha de presentación internacional" header="Fecha de presentación internacional"  sortable/>
                        <Column field="Número de publicación internacional" header="Número de publicación internacional"  sortable/>
                        <Column field="Fecha de publicación internacional" header="Fecha de publicación internacional"  sortable/>
                        <Column field="Inventor(es)" header="Inventor(es)"  sortable/>
                        <Column field="Titular" header="Titular"  sortable/>
                        <Column field="Agente" header="Agente"  sortable/>
                        <Column field="Clasificación CIP" header="Clasificación CIP"  sortable/>
                        <Column field="Clasificación CPC" header="Clasificación CPC"  sortable/>
                        <Column field="Título" header="Título"  sortable/>
                        <Column field="Resumen" header="Resumen"  sortable/>
                    </DataTable>
                </div>
                <div className="col-12">
                    <h2>{txtSubitlePatent3}</h2>
                    <DataTable ref={dt3} emptyMessage={txtNoData} paginator rows={10} value={data3} loading={loading}>
                        <Column field="Número de expediente" header="Número de expediente" sortable/>
                        <Column field="Solicitante(s)" header="Solicitante(s)" sortable/>
                        <Column field="Número del Oficio" header="Número del Oficio" sortable/>
                        <Column field="Agente" header="Agente" sortable/>
                    </DataTable>
                </div>
            </div>
        </>
    );
}
