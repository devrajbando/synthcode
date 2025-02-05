import React, { useState } from 'react';

import { toaster } from "./ui/toaster";
import { Button, Box, HStack, Text, useClipboard,Spinner } from "@chakra-ui/react";

export default function FixSyntax({ editorRef, language, output }) { 
  const [isFixing, setIsFixing] = useState(false);
  const [fixedCodde, setFixedCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const fixSyntaxError = async (language, code, errorMessage) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/ai/fix-syntax`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          errorMessage,
          language // Use the correct parameter name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fix syntax');
      }

      const data = await response.json();
      return data.fixedCode;
    } catch (error) {
      throw error;
    }
  };

  const handleFixSyntax = async () => {
    if (!editorRef || !editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsFixing(true);
      const fixedCode = await fixSyntaxError(language, sourceCode, output?.join("\n"));
      
      if (fixedCode) {
        // editorRef.current.setValue(fixedCode);
        setFixedCode(fixedCode);
        setIsOpen(true)
        toaster.create({
          title: "Code Fixed",
          description: "The syntax has been corrected. Please review the changes.",
          status: "success",
          duration: 4000,
        });
      }
    } catch (error) {
      toaster.create({
        title: "Unable to Fix Syntax",
        description: error.message || "An error occurred while fixing the code.",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <>
    <Button
  variant="outline"
  colorScheme="blue"
  isLoading={isFixing} // Show loading spinner when processing
  loadingText="Fixing..."
  spinnerPlacement="start"
  onClick={handleFixSyntax}
>
  <span className="rounded-lg border-2 border-gray-500 px-2 text-green-700 font-bold py-1 mb-4 mx-2">
    Fix Syntax
  </span>
</Button>

{isFixing && ( // Show loading circle while fixing syntax
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    position="fixed"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    zIndex={1100}
  >
    <Spinner size="xl" color="blue.500" />
  </Box>
)}

{isOpen && (
  <Box
    position="fixed"
    top="20%"
    right="10%"
    zIndex={1000}
    maxWidth="400px"
    width="100%"
    bg="gray.900"
    boxShadow="xl"
    borderRadius="md"
    border="1px"
    borderColor="gray.200"
  >
    <Box 
      p={4} 
      borderBottom="1px" 
      borderColor="gray.200"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="bold">Fixed Code</Text>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </Button>
    </Box>

    <Box
      p={4}
      maxH="300px"
      overflowY="auto"
      bg="black"
    >
      <Box
        as="pre"
        p={3}
        borderRadius="md"
        fontSize="sm"
        fontFamily="monospace"
        whiteSpace="pre-wrap"
        wordBreak="break-word"
        color="white"
      >
        {fixedCodde}
      </Box>
    </Box>
  </Box>
)}

  </>
  );
}
