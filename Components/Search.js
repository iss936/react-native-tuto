import React from 'react'
import {StyleSheet, TextInput, View, Button, Text, FlatList, Item } from 'react-native';
import films from './../helpers/filmDatas';
import FilmItem from './FilmItem';
import { getFilmsByText } from './../API/TMDBAPI';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            films: [],
        };
        searchedFilm: ""
    }

    // underscore pour indiquer que c'est une méthode privé (car en js méthode public/private not exist)
    _loadFilms() {
        if (this.searchedFilm.length > 0) {
            getFilmsByText(this.searchedFilm).then(data => this.setState({ films: data.results }));
        }
    }

    _searchTextInputChanged(text) {
        this.searchedFilm = text;
    }
    // si un seState est setté la méthode render est rechargé
    render(){
        console.log('====================================');
        console.log('RENDER');
        console.log('====================================');
        return (
            <View style={styles.main_container}>
            <Text style={styles.h1}>Rechercher un film</Text>
            <TextInput onChangeText={(text) => this._searchTextInputChanged(text) } placeholder="Titre du film" style={styles.textinput} />
            <Button style={styles.searchButton} title="Rechercher" onPress={ () => this._loadFilms() }/>

            <FlatList
                style={styles.list}
                data={this.state.films}
                renderItem={({ item }) => <FilmItem film= {item} /> }
                keyExtractor={item => item.id.toString()}
            />
            </View>

        );
    }    
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 40,
        flex: 1,
        // backgroundColor: 'yellow'
    },
    list: {
        marginTop: 40
    },
    textinput: {
      marginTop: 30,
      marginBottom: 20,
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    h1: {
        fontSize: 20,
        alignSelf: 'center'
    },

    searchButton: {
        height: 50
    }
})

export default Search
