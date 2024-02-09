import React, {useEffect, useRef, useState} from 'react';
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {
    txtDatesRange,
    txtInstructionsSearch,
    txtLodaing,
    txtMessageNoClients,
    txtSmsLoading,
    txtStartSearch,
    txtStartSearchButton
} from "../utils/Strings";
import Validations from "../utils/Validations";
import {dark_sea_green} from "../utils/Colors";
import ClienteService from "../service/ClienteService";

export default function SearchDialog({payload, setPayload, resume, loading, setLoading, setStartSearch, showDialog, setShowDialog}) {

    const [dates, setDates] = useState()
    const toast = useRef(null);

    useEffect(() => {
        getClients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const startSearch = async () => {
        setLoading(true);
        setStartSearch(true);
    };

    const confirmStartSearch = () => {
        if (resume.clientesTotales > 0 && payload.datos.length > 0) {
            setShowDialog(true);
        } else {
            showMessage(txtMessageNoClients);
        }
    };

    const showMessage = ({type, title, description}) => {
        toast.current.show({severity: type, summary: title, detail: description, sticky: true,});
    };

    const getClients = () => {
        setLoading(true)
        ClienteService.getAll()
            .then((resp) => setPayload({...payload, datos: resp.data}))
            .catch((err) => console.error(err)).finally(() => setLoading(false));
    };


    return (
        <>
            <Toast ref={toast}/>
            <div className="flex align-items-center">
                <Button label={txtStartSearchButton} icon="pi pi-search" className="p-button-lg bg-green-600"
                        onClick={confirmStartSearch} loading={loading}/>
            </div>
            <Dialog showHeader={false} visible={showDialog} draggable={false} closable={false} onHide={false}>
                <div className="grid">
                    <div className="col">
                        {loading ? (
                            <div className="col col-align-center">
                                <h1>{txtSmsLoading[0]}</h1>
                                <div>{txtLodaing}</div>
                                <ProgressBar mode="indeterminate" color={dark_sea_green} style={{height: "6px"}}/>
                            </div>
                        ) : (
                            <>
                                <h1>{txtStartSearch}</h1>
                                <p>{txtInstructionsSearch}</p>
                                <div className="text-center">
                                    <div className="field">
                                        <label htmlFor="rangeDates" className="block font-semibold">
                                            {txtDatesRange}
                                        </label>
                                        <Calendar id="rangeDates"
                                                  className='w-full'
                                                  selectionMode='range'
                                                  value={dates}
                                                  touchUI
                                                  numberOfMonths={2}
                                                  showIcon
                                                  dateFormat="dd/mm/yy"
                                                  disabled={payload.descargado}
                                                  onChange={(e) => {
                                                      if (e.value[0]) {
                                                          setPayload({
                                                              ...payload,
                                                              fechaInicio: Validations.convertAPIDate(e.value[0].toISOString())
                                                          })
                                                      }
                                                      if (e.value[1]) {
                                                          setPayload({
                                                              ...payload,
                                                              fechaFin: Validations.convertAPIDate(e.value[1].toISOString())
                                                          })
                                                      }
                                                      setDates(e.value)
                                                  }}
                                        />
                                    </div>
                                    <div className="field-checkbox">
                                        <Checkbox id='filesReady' inputId="filesReady" checked={payload.descargado}
                                                  onChange={(e) => setPayload({...payload, descargado: e.checked})}/>
                                        <label htmlFor="filesReady" className='font-semibold'>Ya cuento con los archivos
                                            descargados</label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button
                                        type="button"
                                        className="mr-2 p-button-danger"
                                        label="Cancelar"
                                        onClick={() => setShowDialog(false)}
                                    />
                                    <Button
                                        type="button"
                                        className="mr-2 p-button-success"
                                        label="Buscar"
                                        disabled={payload.fechaInicio === "" || payload.fechaFin === "" || !payload.fechaInicio || !payload.fechaFin}
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