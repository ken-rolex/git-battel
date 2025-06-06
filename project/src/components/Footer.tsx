import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} Rajan Jha. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/ken-rolex" className="hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://rajan-jha-v2.vercel.app/" className="hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/rajan-jha-4a921828a/" className="hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;