import React from "react";
import HomeTemplate from "../templates/HomeTemplate";
import MenuTop from "../organisms/MenuTop";
import {useHistory} from "react-router-dom";

export default function HomePage() {
    const history = useHistory();
    if (localStorage.getItem("userActive") === null) history.push("/");
    return (
        <>
            <MenuTop/>
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1"><HomeTemplate/></div>
            </div>
        </>
    );
}
