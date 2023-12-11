const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle API requests
app.get('/video/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube API key

    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,status`);
        const videoDetails = response.data.items[0].snippet;
        res.json(videoDetails);
    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
