import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import ClienteService from "../../service/ClienteService";
import HistorialService from "../../service/HistorialService";
import { BreadCrumb } from "primereact/breadcrumb";
import {
    txtSmsLoading,
    txtMessageErrorGeneral,
    txtMessageClientsSaved,
    txtTitleClients,
    txtSaveButton,
    txtClearButton,
    txtNoDataLabel,
    txtLastUpdateClients,
} from "../../utils/Strings";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

export default function ClientsTemplate() {
    const [resume, setResume] = useState({});
    const [importedData, setImportedData] = useState([]);
    const [selectedImportedData, setSelectedImportedData] = useState([]);
    const [importedCols, setImportedCols] = useState([
        { field: "", header: "Columnas" },
    ]);
    const toast = useRef(null);

    useEffect(() => {
        getResume();
    }, []);

    const getResume = () => {
        setResume(JSON.parse(localStorage.getItem("resume")));
    };

    const importExcel = async (e) => {
        showMessageloading();
        const file = e.files[0];
        await import("xlsx").then((xlsx) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = xlsx.read(e.target.result, { type: "array" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
                const cols = data[0];
                data.shift();
                let _importedCols = cols.map((col) => ({
                    field: toCapitalize(col),
                    header: toCapitalize(col),
                }));
                let _importedData = data.map((d) => {
                    return cols.reduce((obj, c, i) => {
                        let key = toCapitalize(c);
                        obj[key] = d[i];
                        return obj;
                    }, {});
                });
                setImportedCols(_importedCols);
                setImportedData(_importedData);
            };
            reader.readAsArrayBuffer(file);
        });
        clearMessageLoading();
    };

    const toCapitalize = (s) => {
        let r = s.replaceAll(" ", "_");
        let c = r.charAt(0).toLowerCase() + r.slice(1);
        return c;
    };

    const clear = () => {
        setImportedData([]);
        setSelectedImportedData([]);
        setImportedCols([{ field: "", header: "Columnas" }]);
    };

    const clearMessageLoading = () => {
        toast.current.clear();
    };

    const showMessageloading = () => {
        toast.current.show({
            severity: "info",
            sticky: true,
            content: (
                <div className="p-flex p-flex-column" style={{ flex: "1" }}>
                    <div className="p-text-center">
                        <i
                            className="pi pi-spin pi-spinner"
                            style={{ fontSize: "3em" }}
                        ></i>
                        <h4>{txtSmsLoading[0]}</h4>
                        <p>{txtSmsLoading[1]}</p>
                    </div>
                </div>
            ),
        });
    };

    function saveHistory() {
        HistorialService.insertOne("4")
            .then((response) => {})
            .catch((err) => {
                console.error(err);
            });
    }

    const saveAllImportedData = async () => {
        showMessageloading();
        let m1 = importedData.splice(0, importedData.length / 2);
        let m2 = importedData.splice(0, importedData.length);

        await ClienteService.insertOne(m1)
            .then((response) => {
                if (response.data) {
                } else {
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((err) => {
                clearMessageLoading();
                console.error(err);
                return;
            });

        await ClienteService.insertTwo(m2)
            .then((response) => {
                clearMessageLoading();
                if (response.data) {
                    saveHistory();
                    clear();
                    showMessage(txtMessageClientsSaved);
                } else {
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((err) => {
                clearMessageLoading();
                console.error(err);
                showMessage(txtMessageErrorGeneral);
                return;
            });
    };

    const showMessage = ({ type, title, description }) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    return (
        <>
            <BreadCrumb
                model={[{ label: txtTitleClients }]}
                home={{ icon: "pi pi-home" }}
            />
            <Toast ref={toast} />
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>{txtTitleClients}</h1>
                    <div>
                        {txtLastUpdateClients}
                        {moment(resume.ultimaModificacionClientes).format( "LLLL" )}
                    </div>
                    <div className="p-d-flex p-ai-center p-py-2">
                        <FileUpload
                            chooseOptions={{
                                label: "Importar desde Excel",
                                icon: "pi pi-file-excel",
                                className: "p-button-success p-button-outlined",
                            }}
                            mode="basic"
                            name="demo[]"
                            auto
                            url="https://sivymoapi-production.up.railway.app/novopatent-api/uploadFake"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="p-mr-2"
                            onUpload={importExcel}
                        />
                        <Button
                            type="button"
                            label={txtClearButton}
                            icon="pi pi-times"
                            onClick={clear}
                            className="p-button-info p-ml-auto"
                            disabled={importedData.length === 0 ? true : false}
                        />
                        <Button
                            type="button"
                            label={txtSaveButton}
                            icon="pi pi-save"
                            className="p-button-success p-ml-2"
                            disabled={importedData.length === 0 ? true : false}
                            onClick={saveAllImportedData}
                        />
                    </div>
                </div>
            </div>

            <DataTable
                value={importedData}
                emptyMessage={txtNoDataLabel}
                paginator
                rows={7}
                scrollable
                selection={selectedImportedData}
            >
                {importedCols.map((col, index) => (
                    <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        style={{ width: "15em" }}
                    />
                ))}
            </DataTable>
        </>
    );
}
