'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import {  Province } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";

import Button from "@/app/components/Button";

interface ProvinceCardProps{
    data:Province;
}

const ProvinceCard : React.FC<ProvinceCardProps> = ({
    data,
}) =>{
    const router = useRouter();
    const {getByValue} = useCountries();





    return(
        
        <div

            onClick={()=>router.push(`/listings/${data.id}`)}

            className="col-span-1
            
                cursor-pointer
                group
            "
        >
            <div
                className="flex flex-col
                gap-2
                w-full

                
                "
            >
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    
                    "
                
                >
                    <Image
                        fill
                        alt="Liting"
                        src={data.imageUrl}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        
                        "
                    
                    />
                    


                </div>
                <div className="
                    font-semibold text-lg

                ">
                    {data.name}

                </div>
                <div className=" font-light text-neutral-500">
                    {data.name}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        
                    </div>
                    
                    
                </div>
                

            </div>
            
        </div>
    )



}

export default ProvinceCard