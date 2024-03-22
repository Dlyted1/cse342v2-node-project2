const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const horseResult = await mongodb
        .getDb()
        .db("project2")
        .collection('horses')
        .find()
    horseResult.toArray().then((lists) => {
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
        res.status(400).json('Must use a valid horse id.');
    }
    const userId = new ObjectId(req.params.id);
    const horseResult = await mongodb
        // mongodb
        .getDb()
        .db("project2")
        .collection('horses')
        .find({ _id: userId })

    horseResult.toArray().then((lists) => {
        // .toArray((err, result) => {
        //    if (err) {
        //    }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createHorse = async (req, res) => {
    const horse = {
        name: req.body.name,
        breed: req.body.breed,
        coloring: req.body.coloring,
        gender: req.body.gender,
        birthday: req.body.birthday,
        discipline: req.body.discipline,
        vet: req.body.vet
    };

    try {
        const response = await mongodb
            .getDb()
            .db("project2")
            .collection('horses')
            .insertOne(horse);

        if (response.acknowledged && response.ops && response.ops.length > 0) {
            // Check if response.ops exists and has at least one element

            // Respond with the created horse data
            res.status(201).json(response.ops[0]); // ops contains the inserted document(s)
        } else {
            res.status(500).json('Some error occurred while creating the horse profile.');
        }
    } catch (error) {
        console.error("Error creating horse:", error); // Log the error to console
        res.status(500).json('Some error occurred while creating the horse profile.');
    }
};

async function updateHorse(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid horse id to update.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const horse = {
        name: req.body.name,
        breed: req.body.breed,
        coloring: req.body.coloring,
        gender: req.body.gender,
        birthday: req.body.birthday,
        discipline: req.body.discipline,
        vet: req.body.vet
    };
    const response = await mongodb
        .getDb()
        .db("project2")
        .collection('horses')
        .replaceOne({ _id: userId }, horse);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the horse.');
    }
};

const deleteHorse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid horse id to delete.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db("project2")
        .collection('horses')
        .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Horse not found.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createHorse,
    updateHorse,
    deleteHorse
}

