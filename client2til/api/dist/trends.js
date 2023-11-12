const express = require('express');
const googleTrends = require('google-trends-api');
const app = express();
const port = 3002;
const cors = require('cors');

app.get('/trends', (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).send('Keyword is required');
    }

    googleTrends.interestOverTime({ keyword: keyword })
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
