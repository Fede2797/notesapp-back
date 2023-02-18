
const emptyNoteFields = () => {
    return ( req, res, next ) => {
        if ( !req.body.title && !req.body.description && !req.body.dateModify ) {
            return res.status(400).json({
                msg: "There are missing fields. You must provide title, description and date of modification"
            });
        }

        next();
    }
}

module.exports = { emptyNoteFields };