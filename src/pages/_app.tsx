import { ChakraProvider } from "@chakra-ui/core";

import customTheme from '../styles/customTheme';
import { ContextNameProvider } from '../contexts'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={customTheme}>
      <ContextNameProvider>
        <Component {...pageProps} />
      </ContextNameProvider>
    </ChakraProvider>
  )
}

export default MyApp
