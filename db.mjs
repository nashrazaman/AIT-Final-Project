import './config.mjs'
import mongoose from "mongoose";
mongoose.connect(process.env.DSN)

const Scenes = new mongoose.Schema({
    scene1: String,
    scene2: String,
    scene3: String,
    scene4: String
});


const Character = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number
});


mongoose.model('Scenes', Scenes);
mongoose.model('Character', Character);

