import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from './../API/TMDBAPI';

class FilmItem extends React.Component {
  render() {
    // const film = this.props.film;
    const {film, displayDetailForFilm} = this.props; // add variables in this.props so you can this.props.film ...
    return (
      <TouchableOpacity style={styles.container} >
          <TouchableOpacity style={styles.sub_container_left} onPress={() => displayDetailForFilm(film.id)}>
            <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.poster_path)}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_container_right} onPress={() => displayDetailForFilm(film.id)}>
            <View style={styles.title_and_vote}>
                 <Text style={{flex: 2, fontSize: 18}}>{film.title}</Text>
                 <Text style={{flex: 1, fontSize: 16, textAlign: 'right'}}>{film.vote_average}</Text>
            </View>
            
            <Text style={styles.text} numberOfLines={6}>{film.overview}</Text>
            <Text style={styles.release_date}> {film.release_date}</Text>
          </TouchableOpacity>
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
   }
})

export default FilmItem;