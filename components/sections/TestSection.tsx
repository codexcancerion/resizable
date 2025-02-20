"use client"

import { useState } from "react";
import { Button, Spinner } from "@heroui/react"
import getImageFileSize from "@/utils/ImageSize";
import { convertBytesToMB } from "@/utils/SizeConverter";
import { Lens } from "../magicui/lens";

export default function TestSection() {
    const [file, setFile] = useState<File | null>(null);
    const [resizedFile, setResizedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rawFileSize, setRawFileSize] = useState(0);
    const [processedFileSize, setProcessedFileSize] = useState(0);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            getImageFileSize(selectedFile).then((size) => {
                return setRawFileSize(convertBytesToMB(size || 0));
            })
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

            const file = new File([blob], "resized_file", { type: blob.type });
            setResizedFile(file);
            getImageFileSize(file).then((size) => {
                setProcessedFileSize(convertBytesToMB(size || 0))
            })

            setImageUrl(imageUrl);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-slate-200 py-14 px-60">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Test our
                <span className="text-blue-600"> Image Resizing </span>
                Pipeline
            </h2>
            <hr className="h-1 bg-gray-300" />

            <div className="flex gap-6 py-4">
                <div className="flex flex-col items-start w-1/2 gap-3">
                    <h2 className="text-xl font-bold text-gray-800">Input</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border bg-gray-50 p-2 text-gray-500 rounded w-full"
                    />

                    {file !== null &&
                        <>
                            <div className="border p-4 w-full flex items-center justify-center bg-white rounded-2xl">
                                {previewUrl ?
                                    <Lens
                                        zoomFactor={2}
                                        lensSize={150}
                                        isStatic={false}
                                        ariaLabel="Zoom Area"
                                    >
                                        <img src={previewUrl} alt="Preview" className="max-h-full max-w-full rounded" />
                                    </Lens>
                                    :
                                    <p className="text-gray-400">Image preview</p>
                                }
                            </div>

                            <div>
                                <p className="text-gray-700">
                                    File size :
                                    <span className="text-purple-800 font-bold"> {rawFileSize}</span> MB
                                </p>
                            </div>
                        </>
                    }

                    <Button
                        onPress={handleUpload}
                        isDisabled={loading || !file}
                        variant="solid"
                        color="primary"
                    >
                        {loading ? "Processing..." : "Resize"}
                    </Button>
                </div>

                {(!loading && resizedFile !== null) &&
                    <div className="flex flex-col items-start w-1/2 gap-3">
                        <h2 className="text-xl font-bold text-gray-800">Output</h2>
                        <div className="border p-4 w-full flex items-center justify-center bg-white rounded-2xl">
                            {imageUrl ?
                                <Lens
                                    zoomFactor={2}
                                    lensSize={150}
                                    isStatic={false}
                                    ariaLabel="Zoom Area"
                                >
                                    <img src={imageUrl} alt="Resized" className="max-w-full h-auto rounded" />
                                </Lens>
                                :
                                <p className="text-gray-400">Image preview</p>
                            }
                        </div>

                        <div>
                            <p className="text-gray-700">
                                File size :
                                <span className="text-purple-800 font-bold"> {processedFileSize}</span> MB
                            </p>
                            <p className="text-gray-700">
                                Size reduction rate :
                                <span className="text-purple-800 font-bold"> {(100 - (processedFileSize / rawFileSize)).toFixed(2)} </span> %
                            </p>
                        </div>

                        {imageUrl && <a href={imageUrl} download="resized-image.jpg" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">Download</a>}
                    </div>
                }

                {loading &&
                    <div className="flex flex-col items-center justify-center w-1/2 gap-3">
                        <Spinner
                            size="lg"
                        />
                    </div>
                }
            </div>

            {error && <p className="text-red-500 mt-3">{error}</p>}
        </section>
    )
}