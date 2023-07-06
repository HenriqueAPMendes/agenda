/**
 * Login MODEL
 * 
 * recebe e trata dados de login e cadastro de usuarios
 */

// validacao de email
const validator = require('validator');

// validacao de dados para inercao na DB
const mongoose = require('mongoose');

// criptografacao de senhas
const bcrypt = require('bcryptjs');

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
        try {
            await this.createUser();
        } catch (e) {
            console.log(e);
        }

    }

    // Loga usuário
    async login() {
        if (!await this.userExists()) {
            this.errors.push("Invalid data");
            return;
        }

        if (!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push("Invalid data");
            return;
        }
    }

    // Validação de dados
    validate() {
        this.cleanData();

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

    // Cria o usuario
    async createUser() {
        // Checa se já existe esse usuário

        if (await this.userExists()){
            this.errors.push('User already exists');
            return;
        }
        
        this.validate();
        if (this.errors.length > 0) return;

        // criptografa senha
        this.encrypt();

        // cria usuário
        this.user = await LoginModel.create({ email: this.body.email, password: this.body.password });

    }

    // Criptografa senha
    encrypt() {
        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);
    }

    // Checa se já existe usuário nesse email, evita cadastro duplo e checa login, salva usuario encontrado em this.user
    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        return this.user ? true : false;
    }

};

module.exports = Login;