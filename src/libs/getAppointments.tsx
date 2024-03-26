export default async function getAppointments(token: string | undefined) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/appointments`,{
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.error("Failed to fetch appointments:", response.statusText);
        throw new Error("Failed to fetch appointments")
    }
    
    return await response.json()
}