import { Router } from "express";
import {generateDocString} from '../controllers/ai.controller.js'
import { fixSyntax } from "../controllers/ai.controller.js";
import {generateSnippet} from "../controllers/ai.controller.js";





const aiRouter=Router()

aiRouter.route('/generateDoc').post(generateDocString)
aiRouter.route('/fix-syntax').post(fixSyntax)
aiRouter.route('/generate-snippet').post(generateSnippet)



export default aiRouter