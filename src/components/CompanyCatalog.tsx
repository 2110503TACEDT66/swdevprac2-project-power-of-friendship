import Link from "next/link";
import ProductCard from "./ProductCard";
import getUserProfile from "@/libs/getUserProfile";

import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import createComapany from "@/libs/createCompany";

export default async function CompanyCatalog({companyJson} : {companyJson: CompanyJson}) {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    console.log(session);

    const profile = await getUserProfile(session.user.token)
    const createCom = async (addCompanyForm: FormData) => {
        'use server'
        const data = {
            "name": addCompanyForm.get("name"),
            "address": addCompanyForm.get("address"),
            "website": addCompanyForm.get("website"),
            "description": addCompanyForm.get("desc"),
            "picture": addCompanyForm.get("picture"),
            "tel": addCompanyForm.get("tel")
        }

        try {
            await createComapany(data, session.user.token)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const companyJsonReady: CompanyJson = await companyJson
    

    let index = 0;

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-black font-serif text-sm mt-2">Explore {companyJsonReady.count} companies </h1>
            <div style={{margin : '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'space-around'}} key={index++}>
                {
                    companyJsonReady.data.map((companyItem:companyItem) => (
                        <Link href={ `/company/${companyItem.id}` } className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[20%] p-2 sm:p-4 md:p-4 lg:p-4">
                            <ProductCard companyName={companyItem.name} imgSrc={companyItem.picture} />
                        </Link>
                    ))
                }
            </div>

            {
                (profile.data.role == "admin") ?
                <form action={createCom} className="flex flex-col items-center bg-white w-fit py-5 px-10 rounded-2xl">
                    <div className="mt-3">
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4 font-serif" htmlFor="name">Name</label>
                            <input type="text" required id="name" name="name" placeholder="Name" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                            <input type="text" required id="address" name="address" placeholder="Address" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="website">Website</label>
                            <input type="text" required id="website" name="website" placeholder="Website" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">Desciption</label>
                            <input type="text" required id="desc" name="desc" placeholder="Car Desciption" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                            <input type="text" required id="picture" name="picture" placeholder="URL" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel</label>
                            <input type="text" required id="tel" name="tel" placeholder="Tel" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                    </div>
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-800 text-white p-2 rounded-xl mt-3 font-serif">Add New Company</button>
                </form> 
                : null
            }
        </div>
    )
}