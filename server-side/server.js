const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
const Sequelize = require('sequelize');
const {User, Bathroom, Review} = require("./models"); // Replace the path with the correct one for your project
// const {Bathroom, Review, User} = require("./models"); // Replace the path with the correct one for your project
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const cron = require('node-cron');
const router = express.Router();
const authRouter = require("./routes/auth");
const ProfileRouter = require("./routes/userProfileData");
const UserActionRouter = require("./routes/userActions");
const BathroomActionRouter = require("./routes/bathroomActions");
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);


// --- fetching from api ---
const getAllBathrooms = async () => {
  let page = 1;
  const perPage = 10;

  while (true) {
    const options = {
      method: 'GET',
      url: 'https://public-bathrooms.p.rapidapi.com/location',
      params: {
        lat: '40.730610',
        lng: '-73.935242',
        page: page.toString(),
        per_page: perPage.toString(),
        offset: '0',
        ada: 'false',
        unisex: 'false'
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      if (response.data && response.data.length > 0) {
        for (const bathroom of response.data) {
          var wheelchair_accessible = +bathroom.accessible;
          var unisex = +bathroom.unisex;
          var changingTable = +bathroom.changing_table;
          const newbathroom = await Bathroom.create({
            sourceid: bathroom.id,
            address: bathroom.street + ', ' + bathroom.city + ', ' + bathroom.state, // Assuming these fields exist
            lat: bathroom.latitude,
            lng: bathroom.longitude,
            name: bathroom.name,
            rating: null, // Assuming this comes from your request or some other source
            content: null,
            photo: null,
            wheelchair: wheelchair_accessible,
            unisex: unisex,
            emergencyCord: null,
            emergencyButton: null,
            petFriendly: null,
            requiresKey: null,
            handDryer: null,
            feminineProducts: null,
            toiletCovers: null,
            bidet: null,
            singleStall: null,
            multipleStall: null,
            changingTable: changingTable, // Assuming this field exists
            trashCan: null,
            goodFlooring: null,
            airFreshener: null,
            automatic: null,
            coatHook: null,
            brailleSign: null,
            hotWater: null,
            firstAid: null,
            sharpsDisposal: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: null,
          });
          console.log(newbathroom);
        }

      } else {
        break; // No more data, exit the loop
      }
    } catch (error) {
      console.error(error);
      break; // Error occurred, exit the loop
    }

    page += 1;
  }
};






//prints to the console what request was made and the status returned
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
  
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, 
      },
    })
  );
