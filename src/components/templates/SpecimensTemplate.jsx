import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function SpecimensTemplate() {
    const startSearch = () => {
        console.log("inciando...");
    };

    const headerExport = (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button type="button" icon="pi pi-download" label="Exportar resultados"  style={{backgroundColor:"var(--teal-600)"}} />
        </div>
    );

    return (
        <>
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>Ejemplares extraordinarios</h1>
                </div>
                <div className="p-d-flex p-ai-center p-py-2">
                    <Button
                        label="Iniciar con la búsqueda"
                        icon="pi pi-search"
                        className="p-button-lg p-ml-auto"
                        style={{ backgroundColor: "var(--green-600)" }}
                        onClick={startSearch}
                    />
                </div>
            </div>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <DataTable header={headerExport} emptyMessage="No hay datos"  paginator
                        rows={7}>
                        <Column header="Número de expediente" />
                        <Column header="Descripción general del asunto" />
                        <Column header="Fecha del oficio" />
                        <Column header="Número del oficio" />
                        <Column header="Enlace electrónico" />
                    </DataTable>
                </div>
            </div>
        </>
    );
}
