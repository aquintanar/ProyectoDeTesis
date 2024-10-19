import prismadb from '@/app/libs/prismadb'
import { ProvinceForm } from './components/provinceForm'

const ProvincePage = async({
    params

}:{
    params:{
        provinciaId:string
    }
}) => {

    const province = await prismadb.province.findUnique({
        where:{
            id:params.provinciaId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProvinceForm initialData={province}/>
            </div>
        </div>
    )
}
export default ProvincePage;

