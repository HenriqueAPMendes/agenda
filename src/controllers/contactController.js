const Contact = require('../models/ContactModel');

exports.account = (req, res) => {
    if (req.session.user)
        res.render('account');
    else
        res.redirect('/user/login')
};

exports.editcontactPage = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.render('404');
    res.render('editcontacts', { contact: contact });
};

exports.addcontactPage = (req, res) => {
    res.render('addcontact', { contact: {} });
};

exports.editcontact = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');

        const contact = new Contact(req.body);

        await contact.edit(req.params.id);

        // Mostra erros do formulario e redireciona pagina
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors); // mensagens de erro
            console.log(contact);
            req.session.save(() => res.redirect(`/user/editcontact/${req.params.id}`));
            return; 
        }

        req.flash('success', 'Contact successfully updated'); // mensagem de sucesso
        req.session.save(() => res.redirect(`/user/editcontact/${req.params.id}`));
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.addcontact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        // Mostra erros do formulario e redireciona pagina
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors); // mensagens de erro
            req.session.save(() => {
                return res.redirect('/user/addcontact');
            });
            return;
        }

        req.flash('success', 'Contact successfully registered'); // mensagem de sucesso
        res.redirect(`/user/editcontact/${contact.contact._id}`);
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};
