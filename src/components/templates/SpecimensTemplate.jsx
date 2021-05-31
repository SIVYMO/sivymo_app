import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import {
    txtExportButton,
    txtTitleExtraordinaryExamples,
    txtStartSearchButton,
    txtNoData,
} from "../../utils/Strings";

export default function SpecimensTemplate() {
    const startSearch = () => {
        console.log("inciando...");
    };

    const headerExport = (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button
                type="button"
                icon="pi pi-download"
                label={txtExportButton}
                style={{ backgroundColor: "var(--teal-600)" }}
            />
        </div>
    );

    return (
        <>
            <BreadCrumb
                model={[{ label: txtTitleExtraordinaryExamples }]}
                home={{ icon: "pi pi-home" }}
            />
            <div className="p-grid">
                <div className="p-col p-p-3">
                    <h1>{txtTitleExtraordinaryExamples}</h1>
                </div>
                <div className="p-d-flex p-ai-center p-py-2">
                    <Button
                        label={txtStartSearchButton}
                        icon="pi pi-search"
                        className="p-button-lg p-ml-auto"
                        style={{ backgroundColor: "var(--green-600)" }}
                        onClick={startSearch}
                    />
                </div>
            </div>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <DataTable
                        header={headerExport}
                        emptyMessage={txtNoData}
                        paginator
                        rows={7}
                    >
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
