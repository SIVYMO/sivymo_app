import React, { useEffect } from "react";
import useActive from "../CustomHooks/useActive";
import SpecimensTemplate from "../templates/SpecimensTemplate";
import MenuTop from "../organisms/MenuTop";

export default function SpecimensPage() {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useActive();
    }, []);
    return (
        <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <SpecimensTemplate />
                </div>
            </div>
        </>
    );
}
