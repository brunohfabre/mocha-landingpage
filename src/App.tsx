import { BrowserRouter } from 'react-router-dom'

import './styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
