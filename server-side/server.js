const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const port = 4000;
const session = require("express-session");
const Sequelize = require('sequelize');
const {User, Bathroom, Review} = require("./models"); // Replace the path with the correct one for your project
// const {Bathroom, Review, User} = require("./models"); // Replace the path with the correct one for your project

require("dotenv").config();
//-----------------------login auth---------------------------------------------

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
app.get("/", (req, res) => {
  res.send("Welcome to Nature's Call!");
});
//-----------------------login, sign up, and logout -----------------
  //signUp
  app.post("/signup", async (req, res) => {
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
        message: "Error occurred while creating user",
        error: error,
        
      });
    }

  });
  //login using credentials--------------------------------------------- (name email and pass)
  app.post("/login", async (req, res) => {
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
//logout (destroy session)
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    
    return res.status(200).json({ message: "Logout successful" });
  });
});
//------------------------------------------------------------------------------

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

app.get("/bathrooms/:bathroomId", async (req, res) => {

  const bathroomId = parseInt(req.params.bathroomId, 10);
  
  console.log(bathroomId);

  try {
    const bathroom = await Bathroom.findOne({ where: { bathroomId: bathroomId } });

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

  //create a bathroom
  app.post("/bathrooms", async (req, res) => {
    try{

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
        UserId: req.session.userId,
      });
      


      res.status(201).json(newbathroom);
    }
    catch(err){
      console.error(err);
      res.status(500).send({message: err.message});
    }
  });

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

//creating review for specific bathroom
app.post("/bathrooms/:bathroomId/reviews", async (req, res) => {
 
const bathroomId = parseInt(req.params.bathroomId, 10);
//user id = session user
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
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "An error occurred while creating the review" });
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



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});