import prismadb from '@/app/libs/prismadb'

import { OpportunityForm } from './components/opportunityForm'

const OpportunityPage = async({
    params

}:{
    params:{
        oportunidadId:string
    }
}) => {

    const opportunity = await prismadb.opportunity.findUnique({
        where:{
            id:params.oportunidadId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <OpportunityForm initialData={opportunity}/>
            </div>
        </div>
    )
}
export default OpportunityPage;
