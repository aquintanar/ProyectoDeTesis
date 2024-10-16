"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Country } from "@prisma/client";
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

interface CountryFormProps{
    initialData:Country  | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    language:z.string().min(1),
    currency:z.string().min(1),
    weather:z.string().min(1),
    description:z.string().min(1),
    religion:z.string().min(1),
    continent:z.string().min(1),
    flagUrl: z.string().min(1)
})


type CountryFormValues = z.infer<typeof formSchema>




export const CountryForm : React.FC<CountryFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    
    const title = initialData? 'Editar Pais' : 'Agregar Pais';
    const description = initialData? 'Edita un pais ya existente' : 'Agrega un pais a la lista';

    const toastMessage = initialData? 'Pais editado con exito' : 'Pais agregado con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<CountryFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData  || {

            name:'',
            religion:'',
            currency:'',
            weather:'',
            language:'',
            description:'',
            continent:'',
            flagUrl:''
        }
    });

    
    const onSubmit = async (data:CountryFormValues) => {
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/countries/${params?.paisId}`,data);    
            }
            else{
                console.log(data);
                await axios.post(`/api/countries`,data);    
           
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
            
            await axios.delete(`/api/countries/${params?.paisId}`);    
            
           
            
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
                            name="religion"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Religion</FormLabel>
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
                            name="continent"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Continente</FormLabel>
                                    <FormControl>
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Seleccione un continente</option>
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
                            name="language"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Idioma</FormLabel>
                                    <FormControl>
                                    <select 
                                        disabled={loading} 
                                        {...field} 
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Seleccione un idioma</option>
                                        <option value="spanish">Español</option>
                                        <option value="english">Inglés</option>
                                        <option value="french">Francés</option>
                                        <option value="german">Alemán</option>
                                        <option value="chinese">Chino</option>
                                        <option value="japanese">Japonés</option>
                                        <option value="arabic">Árabe</option>
                                    </select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Moneda</FormLabel>
                                    <FormControl>
                                    <select 
                                        disabled={loading} 
                                        {...field} 
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Seleccione una moneda</option>
                                        <option value="usd">Dólar estadounidense</option>
                                        <option value="eur">Euro</option>
                                        <option value="gbp">Libra esterlina</option>
                                        <option value="jpy">Yen japonés</option>
                                        <option value="cny">Yuan chino</option>
                                        <option value="inr">Rupia india</option>
                                        <option value="brl">Real brasileño</option>
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
                            name="weather"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Clima</FormLabel>
                                    <FormControl>
                                    <select 
                                            disabled={loading} 
                                            {...field} 
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="">Seleccione un clima</option>
                                            <option value="sunny">Soleado</option>
                                            <option value="rainy">Lluvioso</option>
                                            <option value="cloudy">Nublado</option>
                                            <option value="snowy">Nevado</option>
                                            <option value="windy">Ventoso</option>
                                            <option value="stormy">Tormentoso</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>   
                        
                        <FormField
                            control={form.control}
                            name="flagUrl"
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
