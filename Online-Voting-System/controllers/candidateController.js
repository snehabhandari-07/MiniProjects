const Candidate = require('../models/candidate');
const User = require('../models/user');

const checkAdminRole = async(userId) => {
    try{
        const user = await User.findById(userId);
        if(user.role == "admin"){
            return true;
        }
    }catch(err){
        return false;
    }
}

const createCandidate = async(req, res) => {
    try{

        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "User not Admin"});

        // Data is coming from req.body
        const data = req.body;
        const newCandidate = new Candidate(data); //create a newUser using User model

        // Save the data in document
        const response = await newCandidate.save();
        console.log(response);

        // Send the json response
        res.status(200).json({response: response});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

const updateCandidate = async(req, res) => {
    try{

        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "User not Admin"});

        const candidateId = req.params.candidateId;
        const newCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateId, newCandidateData, {
            new: true,
            runValidators: true
        })

        if(!response){
            res.status(404).json({ error: "Candidate not found" });
        }

        console.log("Data updated");

        res.status(200).json({response: response });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

const deleteCandidate = async(req, res) => {
    try{

        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: "User not Admin"});

        const candidateId = req.params.candidateId;

        const response = await Candidate.findByIdAndDelete(candidateId);

        if(!response){
            res.status(404).json({ error: "Candidate not found" });
        }

        console.log("Data deleted");

        res.status(200).json({response: response });
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
}

module.exports = {createCandidate, updateCandidate, deleteCandidate}