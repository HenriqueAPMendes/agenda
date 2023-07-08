exports.index = async (req, res, next) => {
    res.render('index');
    next();
};

