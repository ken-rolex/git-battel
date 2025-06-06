import React, { useState, useEffect } from 'react';
import { ProfileWithMetrics } from '../types';
import ProfileCard from './ProfileCard';
import { fetchCompleteProfile } from '../api/github';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

interface ComparisonContainerProps {
  usernames: string[];
  onRemoveProfile: (username: string) => void;
}

const ComparisonContainer: React.FC<ComparisonContainerProps> = ({ 
  usernames, 
  onRemoveProfile 
}) => {
  const [profiles, setProfiles] = useState<ProfileWithMetrics[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (usernames.length === 0) {
        setProfiles([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get profiles that are not yet loaded
        const existingUsernames = profiles.map(p => p.user.login);
        const newUsernames = usernames.filter(name => !existingUsernames.includes(name));
        
        if (newUsernames.length > 0) {
          const profilePromises = newUsernames.map(username => fetchCompleteProfile(username));
          const newProfiles = await Promise.all(profilePromises);
          
          // Combine existing and new profiles, keeping only the ones in usernames
          const updatedProfiles = [
            ...profiles.filter(p => usernames.includes(p.user.login)),
            ...newProfiles
          ];
          
          setProfiles(updatedProfiles);
        } else {
          // Filter out removed profiles
          setProfiles(prev => prev.filter(p => usernames.includes(p.user.login)));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [usernames]);

  // Sort profiles by total score
  const sortedProfiles = [...profiles].sort((a, b) => b.metrics.totalScore - a.metrics.totalScore);

  if (loading && profiles.length === 0) {
    return <LoadingSpinner message="Loading GitHub profiles..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} onDismiss={() => setError(null)} />;
  }

  if (sortedProfiles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No profiles to compare. Add GitHub usernames to start.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {sortedProfiles.map((profile, index) => (
        <ProfileCard
          key={profile.user.id}
          profile={profile}
          rank={index + 1}
          onRemove={onRemoveProfile}
        />
      ))}
      {loading && (
        <div className="col-span-full flex justify-center py-4">
          <LoadingSpinner size="small" message="Loading more profiles..." />
        </div>
      )}
    </div>
  );
};

export default ComparisonContainer;