import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import { SafeListings, SafeUser } from "@/app/types";
import getOportunidadById from "@/app/actions/getOportunidadById";
import OportunidadClient from "./OportunidadClient";
import getStatusOportunidadXUser from "@/app/actions/getStatusOportunidadXUser";


interface IParams {
    oportunidadId?:string,

}

const OportunidadPage = async({params}:{params:IParams}) =>{
    const oportunidad = await getOportunidadById(params);
    const currentUser = await getCurrentUser();
    let status = null;
    if (oportunidad && currentUser) {
        status = await getStatusOportunidadXUser(oportunidad, currentUser);
    }

    if (oportunidad && oportunidad.proyect_id === null) {
        oportunidad.proyect_id = '';
    } else if (oportunidad && typeof oportunidad.proyect_id !== 'string') {
        oportunidad.proyect_id = String(oportunidad.proyect_id);
    }
    

    console.log(status);

    

    
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
                status={status ? status[0]?.status : null}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default OportunidadPage