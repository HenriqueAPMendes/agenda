exports.get = (req, res, next) => {
    res.send('Olá, rota de ABOUT');
    console.log(req.body);
    next();
};