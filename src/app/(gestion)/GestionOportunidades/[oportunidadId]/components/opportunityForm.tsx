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

interface OpportunityFormProps{
    initialData:Opportunity  | null;
}




const formSchema = z.object({
   
    name:z.string().min(1),
    type_opportunity:z.string().min(1),
    proyect_id:z.string().min(1),
    company_id:z.string().min(1),
    city_id:z.string().min(1),
    description:z.string().min(1),
    start_date:z.string().min(1),
    end_date:z.string().min(1),
    start_time:z.string().min(1),
    end_time:z.string().min(1),
    acivities:z.string().min(1),
    price:z.string().min(1),
    payment:z.string().min(1),
    english_level:z.string().min(1),

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
        defaultValues:initialData  || {

            name:'',
            type_opportunity:'',
            proyect_id:'',
            company_id:'',
            city_id:'',
            description:'',
            start_date:'',
            end_date:'',
            start_time:'',
            end_time:'',
            acivities:'',
            price:'',
            payment:'',
            english_level:'',
        
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
        data2.type_opportunity = data.type_opportunity;
        data2.proyect = data.proyect_id;
        data2.company= data.company_id;
        data2.city = data.city_id;
        data2.description = data.description;
        data2.start_date = data.start_date;
        data2.end_date = data.end_date;
        data2.start_time = data.start_time;
        data2.end_time = data.end_time;
        data2.acivities = data.acivities;
        data2.price = parseInt(data.price);
        data2.payment = parseInt(data.payment);
        data2.english_level = data.english_level;
        data2.imageUrl = data.imageUrl;
        

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/opportunities/${params?.provinceid}`,);    
            }
            else{
                
                const payload = {...data2,
                    proyect:{
                        connect:{id:data.proyect_id}
                    }
                    ,company:{
                        connect:{id:data.company_id}
                    },
                    city:{
                        connect:{id:data.city_id}
                    }            
                };
                
                await axios.post(`/api/opportunities`,payload);    
           
            }
            
            router.refresh()
            
            toast.success(toastMessage);
            
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
             
                setProyects(response.data);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        const fetchCompanies= async () => {
            try{
                const response = await axios.get('/api/companies');
                
              
                setCompanies(response.data);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        const fetchCities= async () => {
            try{
                const response = await axios.get('/api/cities');
                
                
                setCities(response.data);
                
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
            
            await axios.delete(`/api/opportunities/${params?.paisId}`);    
            
           
            
            router.refresh()
            
            toast.success("Oportunidad eliminada");
            
        }
        catch(error){
            toast.error("Ocurrio un error al editar el pais");
        }finally{
            setLoading(false);
        }
    }



    return(
        <>
        <ToasterProvider/>
            <div className="flex items-center  justify-between ">
                <Heading title={title} subtitle={description}/>
                {initialData && (
                <Button
                    disabled={loading}
                    variant="danger"
                    size="icon"
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
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Seleccione una religión</option>
                                            <option value="christianity">Cristianismo</option>
                                            <option value="islam">Islam</option>
                                            <option value="hinduism">Hinduismo</option>
                                            <option value="buddhism">Budismo</option>
                                            <option value="judaism">Judaísmo</option>
                                        </select>
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
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                           <option value="">Seleccione un proyecto</option>
                                        {proyects.map((proyect) => (
                                            <option key={proyect.id} value={proyect.id}>
                                                {proyect.name}
                                            </option>
                                        ))}
                                        </select>
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
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                           <option value="">Seleccione una empresa</option>
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        ))}
                                        </select>
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
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                           <option value="">Seleccione una ciudad</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                        </select>
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
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />  

                   
                    <div className="grid grid-cols-3 gap-8">
                        
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
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
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
                                        <Input disabled={loading} placeholder="Descripción" {...field}/>
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
                                    <FormLabel>Imagen de Bandera</FormLabel>
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
                    
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>


        </>
    )

}
