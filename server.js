const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Use 'npm install node-fetch'

const app = express();
app.use(cors()); // This allows your GitHub page to talk to this server
app.use(express.json());

const GROQ_KEY = "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"; 

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch("https://groq.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: req.body.messages
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Backend failed to connect to Groq" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
