'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

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



interface OpportintyHeadProps{
    title:string,
    ImageSrc : string,
    id:string,
    currentUser?:SafeUser | null
}

const OpportunityHead : React.FC<OpportintyHeadProps> = ({
    title,
    ImageSrc,
    id,
    currentUser
}) =>{
    const {getByValue} = useCountries();

  
    return(
        <>
            <Heading
                title={title}
            
            />
            <div
             className="
                w-full
                h-[60vh]
                overflow-hidden
                rounded-xl
                relative
             "
            >
                <Image
                    alt="Image"
                    src={ImageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}

                    />
                </div>
            </div>
        </>

    )
}
export default OpportunityHead;