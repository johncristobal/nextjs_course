import type { NextPage, GetStaticProps } from 'next'
import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonResponse, SmallPokemon } from '../interfaces';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  return (
    <Layout title='Listado de pokemon...'>

      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map( (poke) => (
            <PokemonCard key={poke.id} pokemon={poke} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

//Se ejecuta del lado del server
//solo se ejecuta dentro de paginas
//de antemano puedo cargar la info para que el 
//cliente no tenga que cargarla cada vez
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
      ...poke,
      id: i+1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`,
    })
  );

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage
