import './config.mjs';
import './db.mjs';
import express from 'express';
import session from 'express-session';
import { Story } from './story.mjs'


const app = express();

// set up express static
import url from 'url';
import path from 'path';
import mongoose, { set } from 'mongoose';

const storyVar = [];
const stories = [];


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));


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
    let set = 0;
    if (req.body.gender === "Girl"){
        set = false;
    }else{
        set = true;
    }
    const charac = new Character({
        name: req.body.name,
        gender: req.body.gender,
        isBoy: set,
        age: req.body.age
    });
    storyVar.push(req.body.name);
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
    let scene = req.body.scene1;
    let secondScene = "";
    if (scene = "They eat the apple"){
        secondScene = "The apple is delicious. They gain super human strength.";
    }else if (scene = "They throw the apple at the nearest person"){
        secondScene = "They throw the apple at a professional boxer. They beat you up! BOOOOOO You Lose!"
    }else{
        secondScene = "Gravity has already been discovered you loser! BOOOOOO You lose!"
    }
    const firstScene = Scenes({
        scene1: req.body.scene1,
        scene2: secondScene
    });
    storyVar.push(scene);
    storyVar.push(secondScene);
    firstScene.save().then(function(firstScene){
        if (firstScene.scene1 === "They eat the apple"){
            res.redirect('/scene21');
        }else if (firstScene.scene1 === "They throw the apple at the nearest person"){
            res.redirect('/scene22');
        }else{
            res.redirect('/scene23');
        }
    });
});

app.get('/scene21', (req, res) =>{
    res.render('scene21');
})

app.get('/scene22', (req, res) => {
    res.render('scene22');
})

app.get('/scene23', (req, res) => {
    res.render('scene23');
})

app.get('/final-story', (req, res) => {
    const name = storyVar[0];
    const scene1 = storyVar[1];
    const scene2 = storyVar[2];
    const story = new Story({
        name, scene1, scene2
    });
    stories.push(story);
    while (storyVar.length != 0){
        storyVar.pop();
    }
    console.log(storyVar);

    res.render('finalStory', {stories});
})


app.listen(process.env.PORT || 3000);