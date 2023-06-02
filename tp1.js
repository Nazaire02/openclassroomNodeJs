const express = require('express');
const tp1 = express();
const Product = require('./models/Product');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nazairendouffou:m3loMongoDb@coursopennode.0t8cz8p.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

tp1.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
    next();
});

tp1.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
});

tp1.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
});

tp1.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    Product.findOne({ _id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
});

module.exports = tp1;