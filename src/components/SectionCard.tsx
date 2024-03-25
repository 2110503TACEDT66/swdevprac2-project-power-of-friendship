import InteractiveSection from './interactiveSection'
import { format } from 'date-fns'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function SectionCard({sectionItem, companyId} : {sectionItem:SectionItem, companyId:string}){
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const updateSection = async () => {
        'use server'
        try {
            const section = await fetch(`http://localhost:5000/api/v1/companies/${companyId}/appointments`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appDate: sectionItem.date
                })
            });

            console.log(section)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action={updateSection}>
            <button className='w-full text-black bg-slate-200 rounded-lg shadow-lg' type="submit">
                <div>Date : {format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
                <div>Status : {sectionItem.status}</div>
            </button>  
        </form>
    );
}