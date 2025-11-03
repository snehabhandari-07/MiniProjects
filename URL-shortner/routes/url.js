const express = require("express");
const {handleGenerateShortId, handleShortId, handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateShortId);
router.get("/:shortId", handleShortId);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
