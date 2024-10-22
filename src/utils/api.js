export async function fetchCountries() {
    const response = await fetch('/api/countries');
    if (!response.ok) {
        throw new Error('Failed to fetch countries');
    }
    return await response.json();
}
