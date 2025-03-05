// import React, { useState, useRef, useEffect } from "react";
// import { HStack, Box } from "@chakra-ui/react";
// import { io } from "socket.io-client";
// import Editor from "@monaco-editor/react";
// import Language from "./Languages";
// import C from "./codesnippet";
// import Output from "./Output";
// import GenerateDoc from "./GenerateDoc";
// import CodeSnippetGenerator from "./CodeSnippetGenerator";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// export default function Edit({ selectedFile, fileContent }) {
//   const [language, setLanguage] = useState("javascript");
//   const editorRef = useRef(null);
//   const socket = useRef(null);
//   const [mode,setMode]=useState(true)
//   const [userHighlights, setUserHighlights] = useState({}); // { userId: { lineNumber, color } }
//   const decorationsRef = useRef([]);
//   const [age, setAge] = useState(15);

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };



//   useEffect(() => {
//     socket.current = io("http://localhost:3002");

//     socket.current.on("connect", () => {
//       console.log("Connected at", socket.current.id);
//     });

//     // Receive code updates from other users
//     socket.current.on("receive-code", (code) => {
//       if (editorRef.current) {
//         const editor = editorRef.current;
//         const currentValue = editor.getValue();
//         if (currentValue !== code) {
//           const position = editor.getPosition();
//           editor.executeEdits(null, [{ range: editor.getModel().getFullModelRange(), text: code }]);
//           editor.setPosition(position);
//         }
//       }
//     });

//     // Receive line highlight updates from other users
//     socket.current.on("user-highlight", ({ userId, lineNumber, color }) => {
//       setUserHighlights((prevHighlights) => ({
//         ...prevHighlights,
//         [userId]: { lineNumber, color },
//       }));
//     });

//     // Cleanup on disconnect
//     return () => {
//       socket.current.disconnect();
//     };
//   }, []);

//   function handleEditorDidMount(editor, monaco) {
//     editorRef.current = editor;
//     editor.focus();

//     // Emit the current line number when the cursor moves
//     editor.onDidChangeCursorPosition((event) => {
//       if (socket.current) {
//         socket.current.emit("cursor-move", {
//           userId: socket.current.id,
//           lineNumber: event.position.lineNumber,
//           color: userColor,
//         });
//       }
//     });

//     // Update highlights periodically
//     setInterval(() => {
//       updateHighlights(editor, monaco);
//     }, 100);
//   }

//   function updateHighlights(editor, monaco) {
//     const decorations = Object.keys(userHighlights).map((userId) => {
//       const { lineNumber, color } = userHighlights[userId];

//       return {
//         range: new monaco.Range(lineNumber, 1, lineNumber, 1), // Highlight the entire line
//         options: {
//           isWholeLine: true,
//           className: `user-highlight-${userId}`,
//           stickiness: 1, // Ensure the highlight stays in place
//         },
//       };
//     });

//     decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations);
//   }

//   // useEffect(() => {
//   //   // Inject CSS dynamically for each user's highlight
//   //   Object.keys(userHighlights).forEach((userId) => {
//   //     const styleId = `highlight-style-${userId}`;
//   //     if (!document.getElementById(styleId)) {
//   //       const style = document.createElement("style");
//   //       style.id = styleId;
//   //       style.innerHTML = `
//   //         .user-highlight-${userId} {
//   //           background-color: ${userHighlights[userId].color};
//   //           opacity: 0.3;
//   //         }
//   //       `;
//   //       document.head.appendChild(style);
//   //     }
//   //   });
//   // }, [userHighlights]);

//   const onSelect = (newLanguage) => {
//     setLanguage(newLanguage);
//     const defaultCode = C.CODE_SNIPPETS[newLanguage] || "";
    
//     if (editorRef.current) {
//       editorRef.current.setValue(defaultCode);
//     }
//   };

//   const sendCode = (newCode) => {
//     if (socket.current) {
//       socket.current.emit("code-collab", {
//         filename: selectedFile,
//         code: newCode,
//       });
//     }

//   };

  
//   useEffect(() => {
//     if (editorRef.current && fileContent) {
//       editorRef.current.setValue(fileContent);
//     }
//   }, [fileContent]);

  
//   return (
//     <>
    

      
//     <Box >

//       <HStack bg="blue.950" display="flex" justifyContent="center" alignItems="top" >
//         <Box w="60%">

