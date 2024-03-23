import Link from "next/link"
import ProductCard from "./ProductCard";

export default async function CarCatalog({carJson} : {carJson:Object}){

    const carJsonReady = await carJson

    let gay = 0;

    return (
        <>
        Explore {carJsonReady.count} models in our catalog
            <div style={{margin : '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'space-around'}} key={gay++}>
                {
                    carJsonReady.data.map((carItem:Object) => (
                        <Link href={ `/car/${carItem.id}` } className="w-1/5">
                            <ProductCard carName = {carItem.model} imgSrc={carItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
        
    )
}