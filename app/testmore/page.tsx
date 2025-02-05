"use client"

import { compressImage } from "@/components/upload";
import React from "react";



export default function App() {
    const [compressedFile, setCompressedFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState<string>('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setFileName(file.name);
                const compressed = await compressImage(file);
                setCompressedFile(compressed); // Set the compressed file
            } catch (error) {
                console.error('Failed to upload and compress image', error);
            }
        }
    };

    const handleDownload = () => {
        if (compressedFile) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(compressedFile);
            link.download = fileName.replace(/\.[^/.]+$/, "") + '-compressed.jpg'; // Ensure proper download filename
            link.click();
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            {compressedFile && (
                <div>
                    <button onClick={handleDownload}>Download Compressed Image</button>
                </div>
            )}
        </div>
    );
}