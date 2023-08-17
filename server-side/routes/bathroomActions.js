const express = require("express");
const router = express.Router();
const {User, Bathroom, Review} = require("../models");
const { authenticateUser } = require("../middleware/auth");
const { Op } = require("sequelize");
  //add a bathroom (user authentication) with incrementing sourceId
     router.post("/createBathroom", authenticateUser,  async (req, res) => {
      try{
             //const userId = req.session.userId;
             const bathroomsCount = await Bathroom.count({
              where: {
                sourceid: {
                  [Op.like]: 'usercreated%'
                }
              }
            });
        
            const timestamp = new Date().getTime(); // Get the current timestamp
            const randomValue = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
            const newSourceId = `usercreated_${timestamp}_${randomValue}`;

             const newbathroom = await Bathroom.create({
             sourceid: newSourceId,
             address: req.body.address,
             lat: req.body.lat,
             lng: req.body.lng,
             name: req.body.name,
             rating: req.body.rating,
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
             createdAt: new Date(),
             updatedAt: new Date(),
             //UserId: req.session.userId, // Set the UserId to the logged-in user's ID
             UserId: req.session.userId,
           //  sourceid:"usercreated"
           });
       
     
     
         //  res.status(201).json({newbathroom, userId});
           res.status(201).json(newbathroom);
           
         }
         catch(err){
           console.error(err);
           res.status(500).send({message: err.message});
         }
       });
//get a bathroom by Id
router.get("/bathrooms/:bathroomId", async (req, res) => {

  const bathroomId = parseInt(req.params.bathroomId, 10);
  
  console.log(bathroomId);


  try {
    const bathroom = await Bathroom.findOne({ where: { id: bathroomId } });

    if (bathroom) {
      res.status(200).json(bathroom);
    } else {
      res.status(404).send({ message: "bathroom not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
 //--------------------------------------------------------------------------
 router.delete("/bathrooms/:bathroomId", authenticateUser,  async (req, res) => {
  const bathroomId = parseInt(req.params.bathroomId, 10);

  try {
    const record = await Bathroom.findOne({ where: { id: bathroomId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      console.log("UserID in record:", record.UserId);
console.log("UserID from session:", req.session.userId);
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this bathroom" });
    }
    const deleteOp = await Bathroom.destroy({ where: { id: bathroomId } });
    if (deleteOp > 0) {
      res.status(200).send({ message: "Bathroom deleted successfully" });
    } else {
      res.status(404).send({ message: "Bathroom not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
//--------------delete a review
router.delete("/userReviews/:reviewId", authenticateUser,  async (req, res) => {
  const reviewId = parseInt(req.params.reviewId, 10);

  try {
    const record = await Review.findOne({ where: { id: reviewId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      console.log("UserID in record:", record.UserId);
console.log("UserID from session:", req.session.userId);
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this bathroom" });
    }
    const deleteOp = await Review.destroy({ where: { id: reviewId } });
    if (deleteOp > 0) {
      res.status(200).send({ message: "Bathroom deleted successfully" });
    } else {
      res.status(404).send({ message: "Bathroom not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

//----update bathroom rating from reviews rating

  //Edit Rating (edit bathroom)

router.patch("/bathroomsrating/:bathroomId", async (req, res) => {
  const bathroomId = parseInt(req.params.bathroomId, 10);
  try {
    const record = await Bathroom.findOne({ where: { id: bathroomId } });
    if (!record) {
      return res.status(404).json({ message: "Bathroom not found" });
    }

    // Check if the user is authorized to edit the bathroom
    // if (record.UserId !== parseInt(req.session.userId, 10)) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to edit this bathroom." });
    // }


    //get bathroomid bathrooms current rating:
    const curBathroom = await Bathroom.findOne({ where: { id: bathroomId } });
    const OldRate = curBathroom.rating;


    var newAvg;
    //NEED A CONDITION FOR NULL 
    if (curBathroom.rating === null) {
      newAvg = req.body.rating
    }
    else {
      const numOfReviews = await Review.count({ where: { BathroomId: bathroomId } });


      // New rating from the request
      const newRating = req.body.rating;

      // Moving average calculation
      newAvg = OldRate + (newRating - OldRate) / (numOfReviews + 1);
    }

 let variablesToUpdate = [
  'wheelchair',
  'unisex',
  'emergencyCord',
  'emergencyButton',
  'petFriendly',
  'requiresKey',
  'handDryer',
  'feminineProducts',
  'toiletCovers',
  'bidet',
  'singleStall',
  'multipleStall',
  'changingTable',
  'trashCan',
  'goodFlooring',
  'airFreshener',
  'automatic',
  'coatHook',
  'brailleSign',
  'hotWater',
  'firstAid',
  'sharpsDisposal'
];

let updates = {};

variablesToUpdate.forEach(variable => {
  let newValue = curBathroom[variable];
  if (req.body[variable] == 1) {
      newValue += 1;
  }
  updates[variable] = newValue;
});

// Assuming you still want to update rating as you did in your provided code
updates['rating'] = Math.round(newAvg);

await curBathroom.set(updates);
await curBathroom.save();

res.message("updated");
  //add new average to the request body 
    // const [numberOfAffectedRows, affectedRows] = await Bathroom.update(

    //   {wheelchair: newWC},
    //   {rating: Math.round(newAvg) },
    //   // req.body,
    //   { where: { id: bathroomId }, returning: true }
    // );

    // if (numberOfAffectedRows > 0) {
    //   res.status(200).json(affectedRows[0]);
    // } else {
    //   res.status(404).json({ message: "Bathroom not found" });
    // }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: "An error occurred while updating the bathroom" });
    console.error(err);
  }
});

     module.exports = router;