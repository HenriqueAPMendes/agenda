exports.middleware = (req, res, next) => {
    res.locals.variavelLocal = 'local var' // middleware local pode injetar conteudo em todas as rotas
    next();
};

exports.checkCSRF = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN'){
        return res.render('badCSRF'); //mostra pagina de erro
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // cria token de formulario
    // todo formulario precisa de 
    next();
};