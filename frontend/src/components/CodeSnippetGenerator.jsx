import React, { useState } from 'react';

const CodeSnippetGenerator = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [generatedSnippet, setGeneratedSnippet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSnippet = async () => {
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setError(null);
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/ai/generate-snippet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate snippet');
      }

      const data = await response.json();
      setGeneratedSnippet(data.suggestedSnippet);
      setShowInput(false); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowInput(false);
    setInputCode('');
    setGeneratedSnippet('');
    setError(null);
  };

  return (
    <div className="space-y-4 z-10">
      {/* Generate Snippet Button */}
      <button
        className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-950 hover:scale-105 transition-all duration-200"
        onClick={() => setShowInput(true)}
      >
        Generate Snippet
      </button>

      {/* Input Modal */}
      {showInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-blue-950 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold mb-4">Generate Code Snippet</h3>
            
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded mb-4 font-mono"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter your code here..."
            />

            {error && (
              <div className="text-red-500 mb-4">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                onClick={handleGenerateSnippet}
                disabled={isLoading || !inputCode.trim()}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Snippet Display */}
      {generatedSnippet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-purple-950 rounded-lg p-6 max-w-2xl w-full">
          <h3 className="text-lg font-semibold mb-4">Generated Code Snippet</h3>
          
          <p
            className="w-full h-40 p-3 border border-gray-300 bg-black overflow-y-auto rounded mb-4 font-mono"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter your code here..."
          >
            {generatedSnippet}</p>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 text-gray-300 hover:bg-blue-950 rounded"
              onClick={handleClose}
            >
              Close
            </button>
            <button
            className=" text-sm text-gray-400 hover:text-gray-100"
            onClick={() => {
              navigator.clipboard.writeText(generatedSnippet);
            }}
          >
            Copy to Clipboard
          </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default CodeSnippetGenerator;

