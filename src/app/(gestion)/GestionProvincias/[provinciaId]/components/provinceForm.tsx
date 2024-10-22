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
import Select from 'react-select';
interface ProvinceFormProps{
    initialData:Province  | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    economicactivity:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    surface:z.string().min(1),
    population:z.string().min(1),
    description:z.string().min(1),
    imageUrl:z.string().min(1),
    country:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
})


type ProvinceFormValues = z.infer<typeof formSchema>


const activityOptions = [
    {value:'agricultura',label:'Agricultura'},
    {value:'ganaderia',label:'Ganaderia'},
    {value:'pesca',label:'Pesca'},
    {value:'mineria',label:'Mineria'},
    {value:'industria',label:'Industria'},
    {value:'comercio',label:'Comercio'},
    {value:'servicios',label:'Servicios'},
    {value:'otros',label:'Otros'},

]

export const ProvinceForm : React.FC<ProvinceFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading,setLoading] = useState(false);

    
    const title = initialData? 'Editar Provincia' : 'Agregar Provincia';
    const description = initialData? 'Edita una provincia ya existente.Recuerda que los cambios se verán reflejados para todos los usuarios' : 'Agrega una provincia a la lista. En estas provincias es en donde se tendrán las oportunidades';

    const toastMessage = initialData? 'Provincia editada con exito' : 'Provincia agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';
    
    const form = useForm<ProvinceFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            economicactivity: { value: initialData.economicactivity, label: initialData.economicactivity },
            surface: initialData.surface.toString(),
            population: initialData.population.toString(),
            description: initialData.description,
            imageUrl: initialData.imageUrl,
            country: { value: initialData.country_id, label: initialData.country_id }
        } : {

            name:'',
            economicactivity:{ value: '', label: '' },
            surface:'',
            population:'',
            description:'',
            imageUrl:'',
            country:{ value: '', label: '' },
        }
    });

    useEffect(()=>{
        const fetchCountries = async () => {
            try{
                const response = await axios.get('/api/countries');
                const countryOptions = response.data.map((country:Country) => ({
                    value:country.id,
                    label:country.name
                }))
                
                setCountries(countryOptions);
                
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
    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
    
    const onSubmit = async (data:ProvinceFormValues) => {
        
        console.log(data);
        data2.country = data.country.value;
        data2.name = data.name;
        data2.economicactivity = data.economicactivity.value;
        data2.surface = parseInt(data.surface);
        data2.population = parseInt(data.population);
        data2.description = data.description;
        data2.imageUrl = data.imageUrl;
        console.log(data2);

        
        try{
            setLoading(true);
            const payload = {...data2,country:{connect:{id:data2.country}}};
                
                console.log(payload);
            if(initialData){
                await axios.patch(`/api/provinces/${params?.provinciaId}`,payload);    
            }
            else{
                
                
                await axios.post(`/api/provinces`,payload);    
           
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
    
    const onDelete = async () => {
        try{
            setLoading(true);
            
            await axios.delete(`/api/provinces/${params?.provinciaId}`);    
            
           
            
            router.refresh()
            
            toast.success("Provincia eliminado");
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
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.country_id}
                                            options={countries as any}
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
                            name="economicactivity"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Actividad Economica</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.economicactivity}
                                            options={activityOptions as any}
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
                    <div className=" flex justify-end">
                    <Button disabled={loading} className="ml-auto justify-end" type="submit">
                        {action}
                    </Button>
                    </div>
                </form>
            </Form>
            <Separator/>


        </>
    )

}
