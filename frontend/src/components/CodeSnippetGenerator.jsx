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

    try {
      const response = await fetch('http://localhost:8000/ai/generate-snippet', {
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
    <div className="mt-4 space-y-4">
      {/* Generate Snippet Button */}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        onClick={() => setShowInput(true)}
      >
        Generate Snippet
      </button>

      {/* Input Modal */}
      {showInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
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
        <div className="mt-4 border rounded-lg p-4">
          <h4 className="font-semibold mb-2">Generated Snippet:</h4>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-white">
            <code>{generatedSnippet}</code>
          </pre>
          <button
            className="mt-2 text-sm text-gray-600 hover:text-gray-800"
            onClick={() => {
              navigator.clipboard.writeText(generatedSnippet);
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeSnippetGenerator;