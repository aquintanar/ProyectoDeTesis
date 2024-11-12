import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import { SafeListings, SafeUser } from "@/app/types";
import getOportunidadById from "@/app/actions/getOportunidadById";
import OportunidadClient from "./OportunidadClient";


interface IParams {
    oportunidadId?:string,

}

const OportunidadPage = async({params}:{params:IParams}) =>{
    const oportunidad = await getOportunidadById(params) 
    const currentUser = await getCurrentUser();

    
    

    
    if (!oportunidad) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            
            <OportunidadClient
                oportunidad={oportunidad}
                
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default OportunidadPage