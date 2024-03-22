const ytdl = require('ytdl-core');

async function downloader(url) {
    // Validate YouTube URL
    if (ytdl.validateURL(url)) {
        console.error('Invalid YouTube URL');
        return null;
    }

    try {
        let info = await ytdl.getInfo(url);

        return ytdl.chooseFormat(info.formats, { quality: 'highest' }).url;
    } catch (error) {
        console.error(error)
    }

    return null
}

(async () => console.log(await downloader("aqz-KE-bpKQ")))();