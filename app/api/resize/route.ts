/* eslint-disable */
import { NextResponse } from 'next/server';
import sharp from 'sharp';

// Define accepted image file types
const ALLOWED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];

async function handleUpload(req: Request): Promise<{ fileBuffer: Buffer; fileName: string; mimeType: string }> {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) throw new Error('No file uploaded');

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
    };
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = mimeTypes[`.${fileExtension}`] || 'application/octet-stream';

    if (!ALLOWED_IMAGE_TYPES.includes(`.${fileExtension}`)) {
        throw new Error('Unsupported file type');
    }

    return { fileBuffer, fileName, mimeType };
}

const resizeImage = async (inputBuffer: Buffer): Promise<Buffer> => {
    return await sharp(inputBuffer)
        .resize({ width: 1000 })
        .toFormat('jpeg', { quality: 70 })
        .toBuffer();
};

// Handle POST requests
export async function POST(req: Request) {
    try {
        // Handle CORS for preflight requests
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
        const { fileBuffer, fileName } = await handleUpload(req);
        const resizedBuffer = await resizeImage(fileBuffer);

        // Return resized image as response
        return new Response(resizedBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="resized-${fileName}.jpg"`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error: any) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: error.message || 'Image processing failed' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
