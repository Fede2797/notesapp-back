const Note = require('../models/task');

const noteExistsById = async( id ) => {
    const noteExists = await Note.findById( id );
    if ( !noteExists ){
        throw new Error(`There is no note with ID: ${ id }`);
    }
}

module.exports = { noteExistsById };