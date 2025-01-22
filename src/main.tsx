import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@/styles/index.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import SignIn from '@/pages/SignIn'
import TodoList from '@/pages/TodoList'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/404" />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
)
