const express = require("express");
const router = express.Router();
const {User, Bathroom, Review} = require("../models");
const { authenticateUser } = require("../middleware/auth");

  //add a bathroom (user authentication)
  router.post("/createBathroom", authenticateUser,  async (req, res) => {
    try{
           const userId = req.session.userId;
   
           const newbathroom = await Bathroom.create({
           sourceid: "usercreated", 
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
           UserId: req.session.userId, // Set the UserId to the logged-in user's ID
         });
     
   
         console.log("bathroom User ID:", userId);
         res.status(201).json(newbathroom);
   
       }
       catch(err){
         console.error(err);
         res.status(500).send({message: err.message});
       }
     });

     module.exports = router;