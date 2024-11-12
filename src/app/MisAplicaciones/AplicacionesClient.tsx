'use client';
import { Opportunity, User, UserxOpportunity } from "@prisma/client";
import Container from "../components/Container";
import { SafeUser } from "../types";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import OpportunityCard from "../components/oportunidades/OpportunityCard";

type aplicaciones = {
    id:string,
    status:string,
    opportunity:Opportunity,
    user:User,
}


interface AplicacionesClientProps{
    aplicaciones:aplicaciones[],
    currentUser?:SafeUser | null;
    oportunidades:Opportunity[],
    
}


const AplicacionesClient: React.FC<AplicacionesClientProps> = ({
    aplicaciones,
    currentUser,
    oportunidades,
}) => {

    const router = useRouter();
    const [retroalimentacion,setRetroalimentacion] = useState('');

    const onRetroalimentacion = useCallback((id:string)=>{
        setRetroalimentacion(id);

        //....
    },[])
    return(
        <>
        <Container>
            
                <div className="
                    pt-56
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                
                ">
                    
            <div>
            <Heading
                    title="Mis Aplicaciones"
                    subtitle="Aquí puedes ver todas tus aplicaciones"
                />
                
                    {aplicaciones.map((aplicacion)=>(
                        <OpportunityCard
                            key={aplicacion.opportunity.id}
                            data={aplicacion.opportunity}
                            currentUser={currentUser}
                            
                        />

                    ))}
                  

              
            </div>
            </div>
        </Container>
        </>
    )
}

export default AplicacionesClient;