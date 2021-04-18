const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,

        },
        location: {
            type: String,
        },
        price: {
            type: String,
        },

        phoneno: {
            type: String,
        },

        photo: {
            type: String,
            default: "no-photo.jpg",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);


module.exports = mongoose.model("Item", ItemSchema);
