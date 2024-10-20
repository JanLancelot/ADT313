import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
  });
  const [error, setError] = useState("");

  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query) return;

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    })
      .then((response) => {
        setSearchedMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        setError("Error searching for movies. Please try again.");
        console.error(error);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setError("");
    const accessToken = localStorage.getItem("accessToken");
    if (!selectedMovie) {
      setError("Please search and select a movie.");
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    const request = axios({
      method: movieId ? "put" : "post",
      url: movieId ? `/movies/${movieId}` : "/movies",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        navigate("/main/movies");
      })
      .catch((error) => {
        setError("Error saving the movie. Please try again.");
        console.error(error);
      });
  };

  const handleUpdate = () => {
    handleSave();
  };

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          const tempData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setSelectedMovie(tempData);
          setFormData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
          });
        })
        .catch((error) => {
          setError("Error fetching movie details. Please try again.");
          console.error(error);
        });
    }
  }, [movieId]);

  return (
    <>
      <p>This took longer than it should have... - Lance</p>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>
      {error && <div className="error-message">{error}</div>}

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setCurrentPage(1);
                handleSearch();
              }}
            >
              Search
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form>
          {selectedMovie && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={formData.title}
            />
          )}
          <div className="field">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              rows={10}
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            Popularity:
            <input
              type="number"
              name="popularity"
              value={formData.popularity}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            Release Date:
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            Vote Average:
            <input
              type="number"
              name="voteAverage"
              value={formData.voteAverage}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" onClick={movieId ? handleUpdate : handleSave}>
            {movieId ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
