
import prismadb from '@/app/libs/prismadb'
import { CountryForm } from './components/countryForm'

const PaisPage = async({
    params

}:{
    params:{
        paisId:string
    }
}) => {

    const country = await prismadb.country.findUnique({
        where:{
            id:params.paisId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CountryForm initialData={country}/>
            </div>
        </div>
    )
}
export default PaisPage;


