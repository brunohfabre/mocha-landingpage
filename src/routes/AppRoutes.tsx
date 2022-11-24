import { Routes, Route, Outlet } from 'react-router-dom'

import { Home } from '../pages/home'
import { ResetPassword } from '../pages/reset-password'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <div className="w-screen h-screen flex">
            <Outlet />
          </div>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}
