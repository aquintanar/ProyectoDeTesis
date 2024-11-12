'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";

const Map = dynamic(()=>import('../Map'),{
    ssr:false

});

interface OpportunityInfoProps{
    description:string,
}
const OpportunityInfo:React.FC<OpportunityInfoProps>= ({
    description,
}) =>{
    const {getByValue} = useCountries();
   

    return(
        <div
            className="col-span-4 flex flex-col gap-8"
        >
            <div className="flex flex-col gap-2">
                <div className="text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                ">
                    <div>
                       
                    </div>
                   

                </div>
                <div className="flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                ">
                    <div>
                        {} guests
                    </div>
                    <div>
                        {} rooms
                    </div>
                    <div>
                        {} bathrooms
                    </div>

                </div>
            </div>
            <hr/>
           
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
           
        </div>
    )
}

export default OpportunityInfo;