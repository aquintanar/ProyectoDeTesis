'use client'

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label:'Tecnologia',
        icon: TbBeach,
        description:'This property is close to the beach!'
    },
    {
        label:'Marketing',
        icon: GiWindmill,
        description:'This property has windmills!'
    },
    {
        label:'Finanzas',
        icon: MdOutlineVilla,
        description:'This property is modern!'
    },
    {
        label:'Negocios',
        icon: TbMountain,
        description:'This property is modern!'
    }
    ,
    {
        label:'Educacion',
        icon: TbPool,
        description:'This property is modern!'
    }
    ,
    {
        label:'Salud',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Igualdad',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Ambiental',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Idiomas',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Numeros',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Arte',
        icon: GiIsland,
        description:'This property is modern!'
    }
    ,
    {
        label:'Deporte',
        icon: GiIsland,
        description:'This property is modern!'
    }
    

]

const Categories = () =>{
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname ==='/oportunidades'
    

    return(
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category===item.label}
                        icon ={item.icon}

                    
                    />
                ))}

            </div>
        </Container>

    )
}
export default Categories;