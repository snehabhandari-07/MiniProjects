const Candidate = require('../models/candidate');
const User = require('../models/user');

const voteCandidate = async(req, res) => {
    // no admin can vote
    // one user can vote one time

    try{
        const candidateID = req.params.candidateId;
        const userId = req.user.id;

        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({message: "Candidate not found"});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(await checkAdminRole(userId)){
            return res.status(403).json({message: "Admin cannot vote"});
        }
        if(user.isVoted){
            return res.status(403).json({message: "You have already Voted"});
        }

        // Update Candidate document
        candidate.votes.push({user: userId})
        candidate.voteCount++;
        await candidate.save();

        // update user isVoted
        user.isVoted = true;
        await user.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }

}

const getVoteCount = async (req, res) => {
    try{
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find({}, {party: 1, voteCount: 1, _id: 0}).sort({voteCount: -1});

        return res.status(200).json(candidate);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getCandidates = async (req, res) => {
    try {
        // Find all candidates and select only the name and party fields, excluding _id
        const candidates = await Candidate.find({}, 'name party -_id');

        // Return the list of candidates
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {voteCandidate, getVoteCount, getCandidates}