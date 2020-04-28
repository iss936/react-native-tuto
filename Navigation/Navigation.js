import React from 'react';
import {createStackNavigator, createAppContainer } from '@react-navigation/stack';
// import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from './../Components/Search';
import Favorites from './../Components/Favorites';
import FilmDetail from './../Components/FilmDetail';
import { StyleSheet, Image } from 'react-native';

// const SearchStackNavigator = createStackNavigator({
//     Search: {
//         screen: Search,
//         navigationOptions: {
//             title: "Rechercher"
//         }
//     },
//     FilmDetail: { // Encore une fois j'ai mis le même nom que celui du component mais libre à vous de choisir un nom différent
//         screen: FilmDetail,
//         navigationOptions: {
//             title: "Details film"
//         }
//     }
// });

// const MoviesTabNavigator = createBottomTabNavigator({
//     Recherche: Search,
//     Favoris: Favorites,
//   });

const Stack = createStackNavigator();
const SearchStackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Recherche" component={Search} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
);

  const MoviesTabNavigator = createBottomTabNavigator();
  
  export function MyTabs() {
    return (
      <MoviesTabNavigator.Navigator>
        <MoviesTabNavigator.Screen 
          name="Recherche" 
          component={SearchStackNavigator} 
          options={{
            tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
              return <Image
                source={require('../Images/ic_search.png')}
                style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
            }
          }}
        />
        <MoviesTabNavigator.Screen 
          name="Favoris" 
          component={Favorites}
          options={{
            tabBarIcon: () => {
              return <Image
                source={require('../Images/favorite.png')}
                style={styles.icon} />
            }
          }}
        />
      </MoviesTabNavigator.Navigator>
    );
  }


  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })
// export default createAppContainer(MoviesTabNavigator);