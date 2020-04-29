import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import FilmList from './FilmList';

class Favorites extends React.Component {

  render() {
    return (
      <FilmList
          films={this.props.favoriteFilms} 
          navigation={this.props.navigation}
          favoriteList={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1,
    // backgroundColor: 'yellow'
  },
})

// We want only favoriteFilms of the global state
const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms
  };
}

export default connect(mapStateToProps)(Favorites);