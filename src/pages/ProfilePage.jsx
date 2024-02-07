import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import PersonalData from "../components/PersonalData";
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
            <BreadCrumb
                model={[{ label: txtTitleProfile }]}
                home={{ icon: "pi pi-home" }}
            />
            <div className="p-grid">
                <div className="p-col">
                    <TabView>
                        <TabPanel
                            header={txtTabPersonalData}
                            leftIcon="pi pi-fw pi-user"
                        >
                            <PersonalData />
                        </TabPanel>
                        {userInfo.superAdmin ? (
                            <TabPanel
                                header={txtTabUserTable}
                                leftIcon="pi pi-fw pi-pencil"
                            >
                                <CrudUsers />
                            </TabPanel>
                        ) : (
                            <div className="disable"></div>
                        )}
                    </TabView>
                </div>
            </div>
        </>
    );
}
