"use client";

import React from "react";

const DownloadBook = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        "/api/ebook/download?ebook=KINGDOM-LENDING-GUIDE",
      );

      if (!response.ok) {
        alert("Download failed: " + response.statusText);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "KINGDOM-LENDING-GUIDE.pdf";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Download error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center  flex-col items-center py-16 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Download Your Ebook</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Thank you for your purchase! Click the button below to download your
        ebook. If you have any issues, please contact our support team.
      </p>

      <button
        onClick={handleDownload}
        className="bg-green-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors shadow-lg"
      >
        Download Now
      </button>
    </div>
  );
};

export default DownloadBook;
