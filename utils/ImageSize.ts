async function getImageFileSize(file: File): Promise<number | null> {
    try {
      return file.size;
    } catch (error) {
      console.error("Error getting image file size:", error);
      return null;
    }
  }
  
  export default getImageFileSize;
  