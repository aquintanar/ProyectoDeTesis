'use client'

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineHealthAndSafety, MdOutlineSell, MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaChalkboardTeacher, FaFootballBall, FaLanguage, FaLaptopCode, FaPaintBrush, FaRegMoneyBillAlt, FaTransgender } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { RiPlantFill } from "react-icons/ri";
import { BiMath } from "react-icons/bi";
export const categories = [
    {
        label:'Tecnologia',
        icon: FaLaptopCode,
        description:'This property is close to the beach!'
    },
    {
        label:'Marketing',
        icon: MdOutlineSell,
        description:'This property has windmills!'
    },
    {
        label:'Finanzas',
        icon: FaRegMoneyBillAlt,
        description:'This property is modern!'
    },
    {
        label:'Negocios',
        icon: IoIosBusiness,
        description:'This property is modern!'
    }
    ,
    {
        label:'Educacion',
        icon:  FaChalkboardTeacher,
        description:'This property is modern!'
    }
    ,
    {
        label:'Salud',
        icon: MdOutlineHealthAndSafety,
        description:'This property is modern!'
    }
    ,
    {
        label:'Igualdad',
        icon: FaTransgender,
        description:'This property is modern!'
    }
    ,
    {
        label:'Ambiental',
        icon: RiPlantFill,
        description:'This property is modern!'
    }
    ,
    {
        label:'Idiomas',
        icon: FaLanguage,
        description:'This property is modern!'
    }
    ,
    {
        label:'Numeros',
        icon: BiMath,
        description:'This property is modern!'
    }
    ,
    {
        label:'Arte',
        icon: FaPaintBrush,
        description:'This property is modern!'
    }
    ,
    {
        label:'Deporte',
        icon: FaFootballBall,
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