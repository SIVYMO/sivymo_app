import React from "react";
import HomeTemplate from "../templates/HomeTemplate";
import MenuTop from "../organisms/MenuTop";

export default function HomePage() {
    return (
        <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <HomeTemplate />
                </div>
            </div>
        </>
    );
}
