'use client'

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

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