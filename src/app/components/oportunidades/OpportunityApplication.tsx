'use client'
import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';


interface Project {
    id: string;
    name: string;
    ods: string;
    description: string;
    imageUrl: string;
    status: string | null;
}
interface Company {
    id: string;
    name: string;
    sector: string;
    identification_type: string;
    identification_number: string;
    type_of_company: string;
    description: string;
    imageUrl: string;
    webSite: string;
    status: string | null;
}
interface City {
    id: string;
    name: string;
    province_id: string;
    description: string;
    status: string | null;
    imageUrl: string;
}
interface Opportunity2 {
    id: string;
    name: string;
    type_opportunity: string;
    proyect_id: string;
    company_id: string;
    city_id: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    acivities: string;
    price: number;
    payment: number;
    english_level: string;
    status: string | null;
    imageUrl: string;
    proyect: Project;
    company: Company;
    city: City;
}

interface OpportunityApplicationProps{
    price:number,
    onSubmit:()=>void;
    disabled:boolean;
    opportunity:Opportunity2;
    status:String | null;
 
}


const OpportunityApplication:React.FC<OpportunityApplicationProps> =({
    price,  
    onSubmit,
    disabled,
    opportunity,
    status

}) => {
    return (
        <div
            className='
                bg-white 
                rounded-xl    
                border-[1px]
                border-neutral-200  
                overflow-hidden    

            
            '
        >
            <div className='
                flex flex-row items-center gap-1 p-4   
            '>
                <div className='text-2xl font-semibold'>
                    S/.{price} Soles
                </div>
                
            </div>
            <hr/>
            <div className='
                flex flex-row items-center gap-1 p-4   
            '>
                    Fecha de Inicio : {opportunity.start_date}   
            </div>
            <div className='
                flex flex-row items-center gap-1 p-4   
            '>
                    Fecha de Fin : {opportunity.end_date} 
            </div>
            <hr/>
            <hr/>
            {(status === null || status===undefined) &&  <div className='p-4'>
                <Button
                    disabled={disabled}
                    label='Aplicar'
                    onClick={onSubmit}
                />

            </div>}
            {status !== null &&  status!==undefined && <div className='p-4'>
                <Button
                    disabled= {true}
                    label={status.toString()}
                    onClick={onSubmit}
                />

            </div>}
            
            
            
        </div>
    )
}

export default OpportunityApplication