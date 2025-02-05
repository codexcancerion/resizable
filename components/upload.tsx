import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 1, // Maximum file size in MB
        maxWidthOrHeight: 1000, // Resize the image to a maximum of 1000px in width/height
        useWebWorker: true, // Use a Web Worker for background compression (recommended for large files)
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile; // Return the compressed file itself
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
};

