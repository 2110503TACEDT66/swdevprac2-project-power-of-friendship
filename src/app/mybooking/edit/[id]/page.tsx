'use client'

import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SectionCard from "@/components/SectionCard";

export default function page({ params } : { params: { id: string } }){

    const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
    const [sectionJsonReady, setSectionJsonReady] = useState<SectionItem[]>([]);

    const {data:session} = useSession()

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/appointments/'+params.id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user.token}`
                    }
                });
                
                const result = await res.json();
                setAppointment(result.data);
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
                    const res = await fetch(`http://localhost:5000/api/v1/companies/${appointment?.company.id}/sections`, {
                        method: 'GET',
                        headers: {
                            authorization: `Bearer ${session?.user.token}`,
                        }
                    });
                    const sectionData = await res.json();
                    setSectionJsonReady(sectionData.data);
                } catch(error) {
                    console.log(error);
                }
            };
    
            sectionResponse();
        }
    }, [appointment]);
    

    const deleteAppointment = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${session?.user?.token}`
                }
            });
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    if(!appointment)  return null
    if(!sectionJsonReady) return null

    const handleSectionClick = () => {
        
        deleteAppointment(appointment?._id);
        window.location.href = '/mybooking';
    };
    
    return (
        <div>
            {sectionJsonReady.map(sectionItem => (
                    
                    <div key={sectionItem._id} onClick={handleSectionClick}>
                        <SectionCard
                            sectionItem={sectionItem}
                            companyId={appointment?.company.id}
                            appointmentItem={appointment}
                        />
                    </div>
                    
                    ))
                }
        </div>
    );
}