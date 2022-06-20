import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { PokemonFull } from '../../interfaces';
import { GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokeinfo, localst } from '../../utils';

import confetti from 'canvas-confetti';
import { PokemonResponse, SmallPokemon } from '../../interfaces/pokemoms-list';

interface Props {
  pokemon: PokemonFull
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {

  const router = useRouter();

  const [isInFavs, setIsInFavs] = useState(localst.existsInFavs(pokemon.id));

    useEffect(() => {
        const isin = localst.existsInFavs(pokemon.id);
        setIsInFavs(isin)
    }, [])
    
  const onToogle = () => {
    localst.toogleFav(pokemon.id);
    setIsInFavs(!isInFavs);

    if (isInFavs) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    <Layout title={ pokemon.name }>
    
      <Grid.Container css={{ marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={ pokemon.sprites.other?.dream_world.front_default || './no-image.png' }
                alt={ pokemon.name }
                width='100%'
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display:'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>
              <Button 
                color="gradient" 
                ghost= { !isInFavs }
                onPress={onToogle}>
                {isInFavs ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>
                Sprites:
              </Text>
              <Container direction='row' display='flex' gap={0}>
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151');
    
  return {
    paths: data.results.map( (item) => ({
      params: {name: item.name}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const { name } = params as {name: string};
 
  return {
    props: {
      pokemon: await getPokeinfo(name)
    }
  }
}

export default PokemonByNamePage;
