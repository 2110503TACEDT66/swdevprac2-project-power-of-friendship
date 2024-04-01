'use client'

import Image from "next/image";
import getCompany from "@/libs/getCompany";
import getLocation from "@/libs/getLocation";
import GoogleMap from "@/components/googleMap";
import SectionCard from "@/components/SectionCard";
import getSectionsByCompany from "@/libs/getSectionsByCompany";
import createAppointment from "@/libs/createAppointment";
import AlertDialog from "@/components/AlertDialog";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getDistanceAndDuration from "@/libs/getDistanceAndDuration";
import { Suspense } from "react";
import { Dialog, LinearProgress } from "@mui/material";

export default function CompanyDetailPage({params} : {params: {cid: string}}) {

    const [loading,setLoading] = useState(true)
    const [lat, setLat] = useState<any>(null);
    const [lng, setLng] = useState<any>(null);
    const [companyDetail, setCompanyDetail] = useState<any>(null);
    const [sectionJsonReady, setSectionJsonReady] = useState<any[]>([]);
    const [distanceAndDurationJson, setDistanceAndDurationJson] = useState<any>(null);
    const [click, setClick] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<SectionItem | null>(null);

    const { data: session } = useSession();
    if (!session) return null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyDetailResponse = await getCompany(params.cid);
                const companyDetailData = await companyDetailResponse.data;
                setCompanyDetail(companyDetailData);
    
                const address = companyDetailData.address;
                const locationJson = await getLocation(address);
                const lat = locationJson.results[0].geometry.location.lat;
                const lng = locationJson.results[0].geometry.location.lng;
                setLat(lat);
                setLng(lng);

                const sectionDataResponse = await getSectionsByCompany(session.user.token, params.cid);
                const sectionData = await sectionDataResponse.data;
                setSectionJsonReady(sectionData);
    
                const companyName = companyDetailData.name;
                const distanceAndDurationData = await getDistanceAndDuration(companyName);
                setDistanceAndDurationJson(distanceAndDurationData);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            
            try{
                const sectionDataResponse = await getSectionsByCompany(session.user.token, params.cid);
                const sectionData = await sectionDataResponse.data;
                setSectionJsonReady(sectionData);
                console.log('test3')
            }catch(err){

            }
        }
        fetchData()
    }, [click])
    
    if(loading){
        return(
            <div>
               <LinearProgress color="inherit" />
            </div>
        );
    }

    const createAppt = async (sectionItem:SectionItem) => {
        try {
           // Prevent the form submission
          await createAppointment(session.user.token, params.cid, sectionItem.date, session.user._id)
          console.log('test2'); 
        } catch (error) {
          console.error('Error updating section:', error);
        }
      };
    

    const handleAgreeDialog = async (sectionItem:SectionItem) => {
            await createAppt(sectionItem)
            setDialogOpen(false)
            setClick(!click);
            console.log('test1');
    };

    const handleSectionClick = (sectionItem:SectionItem) =>{
        setSelectedSection(sectionItem);
        setDialogOpen(true);
    }

    const handleCloseDialog = () => {
        // Close the dialog
        setDialogOpen(false);
    };

    
    if (!companyDetail) return null
    if (!distanceAndDurationJson) return null

    return (
        
            <main className="text-center p-5 flex flex-col items-center font-serif">
                <h1 className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif">{companyDetail.name}</h1>
                <div className="flex flex-row my-5 h-[250px]">
                    <div className="w-[30%]">
                        <Image src={ companyDetail.picture } 
                        alt="Company Image" 
                        width={0} 
                        height={0} 
                        sizes="100vw"
                        className="rounded-lg w-[100%] h-[100%]"/>
                    </div>
                    <div className="text-md mx-5 text-black text-left bg-white rounded-md p-5 w-[70%] space-y-2">
                        <div className="text-md mx-5">Address : { companyDetail.address }</div>
                        <div className="text-md mx-5">Website : { companyDetail.website }</div>
                        <div className="text-md mx-5">Tel : { companyDetail.tel }</div>
                        <br />
                        <br />
                        <br />
                        <div className="text-sm mx-5 text-left">{ companyDetail.description }</div>
                    </div>
                </div>
                <div className="grid-cols-8 grid gap-4">
                    {
                        sectionJsonReady.map(sectionItem => (
                            <div key={sectionItem._id} onClick={(e) => {e.preventDefault();handleSectionClick(sectionItem)}}>
                                <SectionCard sectionItem={sectionItem} companyId={params.cid}/>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-row justify-start mt-10 space-x-2">
                    <div className="bg-white p-2 rounded-xl">
                        <GoogleMap Llat={lat} Llng={lng}/>
                    </div>
                    <div className="text-black bg-white rounded-xl h-fit p-3 font-serif">
                        <h1>distance: {distanceAndDurationJson.distance}</h1>
                        <h1>duration: {distanceAndDurationJson.duration}</h1>
                    </div>
                </div>
                <AlertDialog open={dialogOpen} onClose={handleCloseDialog} onAgree={handleAgreeDialog} sectionItem={selectedSection} />
            </main>
        
    )
}