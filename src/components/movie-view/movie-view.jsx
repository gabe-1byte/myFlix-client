import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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
            <button
            onClick={onBackClick}
            className="back-button"
            style={{ cursor: "pointer" }}>
                Back
            </button>
        </div>
    );
};