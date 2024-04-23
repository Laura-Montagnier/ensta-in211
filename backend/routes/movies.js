import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();
let movies = [];



router.post('/new', function (req, res) {
    console.log("Informations provenant du corps de la requête :", req.body);

    const movieRepository = appDataSource.getRepository(Movie);

    const newMovie = {
        name: req.body.name,
        date: req.body.date,
    };
    movies.push(newMovie);
    res.status(201).send('Film ajouté avec succès !');

    movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    res.json(newMovie)
});

router.get('/', function (req, res){
    const movieRepository = appDataSource.getRepository(Movie);

    movieRepository
        .find()
        .then(function (movies) {
            console.log("Hello", movies);
            res.json(movies);
        })
        .catch(function (error) {
            console.error('Erreur lors de la récupération des films :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des films' });
        });
});


export default router;
