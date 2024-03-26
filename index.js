require('module-alias/register');

import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import videos from '@/routes/videos.js';

const app = express();
app.disable('x-powered-by');

app.use(compression());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10 // limit each IP to 10 requests per windowMs
});
app.use(limiter);

app.use(videos);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});