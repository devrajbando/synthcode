import React, { useState, useRef, useEffect } from "react";
import { HStack, Box, Button, Text, useClipboard } from "@chakra-ui/react";
import { Copy, Check } from "lucide-react";

export default function GenerateDoc() {
  const [showDocInput, setShowDocInput] = useState(false);
  const [functionText, setFunctionText] = useState("");
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState("");
  const editorRef = useRef(null);
  const [ hasCopied, setHasCopied ] = useState(false);

  const handleDocSubmit = async () => {
    if (!functionText.trim()) return;
    
    setIsGeneratingDoc(true);
    try {
      const docString = await generateSimpleDocString(functionText);
      setGeneratedDoc(docString);
      
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
  const API_URL = import.meta.env.VITE_API_URL;
  const generateSimpleDocString = async(functionText) => {
    try {
      const response = await fetch(`${API_URL}/ai/generateDoc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionText }),
      });
      
      const data = await response.json();
      console.log(data)
      return data.docstring; // Assuming the API returns the doc in this format
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleApplyDoc = () => {
    if (editorRef && editorRef.current && generatedDoc) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      editor.executeEdits('insert-doc', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: generatedDoc
      }]);
    }
  };

  return (
    <Box className="space-y-4 my-3">
      <Button
        colorScheme="blue"
        onClick={() => setShowDocInput(true)}
        className="px-4 py-2 rounded bg-purple-900 hover:bg-purple-950 hover:scale-105 transition-all duration-200"
      >
        Generate Doc String
      </Button>

      {showDocInput && (
        <Box className="mt-4 space-y-2">
          <textarea
            className="w-full h-72 p-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Paste the function you want to document here..."
            value={functionText}
            onChange={(e) => setFunctionText(e.target.value)}
          />
          <HStack spacing={2}>
            <Button
              colorScheme="green"
              className="bg-blue-950 hover:bg-blue-900 p-2"
              onClick={handleDocSubmit}
              isLoading={isGeneratingDoc}
              isDisabled={isGeneratingDoc || !functionText.trim()}
            >
              {isGeneratingDoc ? 'Generating...' : 'Generate'}
            </Button>
            <Button
              colorScheme="gray"
              onClick={() => {
                setShowDocInput(false);
                setFunctionText("");
              }}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

{generatedDoc && (
  <Box
    mt={4}
    p={4}
    borderRadius="md"
    bg="black"
    color="white"
    border="1px"
    borderColor="gray.200"
  >
    <HStack justify="space-between" mb={2}>
      <Text fontSize="sm" fontWeight="medium" color="gray.600">
        Generated Documentation:
      </Text>
      <HStack spacing={2}>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setHasCopied(true);
            navigator.clipboard.writeText(generatedDoc);
          }}
        >
          {hasCopied ? "Copied!" : "Copy"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setGeneratedDoc('')} // Or another function to close the box
        >
          X
        </Button>
      </HStack>
    </HStack>
    <Box
      as="pre"
      p={3}
      borderRadius="md"
      bg="black"
      color="white"
      fontSize="sm"
      fontFamily="monospace"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      maxH="300px"
      overflowY="auto"
    >
      {generatedDoc}
    </Box>
  </Box>
)}

    </Box>
  );
}