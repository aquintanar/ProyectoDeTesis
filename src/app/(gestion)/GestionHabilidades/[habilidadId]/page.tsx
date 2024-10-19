import prismadb from '@/app/libs/prismadb'
import { AbilityForm } from './components/abilityForm'

const AbilityPage = async({
    params

}:{
    params:{
        habilidadId:string
    }
}) => {

    const ability = await prismadb.ability.findUnique({
        where:{
            id:params.habilidadId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <AbilityForm initialData={ability}/>
            </div>
        </div>
    )
}
export default AbilityPage;
