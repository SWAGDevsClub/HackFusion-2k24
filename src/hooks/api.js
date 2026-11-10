import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://hackfusion.beeserver.online";

// Pre-configured Axios instance for HackFusion backend
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to extract a friendly error message from backend responses
export const getApiErrorMessage = (error, defaultMessage = "Something went wrong.") => {
  if (!error) return defaultMessage;

  // FastAPI structured error responses: { error: { message, details } }
  if (error.response?.data?.error?.message) {
    const details = error.response.data.error.details;
    if (Array.isArray(details) && details.length > 0) {
      const fieldDetails = details
        .map((d) => (d.message ? `${d.location?.join(".") || "field"}: ${d.message}` : null))
        .filter(Boolean)
        .join("; ");
      if (fieldDetails) {
        return `${error.response.data.error.message} (${fieldDetails})`;
      }
    }
    return error.response.data.error.message;
  }

  // Standard detail or message
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (typeof error.response?.data?.detail === "string") {
    return error.response.data.detail;
  }
  if (Array.isArray(error.response?.data?.detail)) {
    return error.response.data.detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
  }

  if (error.message) {
    return error.message;
  }

  return defaultMessage;
};

/**
 * Converts any image file/blob to high-quality WebP format with lossless/high compression.
 * Preserves visual clarity for receipts, screenshots, and profile pictures without degradation.
 */
export const convertToWebp = async (fileOrBlob, maxBytes = 2097152, maxDimension = 2400) => {
  if (!fileOrBlob) return null;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Downscale only if unusually gigantic (e.g. > 2400px)
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // WebP compression at 0.90 preserves crisp text and details without reducing quality
      let quality = 0.90;
      let blob = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));

      // If larger than target maxBytes, gracefully step down
      while (blob && blob.size > maxBytes && quality > 0.4) {
        quality -= 0.12;
        blob = await new Promise((res) => canvas.toBlob(res, "image/webp", quality));
      }

      // If still oversized, gently downscale canvas dimensions
      while (blob && blob.size > maxBytes && (canvas.width > 600 || canvas.height > 600)) {
        canvas.width = Math.round(canvas.width * 0.8);
        canvas.height = Math.round(canvas.height * 0.8);
        const resizedCtx = canvas.getContext("2d");
        resizedCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
        blob = await new Promise((res) => canvas.toBlob(res, "image/webp", 0.82));
      }

      if (!blob) {
        resolve(fileOrBlob); // fallback
        return;
      }

      const webpFile = new File([blob], "image.webp", {
        type: "image/webp",
        lastModified: Date.now(),
      });

      resolve(webpFile);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // If image loading fails, return original
      resolve(fileOrBlob);
    };

    img.src = objectUrl;
  });
};

export const SWAG_UPLOAD_URL =
  "https://swagserver.co.in/hackfusion/upload_image.php";

/**
 * Compresses an image, converts it to WebP format, and uploads to SwagServer image hosting.
 * Returns the public image URL.
 */
export const uploadToSwagServer = async (fileOrBlob, filename = "image.webp") => {
  if (!fileOrBlob) throw new Error("No image file provided for upload");

  // If already WebP, use it directly; otherwise convert & compress to WebP
  let webpFile = fileOrBlob;
  if (fileOrBlob.type !== "image/webp") {
    webpFile = await convertToWebp(fileOrBlob);
  }

  const cleanFilename = filename.endsWith(".webp") ? filename : `${filename}.webp`;
  const uploadFile =
    webpFile instanceof File
      ? webpFile
      : new File([webpFile], cleanFilename, { type: "image/webp" });

  const formData = new FormData();
  formData.append("image", uploadFile, cleanFilename);

  const response = await fetch(SWAG_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  const result = await response.json();
  if (result.success && result.data) {
    const imageUrl = result.data.image_url;
    const fileName =
      result.data.file_name ||
      (imageUrl ? imageUrl.split("/").pop() : cleanFilename);

    return {
      imageUrl,
      fileName,
      toString: () => imageUrl || fileName,
    };
  }

  throw new Error(result.message || "Failed to upload image to SwagServer");
};

