import React from 'react'
import SpecimensTemplate from '../templates/SpecimensTemplate';
import MenuTop from "../organisms/MenuTop";
export default function SpecimensPage() {
     return (
          <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <SpecimensTemplate />
                </div>
            </div>
        </>
     )
}
