import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  )
}
