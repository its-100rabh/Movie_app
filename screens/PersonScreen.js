import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movielist';
import Loading from '../components/loading';
import { FallbackPesron, fetchPersonCreditsDetails, fetchPersonDetails, image342 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');


export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([])
    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonCreditsDetails(id);
        if (data && data.cast) setPersonMovies(data.cast);
        setLoading(false);
    }

    return (
        <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
            {/* {back button and heart} */}

            <SafeAreaView className={" z-20 w-full flex-row justify-between items-center px-4 my-3"}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? "hotpink" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* {person details} */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View className="flex-row justify-center"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}

                        >
                            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                                <Image //source={require('../assets/movie1.jpg')}
                                    source={{ uri: image342(person?.profile_path) || FallbackPesron }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>

                        </View>
                        <View className="mt-6 ">
                            <Text className="text-3xl text-white font-bold text-center">
                                {
                                    person?.name
                                }
                            </Text>
                            <Text className="text-base text-neutral-500  text-center">
                                {
                                    person?.place_of_birth
                                }
                            </Text>
                        </View>
                        {/* {stats} */}
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.gender == 1 ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.birthday
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known For</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.known_for_department
                                    }
                                </Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {
                                        person?.popularity?.toFixed(2)
                                    }%
                                </Text>
                            </View>
                        </View>
                        <View className="my-6 mx-4 spacy-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {/* Chris Evans, in full Christopher Robert Evans, (born June 13, 1981, Boston, Massachusetts, U.S.), American actor who was known for his charismatic performances in superhero movies but who also earned respect for more-nuanced dramatic and comedic performances.

                                Evans grew up in Sudbury, Massachusetts, where his father was a dentist and his mother was involved with a local youth theatre. Evans and his siblings were all interested in musical theatre, and he attended an acting camp as a child. Before his final year of high school, he secured a summer internship at a casting company in New York City. Following his graduation in 1999, he landed roles in a short-lived television comedy, Opposite Sex (2000), and a little-seen family movie, The Newcomers (2000). */}
                                {
                                    person?.biography || 'N/A'
                                }
                            </Text>
                        </View>


                        {/* {movie list} */}
                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </View>
                )
            }

        </ScrollView>
    )
} 