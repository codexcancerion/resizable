"use client";

import ApiSpecificationsSection from "@/components/sections/ApiSpecificationsSection";
import Hero from "@/components/sections/Hero";
import TestSection from "@/components/sections/TestSection";

export default function LandingPage() {

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Hero />
            <TestSection />
            <ApiSpecificationsSection />
            
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
