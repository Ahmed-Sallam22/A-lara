import studentModel from "../../../../DB/model/Student.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getStudentbyId = asyncHandler(async (req, res, next) => {
    const {id}=req.params
    const user = await studentModel.findById(id).select({ password:0,forgetCode:0,ChangepasswordTime:0 ,reset:0});
    if (!user) {
      return next(new Error(`!in-valid user Id`, { cause: 400 }));
    }
    res.status(200).json({Status:true ,cause:200, message: "Success", user });
  });
export const getStudents = asyncHandler(async (req, res, next) => {
    const user = await studentModel.find().select({ password:0,forgetCode:0,ChangepasswordTime:0 ,reset:0});
    res.status(200).json({Status:true ,cause:200, message: "Success", user });
  });