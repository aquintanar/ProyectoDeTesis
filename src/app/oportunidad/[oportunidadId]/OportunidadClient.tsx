'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import { categories } from "@/app/components/navbar/Categories";
import Navbar from "@/app/components/navbar/Navbar";
import OpportunityApplication from "@/app/components/oportunidades/OpportunityApplication";
import OpportunityHead from "@/app/components/oportunidades/OpportunityHead";
import OpportunityInfo from "@/app/components/oportunidades/OpportunityInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import { SafeListings, safeReservation, SafeUser } from "@/app/types";
import { Listing, Opportunity, Province, Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";





const initialDateRange = {
    startDate: new Date(),
    endDate : new Date(),
    key:'selection'
}



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

interface OportunidadClientProps{
    oportunidad: Opportunity2
    currentUser?: SafeUser | null;
    status:String | null;
}
const OportunidadClient: React.FC<OportunidadClientProps>  = ({
    oportunidad,
    currentUser,
    status
}) =>{
    const router = useRouter();

   

    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice,setTotalPrice] = useState(oportunidad.price);
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);
    console.log(status)
    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
        }
        var data = {
            userId : currentUser?.id,
            opportunityId : oportunidad.id
        }
        console.log(data)
        setIsLoading(true);

        axios.post('/api/userXopportunity',data)
        .then(()=>{
            toast.success('Aplicacion exitosa');
            
            //Redirect to /trips
            router.refresh();
        })
        .catch((error)=>{
            toast.error('Error creating reservation');
        })
        .finally(()=>{
            setIsLoading(false);
        })
            
    },[totalPrice,dateRange,currentUser,oportunidad.id,currentUser]);

    

    return(
        <>
            <ToasterProvider/>
            <RentModal/>
            <LoginModal/>
            <RegisterModal/>
          
            <Navbar currentUser = { currentUser}/>
            <Container>
                <div className="max-w-screen-lg mx-auto
                pt-56
                ">
                    <div className="flex flex-col gap-6">
                        <OpportunityHead
                            title={oportunidad.name}
                            ImageSrc = {oportunidad.imageUrl}
                            id={oportunidad.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <OpportunityInfo
                            oportunidad={oportunidad}
                        />
                        <div
                            className="
                                order-first
                                mb-10 
                                md:order-last 
                                md:col-span-3     

                            "
                        >
                            <OpportunityApplication
                                price={oportunidad.price}
                                onSubmit={onCreateReservation}
                                disabled = {isLoading}
                               opportunity={oportunidad}
                                status={status ? status : null}
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}

export default OportunidadClient;