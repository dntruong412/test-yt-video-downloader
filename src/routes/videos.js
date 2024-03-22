import express from 'express';
import { downloader } from '../downloader.js';

const app = express();

app.get('/videos/:videoId', async (req, res) => {
    try {
        // Choose highest quality format
        const video = await downloader(req.params.videoId);

        // Send video URL in response
        res.json({
            url: video?.url
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default app;