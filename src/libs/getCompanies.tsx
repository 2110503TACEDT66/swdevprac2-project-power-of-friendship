import { resolve } from "path";

export default async function getCompnies() {

    const response = await fetch(`http://localhost:5000/api/v1/companies`, {next: {tags: ['companies']}})
    if (!response.ok) {
        throw new Error("Failed to fetch companies")
    }
    
    return await response.json()
}