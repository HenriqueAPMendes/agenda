/**
 * Contact MODEL
 * 
 * recebe e trata dados de cadastro de contatos
 */

// validacao de email
const validator = require('validator');

// validacao de dados para inercao na DB
const mongoose = require('mongoose');
const { crossOriginResourcePolicy } = require('helmet');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    creationDate: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = {
            firstName: body['contact-name'],
            lastName: body['contact-last-name'],
            email: body['contact-email'],
            phone: body['contact-phone'],
        };
        this.errors = [];
        this.contact = null;
    }

    // Registra contato
    async register() {
        try {
            await this.createContact();
        } catch (e) {
            console.log(e);
        }

    }

    // Edita contato existende
    async edit(id) {
        if (typeof id !== 'string') return;

        this.validate();
        if (this.errors.length > 0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    // Validação de dados
    validate() {
        this.cleanData();

        // Checa email válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail');

        if (!this.body.firstName) this.errors.push('First name is neccessary');

        if (!this.body.email && !this.body.phone) this.errors.push('At least one way of contact has to be registered: phone or e-mail');

    }

    // Limpa os dados para que todos sejam strings e define o body de acordo com o LoginSchema
    cleanData() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string')
                this.body[key] = '';
        }

        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            email: this.body.email,
            phone: this.body.phone

        };
    }

    // Cria o contato
    async createContact() {
        this.validate();
        if (this.errors.length > 0) return;

        // cria usuário
        this.contact = await ContactModel.create(this.body);

    }

    // Procura contato pelo id na DB
    static async findById(id) {

        if (typeof id !== 'string') return null;
        const contact = await ContactModel.findById(id);
        return contact;
    }

    // Procura contatos na DB para mostrar na tela
    static async findContacts() {
        const contacts = await ContactModel.find().sort({ creationDate: -1 }); // ordena pela data de criacao decrescente
        return contacts;
    }

    // Deleta contato pelo id
    static async deleteContact(id){
        if (typeof id !== 'string') return null;
        try {
            const contact = await this.findById(id);
            await ContactModel.findByIdAndDelete(id);
        } catch (e){
            console.log(e);
        }
    }
};

module.exports = Contact;