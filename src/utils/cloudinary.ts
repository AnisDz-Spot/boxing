export const uploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "glove_upload");
  formData.append("quality", "auto:best");
  formData.append("flags", "lossless");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dru9xjgwo/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Erreur Cloudinary:", error);
    return null;
  }
};
