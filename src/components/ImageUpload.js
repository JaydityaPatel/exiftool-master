import React, { useState } from 'react';
import ResultsCard from './ResultsCard';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setResults(null);
    setShowResults(false);
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setResults(null);
    setShowResults(false);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResults({
        success: false,
        error: 'Failed to connect to analysis server. Please make sure the backend is running.'
      });
      setShowResults(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
          isDragOver
            ? 'border-blue-400 bg-blue-50/10'
            : 'border-gray-600 hover:border-blue-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300 mb-2">
                {selectedFile?.name}
              </p>
              <button 
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-[#2962FF] to-[#B620E0] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-300 mb-2">
              Drop your image here
            </p>
            <p className="text-sm text-gray-400 mb-4">
              or click to browse
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-gradient-to-r from-[#2962FF] to-[#B620E0] text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300 inline-block"
            >
              Choose File
            </label>
          </div>
        )}
      </div>
      
      {/* Results Card */}
      <ResultsCard 
        results={results} 
        isVisible={showResults} 
        onClose={() => setShowResults(false)} 
      />
    </div>
  );
};

export default ImageUpload;
