export default async function getDistanceAndDuration(companyName: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/calculate-distance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: companyName
                }),
            });
    if (!response.ok) {
        throw new Error("Failed to fetch sections by company ID")
    }
    
    return await response.json()
}