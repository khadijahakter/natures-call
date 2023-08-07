const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

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

router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    req.session.userId = user.id;
    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).json({
      message: "Error occurred while creating user",
      error: err,
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
    console.log("body", req.body);
    // First, find the user by their email address
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      // If the user isn't found in the database, return an 'incorrect credentials' message
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // Passwords match

        req.session.userId = user.id;
        res.status(200).json({
          message: "Logged in successfully",
          user: {
            name: user.name,
            email: user.email,
          },
        });
      } else {
        // Passwords don't match
        res.status(401).json({ message: "Incorrect credentials" });
      }
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred during the login process" });
  }
});

module.exports = router;