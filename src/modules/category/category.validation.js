import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addCategoryVal = {
    body: joi.object().required().keys({
        name: generalFields.name,
    }),
    file: generalFields.file.required(),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({})
}