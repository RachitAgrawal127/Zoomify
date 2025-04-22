import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

function About({ isDarkMode }: AboutProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">About Zoomify</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Transforming the way you interact with images
          </p>
        </div>

        <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
          <div className={`p-6 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg shadow-xl'} transform hover:scale-[1.02] transition-all duration-300`}>
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">Our Mission</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Zoomify was created with a simple yet powerful mission: to provide everyone with professional-grade image enhancement tools that are intuitive and accessible. We believe that every image tells a story, and we're here to help you tell yours in the most beautiful way possible.
            </p>
          </div>

          <div className={`p-6 rounded-xl mb-8 ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg shadow-xl'} transform hover:scale-[1.02] transition-all duration-300`}>
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Technology</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Built with cutting-edge web technologies including React, TypeScript, and advanced image processing algorithms, Zoomify offers a seamless and responsive experience across all devices. Our enhancement features are powered by sophisticated algorithms that preserve image quality while improving clarity and vibrancy.
            </p>
          </div>

          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg shadow-xl'} transform hover:scale-[1.02] transition-all duration-300`}>
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">Connect With Us</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? 'hover:bg-gray-700 hover:text-purple-400'
                    : 'hover:bg-gray-100 hover:text-indigo-500'
                } transform hover:scale-110`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? 'hover:bg-gray-700 hover:text-purple-400'
                    : 'hover:bg-gray-100 hover:text-indigo-500'
                } transform hover:scale-110`}
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/rachit-agrawal-091537147/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? 'hover:bg-gray-700 hover:text-purple-400'
                    : 'hover:bg-gray-100 hover:text-indigo-500'
                } transform hover:scale-110`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;