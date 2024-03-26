export default async function createAppointment(token: string | undefined, id: string, date: Date, userId: string) {
    const response = await fetch(`http://localhost:5000/api/v1/companies/${id}/appointments`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appDate: date,
          user: userId
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch company')
    }
    
    return await response.json()
}