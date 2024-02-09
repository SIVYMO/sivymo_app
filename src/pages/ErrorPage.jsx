import {txtAltLogoImg, txt404, txtPageNotFound,} from "../utils/Strings";
import Logo from "../assets/img/logo.jpg";
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex align-items-center justify-content-center">
            <div className="">
                <div className="text-center text-gray-600">
                    <Image src={Logo} alt={txtAltLogoImg} height="100px"/>
                    <div className='text-8xl font-semibold'>{txt404}</div>
                    <div className='text-5xl'>{txtPageNotFound}</div>
                    <Button label="Ir al inicio" icon='pi pi-home' className='my-2 bg-green-600' onClick={() => navigate('/')}/>
                </div>
            </div>
        </div>
    );
}
