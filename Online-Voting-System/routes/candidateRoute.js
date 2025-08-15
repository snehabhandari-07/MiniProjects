const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require("../jwt");
const { createCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidateController');
const { voteCandidate, getVoteCount, getCandidates } = require('../controllers/voteController');


// Post route to add candidate
router.post("/", jwtAuthMiddleware, createCandidate)

// change candidate details
router.put("/:candidateId",jwtAuthMiddleware, updateCandidate)

// Delete Candidate
router.delete("/:candidateId", jwtAuthMiddleware, deleteCandidate)

// Vote Candidate
router.post("/vote/:candidateId", jwtAuthMiddleware, voteCandidate)

// vote count 
router.get('/vote/count', getVoteCount);

// Get List of all candidates with only name and party fields
router.get('/', getCandidates);

module.exports = router;