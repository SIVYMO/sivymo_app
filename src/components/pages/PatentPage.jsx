import React from "react";
import PatentTemplate from "../templates/PatentTemplate";
import MenuTop from "../organisms/MenuTop";

export default function PatentPage() {
    return (
        <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <PatentTemplate />
                </div>
            </div>
        </>
    );
}
