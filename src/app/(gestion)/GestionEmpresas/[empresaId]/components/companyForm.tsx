"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { City, Company, Country, Province } from "@prisma/client";
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
interface CompanyFormProps{
    initialData:Company  | null;
}


const sectorOptions = [
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
const identificationTypeOptions = [
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
const companyTypeOptions = [
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

const formSchema = z.object({
    name: z.string().min(1),
    sector:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    identification_type:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    identification_number:z.string().min(1),
    type_of_company:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description:z.string().min(1),
    imageUrl: z.string().min(1),
    webSite: z.string().min(1),
})


type CompanyFormValues = z.infer<typeof formSchema>




export const CompanyForm : React.FC<CompanyFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);

    
    const title = initialData? 'Editar Empresa' : 'Agregar Empresa';
    const description = initialData? 'Edita una empresa ya existente' : 'Agrega una empresa a la lista';

    const toastMessage = initialData? 'Empresa editada con exito' : 'Empresa agregada con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<CompanyFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? { 
            ...initialData, 
            webSite: initialData.webSite || '', 
            sector: { value: initialData.sector, label: initialData.sector },
            identification_type: { value: initialData.identification_type, label: initialData.identification_type },
            type_of_company: { value: initialData.type_of_company, label: initialData.type_of_company }
        } : {

            name: '',
            sector:{ value: '', label: '' },
            identification_type:{ value: '', label: '' },
            identification_number:'',
            type_of_company:{ value: '', label: '' },
            description:'',
            imageUrl: '',
            webSite: '',
           
        }
    });

 
    var data2={
            name: '',
            sector:'',
            identification_type:'',
            identification_number:'',
            type_of_company:'',
            description:'',
            imageUrl: '',
            webSite: '',
    }
    const onSubmit = async (data:CompanyFormValues) => {
        console.log(data);
        data2.description = data.description;
        data2.name = data.name;
        data2.imageUrl = data.imageUrl;
        data2.sector = data.sector.value;
        data2.identification_type = data.identification_type.value;
        data2.identification_number = data.identification_number;
        data2.type_of_company = data.type_of_company.value;
        data2.webSite = data.webSite;


        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/companies/${params?.empresaId}`,data2);    
            }
            else{
                
                await axios.post(`/api/companies`,data2);    
           
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
    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
    const onDelete = async () => {
        try{
            setLoading(true);
            
            await axios.delete(`/api/companies/${params?.empresaId}`);    
            
           
            
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
                            name="sector"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Sector</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.sector}
                                            options={sectorOptions as any}
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
                            name="webSite"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Sitio Web</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Tipo de Identificacion" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        
                        <FormField
                            control={form.control}
                            name="identification_type"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Tipo de Identificacion</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.identification_type}
                                            options={identificationTypeOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione un tipo de identificación"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="identification_number"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Numbero de Identificacion</FormLabel>
                                    <FormControl>
                                    <Input disabled={loading} placeholder="Tipo de Identificacion" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type_of_company"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Tipo de Empresa</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.type_of_company}
                                            options={companyTypeOptions as any}
                                            isDisabled={loading}
                                            classNamePrefix="react-select"
                                            placeholder="Seleccione un tipo"
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
