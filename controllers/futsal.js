const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");
const Futsal = require("../model/futsal");


//--------------------CREATE Futsal------------------

exports.addFutsal = asyncHandler(async (req, res, next) => {
  const futsal = await Futsal.create(req.body);

  if (!futsal) {
    return next(new ErrorResponse("Error adding Futsal"), 404);
  }

  res.status(201).json({
    success: true,
    data: futsal,
  });
});

//-------------------Display all Futsals

exports.getFutsals = asyncHandler(async (req, res, next) => {
  const futsal = await Futsal.find({});

  res.status(201).json({
    success: true,
    count: futsal.length,
    data: futsal,
  });
});

// // -----------------FIND Futsal BY Drink-------------------

// exports.getAllDrinks = asyncHandler(async (req, res, next) => {
//   const Futsal = await Futsal.find({ FutsalType: "Drink" })

//   if (!Futsal) {
//     return next(new ErrorResponse("Futsal not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: Futsal,
//   });
// });

// // -----------------FIND Futsal BY Vege-------------------

// exports.getAllVege = asyncHandler(async (req, res, next) => {
//   const Futsal = await Futsal.find({ FutsalType: "Vege" })

//   if (!Futsal) {
//     return next(new ErrorResponse("Futsal not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: Futsal,
//   });
// });

// // -----------------FIND Futsal BY Non-vege-------------------

// exports.getAllNonVege = asyncHandler(async (req, res, next) => {
//   const Futsal = await Futsal.find({ FutsalType: "Non-vege" })

//   if (!Futsal) {
//     return next(new ErrorResponse("Futsal not found"), 404);
//   }

//   res.status(200).json({
//     success: true,
//     data: Futsal,
//   });
// });



// -----------------DELETE customer------------------------

exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Futsal.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`No student found `), 404);
  }

  await customer.remove();

  res.status(200).json({
    success: true,
    count: customer.length,
    data: {},
  });
});



exports.FutsalUpdate = asyncHandler(async (req, res, next) => {
  const { id, name,location,price,phoneNo, } = req.body;

  if (!Futsal) {
    return next(new ErrorResponse(`No Futsal found `), 404);
  }

  await Futsal.updateOne({ _id: id }, { FutsalName: FutsalName, FutsalType: FutsalType })
    .then(function (result) {
      res.status(200).json({ message: "Futsal Updated!!" })
    })
    .catch(function (e) {
      res.status(200).json({ error: e })
    })

});

// ------------------UPLOAD IMAGE-----------------------

exports.FutsalPhotoUpload = asyncHandler(async (req, res, next) => {
  const futsal = await Futsal.findById(req.params.id);

  console.log(futsal);
  if (!futsal) {
    return next(new ErrorResponse(`No student found with ${req.params.id}`), 404);
  }


  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo and accept any extension of an image
  // if (!file.mimetype.startsWith("image")) {
  //   return next(new ErrorResponse(`Please upload an image`, 400));
  // }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${futsal.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    //insert the filename into database
    await Futsal.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });

  res.status(200).json({
    success: true,
    data: file.name,
  });
});