import React,{useEffect} from "react";
import useActive from '../CustomHooks/useActive'
import MenuTop from "../organisms/MenuTop";
import ClientsTemplate from '../templates/ClientsTemplate'

export default function ClientsPage() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useActive()
}, [])
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
