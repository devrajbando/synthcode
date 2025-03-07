"use client"
import React, { useState, useRef, useEffect } from "react";
import { HStack, Box, VStack, Flex, useBreakpointValue } from "@chakra-ui/react";
import{Save} from 'lucide-react';
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import Language from "./Languages";
import C from "./codesnippet";
import Snackbar from '@mui/material/Snackbar';
// import { Toaster } from "./ui/sonner"
import { toast } from "sonner"

import Output from "./Output";
import GenerateDoc from "./GenerateDoc";
import CodeSnippetGenerator from "./CodeSnippetGenerator";

export default function Edit({selectedFile, onSave,isSaving }) {

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(selectedFile?.content || C.CODE_SNIPPETS.javascript);
  const editorRef = useRef(null);
  const socket = useRef(null);
  

  useEffect(() => {
    if (selectedFile) {
      const content = selectedFile.content || C.CODE_SNIPPETS[language] || "";
      
      setCode(content);
      
      
      if (editorRef.current) {
        const editor = editorRef.current;
        if (editorRef.current) {
          editorRef.current.setValue(content);
        }
      }
    }
  }, [selectedFile]);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    if (selectedFile?.content) {
      editor.setValue(selectedFile.content);
    }
    
    editor.focus();
  }

 
  

  useEffect(() => {
    socket.current = io("http://localhost:3002");

    socket.current.on("connect", () => {
      console.log("Connected at", socket.current.id);
    });

    // Receive code updates from other users
    socket.current.on("receive-code", (code) => {
      if (editorRef.current) {
        const editor = editorRef.current;
        const currentValue = editor.getValue();
        if (currentValue !== code) {
          const position = editor.getPosition();
          editor.executeEdits(null, [{ range: editor.getModel().getFullModelRange(), text: code }]);
          editor.setPosition(position);
        }
      }
    });

    // Receive line highlight updates from other users
    socket.current.on("user-highlight", ({ userId, lineNumber, color }) => {
      setUserHighlights((prevHighlights) => ({
        ...prevHighlights,
        [userId]: { lineNumber, color },
      }));
    });

    // Cleanup on disconnect
    return () => {
      socket.current.disconnect();
    };
  }, []);

  

  

  

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    const defaultCode = C.CODE_SNIPPETS[newLanguage] || "";
    setCode(defaultCode);
    
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
  };

  const sendCode = (newCode) => {
    setCode(newCode);
    if (socket.current) {
      socket.current.emit("code-collab", newCode);
    }
  };

  const handleSave = async () => {
    if (!selectedFile || isSaving) return;
    
    try {
      const currentContent = editorRef.current?.getValue();
      if (!currentContent) return;
            
        await onSave(currentContent);
      
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const SaveButton = () => (
    <button
      onClick={()=>{
        handleSave()
          toast("File Saved Successfully")
      }}
      disabled={isSaving}
      className={`btn btn-sm btn-soft btn-primary rounded-none mb-4 ${
        isSaving ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isSaving ? 'Saving...' : 'Save File'} <Save />
      
    </button>
    
  );


  const isMobile = useBreakpointValue({ base: true, md: false });
  const layoutDirection = useBreakpointValue({ 
    base: 'column', 
    md: 'row' 
  });

  return (
    <Box 
      p={4} 
      bg="gray.900" 
      minHeight="100vh" 
      width="full"
    >
      <Flex 
        direction={layoutDirection} 
        gap={4} 
        width="full"
      >
        {/* Main Editor Column */}
        <VStack 
          width={isMobile ? '100%' : '60%'} 
          spacing={4}
        >
          {/* Top Controls */}
          <HStack 
            width="full" 
            justifyContent="space-between" 
            alignItems="bottom"
          >
            <Language 
              language={language} 
              onSelect={onSelect} 
              width={isMobile ? 'full' : 'auto'}
            />
            
           <div>
            <SaveButton/>
            <CodeSnippetGenerator />

           </div>
            
          </HStack>

          {/* Monaco Editor */}
          <Box width="full">
            <Editor
              height={isMobile ? '50vh' : '60vh'}
              theme="vs-dark"
              language={language}
              value={code}
              onMount={handleEditorDidMount}
              onChange={sendCode}
              options={{ 
                renderWhitespace: "all",
                minimap: { enabled: false }, // Improve mobile view
                fontSize: useBreakpointValue({ base: 12, md: 14 }),
                wordWrap: 'on' // Improve text wrapping
              }}
            />
          </Box>

          {/* Documentation Generator */}
          <GenerateDoc />
        </VStack>

        {/* Output Column */}
        {!isMobile && (
          <Box 
            width="30%" 
            bg="gray.800" 
            p={4} 
            borderRadius="md"
          >
            <Output 
              editorRef={editorRef} 
              language={language} 
            />
          </Box>
        )}
      </Flex>

      {/* Mobile Output - Only shown on mobile */}
      {isMobile && (
        <Box 
          mt={4} 
          width="full" 
          bg="gray.800" 
          p={4} 
          borderRadius="md"
        >
          <Output 
            editorRef={editorRef} 
            language={language} 
          />
        </Box>
      )}
        
    </Box>
  );
}