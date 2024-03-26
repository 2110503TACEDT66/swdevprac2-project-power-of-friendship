'use client'

import React from "react";
import SectionCard from "@/components/SectionCard";
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import createAppointment from "@/libs/createAppointment";

import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getSectionsByCompany from "@/libs/getSectionsByCompany";

export default function page({params} : {params: {id: string}}) {

    const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
    const [sectionJsonReady, setSectionJsonReady] = useState<SectionItem[]>([]);

    const {data: session} = useSession();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {                
                const appointmentDetail = await getAppointment(session?.user.token, params.id)
                setAppointment(appointmentDetail.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);
    
    useEffect(() => {
        if (appointment) {
            const sectionResponse = async () => {
                try {
                    const sectionData = await getSectionsByCompany(session?.user.token, appointment?.company.id)
                    setSectionJsonReady(sectionData.data);
                } catch(error) {
                    console.log(error);
                }
            };
    
            sectionResponse();
        }
    }, [appointment]);
    
    const deleteAppt = async (id: string) => {
        try {
            await deleteAppointment(session?.user.token, id)
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    let userId = '';
    if (appointment) {
        userId = appointment.user
    }

  const createAppt = async (date: Date) => {
    try {
      await createAppointment(session?.user.token, appointment?.company.id, date, userId) 
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

    if (!appointment)  return null
    if (!sectionJsonReady) return null

    const handleSectionClick = async (date: Date) => {
        await deleteAppt(appointment?._id);
        await createAppt(date)
        window.location.href = '/mybooking'
    };
    
    return (
        <div className = 'flex flex-col items-center'>
            <div className="flex flex-row justify-center mt-5">
                <div className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif">Register</div>
            </div>
            <div className="grid-cols-8 grid gap-4 mt-3">
                {
                    sectionJsonReady.map(sectionItem => (   
                        <div key={sectionItem._id} onClick={() => handleSectionClick(sectionItem.date)}>
                            <form>
                                {
                                    (sectionItem.status !== 'available') ?
                                    <div className="w-full text-black bg-red-100 rounded-lg shadow-lg p-2">
                                        <div>{format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
                                        <div>{sectionItem.status}</div>
                                    </div> :
                                    <div className="w-full text-black bg-green-100 rounded-lg shadow-lg p-2">
                                        <div>{format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
                                        <div>{sectionItem.status}</div>
                                    </div>
                                }
                            </form>
                        </div>
                    ))
                }
            </div>  
        </div>
    );
}