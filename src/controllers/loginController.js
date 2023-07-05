exports.loginPage = (req, res, next) => {
    res.render('login');
    next();
};

exports.registerPage = (req, res, next) => {
    res.render('register');
    next();
};

exports.login = (req, res, next) => {
    res.send('logged');
    next();
};

exports.register = (req, res, next) => {
    res.send('registered');
    next();
};