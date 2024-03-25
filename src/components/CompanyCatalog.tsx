import Link from "next/link"
import ProductCard from "./ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";

export default async function CompanyCatalog({companyJson} : {companyJson:Object}){

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    const createCompany = async (addCompanyForm: FormData) => {
        'use server'
        const name = addCompanyForm.get("name")
        const address = addCompanyForm.get("address")
        const website = addCompanyForm.get("website")
        const description = addCompanyForm.get("desc")
        const picture = addCompanyForm.get("picture")
        const tel = addCompanyForm.get("tel")

        try {
            const section = await fetch('http://localhost:5000/api/v1/companies', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    website: website,
                    description: description,
                    picture: picture,
                    tel: tel
                })
            });

            console.log(section)
        } catch (error) {
            console.log(error);
        }
    }

    const companyJsonReady = await companyJson

    let gay = 0;

    return (
        <>
            <h1 className="text-black">Explore {companyJsonReady.count} models in our catalog</h1>
            <div style={{margin : '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'space-around'}} key={gay++}>
                {
                    companyJsonReady.data.map((companyItem:Object) => (
                        <Link href={ `/company/${companyItem.id}` } className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                            <ProductCard companyName={companyItem.name} imgSrc={companyItem.picture} />
                        </Link>
                    ))
                }
            </div>

            {
                (profile.data.role == "admin")?
                <form action={createCompany} className="flex flex-col items-center">
                    <div className="text-xl text-black">Create Company</div>
                    <div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                            <input type="text" required id="name" name="name" placeholder="Name" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                            <input type="text" required id="address" name="address" placeholder="Address" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="website">Website</label>
                            <input type="text" required id="website" name="website" placeholder="Website" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">Desciption</label>
                            <input type="text" required id="desc" name="desc" placeholder="Car Desciption" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                            <input type="text" required id="picture" name="picture" placeholder="URL" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel</label>
                            <input type="text" required id="tel" name="tel" placeholder="Tel" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                    </div>
                    
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Company</button>
                </form> 
                : null
            }
        </>
        
    )
}