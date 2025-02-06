"use client";

import { useState } from "react";

export default function LandingPage() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        setLoading(true);
        setError(null);
        setImageUrl(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://resizableapi.vercel.app/api/resize", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process image");
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            setImageUrl(imageUrl);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-gray-900">
                    RESIZABLE <span className="text-blue-600">API</span>
                </h1>
                <p className="text-gray-700 mt-3 text-lg">Sometimes, Smaller is <span className="text-blue-500 font-bold">Better</span></p>
            </header>

            <section className="w-full max-w-4xl bg-gray-100 rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-between items-center gap-6">
                    <div className="flex flex-col items-center w-1/2">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 border p-2 rounded w-full" />
                        <div className="border p-4 w-full flex items-center justify-center bg-white shadow-md rounded-lg">
                            {previewUrl ? <img src={previewUrl} alt="Preview" className="max-h-full max-w-full rounded-lg" /> : <p className="text-gray-400">Image preview</p>}
                        </div>
                        <button onClick={handleUpload} disabled={loading} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50">
                            {loading ? "Processing..." : "Resize"}
                        </button>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                        <div className="border p-4 w-full flex items-center justify-center bg-white shadow-md rounded-lg">
                            {imageUrl ? <img src={imageUrl} alt="Resized" className="max-w-full h-auto rounded-lg" /> : <p className="text-gray-400">Image preview</p>}
                        </div>
                        {imageUrl && <a href={imageUrl} download="resized-image.jpg" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">Download</a>}
                    </div>
                </div>
                {loading && <div className="mt-6 animate-spin h-10 w-10 border-t-4 border-blue-500 rounded-full"></div>}
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </section>

            <section className="w-full max-w-4xl bg-white p-6 mt-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">INTEGRATE <span className="text-blue-600">RESIZABLE</span> ON YOUR SYSTEM</h2>
                <div className="bg-gray-200 p-4 rounded-lg text-sm">
                    <pre>{`
const formData = new FormData();
formData.append("file", file); // file contains the image file

fetch('https://resizableapi.vercel.app/api/resize', {
    method: 'POST',
    body: formData,
}).then(response => response.blob())
  .then(blob => {
      const url = URL.createObjectURL(blob);
      console.log("Resized image URL:", url);
  });
  `}
                    </pre>
                </div>
            </section>
        </div>
    );
}
