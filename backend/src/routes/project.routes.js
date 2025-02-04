import { Router } from "express";
import {createNewProject,getData,joinProject} from "../controllers/projects.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const projectRouter=Router()

projectRouter.route('/create-new').post(verifyJWT,createNewProject)
projectRouter.route('/:projectId').get(verifyJWT,getData)
projectRouter.route('/join').post(verifyJWT,joinProject)


export default projectRouter