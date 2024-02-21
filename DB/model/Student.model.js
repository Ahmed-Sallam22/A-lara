import { Schema, model } from "mongoose";


const studentSchema = new Schema({

    FirstName: {
        type: String,
        required: [true, 'FirstName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    LastName: {
        type: String,
        required: [true, 'LastName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    UserName:{
        type: String,
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique value'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: [true, 'Phone must be unique value'],
    },
    role: {
        type: String,
        default: 'Student',
        enum: ['Student', 'Teacher']
    },
    active: {
        type: Boolean,
        default: false,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    image: {
        type: Object,
        default: {
            PhototUrl: 'https://res.cloudinary.com/dz6xcfx2f/image/upload/v1708534297/A%27lara/Defualt_images/byxrxu2i0ttf8sxjtdjw.jpg',
        }
    },
    forgetCode: {
        type: String,
        default: null,
      },
      ChangepasswordTime: {
        type: Date,
      },
      reset: {
        type: Boolean,
        default: false
      },
}, {
    timestamps: true
})

const studentModel = model('Student', studentSchema)
export default studentModel