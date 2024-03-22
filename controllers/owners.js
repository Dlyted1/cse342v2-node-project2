const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const ownerResult = await mongodb
        .getDb()
        .db("project2")
        .collection('owners')
        .find()
    ownerResult.toArray().then((lists) => {
        // .toArray((err, lists) => {
        //    if (err) {
        //    res.status(400).json({ message: err });
        //    }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid owner id.');
    }
    const userId = new ObjectId(req.params.id);
    const ownerResult = await mongodb
        // mongodb
        .getDb()
        .db("project2")
        .collection('owners')
        .find({ _id: userId })

    horseResult.toArray().then((lists) => {
        // .toArray((err, result) => {
        //    if (err) {
        //    }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createOwner = async (req, res) => {
    const owner = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone

    };

    try {
        const response = await mongodb
            .getDb()
            .db("project2")
            .collection('owners')
            .insertOne(owner);

        if (response.acknowledged && response.ops && response.ops.length > 0) {
            // Check if response.ops exists and has at least one element
            // Respond with the created horse data
            res.status(201).json(response.ops[0]); // ops contains the inserted document(s)
        } else {
            res.status(500).json('Some error occurred while creating the owner profile.');
        }
    } catch (error) {
        console.error("Error creating owner:", error); // Log the error to console
        res.status(500).json('Some error occurred while creating the owner profile.');
    }
};

async function updateOwner(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid owner id to update.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const owner = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.email.email,
        phone: req.body.phone,
    };
    const response = await mongodb
        .getDb()
        .db("project2")
        .collection('owners')
        .replaceOne({ _id: userId }, owner);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the owner.');
    }
};

const deleteOwner = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid owner id to delete.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db("project2")
        .collection('owners')
        .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Owner not found.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createOwner,
    updateOwner,
    deleteOwner
};