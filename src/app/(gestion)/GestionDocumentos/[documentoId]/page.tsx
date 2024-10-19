import prismadb from '@/app/libs/prismadb'
import { DocumentForm } from './components/documentForm'

const DocumentPage = async({
    params

}:{
    params:{
        documentoId:string
    }
}) => {

    const document = await prismadb.document.findUnique({
        where:{
            id:params.documentoId
        }
    })
    return(
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <DocumentForm initialData={document}/>
            </div>
        </div>
    )
}
export default DocumentPage;
