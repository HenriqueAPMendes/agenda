exports.checkCSRF = (err, req, res, next) => {
    if (err) return res.render('404'); // mostra pagina de erro
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // cria token de formulario
    // todo formulario precisa de um input hidden: <input type="hidden" name="_csrf" value="<%= csrfToken %>">
    next();
};

exports.messages = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
};
