import React from "react";
import "../../assets/css/MyCustom.css";
import {txtAltLogoImg, txt404, txtPageNotFound, txtPageError,} from "../../utils/Strings";
import Logo from "../../assets/img/logo.jpg";

export default function ErrorPage() {
    return (
        <div className="p-d-flex p-ai-center p-jc-center pageerror">
            <div className="p-col-6">
                <div className="p-text-center">
                    <img src={Logo} alt={txtAltLogoImg} height="100px"/>
                    <div style={{fontSize: "8em", color: "#454545"}}>{txt404}</div>
                    <div style={{fontSize: "3em", color: "#454545"}}>{txtPageNotFound}</div>
                    <div style={{fontSize: "1.5em", color: "#454545"}}>{txtPageError}</div>
                </div>
            </div>
        </div>
    );
}
