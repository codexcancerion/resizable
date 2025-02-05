/* eslint-disable */

import { NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

// Define accepted image file types and max file size
const ALLOWED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

async function handleUpload(req: Request): Promise<{ filePath: string; fileName: string }> {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) throw new Error('No file uploaded');
    
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `/tmp/uploads/${fileName}`;

    await fs.ensureDir('/tmp/uploads');
    await fs.writeFile(filePath, fileBuffer);

    return { filePath, fileName };
}

const resizeImage = async (filePath: string, outputFilePath: string, quality: number) => {
    await sharp(filePath)
        .resize({ width: 1000 })
        .toFormat('jpeg', { quality }) // Use dynamic quality
        .toFile(outputFilePath);
};

// Handle POST requests
export async function POST(req: Request) {
    // Handle preflight OPTIONS request first
    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }

    try {
        // Set CORS headers to allow any origin
        const response = new NextResponse(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });

        const formData = await req.formData();
        const qualityParam = formData.get('quality');
        let quality = 70; // Default quality value

        if (qualityParam) {
            const parsedQuality = parseInt(qualityParam.toString());
            if (!isNaN(parsedQuality) && parsedQuality >= 0 && parsedQuality <= 100) {
                quality = parsedQuality;
            } else {
                return new Response(
                    JSON.stringify({ error: 'Invalid quality value. It must be a number between 0 and 100.' }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }
        }

        const { filePath, fileName } = await handleUpload(req);
        const fileExtension = path.extname(fileName).toLowerCase();
        const resizedPath = `/tmp/uploads/resized-${fileName}`;

        if (!ALLOWED_IMAGE_TYPES.includes(fileExtension)) {
            return new Response(
                JSON.stringify({ error: 'Unsupported file type' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Resize the image with dynamic quality
        await resizeImage(filePath, resizedPath, quality);

        // Read the resized file and prepare response
        const fileBuffer = await fs.readFile(resizedPath);
        const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
        };
        const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': mimeType,
                'Content-Disposition': `attachment; filename="${fileName}"`,
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
