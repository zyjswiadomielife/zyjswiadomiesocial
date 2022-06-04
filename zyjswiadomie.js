const express = require('express');
const mongoose = require('mongoose');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
AdminJS.registerAdapter(AdminJSMongoose);

const handlers = require('./lib/handlers');


// app config

const { ArticleResourceOptions } = require("./adminjs/articleoptions");
const { UserResourceOptions } = require("./adminjs/useroptions");

// init adminJS
const adminJS = new AdminJS({
    databases: [],
    rootPath: '/admin',
    resources: [UserResourceOptions, ArticleResourceOptions],
});
const adminJSRouter = AdminJSExpress.buildRouter(adminJS);

// mount adminJS route and run express app
const app = express();
app.use(adminJS.options.rootPath, adminJSRouter);

app.use(express.static('public'));
// configure Handlebars view engine
const { engine } = require ('express-handlebars');
const path = require('path');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

// Routes

app.get('/', (req, res, next) => {
    res.render('home');
});

const Article = require('./models/article');

app.get('/artykuly', async (req, res, next) => {
    const articles = Article.find({})
    res.render('articles', {
        articles
    })
});

app.get('/artykul/:slug', async (req, res, next) => {
    const article = await Article.findOne({ slug: req.params.slug });
    res.render('article', {
        article
    })
});

const User = require('./models/user');

app.get('/uzytkownicy', async (req, res, next) => {
    const users = User.find({})
    res.render('users', {
        users
    })
});

app.get('/uzytkownik/:slug', async (req, res, next) => {
    const user = await User.findOne({ slug: req.params.slug });
    res.render('user', {
        user
    })
});

// MongoDB connection

mongoose.connect('mongodb+srv://zyjswiadomiedb:XckdzTUELF8xPvr@cluster0.loxwlpu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

app.listen(8000, () => console.log('AdminJS is under localhost:8000/admin'));