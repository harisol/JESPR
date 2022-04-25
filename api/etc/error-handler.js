/** @type {import("express").RequestHandler} */
exports.notFoundError = (req, res) => {
    res.status(404).json({ message: 'page not found' });
}

exports.internalServerError = (err, res) => {
    res.status(500).json({ message: err.message || err });
}

exports.logicError = (err, res) => {
    console.log({ errorName: err.name });

    // sequelize error
    if (err.name?.includes('Sequelize') && Array.isArray(err.errors)) {
        return res.status(400).json({
            message: err.message || err,
            errors: err.errors.map(e => e.message)
        });
    }

    // unexpected error
    this.internalServerError(err, res)
}
