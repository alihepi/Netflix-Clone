import axios from "axios";
import config from "../config";

const apiClient = axios.create({
  baseURL: "https://netflix-clone-backend-alihappy.vercel.app",
});

export async function getSignedUrl({ key, content_type }) {
  const response = await apiClient.post("/s3/signed_url", {
    key,
    content_type,
  });

  return response.data;
}

export async function uploadFileToSignedUrl(
  signedUrl,
  file,
  contentType,
  onProgress,
  onComplete
) {
  axios
    .put(signedUrl, file, {
      onUploadProgress: onProgress,
      headers: {
        "Content-Type": contentType,
      },
    })
    .then((response) => {
      onComplete(response);
    })
    .catch((err) => {
      console.error(err.response);
    });
}


export async function deleteFile(key) {
  try {
    const response = await apiClient.delete("/s3/delete", {
      data: { key },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error.response);
    throw error;
  }
}
