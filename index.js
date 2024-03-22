const ytdl = require('ytdl-core');

async function downloader(url) {
    // Validate YouTube URL
    if (ytdl.validateURL(url)) {
        console.error('Invalid YouTube URL');
        return null;
    }

    try {
        let info = await ytdl.getInfo(url);

        const videoUrl = await ytdl.chooseFormat(info.formats, { quality: 'highest' }).url;
        return videoUrl;
    } catch (error) {
        console.error(error)
    }

    return null
}

downloader("aqz-KE-bpKQ");