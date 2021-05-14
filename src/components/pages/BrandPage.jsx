import React from "react";
import BrandTemplate from "../templates/BrandTemplate";
import MenuTop from "../organisms/MenuTop";

export default function BrandPage() {
    return (
        <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <BrandTemplate />
                </div>
            </div>
        </>
    );
}
