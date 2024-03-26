export default async function createComapany(data: Object, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to fetch company')
    }
    
    return await response.json()
}