const express = require("express");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// @Route  api/user/register

router.post(
  "/register",
  [
    check("schoolId", "SchoolId is required")
      .not()
      .isEmpty(),
    check("firstName", "First Name field is required")
      .not()
      .isEmpty(),
    check("lastName", "First Name field is required")
      .not()
      .isEmpty(),
    check("email", "First Name field is required").isEmail(),
    check("password", "First Name field is required").isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { schoolId, firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ schoolId });
      let userCollection = await User.find();

      //Check if schoolId already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "School ID Already exists." }] });
      } else {
        //Check if there is no user then make the First User the Admin
        const hashedPassword = await bcrypt.hash(password, 12);
        if (userCollection.length === 0) {
          user = await new User({
            schoolId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isAdmin: true
          });
        } else {
          user = await new User({
            schoolId,
            firstName,
            lastName,
            email,
            password: hashedPassword
          });
        }
      }
      await user.save();
      //Return the created User information
      res.send("User Registered");
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
);

module.exports = router;
