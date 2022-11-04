import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { ResetPassword } from '../pages/ResetPassword'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}
