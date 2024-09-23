
export default async function handler(req, res) {
    try {
        // Fetch the data from the insecure HTTP endpoint
        const response = await fetch('http://metaphorpsum.com/paragraphs/1/6');
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.text();
        console.log(response.text())
        // Return the data securely to the frontend
        res.status(200).send(data);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
