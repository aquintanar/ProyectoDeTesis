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
import useFeedbackModal from "@/app/hooks/useFeedbackModal";
import useRentModal from "@/app/hooks/useRentModal";

interface OpportunityCardProps{
    data:Opportunity;
    //reservation?:Reservation
    //onAction?:(id:string)=>void;
    //disabled?: boolean;
    //actionLabel?:string;
    //actionId?:string;
    boton:boolean;
    currentUser?:SafeUser | null;
}

const OpportunityCard : React.FC<OpportunityCardProps> = ({
    data,
    //reservation,
    //onAction,
    //disabled,
    //actionLabel,
    //actionId ='',
    boton,
    currentUser
}) =>{
    const router = useRouter();
    const {getByValue} = useCountries();    
    const feedModal = useRentModal();

    const onFeed = useCallback(()=>{
        
        feedModal.onOpen();
    },[currentUser,feedModal])

    return(
        <>
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
                

            </div>
            
        </div>

        {boton &&(
                    <Button
                        disabled={false}
                        small
                        label={"Retroalimentacion"}
                        onClick={onFeed}
                    />
                )}
        </>
    )



}

export default OpportunityCard