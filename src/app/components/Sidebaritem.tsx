'use client';

import { Button } from "@/components/ui/button";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";
import path from "path";

type Props = {
    label:string,
    iconSrc : string,
    href: string,
}
export const SidebarItem= ({
    label,
    iconSrc,
    href

}: Props)=>{
    const pathname = usePathname()
    var active =  pathname === href
    if(pathname === href+'/AgregarPais' ){
        active = true
    }
    return(
        <Button
            variant={active ? 'sidebarOutline' : 'sidebar'}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image 
                    src={iconSrc}
                    alt={label}
                    className="mr-5"
                    height={32}
                    width={32}
                
                />
                {label}
            </Link>
        </Button>
    )
}

export default SidebarItem;