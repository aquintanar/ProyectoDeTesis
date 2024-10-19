import prismadb from '@/app/libs/prismadb'
import { CompanyForm } from './components/companyForm'

const CompanyPage = async({
    params

}:{
    params:{
        empresaId:string
    }
}) => {

    const company = await prismadb.company.findUnique({
        where:{
            id:params.empresaId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CompanyForm initialData={company}/>
            </div>
        </div>
    )
}
export default CompanyPage;
