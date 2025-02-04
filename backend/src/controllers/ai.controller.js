import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js";

export const generateDocString= asyncHandler(async(req,res)=>{
    try {
        const functionText=req.body.functionText
        // console.log(functionText)
        console.log(functionText)
        const fn = {
            codeSnippet: functionText, // The function text from the frontend
            maxLen: 200,               // Set your desired maxLen value here
          };
        const response = await fetch('http://127.0.0.1:5020/generatedocstring', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(fn), 
        });
          if (!response.ok) {
              throw new Error('Error with Flask API response');
          }
          const data = await response.json();
          console.log(data)
          res.json(data);
      } catch (error) {
          console.error(error);
          res.status(500).json({ 
            status: "error",
            message: "Error connecting to Flask API",
            error: error.message
        });
      }
    

})

export const fixSyntax= asyncHandler(async(req,res)=>{
    try {
        const codeSnippet=req.body.code
        const errorMessage=req.body.errorMessage
        const language=req.body.language
        // console.log(functionText)
        console.log(codeSnippet)
        console.log("ERRRROORRRR IS ",errorMessage)
        const fn = {
            codeSnippet: codeSnippet, // The function text from the frontend
            // errorMessage: errorMessage, // The error
            // language: language,
            maxLen: 4096,               // Set your desired maxLen value here
          };
        const response = await fetch('http://127.0.0.1:5020/fixsyntax', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(fn), 
        });
          if (!response.ok) {
              throw new Error('Error with Flask API response');
          }
          const data = await response.json();
          console.log(data)
          res.json(data);
      } catch (error) {
          console.error(error);
          res.status(500).json({ 
            status: "error",
            message: "Error connecting to Flask API",
            error: error.message
        });
      }
    

})


export const generateSnippet=asyncHandler(async(req,res)=>{
    try {
        const { code } = req.body;
    
        if (!code) {
          return res.status(400).json({ error: 'Code is required' });
        }
        const fn = {
            codeContext: code, // The function text from the frontend
            // errorMessage: errorMessage, // The error
            maxLen: 4096,               // Set your desired maxLen value here
          };
        const response = await fetch('http://127.0.0.1:5020/generateSnippet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify(fn), 
          });
            if (!response.ok) {
                throw new Error('Error with Flask API response');
            }
            const data = await response.json();
            console.log(data)
            res.json(data);

        
    
        
      } catch (error) {
        console.error('Error generating snippet:', error);
        res.status(500).json({ 
          error: 'Failed to generate snippet',
          details: error.message 
        });
}
})