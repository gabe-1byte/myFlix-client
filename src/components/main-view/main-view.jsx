import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Pearl Jam Twenty",
            image: 
                "https://posters.movieposterdb.com/11_09/2011/1417592/s_1417592_62a57e20.jpg",
            description: "A look at the Seattle band Pearl Jam and its rise to fame in the 1990s.",
            genre: "Documentary",
            director: "Cameron Crowe"
        },
        {
            id: 2,
            title: "The Dark Knight",
            image:
                "https://posters.movieposterdb.com/08_06/2008/468569/l_468569_fe24b125.jpg",
            description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.\nThe Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Action",
            director: "Christopher Nolan"
        },
        {
            id: 3,
            title: "The Crow",
            image:
                "https://posters.movieposterdb.com/09_11/1994/109506/l_109506_3096a83e.jpg",
            description: "The night before his wedding, musician Eric Draven and his fiancée are murdered by members of a violent gang.\nOn the anniversary of their death, Eric rises from the grave and assumes the mantle of the Crow, a supernatural avenger.",
            genre: "Action",
            director: "Alex Proyas"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The movie list in empty!</div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};