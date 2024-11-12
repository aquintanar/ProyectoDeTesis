'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Opportunity, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface OpportunityCardProps{
    data:Opportunity;
    //reservation?:Reservation
    //onAction?:(id:string)=>void;
    //disabled?: boolean;
    //actionLabel?:string;
    //actionId?:string;
    currentUser?:SafeUser | null;
}

const OpportunityCard : React.FC<OpportunityCardProps> = ({
    data,
    //reservation,
    //onAction,
    //disabled,
    //actionLabel,
    //actionId ='',
    currentUser
}) =>{
    const router = useRouter();
    const {getByValue} = useCountries();
    
    return(
        
        <div

            onClick={()=>router.push(`/oportunidad/${data.id}`)}

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
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId = {data.id}
                            currentUser={currentUser}
                        
                        />

                    </div>


                </div>
                <div className="
                    font-semibold text-lg

                ">
                    {data.name}

                </div>
                <div className=" font-light text-neutral-500">
                    {data.description}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {data.price}
                    </div>
                    {data.type_opportunity}
                    
                </div>
                {/*onAction && actionLabel &&(
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )*/}

            </div>
            
        </div>
    )



}

export default OpportunityCard