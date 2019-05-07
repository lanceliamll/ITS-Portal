const express = require("express");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authorization = require("../../middleware/authorization");
const router = express.Router();

// @GET REQUESTS //

// @Route api/user
router.get("/", authorization, async (req, res) => {
  //Get the ID from the Request Header
  const { id } = req.user;
  try {
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @POST REQUESTS //

// @Route api/user/login
// @Login

router.post(
  "/login",
  [
    check("schoolId", "School ID is required").exists(),
    check("password", "Password fields is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { schoolId, password } = req.body;

    try {
      let user = await User.findOne({ schoolId });
      //Check if the user exists
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      //Check if the password matches the user.password
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {}
  }
);

// @Route  api/user/register
// @Register
router.post(
  "/register",
  [
    check("schoolId", "SchoolId is required")
      .not()
      .isEmpty(),
    check("schoolId", "You should input a valid School ID").isLength({
      min: 8,
      max: 10
    }),
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
      //Send the payload and Get the Token
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        }
      };
      //Sign JWT
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  }
);

// @PUT REQUESTS //

// @DELETE REQUESTS //

module.exports = router;
