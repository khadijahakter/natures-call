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
      message: "Error occurred while creating user  ",
      error: error,
      
    });
  }

});
// router.post("/signup", async (req, res) => {
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);

//   try {
//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     req.session.userId = user.id;
//     // Send a response to the client informing them that the user was successfully created
//     res.status(201).json({
//       message: "User created!",
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.name === "SequelizeValidationError") {
//       return res.status(422).json({ errors: err.errors.map((e) => e.message) });
//     }
//     res.status(500).json({
//       message: "Error occurred while creating user",
//       error: err,
//     });
//   }
// });

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
// router.post("/login", async (req, res) => {
//   try {
//     console.log("body", req.body);
//     // First, find the user by their email address
//     const user = await User.findOne({ where: { email: req.body.email } });

//     if (user === null) {
//       // If the user isn't found in the database, return an 'incorrect credentials' message
//       return res.status(401).json({
//         message: "Incorrect credentials",
//       });
//     }

//     // If the user is found, we then use bcrypt to check if the password in the request matches the hashed password in the database
//     bcrypt.compare(req.body.password, user.password, (error, result) => {
//       if (result) {
//         // Passwords match

//         req.session.userId = user.id;
//         res.status(200).json({
//           message: "Logged in successfully",
//           user: {
//             name: user.name,
//             email: user.email,
//           },
//         });
//       } else {
//         // Passwords don't match
//         res.status(401).json({ message: "Incorrect credentials" });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "An error occurred during the login process" });
//   }
// });
// //create a review for a bathroom
// router.post("/:bathroomId/reviews",  authenticateUser, async (req, res) => {
 
//   const bathroomId = parseInt(req.params.bathroomId, 10);
// const userId = req.session.userId;
// //const userId = parseInt(req.session.userId, 10)
// // console.log("userId", userId); // Get the user ID from the session
//   try {
//     const review = await Review.create({
//       content: req.body.content,
//       photo: req.body.photo,
//       wheelchair: req.body.wheelchair,
//       unisex: req.body.unisex,
//       emergencyCord: req.body.emergencyCord,
//       emergencyButton: req.body.emergencyButton,
//       petFriendly: req.body.petFriendly,
//       requiresKey: req.body.requiresKey,
//       handDryer: req.body.handDryer,
//       feminineProducts: req.body.feminineProducts,
//       toiletCovers: req.body.toiletCovers,
//       bidet: req.body.bidet,
//       singleStall: req.body.singleStall,
//       multipleStall: req.body.multipleStall,
//       changingTable: req.body.changingTable,
//       trashCan: req.body.trashCan,
//       goodFlooring: req.body.goodFlooring,
//       airFreshener: req.body.airFreshener,
//       automatic: req.body.automatic,
//       coatHook: req.body.coatHook,
//       brailleSign: req.body.brailleSign,
//       hotWater: req.body.hotWater,
//       firstAid: req.body.firstAid,
//       sharpsDisposal: req.body.sharpsDisposal,
//       BathroomId: bathroomId,
//        UserId: userId, // Set the UserId to the logged-in user's ID
      
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     res.status(201).json(review);
//   } catch (error) {
//     console.error("Error creating review:", error);
//     res.status(500).json({ message: "An error occurred while creating the review" });
//   }
// });
module.exports = router;