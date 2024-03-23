import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Car from "@/db/Models/Car";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage(){

    const addCar = async (addCarForm:FormData) =>{
        'use server'
        const model =  addCarForm.get('model')
        const description = addCarForm.get('desc')
        const picture = addCarForm.get('picture')
        const seats = addCarForm.get('seats')
        const doors = addCarForm.get('doors')
        const largebags = addCarForm.get('largebags')
        const smallbags = addCarForm.get('smallbags')
        const automatic = true
        const dayRate = addCarForm.get('dayRate')

        try{
            await dbConnect()
            const car = await Car.create({
                "model" : model,
                "description" : description,
                "picture" : picture,
                "seats": seats,
                "doors":doors,
                "largebags":largebags,
                "smallbags":smallbags,
                "automatic":automatic,
                "dayRate":dayRate
            })
        }catch(error){
            console.log(error);
        }
        
        revalidateTag('cars')
        redirect('/car')

    }

    const session = await getServerSession(authOptions)

    if(!session || !session.user.token) return null
    
    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className = 'bg-slate-100 m-5 p-5'>
            <div className="text-2xl">{profile.data.name}</div>
                <table className="table-auto border-separate border-spacing-2">
                <tbody className="table-auto border-serparate border-spacing-2">
                    <tr><td>Email</td>{profile.data.email}</tr>
                    <tr><td>Tel.</td>{profile.data.tel}</tr>
                    <tr><td>Member Since</td>{createdAt.toString()}</tr>
                </tbody></table>
                {
                    (profile.data.role == 'admin')?
                    <form action={addCar}>
                        <div className="text-xl text-blue-700">Create Car Model</div>
                        <div className="flex items-center w-1/2 my-2">
                            <label htmlFor="model" className="w-auto block text-gray-700 pr-4">
                                Model
                            </label>
                            <input type="text" required id ="model" name="model" placeholder="Car Model" className="bg-white border-2
                            border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label htmlFor="desc" className="w-auto block text-gray-700 pr-4">
                                Description
                            </label>
                            <input type="text" required id ="desc" name="desc" placeholder="Car Description" className="bg-white border-2
                            border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label htmlFor="picture" className="w-auto block text-gray-700 pr-4">
                                Picture
                            </label>
                            <input type="text" required id ="picture" name="picture" placeholder="Car Picture" className="bg-white border-2
                            border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex items-center w-1/2 my-2">
                            <label htmlFor="seats" className="w-auto block text-gray-700 pr-4">
                                Seats
                            </label>
                            <input type="number" required id ="seats" name="seats" placeholder="4" 
                            min={0} max={50} 
                            className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                            <label htmlFor="doors" className="w-auto block text-gray-700 pr-4 ml-5">
                                Doors
                            </label>
                            <input type="number" required id ="doors" name="doors" placeholder="4" 
                            min={0} max={8} 
                            className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                            <input type="checkbox" id="automatic" name="automatic" className="ml-5 mr-2"/><span>Auto</span>
                        </div>
                        
                    </form> : null
                }
            
        </main>
    );
}
