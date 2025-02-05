# Image Upload and Resize API

## Endpoint

### POST /api/upload

#### Request
- **Method**: POST
- **Content-Type**: `multipart/form-data`
- **Body**: Upload an image as a form field `file`.

#### Response

##### Success (200 OK)
The image will be resized to 1000px wide and converted to JPEG format (70% quality). The resized image is returned as an attachment.

```http
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Disposition: attachment; filename="image.jpg"
<image data>
```

##### Error (400 Bad Request)
If the file type is unsupported or invalid:

```json
{
  "error": "Unsupported file type"
}
```

##### Error (500 Internal Server Error)
If an internal error occurs during processing:

```json
{
  "error": "Image processing failed"
}
```

## Details

- **Allowed File Types**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Max File Size**: 10MB
- **Resizing**: The image is resized to 1000px wide (maintaining aspect ratio).
- **Format**: Converted to JPEG with 70% quality.

## CORS
- **Access-Control-Allow-Origin**: `*` (supports any origin)
- **Access-Control-Allow-Methods**: `POST, OPTIONS`

## Error Handling

- **No file uploaded**: Returns a 400 error.
- **Unsupported file type**: Returns a 400 error.
- **File too large**: Returns a 400 error.


