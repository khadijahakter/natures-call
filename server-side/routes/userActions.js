const express = require("express");
const router = express.Router();
const {User, Bathroom, Review} = require("../models");
const { authenticateUser } = require("../middleware/auth");




//create a review for a bathroom
router.post("/:bathroomId/reviews",  authenticateUser, async (req, res) => {
 
    const bathroomId = parseInt(req.params.bathroomId, 10);
  const userId = req.session.userId;
  //const userId = parseInt(req.session.userId, 10)
  // console.log("userId", userId); // Get the user ID from the session
    try {
      const review = await Review.create({
        content: req.body.content,
        photo: req.body.photo,
        wheelchair: req.body.wheelchair,
        unisex: req.body.unisex,
        emergencyCord: req.body.emergencyCord,
        emergencyButton: req.body.emergencyButton,
        petFriendly: req.body.petFriendly,
        requiresKey: req.body.requiresKey,
        handDryer: req.body.handDryer,
        feminineProducts: req.body.feminineProducts,
        toiletCovers: req.body.toiletCovers,
        bidet: req.body.bidet,
        singleStall: req.body.singleStall,
        multipleStall: req.body.multipleStall,
        changingTable: req.body.changingTable,
        trashCan: req.body.trashCan,
        goodFlooring: req.body.goodFlooring,
        airFreshener: req.body.airFreshener,
        automatic: req.body.automatic,
        coatHook: req.body.coatHook,
        brailleSign: req.body.brailleSign,
        hotWater: req.body.hotWater,
        firstAid: req.body.firstAid,
        sharpsDisposal: req.body.sharpsDisposal,
        BathroomId: bathroomId,
         UserId: userId, // Set the UserId to the logged-in user's ID
        
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "An error occurred while creating the review" });
    }
  });
  
  //editing review
  router.patch("/bathrooms/:bathroomId/:reviewId", authenticateUser, async (req, res) => {
    const reviewId = parseInt(req.params.reviewId, 10);
   try {
      const record = await Review.findOne({ where: { id: reviewId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform that action." });
      }
  
      const [numberOfAffectedRows, affectedRows] = await Review.update(
        req.body,
        { where: { id: reviewId }, returning: true }
      );
    if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Comment not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      res.status(500).send({ message: err.message });
      console.error(err);
    }
  });


  module.exports = router;