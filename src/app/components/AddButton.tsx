'use client'


import { FaPlus, FaSave } from "react-icons/fa";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

interface AddButtonProps {
    label?:string;
    href:string;
}

const AddButton:React.FC<AddButtonProps> = ({
    label,
    href 
}) => {

    const router = useRouter();
    return (
        <div className="fixed bottom-20 right-20  justify-end">
            
            <button onClick={()=>router.push(href)} className="sticky  bg-[#037EF3] py-3 px-6 text-white rounded-md w-auto mt-10 hover:bg-[#55A4EE] transition flex items-center"
            > 
                <FaPlus className="mr-2"/>
                {label}
                  
            </button>
            
        </div>
    )
}

export default AddButton;