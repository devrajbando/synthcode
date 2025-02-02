import React, { useState, useRef, useEffect } from "react";
import { HStack, Box } from "@chakra-ui/react";

export default function GenerateDoc() {

const [showDocInput, setShowDocInput] = useState(false);
  const [functionText, setFunctionText] = useState("");
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const editorRef = useRef(null);
const handleDocSubmit = async () => {
    if (!functionText.trim()) return;
    
    setIsGeneratingDoc(true);
    try {
      // Here you would typically make an API call to your AI service
      // For now, let's simulate a response
      const docString = generateSimpleDocString(functionText);
      
      // Insert the docstring at the start of the function in the editor
      if (editorRef.current) {
        const editor = editorRef.current;
        const model = editor.getModel();
        const fullText = model.getValue();
        
        // Find the function in the full text
        const functionIndex = fullText.indexOf(functionText);
        if (functionIndex !== -1) {
          editor.executeEdits(null, [{
            range: {
              startLineNumber: model.getPositionAt(functionIndex).lineNumber,
              startColumn: 1,
              endLineNumber: model.getPositionAt(functionIndex).lineNumber,
              endColumn: 1
            },
            text: docString + '\n'
          }]);
        }
      }
    } catch (error) {
      console.error('Error generating docstring:', error);
    } finally {
      setIsGeneratingDoc(false);
      setShowDocInput(false);
      setFunctionText("");
    }
  };

  // Helper function to generate a simple docstring (replace with AI service call)
  const generateSimpleDocString = async(functionText) => {
    try {
        // console.log(functionText)
        const response = await fetch('http://localhost:8000/ai/generateDoc', {
            method: 'POST',
           
            headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {functionText}
          ),
          });
        
        const data = await response.json();
        console.log(data);
        
        
      } catch (error) {
        console.log(error)
      }
  };



  return(

    <>
    <Box className="mt-4 space-y-4">
                <button
                  className="bg-blue-800 text-white text-lg px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setShowDocInput(true)}
                >
                  Generate Doc String
                </button>

                {showDocInput && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded text-white"
                      rows={4}
                      placeholder="Paste the function you want to document here..."
                      value={functionText}
                      onChange={(e) => setFunctionText(e.target.value)}
                    />
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors disabled:bg-gray-400"
                      onClick={handleDocSubmit}
                      disabled={isGeneratingDoc || !functionText.trim()}
                    >
                      {isGeneratingDoc ? 'Generating...' : 'Submit'}
                    </button>
                    <button
                      className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                      onClick={() => {
                        setShowDocInput(false);
                        setFunctionText("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Box>
    
    </>
  )

}