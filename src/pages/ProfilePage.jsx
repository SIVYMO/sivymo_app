import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import Perfil from "../components/Perfil";
import CrudUsers from "../components/CrudUsers";
import {
    txtTitleProfile,
    txtTabPersonalData,
    txtTabUserTable,
} from "../utils/Strings";

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({
        superAdmin: false,
    });

    useEffect(() => {
         getPersonalInformation();
    }, []);

    function getPersonalInformation() {
        setUserInfo(JSON.parse(localStorage.getItem("userActive")));
    }

    return (
        <>
            <BreadCrumb model={[{ label: txtTitleProfile }]} home={{ icon: "pi pi-home" }}/>
            <div className="grid">
                <div className="col">
                    <TabView>
                        <TabPanel header={txtTabPersonalData} leftIcon="pi pi-fw pi-user">
                            <Perfil />
                        </TabPanel>
                        {userInfo.superAdmin ? (
                            <TabPanel header={txtTabUserTable} leftIcon="pi pi-fw pi-pencil">
                                <CrudUsers />
                            </TabPanel>) : (<div className="disable"></div>)}
                    </TabView>
                </div>
            </div>
        </>
    );
}
