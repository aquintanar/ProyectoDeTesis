'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?:string;
    subtitle?:string;
    showReset?:boolean;
}

const EmptyState : React.FC<EmptyStateProps> = ({
    title = "No se encontraron oportunidades",
    subtitle = " Intenta cambiando o eliminando algún filtro",
    showReset
}) =>{

    const router = useRouter();
    
    
    return(
    
    
    <div
        className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        "
    >
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
        <div className="
            w-48
            mt-4
        
        ">
            {showReset && (
                <Button
                    outline
                    label="Remover todos los filtros"
                    onClick={()=>router.push('/oportunidades')}
                
                />
            )}

        </div>
    </div>
    

)
}

export default EmptyState