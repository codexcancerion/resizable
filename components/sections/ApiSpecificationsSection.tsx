export default function ApiSpecificationsSection() {
    return (
        <section className="w-full bg-white py-14 px-60">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
                What our 
                <span className="text-blue-600"> API </span>
                looks like?
            </h2>
            <hr className="h-1 bg-gray-300" />
            
            <div className="mt-6 text-gray-800">
                <h3 className="text-2xl font-semibold">Endpoint</h3>
                <p><strong>Method:</strong> POST</p>
                <p><strong>URL:</strong> /resize</p>
                <p><strong>Content-Type:</strong> multipart/form-data</p>
                <p>Accepts an image file, resizes it based on optional parameters, and returns the optimized version.</p>
            </div>

            <div className="mt-6 text-gray-800">
                <h3 className="text-2xl font-semibold">Request Payload</h3>
                <ul className="list-disc list-inside">
                    <li><strong>file</strong> (File, required) - The image file to be resized. Supported formats: JPG, JPEG, PNG, WebP.</li>
                </ul>
            </div>

            <div className="mt-6 text-gray-800">
                <h3 className="text-2xl font-semibold">Response</h3>
                <p>The resized image file is returned as a downloadable binary stream.</p>
                <p><strong>Headers:</strong></p>
                <ul className="list-disc list-inside">
                    <li>Content-Type: image/jpeg</li>
                    <li>Content-Disposition: attachment; filename="resized-image.jpg"</li>
                </ul>
            </div>

            <div className="mt-6 text-gray-800">
                <h3 className="text-2xl font-semibold">Error Handling</h3>
                <ul className="list-disc list-inside">
                    <li><strong>400 Bad Request:</strong> Missing or invalid parameters.</li>
                    <li><strong>415 Unsupported Media Type:</strong> File format not supported.</li>
                    <li><strong>500 Internal Server Error:</strong> Unexpected error during processing.</li>
                </ul>
            </div>
        </section>
    );
}