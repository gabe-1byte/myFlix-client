import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movie_Id } = useParams();

    const movie = movies.find((m) => m._id === movie_Id);

    return (
        <div>
            <div>
                <p>
                    <strong>Image :</strong>
                </p>
                <img src={movie.imageURL} />
            </div>
            <div>
                <p>
                    <strong>Title:</strong> {movie.Title}
                </p>
            </div>
            <div>
                <strong>Description: </strong>
                <span style={{ whiteSpace: "pre-line"}}>{movie.Description}</span>
            </div>
            <div>
            <p>
                <strong>Genre:</strong> {movie.Genre.Name}
            </p>
            </div>
            <div>
                <p>
                    <strong>Director:</strong> {movie.Director.Name}
                </p>
            </div>
            <Link to={`/`}>
            <button className="back-button">Back</button>
            
            </Link>
        </div>
    );
};