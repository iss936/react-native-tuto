import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class FilmDetail extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        {/* this.props.navigation.state.params.idFilm => other syntax to get a param from navigation */}
        <Text>Détail du film {this.props.navigation.getParam('idFilm')}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default FilmDetail