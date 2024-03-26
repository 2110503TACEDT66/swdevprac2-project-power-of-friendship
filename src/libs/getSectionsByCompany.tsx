export default async function getSectionsByCompany(token: string | undefined, id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}/sections`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch sections by company ID")
    }
    
    return await response.json()
}