//--------------------------------------welcome-------------------------------
//-----------------------login auth---------------------------------------------
app.post("/logins", async (req, res) => {
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
 //signUp
 app.post("/signups", async (req, res) => {
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
       UserId: req.session.userId,
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
app.get("/", (req, res) => {
  res.send("Welcome to Nature's Call!");
});

//get the user name and email by userID
app.get("/users/:userId",  async (req,res) =>{
  const userId = parseInt(req.params.userId, 10);
  
  console.log(userId);

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.get("/profile/userData", async (req,res) =>{

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

// //logout (destroy session)
// app.delete("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ message: "Logout failed" });
//     }

//     res.clearCookie("connect.sid");
    
//     return res.status(200).json({ message: "Logout successful" });
//   });
// });

//---------------------------------authenticate user------------------------
const authenticateUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  req.user = await User.findByPk(req.session.userId);
  next();
};


//------------------------------------------------------------------------------
//-----------------------bathrooms--------------
//get all of our databases bathrooms
app.get("/bathrooms", async (req, res) => {
  try {
    const allbathrooms = await Bathroom.findAll();


    res.status(200).json(allbathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// --------------------------------------------------------------
// ------------------------------get a specific bathrroom by Id-------------------
app.get("/bathrooms/:bathroomId", async (req, res) => {

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

//get all bathrooms the user posted based on user Id



app.get("/bathrooms/user/:userId", authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const userBathrooms = await Bathroom.findAll({
      where: { UserId: userId },
    });

    res.status(200).json(userBathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
//get profile bathrooms based on session UserID
app.get("/myBathrooms", authenticateUser, async (req, res) => {


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

  //create a bathroom --- based on user Id ------------------------
  app.post("/bathrooms",   async (req, res) => {
 try{
        //const userId = req.session.userId;

        const newbathroom = await Bathroom.create({
        sourceid: req.body.sourceid,
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
        UserId:2,
        sourceid:"user1"
      });
  


    //  res.status(201).json({newbathroom, userId});
      res.status(201).json(newbathroom);
      
    }
    catch(err){
      console.error(err);
      res.status(500).send({message: err.message});
    }
  });
  //--------------------------------------------------------------------------
  app.delete("/bathrooms/:bathroomId", authenticateUser, async (req, res) => {
    const bathroomId = parseInt(req.params.bathroomId, 10);

    try {
      const record = await Bathroom.findOne({ where: { id: bathroomId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        console.log("UserID:" , record);
        console.log("UserID:" , req.session.userId);
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
  


///-------------------------------REVIEWS------------------------------------------
//get all reviews for a single bathroom 
// bathrooms/bathroomId/reviews
app.get("/bathrooms/:bathroomId/reviews", async (req, res) => {

  const bathroomId = parseInt(req.params.bathroomId, 10)
  console.log(bathroomId);

  try {

  //testing  
  // const allReviews = await Review.findAll();
  // res.status(200).json(allReviews);

  const bathroomReviews = await Review.findAll({where: {BathroomId : bathroomId}});
  res.status(200).json(bathroomReviews);

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
//bathroom filter

// Assuming you have Sequelize imported and the Bathroom model defined

const { Op, literal } = require("sequelize");//op contains operators for queries, literal inserts raw sql into sequelize

app.post("/nearby", async (req, res) => {
  const userLat = parseFloat(req.body.lat);
  const userLong = parseFloat(req.body.long);
  const maxDistance = 5;// this is kilometers

  try {
    const userBathrooms = await Bathroom.findAll({
      where: {
        lat: {
          [Op.and]: [
            literal(`CAST(lat AS NUMERIC) >= ${userLat - 0.009 * maxDistance}`),
            literal(`CAST(lat AS NUMERIC) <= ${userLat + 0.009 * maxDistance}`),
          ],
        },
        lng: {
          [Op.and]: [
            literal(`CAST(lng AS NUMERIC) >= ${userLong - 0.009 * maxDistance}`),
            literal(`CAST(lng AS NUMERIC) <= ${userLong + 0.009 * maxDistance}`),
          ],
        },
      },
    });

    res.status(200).json(userBathrooms);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});



//creating review for specific bathroom
app.post("/bathrooms/:bathroomId/reviews", authenticateUser, async (req, res) => {
 
  const bathroomId = parseInt(req.params.bathroomId, 10);
 const userId = req.session.userId;
 console.log("userId", userId); // Get the user ID from the session
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
     // UserId: 1, // Set the UserId to the logged-in user's ID
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "An error occurred while creating the review" });
  }
});

//get all reviews from a user (Jean method from robert)
app.get("/myReviews", authenticateUser, async (req, res) => {

  const userId = parseInt(req.session.userId, 10)
  console.log(userId);

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

//get all reviews from a user
app.get("/:userId/reviews", async (req, res) => {

  const userId = parseInt(req.params.userId, 10)
  console.log(userId);

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
//delete a review if the user was the one who creared it
app.delete("/bathrooms/:bathroomId/:reviewsId", authenticateUser, async (req, res) => {
  const reviewId = parseInt(req.params.reviewsId, 10);

  try {
    const record = await Review.findOne({ where: { id: reviewId } });
    if (record && record.UserId !== parseInt(req.session.userId, 10)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform that action." });
    }

    const deleteOp = await Review.destroy({ where: { id: reviewId } });

    if (deleteOp > 0) {
      res.status(200).send({ message: "review deleted successfully" });
    } else {
      res.status(404).send({ message: "review not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
//edit a review 

 app.patch("/bathrooms/:bathroomId/:reviewId", authenticateUser, async (req, res) => {
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
      res.status(404).send({ message: "review not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});








//Edit Rating

app.patch("/bathrooms/:bathroomId", async (req, res) => {
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
    const curBathroom = await Bathroom.findOne({where : {id : bathroomId}});
    const OldRate = curBathroom.rating;


    var newAvg;
//NEED A CONDITION FOR NULL 
if (curBathroom.rating === null)
{
 newAvg = req.body.rating
}
else
{
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


app.use("/api/auth", authRouter );
app.use("/api/userProfileData", ProfileRouter);
app.use("/api/userActions", UserActionRouter);
app.use("/api/bathroomActions", BathroomActionRouter);
// -- cronjob scheduling --
cron.schedule('0 0 6 * *', () => {
  console.log('running a task every minute');
  getAllBathrooms();
  
});

  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

