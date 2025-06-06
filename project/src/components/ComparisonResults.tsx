import React, { useState, useEffect } from 'react';
import { ProfileWithMetrics } from '../types';
import { Trophy, Award, Flame, Brain } from 'lucide-react';
import { getProfileAdvice } from '../services/ai';

interface ComparisonResultsProps {
  profiles: ProfileWithMetrics[];
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ profiles }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (profiles.length < 2) return;
      
      setIsLoading(true);
      const analysis = await getProfileAdvice(profiles[0], profiles[1]);
      setAiAnalysis(analysis);
      setIsLoading(false);
    };

    fetchAnalysis();
  }, [profiles]);

  if (!profiles.length) return null;
  
  const sortedProfiles = [...profiles].sort((a, b) => b.metrics.totalScore - a.metrics.totalScore);
  const winner = sortedProfiles[0];
  
  const winningMetrics = [
    { name: 'Stars', value: winner.metrics.totalStars, max: Math.max(...profiles.map(p => p.metrics.totalStars)) },
    { name: 'Forks', value: winner.metrics.totalForks, max: Math.max(...profiles.map(p => p.metrics.totalForks)) },
    { name: 'Followers', value: winner.metrics.followers, max: Math.max(...profiles.map(p => p.metrics.followers)) },
    { name: 'Repositories', value: winner.metrics.repositories, max: Math.max(...profiles.map(p => p.metrics.repositories)) },
    { name: 'Profile Age (days)', value: winner.metrics.profileAge, max: Math.max(...profiles.map(p => p.metrics.profileAge)) },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center mb-6">
        <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Winner: <span className="text-blue-600">{winner.user.name || winner.user.login}</span>
        </h2>
      </div>

      {profiles.length > 1 && aiAnalysis && (
        <div className="mb-8 space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center mb-3">
              <Brain className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">AI Analysis</h3>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-line">{aiAnalysis}</div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              <Award className="h-5 w-5 text-blue-500 inline mr-1" />
              Winning Metrics
            </h3>
            <ul className="space-y-3">
              {winningMetrics.map((metric) => (
                <li key={metric.name} className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 dark:text-gray-300">{metric.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{metric.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${metric.value === 0 ? 0 : (metric.value / metric.max) * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Score Comparison</h3>
            <div className="space-y-4">
              {sortedProfiles.map((profile, index) => (
                <div key={profile.user.id} className="relative">
                  <div className="flex items-center mb-1">
                    <span className={`font-medium mr-2 ${index === 0 ? 'text-yellow-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      #{index + 1}
                    </span>
                    <img 
                      src={profile.user.avatar_url} 
                      alt={`${profile.user.login}'s avatar`}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">{profile.user.name || profile.user.login}</span>
                    <span className="ml-auto font-bold text-gray-900 dark:text-white">
                      {Math.round(profile.metrics.totalScore)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className={`${index === 0 ? 'bg-blue-600' : 'bg-gray-400'} h-2.5 rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${(profile.metrics.totalScore / sortedProfiles[0].metrics.totalScore) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResults;