import React from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film " + idFilm)
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }
  
  _listEmptyComponent = () => {
    console.log('yessss');
    if(this.props.favoriteList) {
      return (
        <View>
            <Text>Aucun favoris pour le moment</Text>
        </View>
      )
    }
    
}

  render() {
    return (
        <FlatList
          style={styles.list}
          ListEmptyComponent={this._listEmptyComponent()}
          data={this.props.films}
          extraData={this.props.favoriteFilms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <FilmItem
              film={item}
              isFilmFavorite={(this.props.favoriteFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if(!this.props.favoriteList) {
              if (this.props.page < this.props.totalPages) {
                // On appelle la méthode loadFilm du component Search pour charger plus de films
                this.props.loadFilms()
              }
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}

export default connect(mapStateToProps)(FilmList)