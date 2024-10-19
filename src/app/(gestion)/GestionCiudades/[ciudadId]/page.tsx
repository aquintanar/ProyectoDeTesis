import prismadb from '@/app/libs/prismadb'
import { CityForm } from './components/cityForm'

const CityPage = async({
    params

}:{
    params:{
        ciudadId:string
    }
}) => {

    const city = await prismadb.city.findUnique({
        where:{
            id:params.ciudadId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CityForm initialData={city}/>
            </div>
        </div>
    )
}
export default CityPage;
