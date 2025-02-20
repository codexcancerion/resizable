/* eslint-disable */
import { NextResponse } from 'next/server';
import sharp from 'sharp';

// Define accepted image file types and MIME types
const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const MIME_TYPES: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
};

// Function to handle file upload validation
async function handleUpload(req: Request): Promise<{ fileBuffer: Buffer; fileName: string; fileFormat: string }> {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return Promise.reject({ status: 400, message: 'No file uploaded' });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

        if (!ALLOWED_IMAGE_TYPES.includes(fileExtension)) {
            return Promise.reject({ status: 415, message: 'Unsupported file format' });
        }

        return { 
            fileBuffer, 
            fileName: `${Date.now()}-${file.name}`, 
            fileFormat: fileExtension 
        };
    } catch (error) {
        return Promise.reject({ status: 500, message: 'File upload failed' });
    }
}

// Function to resize the image while preserving its format
const resizeImage = async (inputBuffer: Buffer, fileFormat: string): Promise<Buffer> => {
    try {
        return await sharp(inputBuffer)
            .resize({ width: 1000 }) // Default resizing
            .toFormat(fileFormat as any, { quality: 70 }) // Retain original format
            .toBuffer();
    } catch (error) {
        throw new Error('Image processing failed');
    }
};

// Handle POST requests
export async function POST(req: Request) {
    try {
        if (req.method === 'OPTIONS') {
            return new NextResponse(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        // Process uploaded image
        const { fileBuffer, fileName, fileFormat } = await handleUpload(req);
        const resizedBuffer = await resizeImage(fileBuffer, fileFormat);

        return new Response(resizedBuffer, {
            status: 200,
            headers: {
                'Content-Type': MIME_TYPES[fileFormat],
                'Content-Disposition': `attachment; filename="resized-${fileName}"`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error(error);

        let status = 500;
        let message = 'Image processing failed';

        if (error.status) {
            status = error.status;
            message = error.message;
        }

        return new Response(
            JSON.stringify({ error: message }),
            { status, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
