import Link from "next/link"
import ProductCard from "./ProductCard";

export default async function CompanyCatalog({companyJson} : {companyJson:Object}){

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
        </>
        
    )
}