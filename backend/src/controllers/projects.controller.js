import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {Project} from '../models/project.model.js'
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";

const createNewProject=asyncHandler(async(req,res)=>{
    const projectName=req.body.newProjectName

    const code = Math.random().toString(36).slice(2, 14); // Generates 12 random letters
    console.log(code);

    const project=await Project.create({
        name:projectName,
        adminId:req.user._id,
        admin:req.user.username,
        membersId:[req.user._id],
        members:[req.user.username],
        joiningCode:code,
    })
    

    if(!project){
        throw new ApiError(500 ,"something went wrong on our side")
    }

    
    return res.status(201).json(new ApiResponse(
        201, 
        { 
            project: {
                _id: project._id,
                name: project.name,
                joiningCode: project.joiningCode
            }
        }, 
        "Project created successfully"
    ));
})


const getData=asyncHandler(async(req,res)=>{
    try {
        const { projectId } = req.params;
        console.log(projectId)
        const project = await Project.findById(projectId)
            
        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json(new ApiResponse(
            200, 
            { project }, 
            "Project details retrieved successfully"
        ));
    } catch (error) {
        throw new ApiError(404, "Failed to retrieve project details");
    }
})

const joinProject=asyncHandler(async(req,res)=>{
    const joiningCode=req.body.projectCode
    console.log(joiningCode)
    const project=await Project.findOne({
        joiningCode
    })

    if(!project)
        return res.status(409)
                .json({

                    
                    status: 409,
                    message: "Project does not exist",
                }
                )
                
            

    const currentUser=req.user._id;
    const currentUserName=req.user.username;
                console.log(currentUserName)
    await Project.findByIdAndUpdate(project._id,
        {
            $addToSet: { membersId: currentUser,
                members: currentUserName
             }
        },
        {new:true} 
    )
    return res.status(201).json(
    new ApiResponse(201,project,"Project found Successfully")
    )

})
export {createNewProject,getData,joinProject}