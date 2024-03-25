import Image from "next/image"
import getCompany from "@/libs/getCompany"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]/route"
import { format } from 'date-fns'
import InteractiveSection from "@/components/interactiveSection"
import Link from "next/link"
import { TravelCard } from "@/components/TravelCard"
import session from "redux-persist/lib/storage/session"
import GoogleMap from "@/components/googleMap"
import SectionCard from "@/components/SectionCard"

export default async function CompanyDetailPage({params} : {params: {cid:string}}){

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const companyDetail = await getCompany(params.cid)

    const response = await fetch(`http://localhost:5000/api/v1/companies/${params.cid}/sections`, {
        method: 'GET',
        headers:{
            authorization: `Bearer ${session.user.token}`,
        }
    });
    const sectionJsonReady = await response.json()

    const address = await companyDetail.data.address
    const location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyD_7CKN7QIjeCTb6LzTnWh7eF4yrku3CPQ`, {
        method: 'GET'
    })
    const locationJson = await location.json()
    const lat = locationJson.results[0].geometry.location.lat
    const lng = locationJson.results[0].geometry.location.lng
    const distanceAndDuration = await fetch('http://localhost:5000/api/v1/companies/calculate-distance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: `${companyDetail.data.name}`
                }),
            });
    const distanceAndDurationJson = await distanceAndDuration.json()

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{companyDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={ companyDetail.data.picture } 
                    alt="Company Image" 
                    width={0} 
                    height={0} 
                    sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                {/* <TravelCard></TravelCard> */}
                <div className="text-md mx-5 text-black text-left bg-white rounded-md p-5">
                    <div className="text-md mx-5">Address: { companyDetail.data.address }</div>
                    <div className="text-md mx-5">Website: { companyDetail.data.website }</div>
                    <div className="text-md mx-5">Tel: { companyDetail.data.tel }</div>
                    <div className="text-md mx-5 text-left">{ companyDetail.data.description }</div>
                    {/* <Link href={`/reservations?id=${params.cid}&model=${companyDetail.data.model}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm">Make Reservation</button>
                    </Link> */}
                </div>
            </div>
            <h1 className="text-lg font-medium my-5">Interview Time</h1>
            <div className="grid-cols-4 grid gap-4">
                {
                    sectionJsonReady.data.map((sectionItem:SectionItem) => (
                        <SectionCard sectionItem={sectionItem} companyId={params.cid}/> 
                    ))
                }
            </div>
            <div className="flex flex-row justify-start mt-10">
                <GoogleMap Llat={lat} Llng={lng}/>
                <div className="text-black">
                    <p>distance: {distanceAndDurationJson.distance}</p>
                    <p>duration: {distanceAndDurationJson.duration}</p>
                </div>
            </div>

        </main>
    )
}

// export async function genreateStaticParams(){
//     return [{cid:'001'},{cid:'002'},{cid:'003'},{cid:'004'}]
// }