
const Task = require( "../models/task" );

const getNotesByState = async( req, res ) => {

    const { uid, state } = req.query;
    const notes = await Note.find({ state, uid }).sort({dateModify: -1});
    res.json( notes );

}

const getNotesBySearch = async( req, res ) => {

    const search = req.params.search;
    const { uid, state } = req.query;

    const regex = new RegExp(search, 'i')
    const notes = await Note.find({ 
        state, 
        uid, 
        $or: [
            {'title': regex },
            {'description': regex }
        ]}).sort({dateModify: -1});

    res.json( notes );

}

const postNote = async ( req, res ) => {

    const { title, description, dateModify, uid } = req.body;
    const state = 'ACTIVE'

    const note = new Note({ title, description, dateModify, state, uid });
    await note.save( () => console.log( note ) );

    res.json({ note });
}

const putNote = async ( req, res ) => {
    
    const id = req.params.id;
    const { title, description, state, dateModify } = req.body;

    data = { title, description, state, dateModify }
    const note = await Note.findByIdAndUpdate( id, data );
    
    res.json({ note });
}

module.exports = {
    getNotesByState,
    getNotesBySearch,
    postNote,
    putNote
}