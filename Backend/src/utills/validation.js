import validator from "validator"



 function validateSignUpData(req) {
       const { emailId, password } = req.body;

       if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email id");
      }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    
    }
  };

  export default validateSignUpData;