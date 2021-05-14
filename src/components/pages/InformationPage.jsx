import React from 'react'
import MenuTop from "../organisms/MenuTop";
import InformationTemplate from '../templates/InformationTemplate'

export default function InformationPage() {
     return (
          <>
              <MenuTop/>
              <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <InformationTemplate />
                </div>
            </div> 
          </>
     )
}
