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
export const downloadUrlOut = async (url:string, name?: string) => {
  const imageUrl = url; // Thay thế bằng URL thực của ảnh
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Lỗi khi tải ảnh:', error);
  }
};
