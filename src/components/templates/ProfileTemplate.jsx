import React from "react";
import { TabView, TabPanel } from "primereact/tabview";

import PersonalData from "../organisms/PersonalData";
import CrudUsers from "../organisms/CrudUsers";

export default function ProfileTemplate() {
    return (
        <div className="p-grid">
            <div className="p-col">
                <TabView>
                    <TabPanel header="Crud" leftIcon="pi pi-fw pi-pencil">
                        <CrudUsers />
                    </TabPanel>
                    <TabPanel
                        header="Datos personales"
                        leftIcon="pi pi-fw pi-user"
                    >
                        <PersonalData />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}
