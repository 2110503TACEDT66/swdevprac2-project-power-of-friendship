import getCompanies from "@/libs/getCompanies";
import CompanyCatalog from "@/components/CompanyCatalog";

import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Company() {

    const companies = await getCompanies()

    return (
        <main className="text-center p-5">
            <div className="text-center flex flex-col items-center">
                <h1 className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif">Select Your Company</h1>
            </div>
            <Suspense fallback = {<p>Loading... <LinearProgress/></p>}>
                <CompanyCatalog companyJson={companies}/>
            </Suspense>
        </main>
    );
}