const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let photos = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { photos });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { title, description, imageUrl } = req.body;
    const id = photos.length + 1;
    photos.push({ id, title, description, imageUrl });
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    photos = photos.filter(photo => photo.id !== id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
