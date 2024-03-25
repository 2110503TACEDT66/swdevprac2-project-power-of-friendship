'use client'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Session, getServerSession } from "next-auth"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import Link from "next/link";
import getUserProfile from "@/libs/getUserProfile";



export default function BookingList() {

    const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

    const {data:session} = useSession()

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/v1/appointments",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user.token}`
                    }
                });
                if (res.ok) {
                    const result = await res.json();


                    setAppointments(result.data);
                } else {
                    console.error("Failed to fetch appointments:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const deleteAppointment = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${session?.user?.token}`
                }
            });
            if (res.ok) {
                setAppointments(prevAppointments => prevAppointments.filter(item => item._id !== id));
            } else {
                console.error("Failed to delete appointment:", res.statusText);
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };
    
    if (!session) return null;

    if (appointments.length === 0) {
        return (
            <div className="p-10 flex flex-row justify-center">
                <div>No Interview Booking</div>
            </div>
        );
    }

    return (

        <div className="flex flex-col">
            <div className="grid grid-cols-3 mt-10 ">
            {
                (session.user.role !== 'admin')?appointments.map(appointment =>(
                    <div key={appointment._id}>
                        <p>{appointment.appDate}</p>
                        {appointment.company.name}
                        
                        <button onClick={() => deleteAppointment(appointment._id)} className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm">
                            Remove Booking
                        </button>
                        <Link href={'/mybooking/edit/' + appointment._id}>
                            Edit
                        </Link>
                    </div>
                )):
                appointments.map(appointment =>(
                    <div key={appointment._id}>
                        <p>{appointment.appDate}</p>
                        {appointment.company.name}
                        {appointment.user}
                        
                        <button onClick={() => deleteAppointment(appointment._id)} className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm">
                            Remove
                        </button>
                        <Link href={'/mybooking/edit/' + appointment._id}>
                            Edit
                        </Link>
                    </div>
                ))
            }
        </div>
        </div>
        
    );
}
