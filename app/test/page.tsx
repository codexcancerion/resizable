"use client";

import { useState } from "react";

export default function LandingPage() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
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
            const response = await fetch("/api/resize", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process image");
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            // Create a temporary link to download the file directly
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "resized-image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setImageUrl(imageUrl);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Resizable API</h1>
                <p className="text-gray-700 mt-2">An easy-to-use API for resizing images quickly and efficiently.</p>
            </header>

            <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Try It Out</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 border p-2 rounded w-full" />
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50">
                    {loading ? "Processing..." : "Upload & Resize"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {imageUrl && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Resized Image:</h2>
                        <img src={imageUrl} alt="Resized" className="mt-2 border p-2 max-w-full" />
                    </div>
                )}
            </section>

            <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">How to Implement</h2>
                <p className="text-gray-700">Integrating Resizable API into your project is simple:</p>
                <pre className="bg-gray-200 p-4 rounded mt-4 overflow-x-auto">
                    {`fetch('/api/resize', {
    method: 'POST',
    body: formData,
}).then(response => response.blob())
  .then(blob => {
      const url = URL.createObjectURL(blob);
      console.log("Resized image URL:", url);
  });`}
                </pre>
            </section>
        </div>
    );
}
