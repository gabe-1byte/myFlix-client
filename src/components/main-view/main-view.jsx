import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    useEffect(() => {
        if (!token) return;

        fetch("https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((moviesFromApi) => {
                console.log("Movies fetched from API:", moviesFromApi);
                setMovies(moviesFromApi);
            });
        }, [token]);

        return (
                <Row className="justify-content-md-center">
                    {!user ? (
                            <Col md={5}>
                                <div className="LoginText">Login:</div>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                                <div className="SignupText">Register:</div>
                                <SignupView />
                            </Col>
                    ) : selectedMovie ? (
                        <Col md={8}>
                            <MovieView
                                movie={selectedMovie}
                                onBackClick={() => setSelectedMovie(null)}
                            />
                        </Col>
                    ) : movies.length === 0 ? (
                        <div>The movie list is empty!</div>
                    ) : (
                        movies.map((movie) => (
                            <Col className="mb-5" key={movie._id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                        </Col>
                        )
                    )
                    )}
                </Row>
    );
};