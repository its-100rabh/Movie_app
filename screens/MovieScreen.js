import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBadgeIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movielist';
import Loading from '../components/loading';
import { FallbackMovie, fetchCastDetails, fetchMovieDetails, fetchSimilarMovieDetails, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const topMargin = "mt-5"

export default function MovieScreen() {

    let movieName = "Captain America : The First Avenger"
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const navigation = useNavigation();
    useEffect(() => {
        // console.log('itemid:', item.id);
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCast(item.id);
        getSimilarMovies(item.id);
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        // console.log('got movie details:', data);
        if (data) setMovie(data);
        setLoading(false);
    }


    const getMovieCast = async id => {
        const data = await fetchCastDetails(id);
        // console.log('got credits: ', data);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovieDetails(id);
        // console.log('got similar: ', data);
        if (data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            {/* {back button and movie poster} */}
            <View>
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 mt-5"}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? "hotpink" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/movie1.jpg')}
                                source={{ uri: image500(movie?.poster_path) || FallbackMovie }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className='absolute bottom-0'
                            />
                        </View>
                    )
                }

            </View>

            {/* {movie details} */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* {title} */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie?.title
                    }
                </Text>
                {/* {stats} */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

                {/* {genres} */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }

                    {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thrill •
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy
                    </Text> */}

                </View>
                {/* {description} */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {/* Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a "Super-Soldier serum". But being Captain America comes at a price as he attempts to take down a warmonger and a terrorist organization. Captain America: The First Avenger is a 2011 American superhero film based on the Marvel Comics character Captain America. Produced by Marvel Studios and distributed by Paramount Pictures,[a] it is the fifth film in the Marvel Cinematic Universe (MCU). The film was directed by Joe Johnston, written by Christopher Markus and Stephen McFeely, and stars Chris Evans as Steve Rogers / Captain America alongside Tommy Lee Jones, Hugo Weaving, Hayley Atwell, Sebastian Stan, Dominic Cooper, Toby Jones, Neal McDonough, Derek Luke, and Stanley Tucci. */}
                    {
                        movie?.overview
                    }
                </Text>
            </View>
            {/* {cast members} */}
            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

            {/* {similar movies} */}
            {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
        </ScrollView>
    )
}