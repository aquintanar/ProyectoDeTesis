"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Ability, City, Company, Country, Province } from "@prisma/client";
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
interface AbilityFormProps{
    initialData:Ability  | null;
}




const formSchema = z.object({
    type: z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    area_of_ability:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description:z.string().min(1),
    name:z.string().min(1),
    imageUrl:z.string().min(1),

})
const abilityTypeOptions = [
    { value: 'Habilidades técnicas', label: 'Habilidades técnicas' },
    { value: 'Habilidades informáticas', label: 'Habilidades informáticas' },
    { value: 'Habilidades de investigación', label: 'Habilidades de investigación' },
    { value: 'Habilidades de presentación', label: 'Habilidades de presentación' },
    { value: 'Habilidades de escritura', label: 'Habilidades de escritura' },
    { value: 'Habilidades de ventas', label: 'Habilidades de ventas' },
    { value: 'Habilidades de marketing', label: 'Habilidades de marketing' },
    { value: 'Habilidades de servicio al cliente', label: 'Habilidades de servicio al cliente' },
    { value: 'Habilidades de gestión de proyectos', label: 'Habilidades de gestión de proyectos' },
];
const areaAbilityTypeOptions = [
    { value: 'Desarrollo de Software', label: 'Desarrollo de Software' },
    { value: 'Ciencia de Datos', label: 'Ciencia de Datos' },
    { value: 'Marketing Digital', label: 'Marketing Digital' },
    { value: 'Gestión de Proyectos', label: 'Gestión de Proyectos' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' },
    { value: 'Finanzas', label: 'Finanzas' },
    { value: 'Ventas', label: 'Ventas' },
    { value: 'Atención al Cliente', label: 'Atención al Cliente' },
    { value: 'Diseño Gráfico', label: 'Diseño Gráfico' },
    { value: 'Ingeniería', label: 'Ingeniería' },
    { value: 'Educación', label: 'Educación' },
    { value: 'Salud', label: 'Salud' },
    { value: 'Logística', label: 'Logística' },
    { value: 'Consultoría', label: 'Consultoría' },
    { value: 'Investigación y Desarrollo', label: 'Investigación y Desarrollo' },
    { value: 'Producción', label: 'Producción' },
    { value: 'Calidad', label: 'Calidad' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Comunicación', label: 'Comunicación' },
];

type AbilityFormValues = z.infer<typeof formSchema>




export const AbilityForm : React.FC<AbilityFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [abilities, setAbilities] = useState<Ability[]>([]);

    
    const title = initialData? 'Editar Habilidad' : 'Agregar Habilidad';
    const description = initialData? 'Edita una habilidad ya existente' : 'Agrega una habilidad a la lista';

    const toastMessage = initialData? 'Habilidad editada con exito' : 'Habilidad agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<AbilityFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData ? {
            type: { value: initialData.type, label: initialData.type },
            area_of_ability: { value: initialData.area_of_ability, label: initialData.area_of_ability },
            description: initialData.description,
            name: initialData.name,
            imageUrl: initialData.imageUrl,
        } : {

            type: { value: '', label: '' },
            area_of_ability:{ value: '', label: '' },
            description:'',
            name:'',
            imageUrl:'',
           
        }
    });

 
    var data2={
        type: '',
        area_of_ability:'',
        description:'',
        name:'',
        imageUrl:'',
    }
    const onSubmit = async (data:AbilityFormValues) => {
        console.log(data);
        
        data2.name = data.name;
        data2.type = data.type.value;
        data2.area_of_ability = data.area_of_ability.value;
        data2.description = data.description;
        data2.imageUrl = data.imageUrl;
        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/abilities/${params?.habilidadId}`,data2);    
            }
            else{
                
                await axios.post(`/api/abilities`,data2);    
           
            }
            
            router.refresh()
            
            toast.success(toastMessage);
            setTimeout(() => {
                router.back();
            }, 1000);
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
            
            await axios.delete(`/api/abilities/${params?.habilidadId}`);    
            
           
            
            router.refresh()
            
            toast.success("Habilidad eliminada");
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
                            name="type"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.type}
                                            options={abilityTypeOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione un sector"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area_of_ability"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Area de Habilidad</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.type}
                                            options={areaAbilityTypeOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione un sector"
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
                        
                        
                    </div>   
                        
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Imagen de Habilidad</FormLabel>
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
