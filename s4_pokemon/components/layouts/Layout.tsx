import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui';

interface Props {
    children: JSX.Element,
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
        <Head>
            <title>{ title || "Pokemones" }</title>
            <meta name="author" content="John app" />
            <meta name="description" content="Info del pokemon" />
            <meta name="keywords" content="poke,on, pokedex" />
            <meta property="og:title" content={`Info del pokemo ${title}`} />
            <meta property="og:description" content="Pagin sobre...." />
            <meta property="og:image" content={`${origin}/banner.png`} />
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
