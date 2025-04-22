import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sun, Moon, LogIn, Camera, AlignCenter } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import ImageEditor from './pages/ImageEditor';
import About from './pages/About';
import Features from './pages/Features';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 text-gray-900'
      }`}>
        <nav className={`backdrop-blur-md bg-opacity-80 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 group-hover:bg-gray-700' 
                      : 'bg-indigo-100 group-hover:bg-indigo-200'
                  }`}>
                    <Camera className={`w-6 h-6 ${
                      isDarkMode 
                        ? 'text-indigo-400' 
                        : 'text-indigo-600'
                    }`} />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Zoomify
                  </span>
                </Link>
                <div className="flex space-x-4">
                  <Link to="/" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:scale-105 transform duration-200`}>
                    Editor
                  </Link>
                  <Link to="/features" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:scale-105 transform duration-200`}>
                    Features
                  </Link>
                  <Link to="/about" className={`hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:scale-105 transform duration-200`}>
                    About
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  } transform hover:scale-105`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 hover:ring-2 hover:ring-purple-500' 
                      : 'bg-white hover:bg-gray-100 hover:ring-2 hover:ring-indigo-500 shadow-lg'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ImageEditor isDarkMode={isDarkMode} />} />
          <Route path="/features" element={<Features isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;