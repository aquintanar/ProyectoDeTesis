'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useEffect, useMemo, useState } from "react"
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
import { TbBeach } from "react-icons/tb"
import { GiWindmill } from "react-icons/gi"
import { MdOutlineNetworkWifi2Bar, MdOutlineNetworkWifi3Bar, MdOutlineSignalWifi0Bar, MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md"
import { Ability, Country } from "@prisma/client"
import { IoMdConstruct } from "react-icons/io"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';



enum STEPS {
    START = 0,
    ENGLISH_LEVEL = 1,
    ABILITIES = 2,
    COUNTRIES = 3,
    STUDIES = 4,
    FAV_PROGRAM = 5,
    DATE_TO_FLIGHT = 6,
    FINISH = 7
}
const english_levels = [
    {
        label:'No lo he podido practicar',
        icon: MdOutlineSignalWifi0Bar,
        description:'This property is close to the beach!'
    },
    {
        label:'Tengo un nivel básico',
        icon: MdOutlineNetworkWifi2Bar,
        description:'This property has windmills!'
    },
    {
        label:'Tengo un nivel intermedio',
        icon: MdOutlineNetworkWifi3Bar,
        description:'This property is modern!'
    },
    {
        label:'Tengo un nivel avanzado',
        icon: MdOutlineSignalWifiStatusbar4Bar,
        description:'This property is modern!'
    },


]
const studyOptions = [
    {
        label:'Ingeniería Informática',
        icon: MdOutlineSignalWifi0Bar,
        description:'This property is close to the beach!'
    },
    {
        label:'Ingeniería de Minas',
        icon: MdOutlineNetworkWifi2Bar,
        description:'This property has windmills!'
    },
    {
        label:'Ingeniería Industrial',
        icon: MdOutlineNetworkWifi3Bar,
        description:'This property is modern!'
    },
    {
        label:'Ingeniería Civil',
        icon: MdOutlineSignalWifiStatusbar4Bar,
        description:'This property is modern!'
    },


]
const programOptions = [
    {
        label:'Talento Global (OGTa)',
        icon: MdOutlineSignalWifi0Bar,
        description:'This property is close to the beach!'
    },
    {
        label:'Voluntariado Global (OGV)',
        icon: MdOutlineNetworkWifi2Bar,
        description:'This property has windmills!'
    },
    {
        label:'Profesor Global (OGTe)',
        icon: MdOutlineNetworkWifi3Bar,
        description:'This property is modern!'
    },


]

interface IngresoModalProps{
    FormFilled:boolean;
}

const IngresoModal:React.FC<IngresoModalProps> = ({
    FormFilled
})=>{
    const { control } = useForm();
    const [selectedDate, setSelectedDate] = useState(null);

    const router = useRouter()
    const rentModal = useRentModal()
    const [isLoading,setIsLoading]= useState(false);

    const [user,setUser] = useState();

    const [step,setStep] = useState(STEPS.ENGLISH_LEVEL);

    


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
            english_level:'',
            abilities:[],
            countries:[],
            studies:'',
            fav_program:'',
            date_to_flight:null,

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
    const english_level = watch('english_level');
    const abilities = watch('abilities');
    const countries = watch('countries');
    const studies = watch('studies');
    const fav_program = watch('fav_program');
    const date_to_flight = watch('date_to_flight');

    const [ability,setAbilities] = useState<Ability[]>([]);
    const [country,setCountries] = useState<Country[]>([]);

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

        console.log(data);

        /*axios.post('/api/listings',data)
        .then(()=>{
            toast.success('Listing Created!')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY);

            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })*/

    }
        useEffect(()=>{
            const fetchAbilities= async () => {
                try{
                    const response = await axios.get('../../api/abilities');
                    
                    
                    setAbilities(response.data);
                  
                    
                    
                }
                catch(error){
                    toast.error('Ocurrio un error al cargar los paises');
                }
            }
            const fetchCountries= async () => {
                try{
                    const response = await axios.get('../../api/countries');
                    console.log('HOLA')
                    console.log(response.data);
                    setCountries(response.data);
                  
                    
                    
                }
                catch(error){
                    toast.error('Ocurrio un error al cargar los paises');
                }
            }
            
            fetchAbilities();
            fetchCountries();
        },[])


    const actionLabel = useMemo(()=>{
        if(step===STEPS.FINISH){
            return 'Create';
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step===STEPS.START){
            return undefined;
        }
        return 'Back';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8"> 
            <Heading
                title="¡Bienveni@ a la Comunidad!"
                subtitle=
                "Estamos encantados de que estés aquí. En nuestra plataforma, tu experiencia es nuestra prioridad. Para poder ofrecerte el mejor contenido y recursos, necesitamos conocerte un poco mejor mediante este formulario.¿Por qué es tan importante? Cada persona es única, y al llenar este formulario, nos ayudarás a entender tus intereses, necesidades y objetivos. Cuanta más información tengamos, más personalizada será tu experiencia. Queremos asegurarnos de que encuentres lo que realmente te inspire y motive."
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
    if(step===STEPS.ENGLISH_LEVEL){
        bodyContent = (
            <div className="flex flex-col gap-8"> 
                <Heading
                    title="¿Cual es tu nivel de inglés?"
                    subtitle="Elige el nivel en el que crees que te encuentras"
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
    
                ">
                    {english_levels.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(english_level)=>{setCustomValue('english_level',english_level)}}
                                selected={english_level===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))}
    
                </div>
            </div>
    
        )
    }
    if(step===STEPS.ABILITIES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Qué habilidades tienes?"
                    subtitle="Elige un máximo de 5 habilidades"
                
                />
                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto

                 ">
                {ability.map((item)=>(
                    <div key={item.id} className="col-span-1">
                        <CategoryInput
                            onClick ={(abilities)=>{setCustomValue('abilities',abilities)}}
                            selected={abilities===item.name}
                            label={item.name}
                            icon={IoMdConstruct}
                        
                        />
                    </div>
                ))}

                </div>

            </div>
        )
    }
    if(step===STEPS.COUNTRIES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿Qué países te gustaría visitar?"
                    subtitle="Elige un máximo de 4 países"
                
                />
                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto

                 ">
                {country.map((item)=>(
                    <div key={item.id} className="col-span-1">
                        <CategoryInput
                            onClick ={(countries)=>{setCustomValue('countries',countries)}}
                            selected={countries===item.name}
                            label={item.name}
                            icon={IoMdConstruct}
                        
                        />
                    </div>
                ))}

                </div>

            </div>
        )
    }
    if(step ===STEPS.STUDIES){
        bodyContent = (
            <div className="flex flex-col gap-8"> 
                <Heading
                    title="¿¿Qué carrera estudias o estudiaste??"
                    subtitle="Elige la que estés cursando o hayas terminado "
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
    
                ">
                    {studyOptions.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(studies)=>{setCustomValue('studies',studies)}}
                                selected={studies===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))}
    
                </div>
            </div>
    
        )
    }

    if(step===STEPS.FAV_PROGRAM){
        bodyContent = (
            <div className="flex flex-col gap-8"> 
                <Heading
                    title="¿Cuáles programas te interesan?"
                    subtitle="Elige los que estes intersado"
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
    
                ">
                    {programOptions.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(fav_program)=>{setCustomValue('fav_program',fav_program)}}
                                selected={fav_program===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))}
    
                </div>
            </div>
    
        )
    }
    if(step===STEPS.DATE_TO_FLIGHT){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¿A partir de qué fecha podría viajar?"
                    subtitle="Elige a partir de que fecha está disponible"
                />
                <Controller
                control={control}
                name="date"
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={isLoading}
                        placeholderText="Seleccione una fecha"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                )}
            />
            
            </div>
        )
    }
    if(step===STEPS.FINISH){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="¡Gracias por permitirnos conocerte!"
                    subtitle="Queremos agradecerte sinceramente por completar nuestro formulario de bienvenida. Tu participación es esencial, ya que nos ayuda a descubrir tus intereses y gustos, lo que nos permitirá ofrecerte contenido y experiencias personalizadas.
Estamos emocionados de tenerte aquí y de poder adaptar nuestra comunidad a tus preferencias. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos."
                
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
        <>
        {!FormFilled && (
        <Modal
            isOpen = {true}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.START?undefined:onBack}
            title="¡Permitenos conocerte!"
            body={bodyContent}
        />

        )}
        </>
    )
}
export default IngresoModal;