import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui';

interface Props {
    children: JSX.Element,
    title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || "Pokemones" }</title>
            <meta name="author" content="John app" />
            <meta name="description" content="Info del pokemon" />
            <meta name="keywords" content="poke,on, pokedex" />
        </Head>

        <Navbar />

        <main style={{
            padding: '0px 20px'
        }}>
            { children }
        </main>
    </>
  )
}
