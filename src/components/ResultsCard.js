import React, { useState } from 'react';

const ResultsCard = ({ results, isVisible, onClose }) => {
  if (!isVisible || !results) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Analysis Results
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {results.success ? (
            <div className="space-y-4">
              {/* Success indicator */}
              <div className="flex items-center space-x-2 text-green-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Analysis completed successfully</span>
              </div>

              {/* Output */}
              {results.output && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analysis Output:</h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {results.output}
                    </pre>
                  </div>
                </div>
              )}

              {/* Warnings/Errors */}
              {results.error && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Warnings/Additional Info:</h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <pre className="text-sm text-yellow-300 whitespace-pre-wrap font-mono">
                      {results.error}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Error indicator */}
              <div className="flex items-center space-x-2 text-red-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Analysis failed</span>
              </div>

              {/* Error message */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <pre className="text-sm text-red-300 whitespace-pre-wrap font-mono">
                  {results.error}
                </pre>
              </div>

              {/* Output if any */}
              {results.output && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Partial Output:</h3>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {results.output}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#2962FF] to-[#B620E0] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
