const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");
// @desc GET all Contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})

// @desc POST all Contacts
// @route POST /api/contacts
// @access private
const createContacts = asyncHandler(async(req, res) => {
    console.log(`Request of the body is ${JSON.stringify(req.body)}`);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name, email, phone
    })
    res.send(contact);
})

// @desc GET Contact for ID
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.json(contact);
})

// @desc PUT ie UPDATE Contact for ID
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new : true
        }
    )
    res.json(updatedContact);
})

// @desc DELETE Contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete contact");
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.json(deletedContact);
})


module.exports = {getContacts, createContacts, getContact, updateContact, deleteContact};