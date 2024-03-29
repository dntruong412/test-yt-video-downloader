import express from 'express';
import { getInfo } from '@/utils/youtube.js';

const app = express();

app.get('/videos/:videoId', async (req, res) => {
    const video = await getInfo(req.params.videoId);
    if (!video) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    res.json(video);
});

export default app;