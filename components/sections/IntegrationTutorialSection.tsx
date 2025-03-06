"use client";

import { useState } from "react";
import { BoxReveal } from "../magicui/box-reveal";

export default function IntegrationTutorialSection() {
    const [activeTab, setActiveTab] = useState("javascript");

    return (
        <div className="w-5/6 items-center justify-center overflow-hidden pt-8">
            <BoxReveal duration={1}>
                <section className="w-full bg-white py-14 px-10 md:px-20 lg:px-60">
                    {/* Section Title */}
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center">
                        🚀 INTEGRATE <span className="text-blue-600">RESIZABLE</span> INTO YOUR SYSTEM
                    </h2>
                    <hr className="h-1 bg-gray-300 mb-6" />

                    {/* Tabs */}
                    <BoxReveal duration={0.8}>
                        <div className="flex justify-center space-x-4 border-b pb-2">
                            {["JavaScript", "Next.js", "Python", "cURL"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`text-lg font-semibold px-4 py-2 rounded-t-lg transition-all 
                                ${activeTab.toLowerCase() === tab.toLowerCase() ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}`}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </BoxReveal>

                    {/* Code Blocks */}
                    <BoxReveal duration={0.8}>
                        <div className="bg-gray-900 text-white p-4 rounded-lg text-sm mt-4 overflow-x-auto">
                            {activeTab === "javascript" && (
                                <pre className="whitespace-pre-wrap">
                                    {`
const formData = new FormData();
formData.append("file", file);

fetch('https://resizableapi.vercel.app/api/resize', {
    method: 'POST',
    body: formData,
})
.then(response => response.blob())
.then(blob => {
    const url = URL.createObjectURL(blob);
    console.log("Resized image URL:", url);
});
`}
                                </pre>
                            )}

                            {activeTab === "next.js" && (
                                <pre className="whitespace-pre-wrap">
                                    {`
export async function resizeImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch('/api/resize', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error("Failed to resize image");
    return await response.blob();
}
`}
                                </pre>
                            )}

                            {activeTab === "python" && (
                                <pre className="whitespace-pre-wrap">
                                    {`
import requests

url = "https://resizableapi.vercel.app/api/resize"
files = {'file': open('image.jpg', 'rb')}

response = requests.post(url, files=files)

if response.status_code == 200:
    with open("resized-image.jpg", "wb") as f:
        f.write(response.content)
    print("Image resized successfully!")
else:
    print("Error:", response.status_code, response.text)
`}
                                </pre>
                            )}

                            {activeTab === "curl" && (
                                <pre className="whitespace-pre-wrap">
                                    {`
curl -X POST https://resizableapi.vercel.app/api/resize \
     -F "file=@image.jpg" \
     -o resized-image.jpg
`}
                                </pre>
                            )}
                        </div>
                    </BoxReveal>

                    {/* Response & Notes */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">📤 Response</h3>
                            <p>The API returns the resized image as a downloadable <b>binary stream</b>.</p>
                        </div>
                    </BoxReveal>

                    {/* Important Notes */}
                    <BoxReveal duration={0.8}>
                        <div className="mt-6 text-gray-800">
                            <h3 className="text-2xl font-semibold mb-2">⚠️ Important Notes</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Ensure your request includes a <b>valid image file</b> (JPG, JPEG, PNG, WebP).</li>
                                <li>The resized image will be available as a <b>blob</b>.</li>
                            </ul>
                        </div>
                    </BoxReveal>
                </section>
            </BoxReveal>
        </div>
    );
}
