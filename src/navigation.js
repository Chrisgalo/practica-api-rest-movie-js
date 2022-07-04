window.addEventListener(
    'DOMContentLoaded',
    () => {
        navigator();
        // Agregando un estado de carga inical
        window.history.pushState({ loadUrl: window.location.href }, null, '');
    },
    false,
);

searchFormBtn.addEventListener('click', ()=>{
    if (searchFormInput.value)
        location.hash = '#search=' + searchFormInput.value.trim()
})

trendingBtn.addEventListener('click', ()=>{
    location.hash = '#trends='
})

arrowBtn.addEventListener('click', ()=>{
    // location.hash = '#home'
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    console.log(location.hash)

    if (location.hash.startsWith('#trends')){
        trendsPage()
    }else if (location.hash.startsWith('#search=')){
        searchPage()
    }else if (location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if (location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        homePage()
        // console.log('Hola')
    }

    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;
    smoothscroll()
}

function homePage(){
    console.log('🐍 Home!!')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTredingMoviesPreview()
    getCategoriesPreview()
}

function categoriesPage(){
    console.log("⚡ CATEGORIES!!!")
    genericSection.innerHTML = ""

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [urlPage,categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')
    headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);
    getMoviesByCategory(categoryId);
}

function movieDetailsPage(){
    console.log("🚀 MOVIE!!!")

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    // ['#search', '132']
    const [_,movieId] = location.hash.split('=')
    getMovieById(movieId)
}

function searchPage(){
    console.log("🚀 SEARCH!!!")

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    // ['#search', 'vengadores']
    const [_,query] = location.hash.split('=')
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log("🚀 TRENDS!!!")

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
    headerCategoryTitle.innerHTML = "Tendencias";
    getTredingMovies()
}