import '../../styles/globals.css'
import type { AppProps } from 'next/app'
// import { BudgetProvider } from '../context/budget'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Component {...pageProps} />

  )
}

export default MyApp
