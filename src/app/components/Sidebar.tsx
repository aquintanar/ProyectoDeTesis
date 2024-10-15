'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./Sidebaritem";

type Props = {
    className?:string;
}

export const Sidebar = ({className}:Props) =>{
    return(
        <div className= {cn(" flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",className)}>
            
            
            
            <Link href="/gestion">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/AIESEC_logo.png" height={145} width={145} alt="logo"/>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Paises" href="/GestionPaises" iconSrc="/Bandera.png"/>
                <SidebarItem label="Provincias" href="/GestionProvincias" iconSrc="/Provincia.png"/>
                <SidebarItem label="Ciudades" href="/GestionCiudades" iconSrc="/Ciudad.png"/>
                <SidebarItem label="Empresas" href="/GestionEmpresas" iconSrc="/Empresa.png"/>
                <SidebarItem label="Habilidades" href="/GestionHabilidades" iconSrc="/Habilidad.png"/>
                <SidebarItem label="Documentos" href="/GestionDocumentos" iconSrc="/Documento.png"/>
                <SidebarItem label="Proyectos" href="/GestionProyectos" iconSrc="/Proyecto.png"/>
                <SidebarItem label="Oportunidades" href="/GestionOportunidades" iconSrc="/Oportunidad.png"/>
                <SidebarItem label="Usuarios" href="/GestionUsuarios" iconSrc="/Usuario.png"/>
            </div>
            <div className="p-4">


            </div>
        </div>
    )
}

export default Sidebar;