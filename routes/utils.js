const {validationResult} = require("../app")

const asyncHandler = handler =>(req,res,next) => handler(req,res,next).catch(next)






const validateEmailAndPassword =[
    check("email")
        .exists({checkFalsy: true})
        .isEmail()
        .withMessage("Sorry, that wasn't a valid login. Please try again."),
    check("password")
        .exists({checkFalsy: true})
        .withMessage("Sorry, that wasn't a valid login. Please try again.")
]







module.exports = {
    asyncHandler,
    validateEmailAndPassword,
    
}
