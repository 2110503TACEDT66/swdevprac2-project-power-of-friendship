import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import styles from './topmenu.module.css';

import { Link } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo_online.jpeg'} 
                className={styles.logoimg} 
                alt = 'logo'
                width={0} height={0} 
                sizes='100vh'/>
            <TopMenuItem title = 'Company' pageRef='/company'/>
            <TopMenuItem title = 'My Booking' pageRef='/mybooking'/>
            
            <div className='flex flex-row absolute right-0 h-full'>
                <TopMenuItem title = 'About Me' pageRef='/about'/>
                <TopMenuItem title = 'Register' pageRef='/register'/>
                {
                    session ? <Link href='/api/auth/signout'>
                        <div className='flex items-center  h-full px-2 text-cyan-600 text-sm'>Sign-Out</div>
                    </Link> : 
                    <Link href='/api/auth/signin'>
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-In</div>
                    </Link> 
                }
            </div>
        </div>
    );
}