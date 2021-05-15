import React from "react";
import "../../assets/css/MyCustom.css";
import { amazon } from "../../utils/Colors";

export default function HomeTemplate() {
    return (
        <div>
            <div className="p-grid">
                <div className="p-col">
                    <img
                        src="https://images.unsplash.com/photo-1583700934791-5a98c03a0489"
                        alt="Fondo de pantalla"
                        style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
            <div className="p-grid">
                <div className="p-col">
                    <h1>
                        Hola, bienvenido(a) de nuevo <i>default_name</i>
                    </h1>
                </div>
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-file"
                    last_search_info="Última busqueda de patentes:"
                    last_date="2021-05-15"
                />
                <LastDateCategory
                    icon="pi pi-globe"
                    last_search_info="Última busqueda de marcas:"
                    last_date="2021-05-15"
                />
            </div>
            <div className="p-grid p-mt-2">
                <LastDateCategory
                    icon="pi pi-copy"
                    last_search_info="Última busqueda de ejemplares extraordinarios:"
                    last_date="2021-05-15"
                />
                <LastDateCategory
                    icon="pi pi-id-card"
                    last_search_info="Última actualización en la información:"
                    last_date="2021-05-15"
                />
            </div>
        </div>
    );

    function LastDateCategory({ icon, last_search_info, last_date }) {
        return (
            <div className="p-col-12 p-md-6 p-xl-6">
                <div className="p-grid">
                    <div
                        className="p-col-2 p-text-center"
                        style={{
                            backgroundColor: amazon,
                            borderRadius: "8px",
                            padding: "15px",
                        }}
                    >
                        <i
                            className={icon}
                            style={{ fontSize: "3em", color: "white" }}
                        ></i>
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
