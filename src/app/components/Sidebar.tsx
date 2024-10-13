import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./Sidebaritem";

type Props = {
    className?:string;
}

export const Sidebar = ({className}:Props) =>{
    return(
        <div className= {cn(" flex bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",className)}>
            
            
            
            <Link href="/gestion">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/AIESEC_logo.png" height={40} width={40} alt="logo"/>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="learn"/>

            </div>
        </div>
    )
}

export default Sidebar;