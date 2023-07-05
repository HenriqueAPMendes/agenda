require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

/* ============================================================== */
// 
/** PADRAO DE PROJETO MVC - Model-View-Controller
 * 
 * Models - lida com as operacoes necessárias em cada rota. Ex: calcular e salvar na base de dados
 * Views - define o conteudo a ser mostrado em cada rota
 * Controllers - controladores decidem quais views e models serao utilizados em cada rota
 * 
 * Router - separa as rotas e chama cada controller e seus middlewares
 */


/* ============================================================== */
// BASE DE DADOS

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.emit('ready'); // emite um sinal para evitar que o servidor inicie antes da conexao com a base de dados
    })
    .catch(e => console.log(e));

/* ============================================================== */

app.use(express.urlencoded({ extended: true })); // permite postar formularios
app.use(express.json()); // permite uso de json
app.use(express.static(path.resolve(__dirname, 'public'))); // diretorio dos conteudos estaticos, podem ser acessados diretamente pela rota

/* ============================================================== */
// SESSIONS

const session = require('express-session'); // cookies
const MongoStore = require('connect-mongo'); // sessoes salvas na base de dados
const flash = require('connect-flash'); // flash messages (feedback), salvas em sessao

const sessionOptions = session({
    secret: 'asdfliyujyhrbeawmn', // hash para a sessao
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000, // tempo que o cookie expira
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());


/* ============================================================== */
// SEGURANCA

const helmet = require('helmet'); // recomendado usar apenas com SSL (https)
const csrf = require('csurf'); // bloqueia ataques Cross Site Request Forgery (CSRF), atraves da dcehcagem de tokens

app.use(helmet());
app.use(csrf());

// middlewares de seguranca
const { checkCSRF, csrfMiddleware } = require( './src/middlewares/middleware');
app.use(checkCSRF);
app.use(csrfMiddleware);

/* ============================================================== */
// MIDDLEWARES

const middleware = require('./src/middlewares/middleware').middleware; 
const routes = require('./routes');

app.use(middleware);
app.use(routes);

/* ============================================================== */
// VIEWS

app.set('views', path.resolve(__dirname, 'src', 'views')); // caminho para a pasta dos views
app.set('view engine', 'ejs'); // views serao .ejs


/* ============================================================== */
// INICIALIZACAO

app.on('ready', () => {
    app.listen(3000, () => console.log("servidor executando na porta 3000: http://localhost:3000"));
});
