exports.middleware = (req, res, next) => {
    res.locals.variavelLocal = 'local var' // middleware local pode injetar conteudo em todas as rotas
    next();
};

exports.checkCSRF = (err, req, res, next) => {
    if (err) return res.render('404'); // mostra pagina de erro
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // cria token de formulario
    // todo formulario precisa de um input hidden: <input type="hidden" name="_csrf" value="<%= csrfToken %>">
    next();
};