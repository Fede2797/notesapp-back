const { Router } = require( "express" );
const { check } = require( "express-validator" );

const { 
    postNote, 
    putNote, 
    getNotesByState,
    getNotesBySearch} = require( "../controllers/notes" );
    
const { noteExistsById } = require("../helpers/db-validators");
const { emptyNoteFields } = require("../middlewares/validate-empty-fields");
const { validateFields } = require("../middlewares/validate-fields");
const { validState } = require("../middlewares/validate-state");
    
    const router = Router();
    
    router.get( '/', [
        check('uid', 'You must provide the user ID').not().isEmpty(),
        check('state', 'You must provide the state of the notes').not().isEmpty(),
        validateFields
    ], getNotesByState );

    router.get( '/:search', [
        check('uid', 'You must provide the user ID').not().isEmpty(),
        check('state', 'You must provide the state of the notes').not().isEmpty(),
        validateFields
    ], getNotesBySearch );
    
    router.post( '/', [
        emptyNoteFields(),
        check('uid', 'You must provide the user ID').not().isEmpty(),
        validateFields
    ], postNote );
    
    router.put('/:id', [
        validState('ARCHIVED', 'ACTIVE', 'DELETED'),
        check('id', 'That is not a valid mongo ID').isMongoId(),
        check('id').custom( noteExistsById ),
        validateFields
    ], putNote);
    
    module.exports = router;