const addMoviesBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    const movies = [];

    if (title.trim() === '' || extraName.trim() === '' || extraValue === '') {
        return
    }

    const newMovie = {
        info: {
            title,                        // this es equal a this  =>   title: title
            [extraName]: extraValue       // this [] its because is a dynamic value;
        },
        id: Math.random()
    }

    movies.push(newMovie);
    console.log(newMovie);
};

addMoviesBtn.addEventListener('click', addMovieHandler);
