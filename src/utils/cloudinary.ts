export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "glove_upload");
  formData.append("quality", "auto:good"); // Cloudinary auto-quality
  formData.append("format", "webp"); // Force modern format

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dru9xjgwo/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return res.json().then((data) => data.secure_url);
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};
