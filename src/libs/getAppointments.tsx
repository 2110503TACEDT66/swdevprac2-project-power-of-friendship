export default async function getAppointments(token: string | undefined) {
    const response = await fetch("http://localhost:5000/api/v1/appointments",{
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