const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { authenticateUser } = require("../middleware/auth");

router.get("/current_user", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } else {
    return res.status(401).json({user: null})
  }
});
 //signUp
 router.post("/signup", async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({ 
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      photo:req.body.photo

    });
    req.session.userId = user.id;
    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created",
      user: {
        name: user.name,
        email: user.email,
      //  UserId: req.session.userId,
      },
    });
  } catch (error) {

    console.error(error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(422)
        .json({ errors: error.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user. This email may already be taken!  ",
      error: error,
      
    });
  }

});


router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

router.post("/login", async (req, res) => {
  try {
    // find user by email
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // user not found
      return res.status(401).json({
        message: "unknown credentials",
      });
    }

    // if user found, use bcrypt to check if password matches hashed password
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match, create session
        req.session.userId = user.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
            UserId: req.session.userId,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

module.exports = router;