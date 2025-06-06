import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, MessageCircle, Menu, X } from 'lucide-react';
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-300 hover:text-white';
  };

  const NavLinks = () => (
    <>
      <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
        Home
      </Link>
      <Link to="/how-it-works" className={isActive('/how-it-works')} onClick={() => setIsMenuOpen(false)}>
        How It Works
      </Link>
      <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
        About
      </Link>
      <Link to="/chatbot" className={`${isActive('/chatbot')} flex items-center`} onClick={() => setIsMenuOpen(false)}>
        <MessageCircle className="h-4 w-4 mr-1" />
        Profile Assistant
      </Link>
      {isSignedIn ? (
        <div className="flex items-center space-x-4">
          <div className="text-green-400 hidden sm:block">
            {user?.fullName || user?.emailAddresses[0]?.emailAddress}
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonTrigger: "focus:shadow-none"
              }
            }}
          />
        </div>
      ) : (
        <SignInButton mode="modal">
          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            Sign In
          </button>
        </SignInButton>
      )}
    </>
  );

  return (
    <header className="backdrop-blur-lg bg-black/30 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Github className="h-8 w-8 text-white" />
          <h1 className="text-xl md:text-2xl font-bold text-white">GitHub Profile Battle</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gray-900 p-4 md:hidden z-50">
            <nav className="flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;