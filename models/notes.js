const { Schema, model} = require("mongoose");

const NotesSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        required: true
    },
    dateModify: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['ACTIVE', 'ARCHIVED', 'DELETED']
    },
    uid: {
        type: String,
        required: true
    },
});

module.exports = model('Note', NotesSchema, 'Note');