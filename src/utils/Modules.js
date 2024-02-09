import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import PatentPage from "../pages/PatentPage";
import BrandPage from "../pages/BrandPage";
import ClientPage from "../pages/ClientPage";
import ProfilePage from "../pages/ProfilePage";

export const MODULES = [
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <Login/>,
    },
    {
        path: "/patentes",
        element: <PatentPage/>,
        errorElement: <Login/>,
    },
    {
        path: "/marcas",
        element: <BrandPage/>,
        errorElement: <Login/>,
    },
    {
        path: "/expedientes",
        element: <ClientPage/>,
        errorElement: <Login/>,
    },
    {
        path: "/perfil",
        element: <ProfilePage/>,
        errorElement: <Login/>,
    },
]