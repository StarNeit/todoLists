
//get all countries.
/**
 *
 * @return {Promise<Response>}
 * @constructor
 */
export async function GET() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const countryList = countries.map((country) => ({
        name: country.name.common,
        code: country.cca2,
    }));

    return new Response(JSON.stringify(countryList), {
        headers: { 'Content-Type': 'application/json' },
    });
}
