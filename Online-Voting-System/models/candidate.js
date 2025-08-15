const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user");

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

const Candidate = new mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;