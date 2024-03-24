import getCompanies from "@/libs/getCompanies";
import CompanyCatalog from "@/components/CompanyCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
// import CarPanel from "@/components/CarPanel";

export default function Company() {

    const companies = getCompanies()

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Company</h1>
            <Suspense fallback = {<p>Loading... <LinearProgress/></p>}>
                <CompanyCatalog companyJson={companies}/>
            </Suspense>

            {/* <hr className="my-10"/>

            <h1 className="text-xl font-medium">TRY Client-side Car Panel</h1>
            <CarPanel/> */}
        </main>
    );
}