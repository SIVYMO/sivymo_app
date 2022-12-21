import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import React from "react";
import { locale, addLocale } from "primereact/api";
import { localLocation } from "./utils/Strings";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import HomePage from "./components/pages/HomePage";
import PatentPage from "./components/pages/PatentPage";
import BrandPage from "./components/pages/BrandPage";
import InformationPage from "./components/pages/ClientsPage";
import ProfilePage from "./components/pages/ProfilePage";
import ErrorPage from "./components/pages/ErrorPage";
addLocale("es", localLocation);
locale("es");

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/sivymo_app/" exact component={Login} />
                <Route path="/sivymo_app/inicio" component={HomePage} />
                <Route path="/sivymo_app/patentes" component={PatentPage} />
                <Route path="/sivymo_app/marcas" component={BrandPage} />
                <Route path="/sivymo_app/expedientes" component={InformationPage} />
                <Route path="/sivymo_app/perfil" component={ProfilePage} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    );
}
