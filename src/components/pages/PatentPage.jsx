import React,{useEffect} from "react";
import useActive from '../CustomHooks/useActive'
import PatentTemplate from "../templates/PatentTemplate";
import MenuTop from "../organisms/MenuTop";

export default function PatentPage() {
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useActive()
    }, [])
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
