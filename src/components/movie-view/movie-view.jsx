export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <p>
                    <strong>Title:</strong> {movie.title}
                </p>
            </div>
            <div>
                <strong>Description: </strong>
                <span style={{ whiteSpace: "pre-line"}}>{movie.description}</span>
            </div>
            <div>
            <p>
                <strong>Genre:</strong> {movie.genre}
            </p>
            </div>
            <div>
                <p>
                    <strong>Director:</strong> {movie.director}
                </p>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};