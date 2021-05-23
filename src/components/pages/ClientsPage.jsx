import React from 'react'
import MenuTop from "../organisms/MenuTop";
import ClientsTemplate from '../templates/ClientsTemplate'

export default function ClientsPage() {
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
