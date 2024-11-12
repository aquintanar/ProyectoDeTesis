"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Ability, City, Company, Country, Opportunity, Province, Proyect } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form"

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";



import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import Heading from "@/app/components/Heading";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Select from 'react-select';
interface OpportunityFormProps{
    initialData:Opportunity  | null;
}

const opportunityTypeOptions = [
    {value:'Talento Global',label:'Talento Global'},
    {value:'Voluntario Global',label:'Voluntario Global'},
    {value:'Profesor Global',label:'Profesor Global'},
]
const englishLevelOptions = [
    {value:'Básico',label:'Básico'},
    {value:'Intermedio',label:'Intermedio'},
    {value:'Avanzado',label:'Avanzado'},
]


const formSchema = z.object({
   
    name:z.string().min(1),
    type_opportunity:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    proyect_id:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    company_id:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    city_id:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description:z.string().min(1),
    start_date:z.string().min(1),
    end_date:z.string().min(1),
    start_time:z.string().min(1),
    end_time:z.string().min(1),
    acivities:z.string().min(1),
    price:z.string().min(1),
    payment:z.string().min(1),
    english_level:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),

    imageUrl:z.string().min(1),

})


type OpportunityFormValues = z.infer<typeof formSchema>




export const OpportunityForm : React.FC<OpportunityFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [proyects, setProyects] = useState<Proyect[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);


    
    const title = initialData? 'Editar Oportunidad' : 'Agregar Oportunidad';
    const description = initialData? 'Edita una oportunidad ya existente' : 'Agrega una oportunidad a la lista';

    const toastMessage = initialData? 'Oportunidad editada con exito' : 'Oportunidad agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<OpportunityFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            type_opportunity: { value: initialData.type_opportunity, label: initialData.type_opportunity },
            proyect_id: { value: initialData.proyect_id, label: initialData.proyect_id },
            company_id: { value: initialData.company_id, label: initialData.company_id },
            city_id: { value: initialData.city_id, label: initialData.city_id },
            description: initialData.description,
            start_date: initialData.start_date,
            end_date: initialData.end_date,
            start_time: initialData.start_time,
            end_time: initialData.end_time,
            acivities: initialData.acivities,
            price: initialData.price.toString(),
            payment: initialData.payment.toString(),
            english_level: { value: initialData.english_level, label: initialData.english_level },
            imageUrl: initialData.imageUrl,
        } : {

            name:'',
            type_opportunity:{ value: '', label: '' },
            proyect_id:{ value: '', label: '' },
            company_id:{ value: '', label: '' },
            city_id:{ value: '', label: '' },
            description:'',
            start_date:'',
            end_date:'',
            start_time:'',
            end_time:'',
            acivities:'',
            price:'',
            payment:'',
            english_level:{ value: '', label: '' },
            imageUrl:'',
           
        }
    });
    var data2={
        name:'',
            type_opportunity:'',
            proyect:'',
            company:'',
            city:'',
            description:'',
            start_date:'',
            end_date:'',
            start_time:'',
            end_time:'',
            acivities:'',
            price:0,
            payment:0,
            english_level:'',
        
            imageUrl:'',
    }
 
    const onSubmit = async (data:OpportunityFormValues) => {
        
        data2.name = data.name;
        data2.type_opportunity = data.type_opportunity.value;
        data2.proyect = data.proyect_id.value;
        data2.company= data.company_id.value;
        data2.city = data.city_id.value;
        data2.description = data.description;
        data2.start_date = data.start_date;
        data2.end_date = data.end_date;
        data2.start_time = data.start_time;
        data2.end_time = data.end_time;
        data2.acivities = data.acivities;
        data2.price = parseInt(data.price);
        data2.payment = parseInt(data.payment);
        data2.english_level = data.english_level.value;
        data2.imageUrl = data.imageUrl;
        

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/opportunities/${params?.oportunidadId}`,);    
            }
            else{
                
                const payload = {...data2,
                    proyect:{
                        connect:{id:data.proyect_id.value}
                    }
                    ,company:{
                        connect:{id:data.company_id.value}
                    },
                    city:{
                        connect:{id:data.city_id.value}
                    }            
                };
                   
                await axios.post(`/api/opportunities`,payload);    
           
            }
            
            router.refresh()
            
            toast.success(toastMessage);
            setTimeout(() => {
                router.back();
            }, 1000);
        }
        catch(error){
            toast.error("Ocurrio un error al editar el pais");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        const fetchProyects = async () => {
            try{
                const response = await axios.get('/api/proyects');
                const proyectOptions = response.data.map((proyect:Proyect) => ({
                    value:proyect.id,
                    label:proyect.name
                }))
                setProyects(proyectOptions);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        const fetchCompanies= async () => {
            try{
                const response = await axios.get('/api/companies');
                const companiesOptions = response.data.map((company:Company) => ({
                    value:company.id,
                    label:company.name
                }))
              
                setCompanies(companiesOptions);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        const fetchCities= async () => {
            try{
                const response = await axios.get('/api/cities');
                const citiesOptions = response.data.map((city:City) => ({
                    value:city.id,
                    label:city.name
                }))
                
                setCities(citiesOptions);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        fetchProyects();
        fetchCompanies();
        fetchCities();

    },[])
    
    const onDelete = async () => {
        try{
            setLoading(true);
            
            await axios.delete(`/api/opportunities/${params?.oportunidadId}`);    
            
           
            
            router.refresh()
            
            toast.success("Oportunidad eliminada");
            setTimeout(() => {
                router.back();
            }, 1000);
        }
        catch(error){
            toast.error("Ocurrio un error al editar el pais");
        }finally{
            setLoading(false);
        }
    }
    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );


    return(
        <>
        <ToasterProvider/>
        {loading && <LoadingSpinner/>}
            <div className="flex items-center  justify-between ">
                <Heading title={title} subtitle={description}/>
                {initialData && (
                <Button
                    disabled={loading}
                    variant="danger"
                    size="icon"
                    onClick={onDelete}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre de la ciudad" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type_opportunity"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Tipo Oportunidad</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.proyect_id?.toString()}
                                            options={opportunityTypeOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione una religión"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                       

                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="proyect_id"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Proyecto</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.proyect_id?.toString()}
                                            options={proyects as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione una religión"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_id"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Empresas</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.company_id}
                                            options={companies as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione una religión"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city_id"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Ciudad</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.city_id}
                                            options={cities as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione una religión"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                       

                    </div>
                    
                        
                       <FormField
                            control={form.control}
                            name="description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                    <textarea 
                                            disabled={loading} 
                                            placeholder="Descripción" 
                                            {...field} 
                                             className="block w-full h-32 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-left align-top p-2"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />  

                   
                    <div className="grid grid-cols-4 gap-8">
                        
                       <FormField
                            control={form.control}
                            name="start_date"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Fecha Inicio</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Fecha Fin</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />  
                        <FormField
                            control={form.control}
                            name="start_time"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Hora Inicio</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />  
                        <FormField
                            control={form.control}
                            name="end_time"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Hora Fin</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />   

                    </div>
                 
                        
                       <FormField
                            control={form.control}
                            name="acivities"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Actividades</FormLabel>
                                    <FormControl>
                                    <textarea 
                                            disabled={loading} 
                                            placeholder="Descripción" 
                                            {...field} 
                                             className="block w-full h-32 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-left align-top p-2"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        
                        
                  
                    <div className="grid grid-cols-3 gap-8">
                        
                       <FormField
                            control={form.control}
                            name="price"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            control={form.control}
                            name="payment"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Pago</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        <FormField
                            control={form.control}
                            name="english_level"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Nivel de Ingles</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.english_level}
                                            options={englishLevelOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione una religión"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> 
                        
                    </div>
                    
                     
                     
                        <div className="grid grid-cols-3 gap-8">
                        
                        
                    </div>   
                        
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Imagen de Oportunidad</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                            value={field.value?[field.value]:[]}
                                            disabled={loading}
                                            onChange={(url)=>field.onChange(url)}
                                            onRemove={()=>field.onChange('')}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    <div className=" flex justify-end">
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                    </div>
                </form>
            </Form>
            <Separator/>


        </>
    )

}
