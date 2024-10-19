"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { City, Country, Province } from "@prisma/client";
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

interface CityFormProps{
    initialData:City  | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    province:z.string().min(1),
    description:z.string().min(1),
    imageUrl: z.string().min(1)
})


type CityFormValues = z.infer<typeof formSchema>




export const CityForm : React.FC<CityFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [provinces, setProvinces] = useState<Province[]>([]);

    
    const title = initialData? 'Editar Ciudad' : 'Agregar Ciudad';
    const description = initialData? 'Edita una ciudad ya existente' : 'Agrega una ciudad a la lista';

    const toastMessage = initialData? 'Ciudad editada con exito' : 'Ciudad agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<CityFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData  || {

            name:'',
            province:'',
            description:'',
            imageUrl:'',
           
        }
    });

    useEffect(()=>{
        const fetchCountries = async () => {
            try{
                const response = await axios.get('/api/provinces');
                
                console.log('HOLAAA')
                console.log(response.data);
                setProvinces(response.data);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        fetchCountries();

    },[])
    var data2={
        name:'',
        province:'',
        description:'',
        imageUrl:'',
    }
    const onSubmit = async (data:CityFormValues) => {
        console.log(data);
        data2.description = data.description;
        data2.name = data.name;
        data2.imageUrl = data.imageUrl;
        data2.province = data.province;
        

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/cities/${params?.provinceid}`,);    
            }
            else{
                
                const payload = {...data2,province:{connect:{id:data.province}}};
                
                await axios.post(`/api/cities`,payload);    
           
            }
            
            router.refresh()
            
            toast.success(toastMessage);
            
        }
        catch(error){
            toast.error("Ocurrio un error al editar la ciudad");
        }finally{
            setLoading(false);
        }
    }
    
    const onDelete = async () => {
        try{
            setLoading(true);
            
            await axios.delete(`/api/citiess/${params?.paisId}`);    
            
           
            
            router.refresh()
            
            toast.success("Pais eliminado");
            
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
                            name="province"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Provincia</FormLabel>
                                    <FormControl>
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                           <option value="">Seleccione una provincia</option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.name}
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
