import React from "react";
import PatentTemplate from "../templates/PatentTemplate";
import MenuTop from "../organisms/MenuTop";
import {useHistory} from "react-router-dom";

export default function PatentPage() {
    const history = useHistory();
    if (localStorage.getItem("userActive") === null) history.push("/");
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
