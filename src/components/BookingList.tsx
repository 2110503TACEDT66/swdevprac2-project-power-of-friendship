'use client'

import Link from "next/link";
import getAppointments from "@/libs/getAppointments";
import deleteAppointment from "@/libs/deleteAppointment";

import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

export default function BookingList() {

    const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

    const {data: session} = useSession();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointmentData = await getAppointments(session?.user.token)
                setAppointments(appointmentData.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const deleteAppt = async (id: string) => {
        try {
            const response = await deleteAppointment(session?.user?.token, id)
            setAppointments(prevAppointments => prevAppointments.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };
    
    if (!session) return null;

    if (appointments.length === 0) {
        return (
            <div className="flex flex-row justify-center">
                <div className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif text-red-600">No Interview Booking</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-3 font-serif">
                {
                    (session.user.role !== 'admin') ? appointments.map(appointment => (
                        <div key={appointment._id} className="bg-white m-2 px-5 py-2 rounded-2xl">
                            <div>{format(appointment.appDate, 'HH:mm:ss yyyy-MM-dd')}</div>
                            <div>{appointment.company.name}</div>
                            <div className="flex flex-row space-x-2 mt-2 font-serif">
                               <button onClick={() => deleteAppt(appointment._id)} className="block rounded-md bg-red-400 hover:bg-red-600 px-3 py-3 text-white shadow-sm">
                                    Remove
                                </button>
                            <Link href={'/mybooking/edit/' + appointment._id} className="block rounded-md bg-cyan-600 hover:bg-cyan-800 px-3 py-3 text-white shadow-sm">Edit</Link> 
                            </div>
                        </div>
                    )) :
                    appointments.map(appointment => (
                        <div key={appointment._id} className="bg-white m-2 px-5 py-2 rounded-2xl">
                            <div>{format(appointment.appDate, 'HH:mm:ss yyyy-MM-dd')}</div>
                            <div>{appointment.company.name}</div>
                            <div className="flex flex-row space-x-2 mt-2 font-serif">
                               <button onClick={() => deleteAppt(appointment._id)} className="block rounded-md bg-red-400 hover:bg-red-600 px-3 py-3 text-white shadow-sm">
                                    Remove
                                </button>
                            <Link href={'/mybooking/edit/' + appointment._id} className="block rounded-md bg-cyan-600 hover:bg-cyan-800 px-3 py-3 text-white shadow-sm">Edit</Link> 
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
