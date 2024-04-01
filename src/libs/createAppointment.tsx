export default async function createAppointment(token: string | undefined, id: string | null, date: Date, userId: string) {
  
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${id}/appointments`, {
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