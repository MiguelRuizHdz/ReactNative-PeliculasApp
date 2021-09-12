import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};

export const DetailScreen = ( { route, navigation }: Props ) => {

    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const { isLoading, movieFull, cast } = useMovieDetails( movie.id );


    return (
        
        <ScrollView>
            <View style={ styles.imageContainer }>
                <View style={ styles.imageBorder }>    
                    <Image
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View>

            <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie.original_title }</Text>
                <Text style={ styles.title }>{ movie.title }</Text>
            </View>


            {
                isLoading
                    ? <ActivityIndicator size={ 30 } color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast } />
            }

            {/* Boton para cerrar */}
            <TouchableOpacity
                style={ styles.backButton }
                onPress={ () => navigation.pop() }
            >
                <Icon
                    color="white"
                    name="arrow-back-outline"
                    size={ 50 }
                    
                />
            </TouchableOpacity>
                
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    imageContainer:{
        backgroundColor: 'red',
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        
    },
    posterImage: {
        flex: 1,
    },
    imageBorder :{
        // overflow para ocultar los bordes de la imagen, ningun hijo se salga de los bordes
        overflow: 'hidden',
        flex: 1,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        // ios
        zIndex: 999,
        // android
        elevation: 9,
        top: 30,
        left: 10
    }
});
