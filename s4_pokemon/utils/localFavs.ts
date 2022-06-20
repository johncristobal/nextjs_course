const toogleFav = (id: number) => {
    let favs: number[] = JSON.parse(localStorage.getItem('favs') || '[]');
    if (favs.includes(id)){
        favs = favs.filter(pokeid => pokeid !== id)
    }else{
        favs.push(id);
    }

    localStorage.setItem('favs', JSON.stringify(favs));
}

const existsInFavs = (id: number) : Boolean => {
    if (typeof window === 'undefined') return false;

    const favsTem: number[] = JSON.parse(localStorage.getItem('favs') || '[]');
    return favsTem.includes(id);
}

const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem('favs') || '[]');
}

const funs = {
    toogleFav, existsInFavs, pokemons
}
export default funs;