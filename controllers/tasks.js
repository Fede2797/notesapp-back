
const Task = require( "../models/task" );

const postTask = async ( req, res ) => {
    const { taskName, userId, serverId } = req.body;

    const task = new Task({ taskName, userId, serverId });
    await task.save( () => console.log( task ) );

    res.json({ task });
}

module.exports = {
    postTask,
}