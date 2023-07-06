const Login = require('../models/LoginModel');

exports.account = (req, res) => {
    if (req.session.user)
        res.render('account');
    else
        res.redirect('/user/login')
};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.registerPage = (req, res) => {
    res.render('register');
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        // Mostra erros do formulario e redireciona pagina
        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // mensagens de erro
            req.session.save(() => {
                return res.redirect('/user/login');
            });
            return;
        }

        // se nao houve nenhum erro, salva session do usuario
        req.session.user = login.user;
        req.flash('success', 'User successfully logged in'); // mensagem de sucesso
        res.redirect('/user');
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        // Mostra erros do formulario e redireciona pagina
        if (login.errors.length > 0) {
            req.flash('errors', login.errors); // mensagens de erro
            req.session.save(() => {
                return res.redirect('/user/register');
            });
            return;
        }

        req.flash('success', 'User successfully registered, login'); // mensagem de sucesso
        res.redirect('/user/login');
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
};
