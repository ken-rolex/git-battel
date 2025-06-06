import React, { useState, useEffect } from 'react';
import ProfileSearch from '../components/ProfileSearch';
import ComparisonContainer from '../components/ComparisonContainer';
import ComparisonResults from '../components/ComparisonResults';
import { ProfileWithMetrics } from '../types';
import { fetchCompleteProfile } from '../api/github';
import ErrorDisplay from '../components/ErrorDisplay';
import { Github, Trophy, User, Users } from 'lucide-react';
import ShareButton from '../components/ShareButton';
import toast from 'react-hot-toast';

const HomePage: React.FC<{ session: any }> = ({ session }) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<ProfileWithMetrics[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedUsers = params.get('users');
    
    if (sharedUsers) {
      const userList = sharedUsers.split(',');
      setUsernames(userList);
    }
  }, []);

  const handleSearch = async (username: string) => {
    if (usernames.includes(username)) {
      setSearchError(`${username} is already in the comparison`);
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      await fetchCompleteProfile(username);
      setUsernames(prev => [...prev, username]);
    } catch (error) {
      setSearchError(error instanceof Error ? error.message : `Error adding ${username}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProfile = (username: string) => {
    setUsernames(prev => prev.filter(name => name !== username));
    setProfiles(prev => prev.filter(profile => profile.user.login !== username));
  };

  const handleProfilesLoaded = (loadedProfiles: ProfileWithMetrics[]) => {
    setProfiles(loadedProfiles);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Github className="h-16 w-16 text-blue-600" />
            <Trophy className="h-8 w-8 text-yellow-500 absolute -bottom-2 -right-2" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Profile Battle
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Compare GitHub profiles and see who comes out on top based on stars, followers, and more!
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <ShareButton usernames={usernames} />
          {!session && (
            <button
              onClick={() => toast.error('Please sign in to save comparisons')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Save Comparison
            </button>
          )}
        </div>
      </div>

      {usernames.length > 0 && profiles.length > 0 && (
        <ComparisonResults profiles={profiles} />
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Users className="h-6 w-6 mr-2 text-blue-600" />
          Add Profiles to Compare
        </h2>
        
        <ProfileSearch onSearch={handleSearch} isLoading={isLoading} />
        
        {searchError && (
          <div className="mt-4">
            <ErrorDisplay message={searchError} onDismiss={() => setSearchError(null)} />
          </div>
        )}
        
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Profiles ({usernames.length})
            </h3>
          </div>
          
          {usernames.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {usernames.map(name => (
                <div 
                  key={name}
                  className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium flex items-center"
                >
                  {name}
                  <button
                    onClick={() => handleRemoveProfile(name)}
                    className="ml-1.5 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No profiles added yet. Search for GitHub usernames above.</p>
          )}
        </div>
      </div>

      <ComparisonContainer 
        usernames={usernames} 
        onRemoveProfile={handleRemoveProfile} 
        onProfilesLoaded={handleProfilesLoaded}
      />
    </div>
  );
};

export default HomePage;