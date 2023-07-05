exports.get = (req, res, next) => {
    res.render('index', {
        //titulo: 'este titulo vem do home controller',
        numeros: [0, 1, 2, 3, 4, 5, 6]
    }); // o segundo objeto sera lido em index.ejs
    // <%= %> : ignora tags html
    // <%- %> : interpreta tags html
    // <% %> : codigo javascript normal
    // é possível dividir o EJS em includes, para aproveitar trechos em comum com outros views com <%- include('...') %>
    next();
}

exports.post = (req, res, next) => {
    res.send('recebido');
    next();
}