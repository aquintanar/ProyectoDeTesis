import prismadb from '@/app/libs/prismadb'
import { ProyectForm } from './components/proyectForm'

const ProyectPage = async({
    params

}:{
    params:{
        proyectoId:string
    }
}) => {

    const proyect = await prismadb.proyect.findUnique({
        where:{
            id:params.proyectoId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProyectForm initialData={proyect}/>
            </div>
        </div>
    )
}
export default ProyectPage;
