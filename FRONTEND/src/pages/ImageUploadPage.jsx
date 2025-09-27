import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Header from "../components/Header";
import backgroundImage from "../assets/bg1.jpg"; // replace with your image path

function ImageUploadPage() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        setResult(null);

        const response = await axios.post(
          "http://localhost:8000/predict/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setResult(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
        setResult({ error: "Prediction failed. Check server logs." });
      } finally {
        setLoading(false);
      }
    } else {
      setPreview(null);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="relative min-h-screen">
      {/* Background Image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay to dim background */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen flex items-center justify-center p-6">
          {/* Frosted glass card */}
          <div className="w-full max-w-lg bg-white/30 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Upload Potato Leaf Image
            </h1>

            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                isDragActive
                  ? "border-green-500 bg-green-50/30"
                  : "border-gray-300 bg-gray-50/30"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-green-600 font-medium">
                  Drop the image here...
                </p>
              ) : (
                <p className="text-gray-600">
                  Drag & drop an image here, or{" "}
                  <span className="font-semibold">click</span> to select
                </p>
              )}
            </div>

            {/* Preview */}
            {preview && (
              <div className="mt-6 flex flex-col items-center">
                <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-64 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Prediction Result */}
            {loading && (
              <p className="mt-6 text-center text-blue-500 font-medium">
                Analyzing image...
              </p>
            )}

            {result && !loading && (
              <div className="mt-6 p-4 bg-white/40 rounded-xl shadow-sm border border-white/20">
                {result.error ? (
                  <p className="text-red-500 font-semibold">{result.error}</p>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-gray-800">
                      Prediction:{" "}
                      <span className="text-green-600">
                        {result.Prediction}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Confidence: {result.Accuracy.toFixed(2)}%
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPage;
