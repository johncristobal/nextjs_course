import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { customTheme, darkTheme } from '../themes'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '../themes/light-theme';
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string; 
}

function MyApp({ Component, pageProps, theme }: Props) {
  
  const [currenTheme, setCurrenTheme] = useState(lightTheme);

  useEffect(() => {

    const cookie = Cookies.get('theme') || 'light';
    const selectedTheme = cookie === 'light'
      ? lightTheme
      : cookie === 'dark'
      ? darkTheme
      : customTheme
  
      setCurrenTheme( selectedTheme );
  }, [])

  return (
    <ThemeProvider theme={currenTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async( appContext: AppContext ) => {

//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
//   const validT = ['light', 'dark', 'custom'];

//   return {
//     theme: validT.includes (theme) ? theme : 'custom',
//   }
// }


export default MyApp
