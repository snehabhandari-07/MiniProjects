const express = require("express");
const router = express.Router();
const {getContacts, createContacts, getContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
// => /api/contacts
router.route("/")
.get(getContacts)
.post(createContacts)

// => /api/contacts/:id
router.route("/:id")
.get(getContact)
.put(updateContact)
.delete(deleteContact)

module.exports = router;