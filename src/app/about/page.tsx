import getUserProfile from "@/libs/getUserProfile";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function About() {

    const getSession = await getServerSession(authOptions)    
    if(!getSession || !getSession.user.token) return (
        <div className="flex flex-row justify-center mt-5">
            <div className='text-red-600 text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif'>Sign In First</div>
        </div>
    );

    const profile = await getUserProfile(getSession.user.token)

    return(
        <main className="flex flex-col items-center">
            <div className="flex flex-row justify-center mt-5">
                <div className='text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif'>User Detail</div>
            </div>
            
            {
                profile ? <div className="bg-white rounded-2xl p-3 mt-2 font-serif">
                            <div>Name : {profile.data.name}</div>
                            <div>Email : {profile.data.email}</div>
                            <div>Tel : {profile.data.tel}</div>
                        </div> :   ""
            }
        </main>
    );
}