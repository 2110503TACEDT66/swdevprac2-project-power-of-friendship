'use client'

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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

export default function CompanyDetailPage({ params }: { params: { cid: string } }) {
    const [sectionJsonReady, setSectionJsonReady] = useState<any[]>([]);
    const [companyDetail, setCompanyDetail] = useState<any>(null);
    const [distanceAndDurationJson, setDistanceAndDurationJson] = useState<any>(null);
    const [lat,setLat] = useState<any>(null)
    const [lng,setlng] = useState<any>(null)

    const {data:session} = useSession()
    if(!session) return null

    useEffect(() => {
        const fetchData = async () => {

            const companyDetailResponse = await getCompany(params.cid);
            setCompanyDetail(companyDetailResponse.data);
            console.log(companyDetailResponse.data.name);

            const sectionResponse = await fetch(`http://localhost:5000/api/v1/companies/${params.cid}/sections`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                }
            });
            const sectionData = await sectionResponse.json();
            setSectionJsonReady(sectionData.data);

            const address = companyDetailResponse.data.address;
            const locationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyD_7CKN7QIjeCTb6LzTnWh7eF4yrku3CPQ`, {
                method: 'GET'
            });
            const locationJson = await locationResponse.json();
            const lat = locationJson.results[0].geometry.location.lat;
            const lng = locationJson.results[0].geometry.location.lng;
            setLat(lat)
            setlng(lng)
            const distanceAndDurationResponse = await fetch('http://localhost:5000/api/v1/companies/calculate-distance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: companyDetailResponse.data.name
                }),
            });
            const distanceAndDurationData = await distanceAndDurationResponse.json();
            setDistanceAndDurationJson(distanceAndDurationData);
        };

        fetchData();
    }, []);

    const handleSectionClick = () => {
        window.location.reload();
    };
    

    if(!companyDetail) return null
    if(!distanceAndDurationJson) return null

    return (

        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{companyDetail.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={ companyDetail.picture } 
                    alt="Company Image" 
                    width={0} 
                    height={0} 
                    sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                {/* <TravelCard></TravelCard> */}
                <div className="text-md mx-5 text-black text-left bg-white rounded-md p-5">
                    <div className="text-md mx-5">Address: { companyDetail.address }</div>
                    <div className="text-md mx-5">Website: { companyDetail.website }</div>
                    <div className="text-md mx-5">Tel: { companyDetail.tel }</div>
                    <div className="text-md mx-5 text-left">{ companyDetail.description }</div>
                    {/* <Link href={`/reservations?id=${params.cid}&model=${companyDetail.data.model}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm">Make Reservation</button>
                    </Link> */}
                </div>
            </div>
            <h1 className="text-lg font-medium my-5">Interview Time</h1>
            <div className="grid-cols-4 grid gap-4">
                {sectionJsonReady.map(sectionItem => (
                    
                    <div key={sectionItem._id} onClick={handleSectionClick}>
                        <SectionCard
                            sectionItem={sectionItem}
                            companyId={params.cid}
                        />
                    </div>
                    
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
