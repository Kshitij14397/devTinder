const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter name properly");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is incorrect");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is incorrect");
  }
};

const validateProfileUpdateData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
    "age",
    "gender"
  ];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );
  if (!isUpdateAllowed) {
    throw new Error("Invalid Update Data");
  }
};

const validateProfilePasswordUpdateData = (req) => {
  const allowedFields = ["password"];
  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );
  if (!isUpdateAllowed) {
    throw new Error("Invalid Update Data");
  }
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileUpdateData,
  validateProfilePasswordUpdateData,
};
