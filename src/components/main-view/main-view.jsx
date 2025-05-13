import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
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

    const handleAddToFavorites = (MovieId) => {
        fetch(`https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}/movies/${MovieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then(() => {
            // This will update the user state to include the new favorite movie
            setFavoriteMovies((prev) => [...prev, MovieId]);
            alert("Movie has been added to your favorites!");
        })
        .catch((error) => console.error("Error while adding movie to favorites:", error));
    };

    const handleRemoveFromFavorites = (MovieId) => {
        fetch(`https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}/movies/${MovieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then(() => {
            // This will update the user state to remove the favorite movie
            setFavoriteMovies((prev) => prev.filter((id) => id !== MovieId));
            alert("Movie has been removed from your favorites!");
        })
        .catch((error) => console.error("Error while removing movie from favorites:", error));
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/users"
                        element={
                            <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            localStorage.setItem("user", JSON.stringify(user));
                                            localStorage.setItem("token", token);
                                            setUser(user);
                                            setToken(token);
                                        }} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movie_Id"
                        element={
                            <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>This list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} token={token} />
                                </Col>
                            )}
                        </>
                        
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty!</Col>
                                ) : (
                                    <>
                                    {movies.map((movie) => (
                                        <Col className="mb-4" key={movie._id} md={3}>
                                            <MovieCard
                                                movie={movie}
                                                isFavorite={favoriteMovies.includes(movie._id)}
                                                handleAddToFavorites={handleAddToFavorites}
                                                handleRemoveFromFavorites={handleRemoveFromFavorites}
                                            />
                                        </Col>
                                    ))}
                                </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:name"
                        element={
                            !user ? (
                                <Navigate to={"/login"} replace />
                            ) : (
                                <Col md={8}>
                                    <ProfileView
                                        user={user}
                                        token={token}
                                        movies={movies}
                                        updateUser={(updatedUser) => {
                                            setUser(updatedUser);
                                        }}
                                    />
                                </Col>
                            )
                        } />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};