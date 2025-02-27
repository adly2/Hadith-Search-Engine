const express = require('express');
const axios = require('axios')
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hadith Search API');
});

app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.status(400).send('Query parameter "q" is required');
    }

    try {
        const response = await axios.get('https://www.hadithapi.com/api/hadiths', {
            params: {
                hadithEnglish: searchQuery,
                apiKey: process.env.HADITH_API_KEY
            }
        });
        if(response.data.status == 404){
            res.end("reached here");
        }
        res.json({
            hadiths: [
                response.data.hadiths.data[0],
                response.data.hadiths.data[1],
                response.data.hadiths.data[2],
                response.data.hadiths.data[3],
                response.data.hadiths.data[4]
            ]
        });
    } catch (error) {
        if(error.response.status == 404){
            return res.json({ hadiths: [] });
        } else {
            res.status(500).send('Error fetching Hadiths' + error.response.status);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});