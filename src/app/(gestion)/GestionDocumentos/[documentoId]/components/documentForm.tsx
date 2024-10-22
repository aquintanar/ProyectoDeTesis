"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { City, Company, Country, Province,Document } from "@prisma/client";
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
interface DocumentFormProps{
    initialData:Document  | null;
}





const formSchema = z.object({
    name: z.string().min(1),
    type:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description:z.string().min(1),
    imageUrl: z.string().min(1),

    
})


type DocumentFormValues = z.infer<typeof formSchema>

const documentTypeOptions = [
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


export const DocumentForm : React.FC<DocumentFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);

    
    const title = initialData? 'Editar Documento' : 'Agregar Documento';
    const description = initialData? 'Edita un documento ya existente' : 'Agrega un documento a la lista';

    const toastMessage = initialData? 'Documento editado con exito' : 'Documento agregado con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<DocumentFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            type: documentTypeOptions.find(option => option.value === initialData.type) || { value: '', label: '' }
        } : {

            name:'',
            type:{ value: '', label: '' },
            description:'',
            imageUrl: ''
           
        }
    });

    var data2={
        name:'',
            type:'',
            description:'',
            imageUrl: ''
    }
    
    const onSubmit = async (data:DocumentFormValues) => {
      
        data2.name=data.name;
        data2.type=data.type.value;
        data2.description=data.description;
        data2.imageUrl=data.imageUrl;

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/documents/${params?.documentoId}`,data2);    
            }
            else{
                
                await axios.post(`/api/documents`,data2);    
           
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
            
            await axios.delete(`/api/documents/${params?.documentoId}`);    
            
           
            
            router.refresh()
            
            toast.success("Documento eliminado");
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
                                    <FormLabel>Tipo de Documento</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.type}
                                            options={documentTypeOptions as any}
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
                                    <FormLabel>Imagen de Documento</FormLabel>
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
