"use client";

import { motion } from "framer-motion";
import { BoxReveal } from "../magicui/box-reveal";

export default function ApiSpecificationsSection() {
    return (
        <div className="w-5/6 items-center justify-center overflow-hidden pt-8">
            <BoxReveal duration={1}>
                <section className="w-full bg-white py-14 px-10 md:px-20 lg:px-60">
                    {/* Section Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl font-extrabold text-gray-900 text-center"
                    >
                        💡 WHAT OUR <span className="magicui-hyper text-blue-600">API</span> LOOKS LIKE?
                    </motion.h2>

                    <hr className="h-1 bg-gray-300 mb-6" />

                    {/* Endpoint */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">📌 Endpoint</h3>
                            <p><strong>Method:</strong> <code className="bg-gray-100 px-1 rounded">POST</code></p>
                            <p><strong>URL:</strong> <code className="bg-gray-100 px-1 rounded">/resize</code></p>
                            <p><strong>Content-Type:</strong> <code className="bg-gray-100 px-1 rounded">multipart/form-data</code></p>
                            <p className="mt-2 text-gray-700">Accepts an image file, resizes it based on optional parameters, and returns the optimized version.</p>
                        </div>
                    </BoxReveal>

                    {/* Request Payload */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">📥 Request Payload</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    <strong>file</strong> (File, required) - The image file to be resized.
                                    <br />
                                    <span className="text-gray-600">Supported formats: JPG, JPEG, PNG, WebP.</span>
                                </li>
                            </ul>
                        </div>
                    </BoxReveal>

                    {/* Response */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">📤 Response</h3>
                            <p className="text-gray-700">The resized image file is returned as a downloadable binary stream.</p>
                            <p className="mt-2"><strong>Headers:</strong></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-100 px-1 rounded">Content-Type: image/jpeg</code></li>
                                <li><code className="bg-gray-100 px-1 rounded">Content-Disposition: attachment; filename="resized-image.jpg"</code></li>
                            </ul>
                        </div>
                    </BoxReveal>

                    {/* Error Handling */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">⚠️ Error Handling</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>400 Bad Request:</strong> Missing or invalid parameters.</li>
                                <li><strong>415 Unsupported Media Type:</strong> File format not supported.</li>
                                <li><strong>500 Internal Server Error:</strong> Unexpected error during processing.</li>
                            </ul>
                        </div>
                    </BoxReveal>
                </section>
            </BoxReveal>
        </div>
    );
}
