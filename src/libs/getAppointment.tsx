export default async function getAppointment(token: string | undefined, id: string) {
    const response = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch appointment")
    }

    return await response.json()
}