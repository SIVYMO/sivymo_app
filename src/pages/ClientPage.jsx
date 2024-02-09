import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import ClienteService from "../service/ClienteService";
import HistorialService from "../service/HistorialService";
import { BreadCrumb } from "primereact/breadcrumb";
import {
  txtSmsLoading,
  txtMessageErrorGeneral,
  txtMessageClientsSaved,
  txtTitleClients,
  txtLastUpdateClients,
} from "../utils/Strings";
import moment from "moment";
import "moment/locale/es";
import { Button } from "primereact/button";
import {getHistory} from "../utils/LocalStorage";

moment.locale("es");

export default function ClientPage() {
  const [resume, setResume] = useState({});
  const [allClients, setAllClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [allClientsText, setAllClientsText] = useState("");
  const [clientsText, setClientsText] = useState("");

  const toast = useRef(null);

  useEffect(() => {
    getResume();
  }, []);

  const getResume = () => {
    setResume(getHistory());
  };

  const clearAndFilterData = async (data = []) => {
    let newData = [];
    for await (let item of data) {
      item = item.trim();
      if (item.length > 2) newData.push(item);
    }
    return newData;
  };

  const saveAllClients = async () => {
    showMessageloading();
    const data = await clearAndFilterData(allClients);
    const middleBig1 = data.splice(0, data.length / 2);
    const middleTiny1 = middleBig1.splice(0, middleBig1.length / 2);
    const middleTiny2 = middleBig1.splice(0, middleBig1.length);
    const middleBig2 = data.splice(0, data.length);
    const middleTiny3 = middleBig2.splice(0, middleBig2.length / 2);
    const middleTiny4 = middleBig2.splice(0, middleBig2.length);
    ClienteService.insertAll(middleTiny1)
      .then((res) => {
        if (res.data) {
          Promise.all([
            ClienteService.insertOne(middleTiny2),
            ClienteService.insertOne(middleTiny3),
            ClienteService.insertOne(middleTiny4),
          ])
            .then((res) => {
              if (res[0].data && res[1].data && res[2].data) {
                clearMessageLoading();
                saveHistory();
                clearAllClients();
                showMessage(txtMessageClientsSaved);
              } else showMessage(txtMessageErrorGeneral);
            })
            .catch((err) => {
              clearMessageLoading();
              console.error(err);
              showMessage(txtMessageErrorGeneral);
            });
        } else showMessage(txtMessageErrorGeneral);
      })
      .catch((err) => {
        clearMessageLoading();
        console.error(err);
        showMessage(txtMessageErrorGeneral);
      });
  };

  const saveClients = async () => {
    showMessageloading();
    const data = await clearAndFilterData(clients);
    ClienteService.insertOne(data)
      .then((response) => {
        clearMessageLoading();
        if (response) {
          saveHistory();
          clearClients();
          showMessage(txtMessageClientsSaved);
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

  const clearAllClients = () => {
    setAllClients([]);
    setAllClientsText("");
    showMessage({
      type: "info",
      title: "Se han limpiado todos expedientes",
      description: "Limpiado",
    });
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
        <div className="p-flex p-flex-column" style={{ flex: "1" }}>
          <div className="text-center">
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

  const saveHistory = () => {
    HistorialService.insertOne(3);
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
      <div className="grid">
        <div className="col p-3">
          <h1>{txtTitleClients}</h1>
          <div>
            {txtLastUpdateClients}
            {moment(resume.ultimaModificacionClientes).format("LLLL")}
          </div>
          <div className="grid p-mt-3">
            <div className="col-12 p-sm-6">
              <div className="grid">
                <div className="col-12 p-sm-8">
                  <h2>
                    Guardar todos los expedientes :{" "}
                    <span>{allClients.length}</span>
                  </h2>
                </div>
                <div className="col-12 p-sm-4 p-mt-0 p-mt-sm-2">
                  <Button
                    type="button"
                    icon="pi pi-times"
                    label="Limpiar"
                    className="p-button-info p-mr-1"
                    onClick={clearAllClients}
                    disabled={allClients.length <= 0}
                  />
                  <Button
                    type="button"
                    icon="pi pi-save"
                    label="Guardar"
                    className="p-button-success"
                    onClick={saveAllClients}
                    disabled={allClients.length <= 0}
                  />
                </div>
              </div>
              <InputTextarea
                value={allClientsText}
                rows={20}
                autoResize
                style={{ width: "100%" }}
                onChange={(e) => {
                  setAllClientsText(e.target.value);
                  setAllClients(e.target.value.split("\n"));
                }}
              />
            </div>
            <div className="col-12 p-sm-6">
              <div className="grid">
                <div className="col">
                  <h2>
                    Añadir más expedientes : <span>{clients.length}</span>
                  </h2>
                </div>
                <div className="col-12 p-sm-4 p-mt-0 p-mt-sm-2">
                  <Button
                    type="button"
                    icon="pi pi-times"
                    label="Limpiar"
                    className="p-button-info p-mr-1"
                    onClick={clearClients}
                    disabled={clients.length <= 0}
                  />
                  <Button
                    type="button"
                    icon="pi pi-save"
                    label="Guardar"
                    className="p-button-warning"
                    onClick={saveClients}
                    disabled={clients.length <= 0}
                  />
                </div>
              </div>
              <InputTextarea
                value={clientsText}
                rows={20}
                autoResize
                style={{ width: "100%" }}
                onChange={(e) => {
                  setClientsText(e.target.value);
                  setClients(e.target.value.split("\n"));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
