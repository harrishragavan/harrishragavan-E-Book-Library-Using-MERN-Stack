const {User }= require("../models/user");
const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  try {
    console.log("Received login request:", req.body); // Log the request body

    const { error } = validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message); // Log validation error
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found:", req.body.email); // Log user not found
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log("Invalid password for user:", req.body.email); // Log invalid password
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    console.log("Login successful for user:", req.body.email); // Log successful login
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error during login:", error); // Log the error
    res.status(500).send({ message: "Internal server error occurred" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"), // Fix: Use joi.string() instead of joi.passwordComplexity()
  });
  return schema.validate(data); // Fix: Return the validation result
};

module.exports = router;