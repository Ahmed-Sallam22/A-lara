import { Router } from "express";
import * as userController from './controller/user.js'
const router = Router()


// import * as validators from './user.validation.js'

router.get('/:id', userController.getStudentbyId )
router.get('/', userController.getStudents )




export default router