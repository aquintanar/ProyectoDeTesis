'use client'

import { useCallback, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const Auth = () =>{
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    const [country, setCountry] = useState();
    const [phone,setPhone] = useState('');
    const [birthday,setBirthday] = useState();
    const [secondpassword,setSecondpassword] = useState('');

    const router = useRouter();


    const regexemail= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [variant, setVariant]=useState('login');

    const toggleVariant = useCallback(()=>{
        setVariant((currentVariant)=> currentVariant=== 'login'?'register':'login');
    },[]);

    const login = useCallback(async()=>{
        
        signIn('credentials',{
            email,
            password,
            redirect:false,
            callbackUrl:'/actividad'
        })
        .then((callback)=>{
            toast.success('Se ha iniciado sesion correctamente')

            router.push('/actividad')
        }).catch((error)=>{
            toast.error('No se ha podido iniciar sesion')
        })



    },[email,password])

    const register = useCallback(async()=>{
        
        if(!regexemail.test(email)){
             toast.error('Debe ser una dirección de correo válida')
             return;    
        }

        if(!(/^\d+$/.test(phone))){
            toast.error('El campo de teléfono solo debe contener números')
            return;
        }
        
        
        if(password!== secondpassword){
            toast.error('Ambas contraseñas deben ser iguales')
            return;
        }
        


        console.log('HOLA')

        

        const formFilled =false;
        const status="Activo";
        axios.post('../../api/register',{
            email,
            name,
            phone,
            password,
            formFilled,
            status
        })
        .then(()=>{
            toast.success('Se ha registrado satisfactoriamente')
            setVariant('login')

            login()

        })
        .catch((error)=>{
            toast.error('El correo ya está registrado');
        })
        .finally(()=>{
            
        })

    },[email,name,phone,password,login])

   



    return (
        <div className="relative h-full w-full bg-[url('/LoginBackground.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
            <div className="bg-black w-full h-full lg:bg-opacity-10">
                <nav className="px-12 py-5">
                    <img src='/AIESEC_logo.png' alt="Logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-white bg-opacity-100 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-[#037EF3] text-4xl mb-8 font-bold">
                            {variant==='login'?'INICIAR SESIÓN':'CREAR CUENTA'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant==='register'&& (
                                <Input
                                    label="Nombre y apellido"
                                    onChange={(ev:any)=>{setName(ev.target.value)}}
                                    id="username"
                                    type="username"
                                    value={name}
                                />
                            )}
                            <Input
                                    label="Correo Electrónico"
                                    onChange={(ev:any)=>{setEmail(ev.target.value)}}
                                    id="email"
                                    type="email"
                                    value={email}
                                    
                                
                                />

                            {variant==='register'&& (   
                            <Input
                                    label="Número de celular"
                                    onChange={(ev:any)=>{setPhone(ev.target.value)}}
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    
                                
                                />
                            )}


                             <Input
                                label="Contraseña"
                                onChange={(ev:any)=>{setPassword(ev.target.value)}}
                                id="password"
                                type="password"
                                value={password}
                            />
                            {variant==='register'&& (
                            <Input
                                label="Repetir Contraseña"
                                onChange={(ev:any)=>{setSecondpassword(ev.target.value)}}
                                id="secondpassword"
                                type="password"
                                value={secondpassword}
                            />
                            )}
                        </div>
                        <button onClick={variant==='login'?login:register} className=" bg-[#037EF3] py-3 text-white rounded-md w-full mt-10 hover:bg-[#55A4EE] transition">
                            {variant==='login'?'Acceder':'Registrarse'}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={()=>signIn('google',{callbackUrl:'/actividad'})}

                                className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:opacity-80
                                    transition
                                
                                "
                            >
                                <FcGoogle size={30}/>

                            </div>
                        </div>

                        <p className="text-neutral-500 mt-10">
                            {variant==='login'? '¿Primera vez en la plataforma?':'¿Ya tienes una cuenta?'}
                            <span onClick={toggleVariant} className="text-[#037EF3] ml-1 hover:underline cursor-pointer">
                                {variant==='login'? 'Crear Cuenta':'Inicia Sesión'}
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Auth;