import ytdl from 'ytdl-core';

export async function getInfo(url) {
    let info = null;

    try {
        if (ytdl.validateURL(url)) {
            throw new Error('Invalid YouTube URL');
        }

        info = await ytdl.getInfo(url);
        if (!info) {
            throw new Error('Error when get video information');
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return {
        title: info.videoDetails.title,
        author: {
            name: info.videoDetails.author?.name,
            channel_url: info.videoDetails.author?.channel_url,
        },
        avatar: info.videoDetails.thumbnails.at(0)?.url,
        url: ytdl.chooseFormat(info.formats, { quality: 'highest' }).url
    };
}