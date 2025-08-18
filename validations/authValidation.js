// validation/authValidation.js
import {body} from "express-validator"
import {handleValidation} from "../helpers/validationHelper.js"

export const registerValidation = handleValidation([
   body("username")
      .notEmpty()
      .withMessage("Kullanıcı adı gereklidir!")
      .isLength({min: 5, max: 20})
      .withMessage("Kullanıcı adı 5-20 karakter olmalıdır!"),
   body("email").notEmpty().withMessage("E-posta gereklidir!").isEmail().withMessage("Geçersiz e-posta adresi!"),
   body("password")
      .notEmpty()
      .withMessage("Şifre gereklidir!")
      .isLength({min: 6})
      .withMessage("Şifre en az 6 karakter olmalıdır!"),
])

export const loginValidation = handleValidation([
   body("username").notEmpty().withMessage("Kullanıcı adı gereklidir!"),
   body("password").notEmpty().withMessage("Şifre gereklidir!"),
])
