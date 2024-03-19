const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('horses')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid horse id.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('horses')
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
};

const createHorse = async (req, res) => {
    const contact = {
        name: req.body.name,
        breed: req.body.breed,
        coloring: req.body.coloring,
        gender: req.body.gender,
        birthday: req.body.birthday,
        discipline: req.body.discipline,
        vet: req.body.vet
    };
    const response = await mongodb.getDb().db().collection('horses').insertOne(horse);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the horse profile.');
    }
};

const updateHorse = async (req, res) => {
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
        .db()
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
    const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the horse.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createHorse,
    updateHorse,
    deleteHorse
};
