'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import Image from "next/image";

const Map = dynamic(()=>import('../Map'),{
    ssr:false

});



interface Project {
    id: string;
    name: string;
    ods: string;
    description: string;
    imageUrl: string;
    status: string | null;
}
interface Company {
    id: string;
    name: string;
    sector: string;
    identification_type: string;
    identification_number: string;
    type_of_company: string;
    description: string;
    imageUrl: string;
    webSite: string;
    status: string | null;
}
interface City {
    id: string;
    name: string;
    province_id: string;
    description: string;
    status: string | null;
    imageUrl: string;
}
interface Opportunity2 {
    id: string;
    name: string;
    type_opportunity: string;
    proyect_id: string;
    company_id: string;
    city_id: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    acivities: string;
    price: number;
    payment: number;
    english_level: string;
    status: string | null;
    imageUrl: string;
    proyect: Project;
    company: Company;
    city: City;
}


interface OpportunityInfoProps{
    oportunidad:Opportunity2,
}
const OpportunityInfo:React.FC<OpportunityInfoProps>= ({
    oportunidad,
}) =>{
    const {getByValue} = useCountries();
   

    return(
        <div
            className="col-span-4 flex flex-col gap-8"
        >
            <div className="flex flex-col gap-2">
                <div className="text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                ">
                    <div>
                       
                    </div>
                   

                </div>
                <div className="flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                ">
        
                    <div>
                        {oportunidad.type_opportunity}
                    </div>

                </div>
            </div>
            <h1>Remuneracion : {oportunidad.payment} al mes </h1>
            
            <hr/>
            <h1>Actividades </h1>
            <p>{oportunidad.start_time} - {oportunidad.end_time}</p>
            
            <p>{oportunidad.acivities}</p>
             <h1>Actividades </h1>
            <p>{oportunidad.start_time} - {oportunidad.end_time}</p>
           
            <hr/>
            <h1>Proyecto : {oportunidad.proyect.name}</h1>
            <p>{oportunidad.proyect.description}</p>
            <div className="flex flex-col items-center">
                <Image
                    alt="Image"
                    src={oportunidad.proyect.imageUrl}
                    width={300}
                    height={300}
                    className=""
                />
            </div>
            <p>Objetivo de Desarrollo Sostenible : {oportunidad.proyect.ods}</p>
           

            <hr/>
            <h1>Compañía : {oportunidad.company.name}</h1>
            <p>{oportunidad.company.description}</p>
            <div className="flex flex-col items-center">
                <Image
                    alt="Image"
                    src={oportunidad.company.imageUrl}
                    width={300}
                    height={300}
                    className=""
                />
            </div>
            
           
           
            <hr/>
            <h1>Ciudad : {oportunidad.city.name}</h1>
            <p>{oportunidad.city.description}</p>
            <div className="flex flex-col items-center">
                <Image
                    alt="Image"
                    src={oportunidad.city.imageUrl}
                    width={300}
                    height={300}
                    className=""
                />
            </div>
            <hr/>
            
            <hr/>
            <h1>Ciudad : {oportunidad.city.name}</h1>
            <p>{oportunidad.city.description}</p>
            <div className="flex flex-col items-center">
                <Image
                    alt="Image"
                    src={oportunidad.city.imageUrl}
                    width={300}
                    height={300}
                    className=""
                />
            </div>

            
            


            <div className="text-lg font-light text-neutral-500">
                {}
            </div>
            <hr/>
           
        </div>
    )
}

export default OpportunityInfo;