import { POST as handler } from "@/app/api/resize/route";
import fs from "fs";
import path from "path";

describe("Image Resizer API Tests", () => {
    const apiUrl = "http://localhost/api/resize";

    test("TC-001: Upload a valid PNG image", async () => {
        const imagePath = path.join(__dirname, "../public/testImages/testPngFile.png");
        const imageBuffer = fs.readFileSync(imagePath);
        const testFile = new File([imageBuffer], "testPngFile.png", { type: "image/png" });

        const formData = new FormData();
        formData.append("file", testFile);

        const req = new Request(apiUrl, {
            method: "POST",
            body: formData,
        });

        const response = await handler(req);
        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toContain("image/png");
    });

    test("TC-002: Upload a valid JPG image", async () => {
        const imagePath = path.join(__dirname, "../public/testImages/testJpgFile.jpg"); // Fix path
        const imageBuffer = fs.readFileSync(imagePath);
        const testFile = new File([imageBuffer], "testJpgFile.jpg", { type: "image/jpeg" });

        const formData = new FormData();
        formData.append("file", testFile);

        const req = new Request(apiUrl, {
            method: "POST",
            body: formData,
        });

        const response = await handler(req);
        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toContain("image/jpeg");
    });


    test("TC-003: Upload an unsupported file format", async () => {
        const formData = new FormData();
        formData.append("file", new Blob(["dummy content"], { type: "application/pdf" }), "test.pdf");

        const req = new Request(apiUrl, {
            method: "POST",
            body: formData,
        });

        const response = await handler(req);
        expect(response.status).toBe(415);
        const json = await response.json();
        expect(json.error).toBe("Unsupported file format");
    });

    test("TC-004: Upload without an image", async () => {
        const req = new Request(apiUrl, {
            method: "POST",
            body: new FormData(), // Empty form
        });

        const response = await handler(req);
        expect(response.status).toBe(400);
        const json = await response.json();
        expect(json.error).toBe("No file uploaded");
    });
});
