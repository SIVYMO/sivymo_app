import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";

export default function ClientsTemplate() {
    const [importedData, setImportedData] = useState([]);
    const [selectedImportedData, setSelectedImportedData] = useState([]);
    const [importedCols, setImportedCols] = useState([
        { field: "", header: "Columnas" },
    ]);
    const toast = useRef(null);

    const importExcel = (e) => {
        showMessageloading();
        const file = e.files[0];
        import("xlsx").then((xlsx) => {
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

    // ? Para ser visto de manera visual y para ser visto en formato json
    const toCapitalize = (s) => {
        let r = s.replaceAll(" ", "_");
        let c = r.charAt(0).toUpperCase() + r.slice(1);
        console.log(c)
        return c;
    };

    const clear = () => {
        setImportedData([]);
        setSelectedImportedData([]);
        setImportedCols([{ field: "", header: "Columnas" }]);
    };

    const clearMessageLoading = () => {
        toast.current.clear();
        console.log(importedData);
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
                        <h4>Cargando</h4>
                        <p>Espere a que los datos esten listos</p>
                    </div>
                </div>
            ),
        });
    };

    const saveAllImportedData = () => {
        importedData.forEach((element) => {
            console.log(element);
            
        });
    };

    return (
        <>
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>Clientes</h1>
                    <Toast ref={toast} />
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
                            url="https://primefaces.org/primereact/showcase/upload.php"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="p-mr-2"
                            onUpload={importExcel}
                        />

                        <Button
                            type="button"
                            label="Limpiar todo"
                            icon="pi pi-times"
                            onClick={clear}
                            className="p-button-info p-ml-auto"
                            disabled={importedData.length === 0 ? true : false}
                        />
                        <Button
                            type="button"
                            label="Guardar todo"
                            icon="pi pi-save"
                            className="p-button-success p-ml-2"
                            disabled={importedData.length === 0 ? true : false}
                            onClick={saveAllImportedData}
                        />
                    </div>
                </div>
            </div>

            <div style={{ width: "100%", overflowX: "scroll" }}>
                <DataTable
                    value={importedData}
                    emptyMessage="Sin ningun dato subido"
                    paginator
                    rows={7}
                    alwaysShowPaginator={false}
                    selection={selectedImportedData}
                >
                    {importedCols.map((col, index) => (
                        <Column
                            key={index}
                            field={col.field}
                            header={col.header}
                            style={{ width: "8em" }}
                        />
                    ))}
                </DataTable>
            </div>
        </>
    );
}
