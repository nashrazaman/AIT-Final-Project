import './config.mjs'
import mongoose from "mongoose";
mongoose.connect(process.env.DSN)

const Scene1 = new mongoose.Schema({
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String
});

const Scene2 = new mongoose.Schema({
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String
});

const Scene3 = new mongoose.Schema({
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String
});

const Character = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number
});

const ChosenGender = new mongoose.Schema({
    gender: String
})

mongoose.model('Scene1', Scene1);
mongoose.model('Scene2', Scene2);
mongoose.model('Scene3', Scene3);
mongoose.model('Character', Character);
mongoose.model('ChosenGender', ChosenGender);

