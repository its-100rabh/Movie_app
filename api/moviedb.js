import axios from 'react-native-axios';
import { apiKey } from '../constants/index1';

//endpoints
const apiBaseURL = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`

//dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`
const castDetailsEndpoint = id => `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`


const personEndpoint = id => `${apiBaseURL}/person/${id}?api_key=${apiKey}`
const personCreditsEndpoint = id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`

const movieEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const FallbackMovie = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26ah6t1hCMdHvYRgKwXC2Uj-flK45e68L1A&usqp=CAU'
export const FallbackPesron = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000'



const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchCastDetails = id => {
    return apiCall(castDetailsEndpoint(id));
}
export const fetchSimilarMovieDetails = id => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchPersonDetails = id => {
    return apiCall(personEndpoint(id));
}

export const fetchPersonCreditsDetails = id => {
    return apiCall(personCreditsEndpoint(id));
}

export const searchMovies = params => {
    return apiCall(movieEndpoint, params);
}