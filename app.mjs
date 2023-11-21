import './config.mjs';
import './db.mjs';
import express from 'express';
// import session from 'express-session';

const app = express();

// set up express static
import url from 'url';
import path from 'path';
import mongoose from 'mongoose';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

// const sessionOptions = {
//     secret: 'secret-key',
//     resave: false,
//     saveUninitalized: false
// }

// app.use(session(sessionOptions));

const Character = mongoose.model('Character');
const Scenes = mongoose.model('Scenes');



app.get('/', (req, res) =>{
    res.render('welcome');
});

app.post('/', (req, res) =>{
    res.redirect('/character');
});

app.get('/character', (req, res) => {
    res.render('character');
});

app.post('/character', (req,res) =>{
    const charac = new Character({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age
    });
    charac.save().then(function(charac){
        res.redirect('/scene1');
    });
    
});

app.get('/scene1', (req, res) =>{
    Character.find({}).then((characters) =>{
        res.render('scene1', {characters: characters});
    })
});

app.post('/scene1', (req, res) => {
    const firstScene = new Scenes({
        scene1: req.body.scene1
    });
    firstScene.save().then(function(firstScene){
        res.redirect('/scene2-1');
    });
});

app.listen(process.env.PORT || 3000);