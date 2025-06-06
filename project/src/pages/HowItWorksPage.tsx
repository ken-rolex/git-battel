import React from 'react';
import { Calculator, Star, Users, GitFork, Clock, Award } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Understanding how GitHub profiles are compared and scored
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Scoring System
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Our GitHub Profile Battle app compares GitHub profiles based on a variety of metrics. Each metric contributes to the overall score that determines which profile is "better." Here's how we calculate the score:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stars</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Each star on your repositories counts as <span className="font-bold text-blue-600">3 points</span>. Stars represent how useful or interesting your code is to other developers.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <GitFork className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Forks</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Each fork on your repositories counts as <span className="font-bold text-blue-600">2 points</span>. Forks indicate that others are interested enough in your code to build upon it.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Followers</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Each follower counts as <span className="font-bold text-blue-600">2 points</span>. Your follower count reflects your influence in the GitHub community.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Age</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                For each month your account has been active, you get <span className="font-bold text-blue-600">5 points</span> (capped at 2 years). This rewards long-term GitHub contributions.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Score Formula</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-4 font-mono text-sm overflow-x-auto">
              <p className="dark:text-white">
                Score = (Stars × 3) + (Forks × 2) + (Followers × 2) + (Repositories × 1) + (Profile Age in months × 5)
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Comparison Method
          </h2>
          
          <ol className="space-y-4 mb-8">
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full h-6 w-6 mr-3">1</span>
              <span className="text-gray-600 dark:text-gray-300">We fetch data from the GitHub API for each username you enter</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full h-6 w-6 mr-3">2</span>
              <span className="text-gray-600 dark:text-gray-300">We calculate individual scores for each profile based on the metrics above</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full h-6 w-6 mr-3">3</span>
              <span className="text-gray-600 dark:text-gray-300">Profiles are ranked by their total score from highest to lowest</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full h-6 w-6 mr-3">4</span>
              <span className="text-gray-600 dark:text-gray-300">The profile with the highest score is declared the winner</span>
            </li>
          </ol>
          
          <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 dark:text-yellow-400 font-medium">Important Note</p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              This scoring system is meant to be fun and is not an absolute measure of developer skill or contributions. Many important aspects of a developer's work may not be reflected in GitHub metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;