//           <HStack display="flex" justifyContent="start" alignItems="top" marginTop="5">
//           <FormControl >
//             <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>Font size</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={age}
//               label="Font Size"
//               sx={{ color: 'white' }}
//               onChange={handleChange}
//              >
//           <MenuItem value={5}>x-small</MenuItem>
//           <MenuItem value={10}>small</MenuItem>
//           <MenuItem value={15}>medium</MenuItem>
//           <MenuItem value={20}>large</MenuItem>
//           <MenuItem value={30}>x-large</MenuItem>
//         </Select>
//       </FormControl>
//           <FormControlLabel control={<Switch defaultChecked value={mode} onChange={() => setMode(prevMode => !prevMode)}/>} label="Dark Mode" />
//           </HStack>
//           <HStack display="flex" justifyContent="start" alignItems="top">

//           <Language language={language} onSelect={onSelect} />
           
//           <CodeSnippetGenerator/>
//           </HStack>
//           <Editor
//             height="60vh"
//             theme={mode ? "vs-dark" : "vs"}
//             language={language}
//             onMount={(editor) => {
//               editorRef.current = editor;
//               if (fileContent) {
//                 editor.setValue(fileContent);
//               }
//             }}
//             defaultValue={fileContent}
//             onChange={sendCode}
//             options={{ renderWhitespace: "all",
//               fontSize: age
//              }}
//             //  className={`text-${age}`}
//             />
            
//             <GenerateDoc/>
//         </Box>

        
//         <Box w="40%" >
//         <Output editorRef={editorRef} language={language} />
//       </Box>

//       </HStack>
//     </Box>
            
         
//             </>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { HStack, Box, VStack, Flex, useBreakpointValue } from "@chakra-ui/react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import Language from "./Languages";
import C from "./codesnippet";
import Output from "./Output";
import GenerateDoc from "./GenerateDoc";
import CodeSnippetGenerator from "./CodeSnippetGenerator";
export default function Edit() {
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);
  const socket = useRef(null);
 
  const [userHighlights, setUserHighlights] = useState({}); // { userId: { lineNumber, color } }
  const decorationsRef = useRef([]);

  // Generate a random color for the current user
  const [userColor, setUserColor] = useState(getRandomColor());

  function getRandomColor() {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ffff33", "#ff7f50", "#7fff50"];
    return colors[Math.floor(Math.random() * colors.length)];
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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.focus();

    // Emit the current line number when the cursor moves
    editor.onDidChangeCursorPosition((event) => {
      if (socket.current) {
        socket.current.emit("cursor-move", {
          userId: socket.current.id,
          lineNumber: event.position.lineNumber,
          color: userColor,
        });
      }
    });

    // Update highlights periodically
    setInterval(() => {
      updateHighlights(editor, monaco);
    }, 100);
  }

  function updateHighlights(editor, monaco) {
    const decorations = Object.keys(userHighlights).map((userId) => {
      const { lineNumber, color } = userHighlights[userId];

      return {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1), // Highlight the entire line
        options: {
          isWholeLine: true,
          className: `user-highlight-${userId}`,
          stickiness: 1, // Ensure the highlight stays in place
        },
      };
    });

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations);
  }

  useEffect(() => {
    // Inject CSS dynamically for each user's highlight
    Object.keys(userHighlights).forEach((userId) => {
      const styleId = `highlight-style-${userId}`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          .user-highlight-${userId} {
            background-color: ${userHighlights[userId].color};
            opacity: 0.3;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }, [userHighlights]);

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    const defaultCode = C.CODE_SNIPPETS[newLanguage] || "";
    
    if (editorRef.current) {
      editorRef.current.setValue(defaultCode);
    }
  };

  const sendCode = (newCode) => {
    if (socket.current) {
      socket.current.emit("code-collab", newCode);
    }
  };

  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const layoutDirection = useBreakpointValue({ 
    base: 'column', 
    md: 'row' 
  });

  
  return (
    <>
    

      
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
            alignItems="center"
          >
            <Language 
              language={language} 
              onSelect={setLanguage} 
              width={isMobile ? 'full' : 'auto'}
            />
            <CodeSnippetGenerator />
          </HStack>

          {/* Monaco Editor */}
          <Box width="full">
            <Editor
              height={isMobile ? '50vh' : '60vh'}
              theme="vs-dark"
              language={language}
              onMount={handleEditorDidMount}
              defaultValue={C.CODE_SNIPPETS.javascript}
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
            
         
            </>
  );
}