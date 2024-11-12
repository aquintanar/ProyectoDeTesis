"use client";
import * as z from "zod"
import axios from "axios";
import React, { useEffect, useState } from "react";


import { Ability, City, Company, Country, Province, Proyect } from "@prisma/client";
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
interface ProyectFormProps{
    initialData:Proyect  | null;
}




const formSchema = z.object({
    ods:z.object({
        value: z.string().min(1),
        label: z.string().min(1)
    }),
    description:z.string().min(1),
    name:z.string().min(1),
    imageUrl:z.string().min(1),

})

const odsOptions = [
    { value: '1. Fin de la Pobreza', label: '1. Fin de la Pobreza' },
    { value: '2. Hambre Cero', label: '2. Hambre Cero' },
    { value: '3. Salud y Bienestar', label: '3. Salud y Bienestar' },
    { value: '4. Educación de Calidad', label: '4. Educación de Calidad' },
    { value: '5. Igualdad de Género', label: '5. Igualdad de Género' },
    { value: '6. Agua Limpia y Saneamiento', label: '6. Agua Limpia y Saneamiento' },
    { value: '7. Energía Asequible y No Contaminante', label: '7. Energía Asequible y No Contaminante' },
    { value: '8. Trabajo Decente y Crecimiento Económico', label: '8. Trabajo Decente y Crecimiento Económico' },
    { value: '9. Industria, Innovación e Infraestructura', label: '9. Industria, Innovación e Infraestructura' },
    { value: '10. Reducción de las Desigualdades', label: '10. Reducción de las Desigualdades' },
    { value: '11. Ciudades y Comunidades Sostenibles', label: '11. Ciudades y Comunidades Sostenibles' },
    { value: '12. Producción y Consumo Responsables', label: '12. Producción y Consumo Responsables' },
    { value: '13. Acción por el Clima', label: '13. Acción por el Clima' },
    { value: '14. Vida Submarina', label: '14. Vida Submarina' },
    { value: '15. Vida de Ecosistemas Terrestres', label: '15. Vida de Ecosistemas Terrestres' },
    { value: '16. Paz, Justicia e Instituciones Sólidas', label: '16. Paz, Justicia e Instituciones Sólidas' },
    { value: '17. Alianzas para Lograr los Objetivos', label: '17. Alianzas para Lograr los Objetivos' },
];
type ProyectFormValues = z.infer<typeof formSchema>




export const ProyectForm : React.FC<ProyectFormProps> = ({initialData}) => {
    const params = useParams();
    const router = useRouter();
    
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const [proyects, setProyects] = useState<Proyect[]>([]);

    
    const title = initialData? 'Editar Proyecto' : 'Agregar Proyecto';
    const description = initialData? 'Edita un proyecto ya existente' : 'Agrega un proyecto a la lista';

    const toastMessage = initialData? 'Proyecto editado con exito' : 'Proyecto agregado con exito';

    const action = initialData? 'Editar' : 'Agregar';

    const form = useForm<ProyectFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData ? {
            ods: { value: initialData.ods, label: initialData.ods },
            description: initialData.description,
            name: initialData.name,
            imageUrl: initialData.imageUrl,
        } : {

            ods:{ value: '', label: '' },
            description:'',
            name:'',
            imageUrl:'',
           
        }
    });
    var data2={
        ods: '',
        description:'',
        name:'',
        imageUrl:'',
    }
 
    const onSubmit = async (data:ProyectFormValues) => {
        console.log(data);
        data2.name = data.name
        data2.description = data.description
        data2.ods = data.ods.value
        data2.imageUrl = data.imageUrl

        
        try{
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/proyects/${params?.proyectoId}`,data2);    
            }
            else{
                
                await axios.post(`/api/proyects`,data2);    
           
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
            
            await axios.delete(`/api/proyects/${params?.proyectoId}`);    
            
           
            
            router.refresh()
            
            toast.success("Proyecto eliminado");
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
                            name="ods"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>ODS</FormLabel>
                                    <FormControl>
                                    <Select
                                            {...field}
                                            defaultInputValue={initialData?.ods}
                                            options={odsOptions as any}
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
                                    <FormLabel>Imagen del Proyecto</FormLabel>
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
