const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key':API_KEY,
    },
})

// Llamados a la API

async function getTredingMoviesPreview(){
    const {data} = await api('trending/movie/day')
    const movies = data.results;

    // console.log({data, movies})
    createMovies(movies, trendingMoviesPreviewList)
    // trendingMoviesPreviewList.innerHTML = ""
    // movies.forEach(movie => {
    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container')

    //     const movieImg = document.createElement('img')
    //     movieImg.classList.add('movie-img')
    //     movieImg.setAttribute('alt', movie.title)
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

    //     movieContainer.appendChild(movieImg)
    //     trendingMoviesPreviewList.appendChild(movieContainer)
    // });
}

async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;

    // console.log({data, movies})
    createCategories(categories, categoriesPreviewList)

    // categoriesPreviewList.innerHTML = ""
    // categories.forEach(category => {
    //     const categoryContainer = document.createElement('div')
    //     categoryContainer.classList.add('category-container')

    //     const categoryTitle = document.createElement('h3')
    //     categoryTitle.classList.add('category-title')
    //     categoryTitle.setAttribute('id', `id${category.id}`)
    //     categoryTitle.addEventListener('click', () =>{
    //         location.hash = `#category=${category.id}-${category.name}`
    //     })
    //     const categoryTitleText = document.createTextNode(category.name)

    //     categoryTitle.appendChild(categoryTitleText)
    //     categoryContainer.appendChild(categoryTitle)
    //     categoriesPreviewList.appendChild(categoryContainer)
    // });
}

async function getMoviesByCategory(id){
    const {data} = await api('discover/movie',{
        params:{
            with_genres : id,
        }
    })
    const movies = data.results;

    // console.log({data, movies})

    createMovies(movies, genericSection)
    // genericSection.innerHTML = ""

    // movies.forEach(movie => {
    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container')

    //     const movieImg = document.createElement('img')
    //     movieImg.classList.add('movie-img')
    //     movieImg.setAttribute('alt', movie.title)
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path)

    //     movieContainer.appendChild(movieImg)
    //     genericSection.appendChild(movieContainer)
    // });
}

async function getMoviesBySearch(query){
    const {data} = await api('search/movie',{
        params:{
            query,
        }
    })
    const movies = data.results;
    // console.log(movies)
    createMovies(movies, genericSection)
}

async function getTredingMovies(){
    const {data} = await api('trending/movie/day')
    const movies = data.results;

    // console.log({data, movies})
    createMovies(movies, genericSection)
}

async function getMovieById(id){
    const { data : movie} = await api('movie/' + id)

    // console.log(movie)
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.45) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
    ),
        url(${movieImgUrl})
    `

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList)

    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}