import { resolve } from "path";

export default async function getCompnies() {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`, {next: {tags: ['companies']}})
    if (!response.ok) {
        throw new Error("Failed to fetch companies")
    }
    
    return await response.json()
}