import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import ChatbotPage from './pages/ChatbotPage';
import AuthModal from './components/AuthModal';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider 
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: '#3B82F6',
          colorTextOnPrimaryBackground: 'white',
        },
        elements: {
          card: 'rounded-lg shadow-md',
          navbar: 'hidden',
          footer: 'hidden'
        }
      }}
    >
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
            </Routes>
          </main>
          <Footer />
          <SignedOut>
            <AuthModal />
          </SignedOut>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;