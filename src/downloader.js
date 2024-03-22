import ytdl from 'ytdl-core';

export async function downloader(url) {
    if (ytdl.validateURL(url)) {
        console.error('Invalid YouTube URL');
        return null;
    }

    try {
        let info = await ytdl.getInfo(url);

        return ytdl.chooseFormat(info.formats, { quality: 'highest' });
    } catch (error) {
        console.error(error)
    }

    return null;
}