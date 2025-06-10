import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = ({
    onMovieSelected,
    token,
    favoriteMovies,
    handleAddToFavorites,
    handleRemoveFromFavorites
}) => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => 
    state.movies.filter).trim().toLowerCase();

    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter)
        );

    return (
        <>
            <Row className="mb-4">
                <Col md={3}>
                    <MoviesFilter />
                </Col>
            </Row>
            <Row>
                {filteredMovies.length === 0 ? (
                    <Col className="text-center">No movies found.</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieSelected={onMovieSelected}
                                token={token}
                                handleAddToFavorites={handleAddToFavorites}
                                handleRemoveFromFavorites={handleRemoveFromFavorites}
                                isFavorite={favoriteMovies && favoriteMovies.includes(movie._id)}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};