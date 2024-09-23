const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/proxy', async (req, res) => {
    try {
        const response = await axios.get('http://metaphorpsum.com/paragraphs/1/6');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
