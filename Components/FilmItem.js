import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from './../API/TMDBAPI';
import { connect } from 'react-redux';

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Film dans nos favoris
      const sourceImage = require('../Images/favorite.png')
      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }
    else
      return null;
  }

  render() {
    // const film = this.props.film;
    const {film, displayDetailForFilm, isFilmFavorite} = this.props; // add variables in this.props so you can this.props.film ...
    return (
      <TouchableOpacity style={styles.container} >
          <TouchableOpacity style={styles.sub_container_left} onPress={() => displayDetailForFilm(film.id)}>
            <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.poster_path)}}
            />
          </TouchableOpacity>
          <View style={styles.sub_container_right}>
            <View style={styles.title_and_vote}>
                { this._displayFavoriteImage() }
                 <TouchableOpacity style= {{flex: 2}} onPress={() => displayDetailForFilm(film.id)}>
                   <Text style={{fontSize: 18}}>{film.title}</Text>
                 </TouchableOpacity>
                 <Text style={{flex: 1, fontSize: 16, textAlign: 'right'}}>{film.vote_average}</Text>
            </View>
            <TouchableOpacity onPress={() => displayDetailForFilm(film.id)}>
              <Text style={styles.text} numberOfLines={6}>{film.overview}</Text>
            </TouchableOpacity>

            <Text style={styles.release_date}> {film.release_date}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row'
   },
   image: {
      flex: 1
   },
   sub_container_left: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15,
    marginBottom: 20,
    marginLeft: 10,
   },
   sub_container_right: {
       flex: 3,
       flexDirection: 'column',
       marginBottom: 20,
       marginRight: 15,
   },

   title_and_vote: {
    flexDirection: 'row',
    marginBottom: 20
   },

   text: {
     textAlign: 'justify',
   },

   release_date: {
    textAlign: 'right'
   },

   favorite_image: {
    width: 30,
    height: 30,
    marginRight: 10
  }
})

const mapStateToProps= (state) => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}
export default connect(mapStateToProps)(FilmItem);