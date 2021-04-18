const express = require("express");
const  router = express.Router();
const { protect } = require("../middleware/auth");

const {
   addFutsal,
   FutsalUpdate,
   getFutsals,
   // getAllDrinks,
   // getAllVege,
   // getAllNonVege,
   FutsalPhotoUpload
  } = require("../controllers/futsal");

  router.post("/add/futsal", protect, addFutsal);
  router.get("/futsal/all", getFutsals)
//   router.get("/Futsal/drink",getAllDrinks)
//   router.get("/Futsal/vege",getAllVege)
//   router.get("/Futsal/non-vege",getAllNonVege)
  router.put("/futsal/update", protect, FutsalUpdate)
  router.put("/futsal/:id/photo",protect, FutsalPhotoUpload);
  
  

  module.exports = router