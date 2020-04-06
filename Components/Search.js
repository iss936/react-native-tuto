import React from 'react'
import {StyleSheet, TextInput, View, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import films from './../helpers/filmDatas';
import FilmItem from './FilmItem';
import { getFilmsByText } from './../API/TMDBAPI';

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

    }

    // underscore pour indiquer que c'est une méthode privé (car en js méthode public/private not exist)
    _loadFilms() {
        if (this.searchedFilm.length > 0) {
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsByText(this.searchedFilm, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                console.log('====================================');
                console.log(this.totalPages);
                console.log('====================================');
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
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm});
    }

    // si un seState est setté la méthode render est rechargé
    render(){
        console.log('====================================');
        console.log('RENDER SEARCH');
        console.log(this.props);
        console.log('====================================');
        return (
            <View style={styles.main_container}>
                <Text style={styles.h1}>Rechercher un film</Text>
                <TextInput onSubmitEditing={() => this._searchFilms() } onChangeText={(text) => this._searchTextInputChanged(text) } placeholder="Titre du film" style={styles.textinput} />
                <Button style={styles.searchButton} title="Rechercher" onPress={ () => this._searchFilms() }/>

                <FlatList
                    style={styles.list}
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem film= {item} displayDetailForFilm={this._displayDetailForFilm} /> }
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.page < this.totalPages) {
                            this._loadFilms();
                        }
                    }}
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
