
const initialState = { favoriteFilms: [] };

export function toggleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilms.findIndex((element) => element.id === action.value.id);

            if(favoriteFilmIndex !== -1){
                nextState = {... state, 
                    favoriteFilms: state.favoriteFilms.filter((element, index) => index !== favoriteFilmIndex)
                }
            }
            else { // film not exist 
                nextState = {...state, 
                    favoriteFilms: [...state.favoriteFilms, action.value.id]
                }
            }

            return nextState || state;
        default:
            return state;
    }
}

// export default toggleFavorite;