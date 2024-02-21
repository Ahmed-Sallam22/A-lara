import { validation } from '../../middleware/validation.js';
import * as authController from './controller/registration.js'
import * as validators from './auth.validation.js'
import { Router } from "express";
const router = Router()

router.post('/signup',
validation(validators.signup) 
,
authController.signup)

router.get('/confirmEmail/:token',validation(validators.token), authController.confirmEmail)
router.get('/RequestNewconfirmEmail/:token',validation(validators.token), authController.RequestNewconfirmEmail)
router.post('/login',validation(validators.login), authController.login)

router.patch('/forgetPassword',validation(validators.forgetPassword),authController.forgetPassword)
router.post('/CheckCode',validation(validators.CheckCode),authController.CheckCode)
router.patch('/RestePassword',validation(validators.ResetPassword),authController.RestePassword)


export default router