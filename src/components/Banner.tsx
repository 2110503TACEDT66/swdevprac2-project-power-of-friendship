'use client'

import Image from 'next/legacy/image';
import styles from './banner.module.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

   

    const router = useRouter();
    

    const {data: session} = useSession();
    console.log(session?.user.token)

    return (
        <div className={styles.banner}>
            <Image src = {'/img/banner.jpg'} alt='cover' layout='fill' className='object-cover'/>
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium font-serif'>Your Interview Oppotunity</h1>
                <h3 className='text-xl font-serif font-serif'>Explore Your Company with Us</h3>
                <button className='bg-white rounded-3xl text-cyan-600 border border-white font-serif font-medium py-3 px-10 m-5 rounded z-30 relative hover:bg-cyan-800 hover:text-white hover:border-cyan-800' onClick={(e) => {e.stopPropagation();router.push('/company')}}>
                    Select Company
                </button> 
            </div>
            {
                session ? <div className='z-30 absolute top-10 left-0 font-serif text-gray-800 text-sm rounded-r-3xl bg-white py-4 px-5'>
                            <div className='text-center'>Welcome</div> 
                            <div className='text-center font-semibold'>{session.user?.name}</div>
                        </div> 
                : null
            }
        </div> 
    );
}