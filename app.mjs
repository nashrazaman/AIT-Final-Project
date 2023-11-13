// import './config.mjs';
// import './db.mjs';
import express from 'express';
// import session from 'express-session';

const app = express();

// set up express static
import url from 'url';
import path from 'path';
// import mongoose from 'mongoose';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// configure templating to hbs
app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));



// const Character = mongoose.model('Character');
// const Scene1 = mongoose.model('Scene1');
// const Scene2 = mongoose.model('Scene2');
// const Scene3 = mongoose.model('Scene3');
// const ChosenGender = mongoose.model('ChosenGender');

app.get('/', (req, res) => {
    res.render('character');
})


app.listen(process.env.PORT || 3000);
