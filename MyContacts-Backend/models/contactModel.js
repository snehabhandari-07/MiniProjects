const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const contactSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: [true, "Please add Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please add Contact Email Address"]
    },
    phone: {
        type: String,
        required: [true, "Please add Contact phone number"]
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactSchema);