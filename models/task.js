const { ObjectId } = require("mongodb");
const { Schema, model, mongoose } = require("mongoose");

const id = mongoose.Types.ObjectId();

const TaskSchema = Schema({
    taskName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // required: true
    },
    completedAt: {
        type: Date,
        default: undefined,
        required: false
    },
    serverId: {
        type: String,
        required: true,
    },
});

module.exports = model('Task', TaskSchema, 'Task');