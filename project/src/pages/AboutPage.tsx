import React from 'react';
import { Github, Code2, Trophy } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Github className="h-16 w-16 text-blue-600" />
              <Trophy className="h-8 w-8 text-yellow-500 absolute -bottom-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About GitHub Profile Battle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Compare, compete, and improve your GitHub presence
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="flex items-center text-2xl font-bold mb-4">
              <Code2 className="h-6 w-6 mr-2 text-blue-600" />
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              GitHub Profile Battle was created to help developers showcase their achievements, 
              compare their GitHub profiles in a fun and engaging way, and get actionable insights 
              to improve their online presence in the developer community.
            </p>

            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 mr-3">
                  <span className="text-blue-600 dark:text-blue-300">1</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Profile Comparison with smart metrics and scoring
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 mr-3">
                  <span className="text-blue-600 dark:text-blue-300">2</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  AI-powered profile improvement suggestions
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 mr-3">
                  <span className="text-blue-600 dark:text-blue-300">3</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Fun and engaging profile roasts
                </span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-4">Why Use GitHub Profile Battle?</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-bold mb-2">For Developers</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Benchmark your GitHub presence</li>
                  <li>Get personalized improvement tips</li>
                  <li>Track your progress over time</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-bold mb-2">For Teams</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  <li>Foster healthy competition</li>
                  <li>Identify top contributors</li>
                  <li>Encourage best practices</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Get Started</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ready to see how your GitHub profile stacks up? Head to our home page and start 
                comparing profiles. Don't forget to check out our AI assistant for personalized 
                tips on improving your GitHub presence!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;