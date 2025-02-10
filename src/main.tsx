import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@/styles/index.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import SignIn from '@/pages/SignIn'
import TodoList from '@/pages/TodoList'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/404" />
          <Route
            path="/todo"
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
