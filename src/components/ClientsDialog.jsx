import React, {useRef, useState} from 'react';
import {Button} from "primereact/button";
import {InputTextarea} from "primereact/inputtextarea";
import ClienteService from "../service/ClienteService";
import {
    txtMessageClientsSaved,
    txtMessageErrorGeneral,
    txtSmsLoading,
    txtSaveClientsButton,
} from "../utils/Strings";
import HistorialService from "../service/HistorialService";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";

export default function ClientsDialog({showDialog, setShowDialog, setSaved}) {
    const toast = useRef(null);

    const [clients, setClients] = useState([]);
    const [clientsText, setClientsText] = useState("");

    const openDialog = () => {
        setSaved(false);
        setShowDialog(!showDialog);
    }

    const saveClients = async () => {
        showMessageloading();
        const data = await clearAndFilterData(clients);
        ClienteService.insertOne(data)
            .then((response) => {
                clearMessageLoading();
                if (response) {
                    HistorialService.insertOne(3);
                    clearClients();
                    openDialog();
                    showMessage(txtMessageClientsSaved);
                    setSaved(true);
                } else {
                    showMessage(txtMessageErrorGeneral);
                }
            })
            .catch((error) => {
                clearMessageLoading();
                console.error(error);
                showMessage(txtMessageErrorGeneral);
            });
    };

    const clearAndFilterData = async (data = []) => {
        let newData = [];
        for await (let item of data) {
            item = item.trim();
            if (item.length > 2) {
                newData.push({'expediente': item});
            }
        }
        return newData;
    };

    const clearClients = () => {
        setClients([]);
        setClientsText("");
        showMessage({
            type: "info",
            title: "Se han limpiado los expedientes",
            description: "Limpiado",
        });
    };

    const clearMessageLoading = () => {
        toast.current.clear();
    };

    const showMessageloading = () => {
        toast.current.show({
            severity: "info",
            sticky: true,
            content: (
                <div className="p-flex p-flex-column" style={{flex: "1"}}>
                    <div className="text-center">
                        <i className="pi pi-spin pi-spinner" style={{fontSize: "3em"}}></i>
                        <h4>{txtSmsLoading[0]}</h4>
                        <p>{txtSmsLoading[1]}</p>
                    </div>
                </div>
            ),
        });
    };

    const showMessage = ({type, title, description}) => {
        toast.current.show({
            severity: type,
            summary: title,
            detail: description,
            life: 3000,
        });
    };

    return (

        <>
            <Toast ref={toast}/>
            <div className="flex align-items-center">
                <Button label={txtSaveClientsButton} icon="pi pi-save" className="p-button-lg bg-green-600"
                        onClick={openDialog}/>
            </div>
            <Dialog showHeader={false} visible={showDialog} draggable={false} closable={true} onHide={false}>
                <div className="grid m-3">
                    <div className="col-12">
                        <div className="grid">
                            <h2>Añadir más expedientes: {clients.length}</h2>
                            <div className="col-12">
                                <Button type="button" icon="pi pi-times" label="Limpiar"
                                        className="p-button-info mr-1" onClick={clearClients}
                                        disabled={clients.length <= 0}/>
                                <Button type="button" icon="pi pi-save" label="Guardar" className="p-button-warning"
                                        onClick={saveClients} disabled={clients.length <= 0}/>
                            </div>
                        </div>
                        <InputTextarea
                            value={clientsText}
                            rows={20}
                            autoResize
                            style={{width: "100%"}}
                            onChange={(e) => {
                                setClientsText(e.target.value);
                                setClients(e.target.value.split("\n"));
                            }}
                        />
                    </div>
                </div>
                <div className="col-12 text-center">
                    <Button type="button" icon="pi pi-times" label="Cerrar" className="p-button-help" onClick={openDialog}/>
                </div>
            </Dialog>
        </>
    );
}
