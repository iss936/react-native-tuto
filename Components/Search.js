import React from 'react'
import {StyleSheet, TextInput, View, Button } from 'react-native';

class Search extends React.Component {
    render(){
        return (
            <View style={styles.main_container}>
            {/* <TextInput placeholder="Titre du film" style={styles.textinput} />
            <Button style={styles.searchButton} title="Rechercher" onPress={() => {}}/> */}
            <View style={{backgroundColor: 'red', flex:1}} ></View>
            <View style={{backgroundColor: 'green', flex:1}} ></View>
            
            </View>

        );
    }    
}

const styles = StyleSheet.create({
    main_container: {
        marginTop:20,
        flex: 1,
        backgroundColor: 'yellow'
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

    searchButton: {
        height: 50
    }
})

export default Search
