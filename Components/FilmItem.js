import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ImageResult from './ImageResult';

class FilmItem extends React.Component {
  render() {
    const film = this.props.film;
    return (
      <View style={styles.container}>
          <View style={styles.sub_container_left}>
            <ImageResult></ImageResult>
          </View>
          <View style={styles.sub_container_right}>
            <View style={styles.title_and_vote}>
                 <Text style={{flex: 2, fontSize: 18}}>{film.title}</Text>
                 <Text style={{flex: 1, fontSize: 16, textAlign: 'right'}}>{film.vote_average}</Text>
            </View>
            
            <Text style={styles.text} numberOfLines={6}>{film.overview}</Text>
            <Text style={styles.release_date}> {film.release_date}</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row'
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