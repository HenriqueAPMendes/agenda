const Login = require('../models/LoginModel');

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

exports.register = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.register();

        // Mostra erros do formulario e redireciona pagina
        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // mensagens de erro
            req.session.save(() => {
                return res.redirect('/login/register');
            });
            return;
        }

        req.flash('success', 'User successfully registered, login'); // mensagem de sucesso
        req.session.save(() => {
            console.log('on save');
            //return res.redirect('https://www.geeksforgeeks.org/express-js-res-redirect-function/');
            res.send('registered'); // CORRIGIR
        });
        next();
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

};