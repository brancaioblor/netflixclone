const API_KEY = '7c901a7b08e3f2c10f12efb701ea5325';
const API_BASE =  'https://api.themoviedb.org/3';
/*
- originais da netflix
- recomendados (trending)
- em alta(top rated)
- ação
- comédia
- terror
- romance 
- documentários
- populares
*/
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); // ESTAMOS ARMAZENANDO DENTRO DA REQ A API_BASE   QUE É A URL + ENDPOINT QUE ESTAMOS PASSANDO  ABAIXO.
    const json = await req.json();
    return json;
}


export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) //ESTOU PEGANDO NESSA URL SO FILMES ORIGINAIS NETFLIX ATRAVÉS DA API, É NECESSÁRIO SEMPRE QUE FIZER UMA REQ UTILIZAR O API_KEY
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Popular',
                title: 'Populares',
                items: await basicFetch(`/movie/popular?language=pt-BR&api_key=${API_KEY}`)
            },

        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch (type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?languague=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?languague=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}