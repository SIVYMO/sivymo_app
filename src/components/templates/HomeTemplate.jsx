import React from "react";
import "../../assets/css/MyCustom.css";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import {
    backgroundWallpaper,
    txtWelcome,
    txtLastQueryPatent,
    txtLastQueryBrand,
    txtLastQueryEjemplares,
    txtLastUpdateClients,
} from "../../utils/Strings";
export default function HomeTemplate() {
    return (
        <div>
            <div className="p-grid">
                <div className="p-col">
                    <img
                        src="https://images.unsplash.com/photo-1525498128493-380d1990a112"
                        alt={backgroundWallpaper}
                        style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-xl-6">
                    <h1>
                        {txtWelcome} <i>default_name</i>
                    </h1>
                </div>
                <div className="p-col-12 p-md-6 p-xl-6">
                    <h1>
                        <Badge
                            value="Existen 500 clientes guardados en la nube"
                            size="xlarge"
                            severity="success"
                        />
                    </h1>
                </div>
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-file"
                    last_search_info={txtLastQueryPatent}
                    last_date="2021-05-15"
                />
                <LastDateCategory
                    icon="pi pi-globe"
                    last_search_info={txtLastQueryBrand}
                    last_date="2021-05-15"
                />
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-copy"
                    last_search_info={txtLastQueryEjemplares}
                    last_date="2021-05-15"
                />
                <LastDateCategory
                    icon="pi pi-id-card"
                    last_search_info={txtLastUpdateClients}
                    last_date="2021-05-15"
                />
            </div>
        </div>
    );

    function LastDateCategory({ icon, last_search_info, last_date }) {
        return (
            <div className="p-col-12 p-md-6 p-xl-6">
                <div className="p-grid">
                    <div>
                        <Avatar icon={icon} className="p-mr-2" size="xlarge" />
                    </div>
                    <div className="p-col">
                        <div
                            style={{ fontSize: "1.2em", fontWeight: "lighter" }}
                        >
                            {last_search_info}
                        </div>
                        <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                            {last_date}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
