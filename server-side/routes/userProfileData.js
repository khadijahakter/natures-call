const express = require("express");
const router = express.Router();
const {User, Bathroom, Review} = require("../models");
const { authenticateUser } = require("../middleware/auth");

//get all reviews from a user (Jean method from robert)
router.get("/myReviews", authenticateUser, async (req, res) => {

    const userId = parseInt(req.session.userId, 10)
    //console.log(userId);
  
    try {
  
    //testing  
    // const allReviews = await Review.findAll();
    // res.status(200).json(allReviews);
  
    const userReviews = await Review.findAll({where: {UserId : userId}});
    res.status(200).json(userReviews);
  
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  //get profile bathrooms based on session UserID
router.get("/myBathrooms", authenticateUser, async (req, res) => {


    const userId = parseInt(req.session.userId,10);
   
    console.log("robert", userId);
    try {
      const userBathrooms = await Bathroom.findAll({
        where: { UserId: userId },
      });
  
      res.status(200).json(userBathrooms);
    } catch (err) {
     // console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  //get user info 
  router.get("/userData", async (req,res) =>{

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

//update a profile photo

// router.patch("/user/profilepic", authenticateUser, async (req, res) => {
//   const userId = parseInt(req.session.userId,10);
// console.log("userId", userId);
//   try {
//     const record = await User.findOne({ where: { id: userId } });
//     if (record && record.UserId !== parseInt(req.session.userId, 10)) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this profile photo" });
//     }

//     const [numberOfAffectedRows, affectedRows] = await User.update(req.user.photo, {
//       where: { id: userId },
//       returning: true,
//     });

//     if (numberOfAffectedRows > 0) {
//       res.status(200).json(affectedRows[0]);
//     } else {
//       res.status(404).send({ message: "User not found" });
//     }
//   } catch (err) {
//     if (err.name === "SequelizeValidationError") {
//       return res.status(422).json({ errors: err.errors.map((e) => e.message) });
//     }
//     console.error(err);
//     res.status(500).send({ message: err.message });
//   }
// });
// PATCH endpoint to update user's profile photo
router.patch("/user/profilepic", authenticateUser, async (req, res) => {
  const userId = req.session.userId; // Assuming you have userId in the session

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.id !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this profile photo" });
    }

       // Update the user's photo field using the update method
       const updatedUser = await user.update(
    
        {  
          name: req.body.newName }, // Update the 'photo' field
        
        { where: { id: userId }, returning: true }
      );
    console.log("new profile photo", user);
    res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the profile photo" });
  }
});

   module.exports = router;