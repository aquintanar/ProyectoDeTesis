'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import LikertScale from "../likert/LikertScale"

enum STEPS2 {
    START = 0,
    QUESTION1 = 1,
    QUESTION2 = 2,
    QUESTION3 = 3,
    QUESTION4 = 4,
    QUESTION5 = 5,
    QUESTION6 = 6,
    QUESTION7 = 7,
    QUESTION8 = 8,
    QUESTION9 = 9,
    FINISH = 10
}

enum STEPS {
    START=0,
    QUESTION1 = 1,
    QUESTION2 = 2,
    QUESTION3 = 3,
    QUESTION4 = 4,
    QUESTION5 = 5,
    QUESTION6 = 6,
    QUESTION7 = 7,
    QUESTION8 = 8,
    QUESTION9 = 9,
    FINISH=10,
}

const RentModal = ()=>{

    const router = useRouter()
    const rentModal = useRentModal()
    const [isLoading,setIsLoading]= useState(false);

    const [likertValue1,setLikertValue1] = useState(3);
    const [likertValue2,setLikertValue2] = useState(3);


    const [step,setStep] = useState(STEPS.START);


    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } =useForm<FieldValues>({
        defaultValues:{
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            ImageSrc:'',
            price:1,
            title:'',
            description:''
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const ImageSrc = watch('ImageSrc');
    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
        ssr:false
    }),[location])
    const setCustomValue = (id:string,value:any)=>{
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }

    const onBack = ()=>{
        setStep((value)=>value-1) 
    };
    const onNext = ()=>{
        setStep((value)=>value+1)
    }

    const onSubmit : SubmitHandler<FieldValues>=(data)=>{
        if(step!==STEPS.FINISH){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings',data)
        .then(()=>{
            toast.success('Listing Created!')
            router.refresh()
            reset()
            setStep(STEPS.START);

            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })

    }

    const actionLabel = useMemo(()=>{
        if(step===STEPS.FINISH){
            return 'Terminar';
        }
        return 'Siguiente'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step===STEPS.START){
            return undefined;
        }
        return 'Atras';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8"> 
            <Heading
                title="¡Queremos conocer tu experiencia!"
                subtitle="Gracias por ser parte de nuestro programa de pasantías/voluntariado en el extranjero. Tu opinión es muy valiosa para nosotros. Este formulario está diseñado para evaluar tu experiencia y recopilar tus impresiones, lo que nos ayudará a mejorar futuras oportunidades.Te agradecemos de antemano por tomarte el tiempo para compartir tus reflexiones y sugerencias. ¡Tu voz cuenta!"
            />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto

            ">
                
            </div>
        </div>

    )

    if(step===STEPS.QUESTION1){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Durante todo su tiempo en la empresa se respetó los horarios de trabajo que originalmente se acordaron"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue1} onChange={setLikertValue1}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION2){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Realizó las actividades o tareas que usted esperaba realizar durante su tiempo en la empresa"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step ===STEPS.QUESTION3){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="La empresa se mantuvo disponible y atenta ante cualquier necesidad que usted haya podido tener"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }

    if(step===STEPS.QUESTION4){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="La rapidez para solucionar cualquier problema que tuviese era la óptima"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION5){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="El entorno en el que ejerció sus actividades se seguro y libre de riesgos físicos"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION6){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="El personal transmitió confianza y profesionalismo en sus interacciones"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION7){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="El personal de la empresa muestra interés genuino en su crecimiento y ayudarlo durante su estadía"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION8){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="El personal se comunica de manera clara y comprensible, adaptándose a su nivel de conocimiento y experiencia"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }
    if(step===STEPS.QUESTION9){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="La empresa le proveyó con los equipos necesarios para que usted pueda realizar sus labores de manera óptima"
                    subtitle="Responda qué tan de acuerdo está con la afirmación anterior"
                
                />
                <LikertScale value={likertValue2} onChange={setLikertValue2}/>

            </div>
        )
    }

    if(step===STEPS.FINISH){
        bodyContent=(
            <div className="flex flex-col gap-8"> 
            <Heading
                title="¡Queremos conocer tu experiencia!"
                subtitle="Gracias por ser parte de nuestro programa de pasantías/voluntariado en el extranjero. Tu opinión es muy valiosa para nosotros. Este formulario está diseñado para evaluar tu experiencia y recopilar tus impresiones, lo que nos ayudará a mejorar futuras oportunidades.Te agradecemos de antemano por tomarte el tiempo para compartir tus reflexiones y sugerencias. ¡Tu voz cuenta!"
            />
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto

            ">
                
            </div>
        </div>
        )
    }
    return(
        <Modal
            isOpen = {rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.START?undefined:onBack}
            title="¡Permitenos escucharte!"
            body={bodyContent}
        />
    )
}
export default RentModal;