import React, {useState, useRef, useEffect} from "react";
import {Toast} from "primereact/toast";
import {BreadCrumb} from "primereact/breadcrumb";
import {txtTitleClients, txtLastUpdateClients, txtNoData,} from "../utils/Strings";
import moment from "moment";
import "moment/locale/es";
import {getHistory} from "../utils/LocalStorage";
import ClientsDialog from "../components/ClientsDialog";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Button} from "primereact/button";
import ClienteService from "../service/ClienteService";
import {confirmDialog} from 'primereact/confirmdialog';

moment.locale("es");

export default function ClientPage() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false)
    const [resume, setResume] = useState({});
    const [showDialog, setShowDialog] = useState()
    const dt1 = useRef(null);
    const [selected, setSelected] = useState([])
    const toast = useRef(null);
    const [data, setData] = useState([])


    useEffect(() => {
        getResume();
        getClients()
    }, []);

    useEffect(() => {
        if (saved) getClients()
    }, [saved]);


    const getResume = () => {
        setResume(getHistory());
    };

    const getClients = () => {
        setLoading(true)
        ClienteService.getAll()
            .then((resp) => setData(resp.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }

    const deleteClients = () => {
        setLoading(true)
        ClienteService.deleteBulk(selected)
            .then((resp) => {
                if(resp.data) getClients()
                else console.error(resp)
            })
            .catch((err) => console.error(err)).finally(() => setLoading(false));
    }

    const confirmDelete = () => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar los registros seleccionados?',
            header: 'Eliminar registros seleccionados',
            draggable: false,
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-success",
            rejectClassName: "p-button-plain p-button-text",
            accept: () => {
                deleteClients()
            },
        });
    };


    return (
        <>
            <BreadCrumb model={[{label: txtTitleClients}]} home={{icon: "pi pi-home"}}/>
            <Toast ref={toast}/>
            <div className="grid">
                <div className="col p-3">
                    <h1>{txtTitleClients}</h1>
                    <div>{txtLastUpdateClients}{moment(resume.ultimaModificacionClientes).format("LLLL")}</div>
                </div>
                <ClientsDialog showDialog={showDialog} setShowDialog={setShowDialog} saved={saved} setSaved={setSaved}/>
            </div>
            <div className='grid'>
                <div className="col-12">
                    <Button className='my-3' severity='danger' disabled={selected.length === 0} onClick={confirmDelete}>Eliminar
                        registros seleccionados</Button>
                    <DataTable value={data} ref={dt1}
                               selectionMode='multiple' selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                               emptyMessage={txtNoData} paginator scrollable rows={10} loading={loading} rowsPerPageOptions={[5, 10, 25, 50]}>
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                        <Column field="expediente" header="Expediente" sortable filter />
                        <Column field="creacion" header="Creación" sortable filter body={(rowData) => <div> {moment(rowData['creacion']).format("LLLL")} </div>}/>
                    </DataTable>
                </div>
            </div>
        </>
    );
}
