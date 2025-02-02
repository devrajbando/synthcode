import { Router } from "express";
import {generateDocString} from '../controllers/ai.controller.js'







const aiRouter=Router()

aiRouter.route('/generateDoc').post(generateDocString)



export default aiRouter