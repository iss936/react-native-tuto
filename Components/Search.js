import React from 'react'
import {StyleSheet, TextInput, View, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import films from './../helpers/filmDatas';
import FilmItem from './FilmItem';
import { getFilmsByText } from './../API/TMDBAPI';
import { connect } from 'react-redux';
import FilmList from './FilmList';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedFilm = '';
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        };
        
        this._loadFilms = this._loadFilms.bind(this); // Bind la méthod loadFilms
    }

    // underscore pour indiquer que c'est une méthode privé (car en js méthode public/private not exist)
    _loadFilms() {
        if (this.searchedFilm.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsByText(this.searchedFilm, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({ 
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            }
            );
        }
    }

    _searchTextInputChanged(text) {
        this.searchedFilm = text;
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
        else
            return null;
      }
    
    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => { 
            // we are in the second parameter of setState we enter here when the first param is execute because setState is asynchronous
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms() 
        })
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm});
    }

    // si un seState est setté la méthode render est rechargé
    render(){

        return (
            <View style={styles.main_container}>
                <Text style={styles.h1}>Rechercher un film</Text>
                <TextInput onSubmitEditing={() => this._searchFilms() } onChangeText={(text) => this._searchTextInputChanged(text) } placeholder="Titre du film" style={styles.textinput} />
                <Button style={styles.searchButton} title="Rechercher" onPress={ () => this._searchFilms() }/>

                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                    favoriteList={false}
                />

            { this.state.isLoading ?
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
                : null
            }

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
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search
