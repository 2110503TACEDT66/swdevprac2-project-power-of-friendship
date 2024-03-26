export default async function deleteAppointment(token: string | undefined, id: string) {
    const response = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.error("Failed to delete appointment:", response.statusText);
        throw new Error("Failed to fetch appointmet")
    }

    return await response.json()
}