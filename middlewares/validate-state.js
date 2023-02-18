const validState = ( ...states ) => {
    return ( req, res = response, next ) => {
        if( req.body.state && !states.includes( req.body.state )){
            return res.status(400).json({
                msg: `The allowed states are ${states}.`
            });
        };

        next();
    }
}

module.exports = { validState }