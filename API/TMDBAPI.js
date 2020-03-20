import React from 'react';

const API_TOKEN = '17d467d45f6e00397bb32630d72b8652';
const HOST_API = 'https://api.themoviedb.org/3';
const HOST_IMAGE_API = 'https://image.tmdb.org/t/p/w500';

export function getFilmsByText(filmName) {
    const urlApi = HOST_API + '/search/movie?api_key='+ API_TOKEN + '&language=fr&query=' + filmName;
    console.log('====================================');
    console.log(urlApi);
    console.log('====================================');
    return fetch(urlApi)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
    return HOST_IMAGE_API + name;
}
