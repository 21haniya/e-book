import {validationResult} from "express-validator"

export const handleValidation = (validations) => async (req, res, next) => {
   await Promise.all(validations.map((v) => v.run(req)))

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      const errorObj = {}
      errors.array().forEach((e) => {
         if (!errorObj[e.path]) errorObj[e.path] = e.msg
      })

      return res.status(400).json({errors: errorObj})
   }

   next()
}
