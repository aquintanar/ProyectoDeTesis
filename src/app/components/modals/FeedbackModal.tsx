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
import { Ability, Country, User } from "@prisma/client"
import { IoMdConstruct } from "react-icons/io"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { set } from "date-fns"



enum STEPS {
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



interface IngresoModalProps{
    FormFilled:boolean;
    userLogged : string;
}

const IngresoModal:React.FC<IngresoModalProps> = ({
    FormFilled,
    userLogged
})=>{
    const { control } = useForm();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const router = useRouter()
    const rentModal = useRentModal()
    const [isLoading,setIsLoading]= useState(false);

    const [user,setUser] = useState();

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
        if(data.english_level==='No lo he podido practicar'){data.english_level='Sin nivel'}
        if(data.english_level==='Tengo un nivel básico'){data.english_level='Básico'}
        if(data.english_level==='Tengo un nivel intermedio'){data.english_level='Intermedio'}
        if(data.english_level==='Tengo un nivel avanzado'){data.english_level='Avanzado'}

        const idAbility = ability.find((item)=>item.name===data.abilities)?.id;

        const idCountry = country.find((item)=>item.name===data.countries)?.id;


        const data_to_send ={
            english_level:data.english_level,
            abilitiesId:idAbility,
            countriesId:idCountry,
            studies:data.studies,
            fav_program:data.fav_program,
            idUser:userLogged,
        }
        console.log(data_to_send);

        axios.patch('/api/users',data_to_send)
        .then(()=>{
            toast.success('Listing Created!')
            
           
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })

        axios.post('/api/userXability',data_to_send)
        .then(()=>{
            toast.success('Listing Created!')
            //router.refresh()
           
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })
        axios.post('/api/userXcountry',data_to_send)
        .then(()=>{
            toast.success('Listing Created!')
            router.refresh()
           
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })

       


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
            return 'Finalizar';
        }
        return 'Siguiente'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step===STEPS.START){
            return undefined;
        }
        return 'Atrás';
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8"> 
            <Heading
                title="¡Queremos conocer tu experiencia!"
                subtitle=
                "Gracias por ser parte de nuestro programa de pasantías/voluntariado en el extranjero. Tu opinión es muy valiosa para nosotros. Este formulario está diseñado para evaluar tu experiencia y recopilar tus impresiones, lo que nos ayudará a mejorar futuras oportunidades.Te agradecemos de antemano por tomarte el tiempo para compartir tus reflexiones y sugerencias. ¡Tu voz cuenta!"
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
                    {/*english_levels.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(english_level)=>{setCustomValue('english_level',english_level)}}
                                selected={english_level===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))*/}
    
                </div>
            </div>
    
        )
    }
    if(step===STEPS.QUESTION2){
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
    if(step===STEPS.QUESTION3){
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
    if(step ===STEPS.QUESTION4){
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
                    {/*studyOptions.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(studies)=>{setCustomValue('studies',studies)}}
                                selected={studies===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))*/}
    
                </div>
            </div>
    
        )
    }

    if(step===STEPS.QUESTION5){
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
                    {/*programOptions.map((item)=>(
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick ={(fav_program)=>{setCustomValue('fav_program',fav_program)}}
                                selected={fav_program===item.label}
                                label={item.label}
                                icon={item.icon}
                            
                            />
                        </div>
                    ))*/}
    
                </div>
            </div>
    
        )
    }
    if(step===STEPS.QUESTION6){
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
                        onChange={(date) => {
                            field.onChange(date);
                            setSelectedDate(date);
                        }}
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