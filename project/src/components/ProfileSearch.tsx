import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User } from 'lucide-react';

interface ProfileSearchProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

interface GitHubSuggestion {
  login: string;
  avatar_url: string;
}

const ProfileSearch: React.FC<ProfileSearchProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState<GitHubSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (username.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/search/users?q=${username}&per_page=5`);
        const data = await response.json();
        setSuggestions(data.items || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: GitHubSuggestion) => {
    setUsername(suggestion.login);
    onSearch(suggestion.login);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-md mx-auto relative" ref={suggestionRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter GitHub username"
            className="pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          {username && (
            <button
              type="button"
              onClick={() => {
                setUsername('');
                setSuggestions([]);
              }}
              className="absolute right-16 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!username.trim() || isLoading}
          className={`absolute right-0 top-0 h-full px-3 rounded-r-lg 
            ${username.trim() && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.login}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <img
                src={suggestion.avatar_url}
                alt={`${suggestion.login}'s avatar`}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-gray-900 dark:text-white">{suggestion.login}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSearch;