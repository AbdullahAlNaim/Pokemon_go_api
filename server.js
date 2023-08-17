const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static('scripts'));
app.use(express.static('styles'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

async function finding() {
    const response = fetch('https://pogoapi.net/api/v1/pokemon_names.json');
    const data = (await response).json();
    return data;
}

async function stats() {
    const response = fetch('https://pogoapi.net/api/v1/pokemon_stats.json');
    const data = (await response).json();
    return data;
}

app.get('/pokemon', (req, res) => {
    res.render('poke')
})

app.get('/home', (req, res) => {

    finding().then(data => {
        //console.log(data)
        //res.render('home', { two: data });
        return data
    })
        .then((info) => {

            stats().then(data => {
                console.log(data);
                res.render('home', { info: info, atk: data, one: data, two: data['name'] })
            })
        })





})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

