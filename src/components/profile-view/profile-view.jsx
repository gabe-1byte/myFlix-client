import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { useDispatch } from 'react-redux';
import { setUser, setFavoriteMovies } from '../../redux/reducers/user/user';

const ProfileView = ({ movies = [], user, token, favoriteMovies, onLoggededOut }) => {
    const [userData, setUserData] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Guard: only fetch if user and user.name exist
        if (!user || !user.name || !token) return;

        fetch(`https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                setName(data.name);
                setEmail(data.email);
                setBirthday(data.birthday);
                // Update Redux user and favoriteMovies
                dispatch(setUser(data));
                dispatch(setFavoriteMovies(data.FavoriteMovies || []));
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [token, user, dispatch]);

    const handleUpdate = (event) => {
        event.preventDefault();

        fetch(`https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: username,
                password: password,
                email: email,
                birthday: birthday,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Your profile has been updated!");
                } else {
                    alert("Failed to update your profile.");
                }
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    const handleDelete = () => {
        fetch(`https://movies-flix-project-g1byte-f2fe79db7991.herokuapp.com/users/${user.name}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    alert("Your account has been deleted.");
                    onLoggededOut();
                    navigate("/");
                } else {
                    alert("Failed to delete your account.");
                }
            })
            .catch((error) => {
                console.error("Error deleting user data:", error);
            });
    };

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
                dispatch(setFavoriteMovies([...favoriteMovies, MovieId]));
                alert("Movie added to favorites!");
            })
            .catch((error) => {
                console.error("Error adding movie to favorites:", error);
            });
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
                dispatch(setFavoriteMovies(favoriteMovies.filter((id) => id !== MovieId)));
                alert("Movie removed from favorites!");
            })
            .catch((error) => {
                console.error("Error removing movie from favorites:", error);
            });
    };

    // Use favoriteMovies from Redux
    const favoriteMoviesList = movies.filter((m) => (favoriteMovies || []).includes(m._id));

    return (
        <div className="profile-view">
            <Row>
                <Col md={6}>
                    <h1>{userData.name}'s Profile Details:</h1>
                    <p>Email: {userData.email}</p>
                    <p>Birthday: {userData.birthday}</p>
                    <p>Favorite Movies:</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="updateName">
                            <Form.Label>Update Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="updateEmail">
                            <Form.Label>Update Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="updatePassword">
                            <Form.Label>Update Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="updateBirthday">
                            <Form.Label>Update Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>

                    <Button variant="danger" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </Col>

                <Col md={6}>
                        <h2>Favorite Movies</h2>
                        {favoriteMovies.length === 0 ? (
                            <p>No favorited movies found...</p>
                        ) : (
                            <Row>
                                {favoriteMoviesList.map((movie) => (
                                    <Col key={movie._id} md={4}>
                                        <MovieCard movie={movie}
                                        isFavorite={favoriteMovies.includes(movie._id)}
                                        handleAddToFavorites={handleAddToFavorites}
                                        handleRemoveFromFavorites={handleRemoveFromFavorites}
                                        compactCard={true} 
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                </Col>
            </Row>
        </div>
    );
};

export default ProfileView;