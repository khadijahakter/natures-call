const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { User, Bathroom, Review } = require("../models");
const { authenticateUser } = require("../middleware/auth");
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"), // Make sure to adjust the destination path
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// PATCH endpoint to update user profile pic via file
router.patch("/updateprofilepicFile", authenticateUser, upload.single("profilePhoto"), async (req, res) => {
  try {
    const photoUrl = `/uploads/${req.file.filename}`;

    // Update the user's photo field using the update method
    const updatedUser = await User.update(
      { photo: photoUrl },
      { where: { id: req.session.userId }, returning: true }
    );

    if (updatedUser[0] === 1) {
      res.status(200).json({ photoUrl });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the profile photo" });
  }
});
//get all reviews from a user (Jean method from robert)
router.get("/myReviews", authenticateUser, async (req, res) => {

  const userId = parseInt(req.session.userId, 10)
  //console.log(userId);

  try {

    //testing  
    // const allReviews = await Review.findAll();
    // res.status(200).json(allReviews);

    const userReviews = await Review.findAll({ where: { UserId: userId } });
    res.status(200).json(userReviews);

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//get profile bathrooms based on session UserID
router.get("/myBathrooms", authenticateUser, async (req, res) => {


  const userId = parseInt(req.session.userId, 10);

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
router.get("/userData", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    
    // Convert the 'createdAt' date to a more readable format
    const dateObj = new Date(user.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        createdAt: formattedDate  // Use the formatted date here
      }
    });
  } else {
    return res.status(401).json({ user: null })
  }
});
   
//get all users that made an account and logged in


// Route to get all users who have made an account and logged in
router.get('/allUsers', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const usersData = allUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      photo: user.photo
    }));
    return res.status(200).json(usersData);
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
//get all bathrooms 
router.get("/bathrooms", async (req, res) => {
  try {
    const allbathrooms = await Bathroom.findAll();


    res.status(200).json(allbathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//PATCH endpoint to update user's profile photo
router.patch("/user/updateprofilepic", authenticateUser, async (req, res) => {
  const userId = req.session.userId; // Assuming you have userId in the session

  try {
    const user = await User.findByPk(req.session.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.id !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this profile photo" });
    }

    // Update the user's photo field using the update method
    const updatedUser = await user.update(

      {
        photo: req.body.newProfilePhoto
      }, // Update the 'photo' field

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
