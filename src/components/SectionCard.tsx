'use client'

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';

export default function SectionCard({ sectionItem, companyId, appointmentItem}: { sectionItem: SectionItem; companyId: string; appointmentItem:AppointmentItem | null }) {

  const {data:session} = useSession()
  console.log(appointmentItem);

  let userId = '';
  if(appointmentItem){
    userId = appointmentItem.user
  }

  const updateSection = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/companies/${companyId}/appointments`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${session?.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appDate: sectionItem.date,
          user: userId
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <form onSubmit={updateSection}>
        {
            (sectionItem.status !== 'available')?
            <button className="w-full text-black bg-red-200 rounded-lg shadow-lg" type="submit">
                <div>Date: {format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
                <div>Status: {sectionItem.status}</div>
            </button>:
            <button className="w-full text-black bg-green-200 rounded-lg shadow-lg" type="submit">
            <div>Date: {format(sectionItem.date, 'yyyy-MM-dd HH:mm:ss')}</div>
            <div>Status: {sectionItem.status}</div>
            </button>
        }
      
    </form>
  );
}
