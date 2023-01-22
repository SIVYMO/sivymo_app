import React from "react";
import MenuTop from "../organisms/MenuTop";
import ClientsTemplate from '../templates/ClientsTemplate'
import {useHistory} from "react-router-dom";

export default function ClientsPage() {
    const history = useHistory();
    if (localStorage.getItem("userActive") === null) history.push("/");
     return (
          <>
              <MenuTop/>
              <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <ClientsTemplate />
                </div>
            </div>
          </>
     )
}
