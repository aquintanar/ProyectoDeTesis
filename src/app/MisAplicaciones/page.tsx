import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getReservations from "../actions/getReservations";
import getAplicaciones from "../actions/getAplicaciones";
import AplicacionesClient from "./AplicacionesClient";
import ToasterProvider from "../providers/ToasterProvider";
import RentModal from "../components/modals/RentModal";
import Navbar from "../components/navbar/Navbar";


const MisAplicaciones = async ()=>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                />
            </ClientOnly>
        );
    }

    const aplicaciones = await getAplicaciones({userId:currentUser.id});
    console.log("ESTOY ACA")
    console.log(aplicaciones);
    if(aplicaciones.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
             <ToasterProvider/>
          <RentModal />
          
         
        
          
          <Navbar currentUser = { currentUser}/>
          
        <AplicacionesClient
                aplicaciones={aplicaciones}
                currentUser={currentUser}
        />
        </ClientOnly>
    )

}

export default MisAplicaciones;