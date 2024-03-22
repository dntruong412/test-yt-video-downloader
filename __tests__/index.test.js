const ytdl = require('ytdl-core');
const { downloader } = require('../index.js');
const jest = require('jest');

jest.mock('ytdl-core');

describe('downloader', () => {
    test('should return video URL for a valid YouTube link', async () => {
        const mockUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
        const mockVideoUrl = 'https://example.com/video.mp4';

        // Mock the getInfo method of ytdl
        ytdl.getInfo.mockResolvedValue({
            formats: [{ url: mockVideoUrl }]
        });

        // Call the downloader function with mock URL
        const result = await downloader(mockUrl);

        // Check if the correct video URL is returned
        expect(result).toBe(mockVideoUrl);
    });

    test('should return null and log error for an invalid YouTube link', async () => {
        const mockInvalidUrl = 'invalidURL';

        // Mock the validateURL method of ytdl
        ytdl.validateURL.mockReturnValue(false);

        // Call the downloader function with mock invalid URL
        const result = await downloader(mockInvalidUrl);

        // Check if null is returned
        expect(result).toBeNull();
    });

    test('should return null and log error when getInfo throws an error', async () => {
        const mockUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
        const mockError = new Error('Mock error');

        // Mock the getInfo method of ytdl to throw an error
        ytdl.getInfo.mockRejectedValue(mockError);

        // Call the downloader function with mock URL
        const result = await downloader(mockUrl);

        // Check if null is returned
        expect(result).toBeNull();
    });
});