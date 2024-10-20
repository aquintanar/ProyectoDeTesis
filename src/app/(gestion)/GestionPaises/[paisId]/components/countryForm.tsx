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
import Select from 'react-select';
interface CountryFormProps{
    initialData:Country  | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    language: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    currency: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    weather: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description: z.string().min(1),
    religion: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    continent: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    flagUrl: z.string().min(1)
});


type CountryFormValues = z.infer<typeof formSchema>
const languageOptions=[
    { value: 'Mandarín', label: 'Mandarín' },
    { value: 'Español', label: 'Español' },
    { value: 'Inglés', label: 'Inglés' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Bengalí', label: 'Bengalí' },
    { value: 'Portugués', label: 'Portugués' },
    { value: 'Ruso', label: 'Ruso' },
    { value: 'Japonés', label: 'Japonés' },
    { value: 'Panyabí occidental', label: 'Panyabí occidental' },
    { value: 'Maratí', label: 'Maratí' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Chino Wu', label: 'Chino Wu' },
    { value: 'Turco', label: 'Turco' },
    { value: 'Coreano', label: 'Coreano' },
    { value: 'Francés', label: 'Francés' },
    { value: 'Alemán', label: 'Alemán' },
    { value: 'Vietnamita', label: 'Vietnamita' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Chino Yue', label: 'Chino Yue' },
    { value: 'Urdu', label: 'Urdu' },
]
const currencyOptions=[
    { value: 'Dólar estadounidense', label: 'Dólar estadounidense' },
    { value: 'Euro', label: 'Euro' },
    { value: 'Yen japonés', label: 'Yen japonés' },
    { value: 'Libra esterlina', label: 'Libra esterlina' },
    { value: 'Dólar australiano', label: 'Dólar australiano' },
    { value: 'Dólar canadiense', label: 'Dólar canadiense' },
    { value: 'Franco suizo', label: 'Franco suizo' },
    { value: 'Yuan chino', label: 'Yuan chino' },
    { value: 'Corona sueca', label: 'Corona sueca' },
    { value: 'Peso mexicano', label: 'Peso mexicano' },
    { value: 'Dólar neozelandés', label: 'Dólar neozelandés' },
    { value: 'Peso argentino', label: 'Peso argentino' },
    { value: 'Real brasileño', label: 'Real brasileño' },
    { value: 'Rublo ruso', label: 'Rublo ruso' },
    { value: 'Rupia india', label: 'Rupia india' },
    { value: 'Won surcoreano', label: 'Won surcoreano' },
    { value: 'Rupia indonesia', label: 'Rupia indonesia' },
    { value: 'Lira turca', label: 'Lira turca' },
    { value: 'Rand sudafricano', label: 'Rand sudafricano' },
    { value: 'Dólar singapurense', label: 'Dólar singapurense' },


]

const religionOptions = [
    { value: 'Christianismo', label: 'Cristianismo' },
    { value: 'Islamismo', label: 'Islam' },
    { value: 'Hinduismo', label: 'Hinduismo' },
    { value: 'Budismo', label: 'Budismo' },
    { value: 'Judaismo', label: 'Judaísmo' },
    { value: 'Religiones Étnicas', label: 'Religiones Étnicas' },
    { value: 'Taosimo', label: 'Taosimo' },
    { value: 'Sijismo', label: 'Sijismo' },
    { value: 'Jainismo', label: 'Jainismo' },
    { value: 'Bahaismo', label: 'Bahaismo' },
    { value: 'Otro', label: 'Otro' },
];
const continentsOptions = [
    { value: 'América', label: 'América' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Europa', label: 'Europa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Oceanía', label: 'Oceanía' },
    { value: 'Antartida', label: 'Antartida' },

];

const weatherOptions = [
    { value: 'Soleado', label: 'Soleado' },
    { value: 'Lluvioso', label: 'Lluvioso' },
    { value: 'Nublado', label: 'Nublado' },
    { value: 'Nevado', label: 'Nevado' },
    { value: 'Ventoso', label: 'Ventoso' },
    { value: 'Tormentoso', label: 'Tormentoso' },
    { value: 'Húmedo', label: 'Húmedo' },
    { value: 'Seco', label: 'Seco' },
    { value: 'Frío', label: 'Frío' },
    { value: 'Caluroso', label: 'Caluroso' },
];

var data2 ={
    name: 'Mexico',
    language:'',
    description:'',
    religion: '',
    continent: '',
    currency: 'MXN',
    weather: 'Soleado',
    flagUrl:''
}

export const CountryForm : React.FC<CountryFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    
    const title = initialData? 'Editar Pais' : 'Agregar Pais';
    const description = initialData? 'Edita un pais ya existente. Recuerda que los cambios se verán reflejados para todos los usuarios' : 'Agrega un pais a la lista. En estos países es en donde se tendrán las oportunidades';

    const toastMessage = initialData? 'Pais editado con exito' : 'Pais agregado con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<CountryFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            religion: { value: initialData.religion, label: initialData.religion },
            continent: { value: initialData.continent, label: initialData.continent },
            currency: { value: initialData.currency, label: initialData.currency },
            weather: { value: initialData.weather, label: initialData.weather },
            language: { value: initialData.language, label: initialData.language }
        } : {
            name: '',
            religion: { value: '', label: '' },
            continent: { value: '', label: '' },
            currency: { value: '', label: '' },
            weather: { value: '', label: '' },
            language: { value: '', label: '' },
            description: '',
            flagUrl: ''
        }
    });

    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
    
    const onSubmit = async (data:CountryFormValues) => {

        
        data2.name = data.name;
        data2.language = data.language.value;
        data2.description = data.description;
        data2.religion = data.religion.value;
        data2.continent = data.continent.value;
        data2.currency = data.currency.value;
        data2.weather = data.weather.value;
        data2.flagUrl = data.flagUrl;

 
        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/countries/${params?.paisId}`,data2);

            }
            else{
                console.log(data);
                await axios.post(`/api/countries`,data2);    
           
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
            
            await axios.delete(`/api/countries/${params?.paisId}`);    
            
           
            
            router.refresh()
            
            toast.success("Pais eliminado");
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
                            name="religion"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Religión</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            defaultInputValue={initialData?.religion}
                                            options={religionOptions as any}
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
                            name="continent"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Continente</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            options={continentsOptions as any}
                                            isDisabled={loading}
                                            defaultInputValue={initialData?.continent}
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
                            name="language"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Idioma</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            options={languageOptions as any}
                                            isDisabled={loading}
                                            defaultInputValue={initialData?.language}
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
                            name="currency"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Moneda</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            options={currencyOptions as any}
                                            isDisabled={loading}
                                            defaultInputValue={initialData?.currency}
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
                        <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="weather"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Clima</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            options={weatherOptions as any}
                                            isDisabled={loading}
                                            defaultInputValue={initialData?.weather}
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
