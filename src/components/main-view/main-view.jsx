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

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser, setFavoriteMovies } from "../../redux/reducers/user/user";
import { MoviesList } from "../movies-list/movies-list";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // Remove local favoriteMovies state
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(
      "https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/movies",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((moviesFromApi) => {
        console.log("Movies fetched from API:", moviesFromApi);
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  // Use Redux favoriteMovies
  const favoriteMovies = user?.FavoriteMovies || [];

  const handleAddToFavorites = (MovieId) => {
    fetch(
      `https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}/movies/${MovieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update Redux favoriteMovies
        dispatch(setFavoriteMovies(data.FavoriteMovies));
        alert("Movie has been added to your favorites!");
      })
      .catch((error) =>
        console.error("Error while adding movie to favorites:", error)
      );
  };

  const handleRemoveFromFavorites = (MovieId) => {
    fetch(
      `https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}/movies/${MovieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update Redux favoriteMovies
        dispatch(setFavoriteMovies(data.FavoriteMovies));
        alert("Movie has been removed from your favorites!");
      })
      .catch((error) =>
        console.error("Error while removing movie from favorites:", error)
      );
  };

  return (
    <BrowserRouter>
      <NavigationBar />
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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        dispatch(setUser(user));
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
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
                    <MovieView token={token} />
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
                ) : (
                  <MoviesList
                    favoriteMovies={favoriteMovies}
                    handleAddToFavorites={handleAddToFavorites}
                    handleRemoveFromFavorites={handleRemoveFromFavorites}
                  />
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
                    favoriteMovies={favoriteMovies}
                    updateUser={(updatedUser) => {
                      dispatch(setUser(updatedUser));
                    }}
                  />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
