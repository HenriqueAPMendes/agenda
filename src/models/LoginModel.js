/**
 * LOGIN MODEL
 * 
 * recebe e trata dados de login e cadastro de usuarios
 */

const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = {
            email: body['email-login'],
            password: body['password-login'],
            confirmPassword: body['password-login-confirm']
        };
        this.errors = [];
        this.user = null;
    }

    // Registra usuário
    async register() {
        this.validate();
        if (!this.checkErrors()) {
            try {
                this.user = await LoginModel.create({ email: this.body.email, password: this.body.password });
            } catch (e) {
                console.log(e); 
            }
        }
    }

    // Checa erros no processo de login
    checkErrors() {
        return (this.errors.length > 0);
    }

    // Validação de dados
    validate() {
        this.cleanData();

        const validator = require('validator');

        // Checa email válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail');

        // Checa senha válida entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('Password must be between 3 and 50 characters');
        if (this.body.password !== this.body.confirmPassword) this.errors.push('Passwords must be the same');
    }


    // Limpa os dados para que todos sejam strings e define o body de acordo com o LoginSchema
    cleanData() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string')
                this.body[key] = '';
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
            confirmPassword: this.body.confirmPassword
        };
    }

};

module.exports = Login;