"use client";
/* eslint-disable */

import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { Lens } from "../magicui/lens";
import getImageFileSize from "@/utils/ImageSize";
import { convertBytesToMB } from "@/utils/SizeConverter";

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
                setRawFileSize(convertBytesToMB(size || 0));
            });
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
            const file = new File([blob], "resized_file", { type: blob.type });

            setResizedFile(file);
            setProcessedFileSize(convertBytesToMB(blob.size));

            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full py-14 px-6 lg:px-32 bg-gradient-to-b from-gray-100 to-gray-200">
            {/* Section Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl font-extrabold text-gray-900 text-center"
            >
                🧪 TEST OUR <span className="text-blue-600">IMAGE RESIZING</span> PIPELINE
            </motion.h2>
            <hr className="h-1 bg-gray-300 mt-4 mb-8" />

            <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Left - Input */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
                >
                    <h3 className="text-xl font-semibold text-gray-800">Upload an Image</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border bg-gray-50 p-3 rounded-lg w-full text-gray-500 hover:border-blue-500 transition focus:ring-2 focus:ring-blue-500"
                    />

                    {previewUrl && (
                        <div className="border p-4 w-full flex items-center justify-center bg-white rounded-lg shadow-md">
                            <Lens zoomFactor={2} lensSize={150} isStatic={false}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-h-60 object-contain rounded"
                                />
                            </Lens>
                        </div>
                    )}

                    {file && (
                        <p className="text-gray-700">
                            File size:{" "}
                            <span className="text-blue-600 font-bold">
                                {rawFileSize.toFixed(2)}
                            </span>{" "}
                            MB
                        </p>
                    )}

                    <Button
                        onPress={handleUpload}
                        isDisabled={loading || !file}
                        variant="solid"
                        color="primary"
                        className="w-full text-lg font-medium rounded-lg py-2 transition-transform transform hover:scale-105"
                    >
                        {loading ? "Processing..." : "Resize"}
                    </Button>
                </motion.div>

                {/* Right - Output */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
                >
                    <h3 className="text-xl font-semibold text-gray-800">Result</h3>

                    {loading ? (
                        <Spinner size="lg" />
                    ) : (
                        imageUrl && (
                            <>
                                <div className="border p-4 w-full flex items-center justify-center bg-white rounded-lg shadow-md">
                                    <Lens zoomFactor={2} lensSize={150} isStatic={false}>
                                        <img
                                            src={imageUrl}
                                            alt="Resized"
                                            className="max-h-60 object-contain rounded"
                                        />
                                    </Lens>
                                </div>

                                <p className="text-gray-700">
                                    File size:{" "}
                                    <span className="text-green-600 font-bold">
                                        {processedFileSize.toFixed(2)}
                                    </span>{" "}
                                    MB
                                </p>
                                <p className="text-gray-700">
                                    Compression:{" "}
                                    <span className="text-green-600 font-bold">
                                        {(
                                            100 -
                                            (processedFileSize / rawFileSize) * 100
                                        ).toFixed(2)}
                                    </span>{" "}
                                    %
                                </p>

                                <a
                                    href={imageUrl}
                                    download="resized-image.jpg"
                                    className="w-full text-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                                >
                                    Download Resized Image
                                </a>
                            </>
                        )
                    )}

                    {error && (
                        <p className="text-red-500 mt-2 text-center">{error}</p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
