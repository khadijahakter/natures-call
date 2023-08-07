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

  module.exports = router;

