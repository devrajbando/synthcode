import React, { useState } from 'react';

import { toaster } from "./ui/toaster";
import { Button, Box, HStack, Text, useClipboard } from "@chakra-ui/react";

export default function FixSyntax({ editorRef, language, output }) { 
  const [isFixing, setIsFixing] = useState(false);
  const [fixedCodde, setFixedCode] = useState('');
  const fixSyntaxError = async (language, code, errorMessage) => {
    try {
      const response = await fetch('http://localhost:8000/ai/fix-syntax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          errorMessage // Use the correct parameter name
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
    <Box>
      <HStack spacing={4} mb={4}>
        <Button
          variant="outline"
          colorScheme="blue"
          isLoading={isFixing}
          onClick={handleFixSyntax}
        >
          Fix Syntax
        </Button>
        
        {/* {fixedCodde && (
          <HStack>
            <Button
              variant="solid"
              colorScheme="green"
              size="md"
              onClick={handleApplyFix}
            >
              Apply Fix
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={onCopy}
              leftIcon={hasCopied ? <Check size={16} /> : <Copy size={16} />}
            >
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
          </HStack>
        )} */}
      </HStack>

      {fixedCodde && (
        <Box
          p={4}
          borderRadius="md"
          bg="black"
          border="1px"
          borderColor="gray.900"
          position="relative"
          maxH="300px"
          overflowY="auto"
        >
          <Text fontSize="sm" mb={2} color="gray.500">
            Fixed Code:
          </Text>
          <Box
         
            as="pre"
            p={3}
            borderRadius="md"
            bg="black"
            fontSize="sm"
            fontFamily="monospace"
            whiteSpace="pre-wrap"
            wordBreak="break-word"
          >
            {fixedCodde}
          </Box>
        </Box>
      )}
    </Box>
  );
}
