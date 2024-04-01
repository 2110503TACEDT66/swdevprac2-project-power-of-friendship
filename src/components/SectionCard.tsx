'use client'

import React from 'react';
import createAppointment from '@/libs/createAppointment';

import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

export default function SectionCard({sectionItem, companyId, appointmentItem}: {sectionItem: SectionItem, companyId: string, appointmentItem?:AppointmentItem}) {

  const {data:session} = useSession()
  

  let userId = '';
  if (appointmentItem) {
    userId = appointmentItem.user
  }

  const createAppt = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); // Prevent the form submission
      await createAppointment(session?.user.token, companyId, sectionItem.date, userId) 
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <form onSubmit={createAppt}>
        {
            (sectionItem.status !== 'available') ?
            <button className="w-full text-black bg-red-100 rounded-lg shadow-lg p-2" type="submit">
                <div>{format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
                <div>{sectionItem.status}</div>
            </button> :
            <button className="w-full text-black bg-green-100 rounded-lg shadow-lg p-2" type="submit">
              <div>{format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
              <div>{sectionItem.status}</div>
            </button>
        }
    </form>
  );
}
