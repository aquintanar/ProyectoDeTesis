"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Country, Province } from "@prisma/client";
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

interface ProvinceFormProps{
    initialData:Province  | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    economicactivity:z.string().min(1),
    surface:z.string().min(1),
    population:z.string().min(1),
    description:z.string().min(1),
    imageUrl:z.string().min(1),
    country:z.string().min(1),
})


type ProvinceFormValues = z.infer<typeof formSchema>




export const ProvinceForm : React.FC<ProvinceFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading,setLoading] = useState(false);

    
    const title = initialData? 'Editar Provincia' : 'Agregar Provincia';
    const description = initialData? 'Edita una provincia ya existente' : 'Agrega una provincia a la lista';

    const toastMessage = initialData? 'Provincia editada con exito' : 'Provincia agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';
    const form = useForm<ProvinceFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData  || {

            name:'',
            economicactivity:'',
            surface:'',
            population:'',
            description:'',
            imageUrl:'',
            country:null,
        }
    });

    useEffect(()=>{
        const fetchCountries = async () => {
            try{
                const response = await axios.get('/api/countries');
                
                console.log('HOLAAA')
                console.log(response.data);
                setCountries(response.data);
                
            }
            catch(error){
                toast.error('Ocurrio un error al cargar los paises');
            }
        }
        fetchCountries();

    },[])
    var data2={
        name:'hola',
        economicactivity:'hola',
        surface:0,
        population:0,
        description:'hola',
        imageUrl:'hola',
        country:'',
    }
    
    const onSubmit = async (data:ProvinceFormValues) => {
        
        console.log(data);
        data2.country = data.country;
        data2.name = data.name;
        data2.economicactivity = data.economicactivity;
        data2.surface = parseInt(data.surface);
        data2.population = parseInt(data.population);
        data2.description = data.description;
        data2.imageUrl = data.imageUrl;
        

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/provinces/${params?.provinceid}`,);    
            }
            else{
                
                const payload = {...data2,country:{connect:{id:data.country}}};
                
                console.log(payload);
                await axios.post(`/api/provinces`,payload);    
           
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
    
    const onDelete = async () => {
        try{
            setLoading(true);
            
            await axios.delete(`/api/provinces/${params?.provinceid}`);    
            
           
            
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
                                        <Input disabled={loading} placeholder="Nombre del país" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Pais</FormLabel>
                                    <FormControl>
                                        <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                           <option value="">Seleccione un país</option>
                                        {countries.map((ctry) => (
                                            <option key={ctry.id} value={ctry.id}>
                                                {ctry.name}
                                            </option>
                                        ))}
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
                            name="economicactivity"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Actividad Economica</FormLabel>
                                    <FormControl>
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Seleccione una actividad economica</option>
                                            <option value="africa">África</option>
                                            <option value="asia">Asia</option>
                                            <option value="europe">Europa</option>
                                            <option value="america">América</option>
                                            <option value="oceania">Oceania</option>
                                            <option value="antarctica">Antártida</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surface"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Superficie</FormLabel>
                                    <FormControl>
                                    <Input disabled={loading} placeholder="Superficie en m2" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="population"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Poblacion</FormLabel>
                                    <FormControl>
                                    <Input disabled={loading} placeholder="Poblacion" {...field}/>
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
                                    <FormLabel>Imagen de Provincia</FormLabel>
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
