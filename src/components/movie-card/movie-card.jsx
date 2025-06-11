import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, handleAddToFavorites, handleRemoveFromFavorites, isFavorite, compactCard = false }) => {

    const handleAddToFavoriteToggle = () => {
        if (isFavorite) {
            handleRemoveFromFavorites(movie._id);
        } else {
            handleAddToFavorites(movie._id);
        };
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.imageURL} />
            {!compactCard && (
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director.Name} <br /></Card.Text>
                    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            )}
            <Card.Body>
                <Button
                    variant={isFavorite ? "danger" : "primary"}
                    onClick={handleAddToFavoriteToggle}>{
                        isFavorite ? "Remove from Favorites" : "Add to Favorites"
                    }</Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
    handleAddToFavorites: PropTypes.func.isRequired,
    handleRemoveFromFavorites: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    compactCard: PropTypes.bool
};