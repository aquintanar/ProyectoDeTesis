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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Nombre del país</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Nombre del país" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>


        </>
    )

}
