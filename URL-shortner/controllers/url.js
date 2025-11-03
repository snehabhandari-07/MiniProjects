const {nanoid} = require("nanoid");
const URL = require("../models/url");

async function handleGenerateShortId(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectedURL: body.url,
        visitHistory: [] 
    });

    return res.json({id: shortId});
}

async function handleShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push : {
            visitHistory: {
                timestamp : Date.now()
            }
        }
    });

    res.redirect(entry.redirectedURL);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    
    return res.json({
        totalCount: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {handleGenerateShortId, handleShortId, handleGetAnalytics}