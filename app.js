const express   = require('express');
const app       = express();
const hbs       = require('hbs');
const path      = require('path');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/superheroes');

const heroSchema = new Schema({

    name: String,
    headquarters: String,
    powers: [String],
    symbol: String

});

const Hero = mongoose.model('Heroe', heroSchema);

app.get('/heroes', (req,res,next)=>{
    
    Hero.find()
    .then((listOfHeroes)=>{

        res.render('heroes', {heroesArray: listOfHeroes})

    .catch((err)=>{

        res.send(err);

    });

    });
});

app.get('/one-hero/:id', (req,res,next)=>{
    
    const theID = req.params.id;

    Hero.findById(theID)
        .then((theHero)=>{

            res.render('one-hero', {hero:theHero});

        })
        .catch((err)=>{

            res.send(err);

        })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));