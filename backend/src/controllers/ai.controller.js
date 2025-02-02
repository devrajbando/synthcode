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