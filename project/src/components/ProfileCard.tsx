import React from 'react';
import { ProfileWithMetrics } from '../types';
import { MapPin, Building, Link, Calendar, Star, GitFork, Users, Book } from 'lucide-react';

interface ProfileCardProps {
  profile: ProfileWithMetrics;
  rank: number;
  onRemove: (username: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, rank, onRemove }) => {
  const { user, metrics } = profile;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getRankBadgeColor = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-gray-400';
      case 3: return 'bg-amber-600';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 rounded-lg shadow-lg overflow-hidden transition-all hover:transform hover:scale-[1.02] border border-white/20 dark:border-gray-700/50">
      <div className="relative">
        {rank <= 3 && (
          <div className={`absolute top-4 right-4 ${getRankBadgeColor(rank)} text-white font-bold rounded-full w-10 h-10 flex items-center justify-center z-10`}>
            #{rank}
          </div>
        )}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center -mt-16">
            <img 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white"
            />
            <div className="mt-3 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name || user.login}</h2>
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                @{user.login}
              </a>
              {user.bio && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{user.bio}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Joined {formatDate(user.created_at)}</span>
            </div>
            {user.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{user.company}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4 text-gray-500" />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline truncate max-w-[150px]"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-between text-center border-t border-gray-200 dark:border-gray-700 pt-4">
            <div>
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold text-gray-900 dark:text-white">{metrics.totalStars}</span>
              </div>
              <p className="text-xs text-gray-500">Stars</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <GitFork className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-gray-900 dark:text-white">{metrics.totalForks}</span>
              </div>
              <p className="text-xs text-gray-500">Forks</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <Users className="h-4 w-4 text-green-500" />
                <span className="font-bold text-gray-900 dark:text-white">{metrics.followers}</span>
              </div>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1">
                <Book className="h-4 w-4 text-purple-500" />
                <span className="font-bold text-gray-900 dark:text-white">{metrics.repositories}</span>
              </div>
              <p className="text-xs text-gray-500">Repos</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Score: {Math.round(metrics.totalScore)}</h3>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, (metrics.totalScore / 1000) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => onRemove(user.login)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;