export const downloadUrl = (url: string, name?: string) => {
    const link = document.createElement("a");
    let fileName = name;
    if (!fileName) {
      fileName = url.substring(url.indexOf("/") || 0);
      fileName = fileName.substring(0, fileName.indexOf("?") || fileName.length);
    }
    link.href = url;
    link.download = fileName;
    link.click();
    link.remove();
  };
export const downloadFile = (blob: Blob, name: string) => {
    const anchorElement = document.createElement("a");
    anchorElement.download = name;
    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.click();
    URL.revokeObjectURL(anchorElement.href);
};