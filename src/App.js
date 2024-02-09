import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import {locale, addLocale} from "primereact/api";
import {localLocation} from "./utils/Strings";
import {createHashRouter, RouterProvider,} from "react-router-dom";
import { isUserActive, isUserInactive } from "./utils/LocalStorage";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import {MODULES} from "./utils/Modules";

addLocale("es", localLocation);
locale("es");

export default function App() {

    const validateIsLogIn = () => {
        if (isUserInactive()) throw new Response("Not Found", {status: 404});
        else return true;
    }

    const validateIsLogOut = () => {
        if (isUserActive()) throw new Response("Not Found", {status: 404});
        else return true;
    }

    const ROUTER = createHashRouter([
        {
            path: "/inicio-sesion",
            element: <Login/>,
            errorElement: <Header/>,
            loader: validateIsLogOut,
        },
        {
            path: "/",
            element: <Header/>,
            errorElement: <Login/>,
            loader: validateIsLogIn,
            children: MODULES
        },
        {
            path: "*",
            element: <ErrorPage/>,
        },
    ]);

    return <RouterProvider router={ROUTER}/>;
}
