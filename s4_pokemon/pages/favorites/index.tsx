import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon'
import { NoFavs } from '../../components/ui'
import { localst } from '../../utils'

const FavoritesPage = () => {

  const [favsPokemons, setFavsPokemons] = useState<number[]>([])

  useEffect(() => {
      setFavsPokemons( localst.pokemons() );
  }, [])

  return (
    <Layout title='Pokemon - favoritos'>

      {
        favsPokemons.length === 0
        ? ( <NoFavs /> )
        : ( <FavoritePokemons pokemons={favsPokemons} /> )
      }        
    </Layout>
  )
}

export default FavoritesPage