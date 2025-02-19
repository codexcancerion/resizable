function convertBytesToMB(bytes: number): number {
    return parseFloat((bytes / (1024 * 1024)).toFixed(2));
  }

export { convertBytesToMB };