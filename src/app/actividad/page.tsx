'use client'

import { useRouter } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";



export default  function Actividad(){

    const router = useRouter();
   
    return(
        <div className="flex flex items-center h-full justify-center relative h-full w-full bg-[url('/LoginBackground.jpg')] bg-no-repeat bg-center bg-fixed bg-cover "> 
            <div className="bg-black w-full h-full lg:bg-opacity-10">
            <nav className="px-12 py-5">
                    <img src='/AIESEC_logo.png' alt="Logo" className="h-12"/>
            </nav>
            
            <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-6xl text-[#037EF3] text-center">Que quieres hacer?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={()=>router.push('/gestion')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                                w-44
                                h-44
                                rounded-md
                                flex
                                items-center
                                justify-center
                                border-2
                                border-transparent
                                group-hover:cursor-pointer
                                group-hover:border-black
                                overflow-hidden
                            
                            ">
                                <img src="/Tuerca.jpg" alt="Gestionar Oportunidades"/>
                               

                            </div>
                            <div className="
                                    mt-4
                                    text-gray-400
                                    text-2xl
                                    text-center
                                    group-hover:text-black
                                
                                ">
                                    Gestionar Oportunidades
                                </div>
                        </div>

        
                    </div>
                    <div onClick={()=>router.push('/oportunidades')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                                w-44
                                h-44
                                rounded-md
                                flex
                                items-center
                                justify-center
                                border-2
                                border-transparent
                                group-hover:cursor-pointer
                                group-hover:border-black
                                overflow-hidden
                            
                            ">
                                <img src="/Lupa.jpg" alt="Gestionar Oportunidades"/>
                               

                            </div>
                            <div className="
                                    mt-4
                                    text-gray-400
                                    text-2xl
                                    text-center
                                    group-hover:text-black
                                
                                ">
                                    Visualizar Oportunidades
                                </div>
                        </div>

        
                    </div>

                </div>
            </div>
            </div>
        </div>
    )
}
