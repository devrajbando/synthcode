import { Router } from "express";
import {createNewProject,getData} from "../controllers/projects.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const projectRouter=Router()

projectRouter.route('/create-new').post(verifyJWT,createNewProject)
projectRouter.route('/:projectId').post(verifyJWT,getData)


export default projectRouter