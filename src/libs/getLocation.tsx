export default async function getLocation(address: string) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyD_7CKN7QIjeCTb6LzTnWh7eF4yrku3CPQ`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error("Failed to fetch location")
    }
    
    return await response.json()
}