import express from "express";
import bodyParser from 'body-parser'
import data from '../public/data.json ' assert { type: "json" };
const app = express();
app.use(bodyParser.json());

app.get('/movies', (req, res) => {

    res.json(data.movies);

});

app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = data.movies.find((m) => m.id == movieId);
    if (!movie) {
        return res.send('Movie not found');
    }
    res.json(movie);
})

app.post('/add-movie', (req, res) => {
    const newMovie = req.body;
    data.movies.push(newMovie);
    res.json(newMovie);
});

app.put('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const updatedMovie = req.body;
    const movieIndex = data.movies.findIndex((movie) => movie.id == movieId);
    if (movieIndex !== -1) {
        data.movies[movieIndex] = updatedMovie;
        res.json(updatedMovie);
    } else {
        res.send("The movie with the given ID was not found.");
    }
})

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const movieIndex = data.movies.findIndex((movie) => movie.id == movieId);
    if (movieIndex !== -1) {
        const deletedMovie = data.movies.splice(movieIndex, 1);
        res.json(deletedMovie);
    } else {
        res.send("The movie with the given ID was not found.");
    }
})

app.listen('4646', () => {
    console.log("Server is running on port 4646");
})