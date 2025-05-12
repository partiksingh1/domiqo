import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import PropertiesPage from './pages/Properties.tsx'
import { LoginForm } from './pages/Login.tsx';
import { SignupForm } from './pages/Signup.tsx';
import FavoritesPage from './pages/Favorite.tsx';
import PropertyPage from './pages/PropertyPage.tsx';
import { ListPropertyPage } from './pages/Listing.tsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/properties/:id" element={<PropertyPage />} />
      <Route path="/listing" element={<ListPropertyPage />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  <Toaster />
  </StrictMode>,
)
