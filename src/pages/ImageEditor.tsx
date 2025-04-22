import React, { useState, useRef, useEffect } from 'react';
import { Upload, ZoomIn, ZoomOut, RefreshCw, Save, Download, Maximize2, LogIn, LogOut, Wand2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials not found. Authentication features will be disabled.');
  supabase = {
    auth: {
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      signInWithOAuth: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') })
    },
    from: () => ({
      insert: async () => ({ error: new Error('Supabase not configured') })
    })
  };
}

interface ImageEditorProps {
  isDarkMode: boolean;
}

function ImageEditor({ isDarkMode }: ImageEditorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState('original');
  const [enhancementLevel, setEnhancementLevel] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceImage = () => {
    setEnhancementLevel((prev) => {
      const newLevel = prev + 1;
      if (newLevel > 3) return 0;
      return newLevel;
    });
  };

  const getEnhancementStyles = () => {
    switch (enhancementLevel) {
      case 1:
        return 'brightness-110 contrast-110 saturate-110';
      case 2:
        return 'brightness-120 contrast-120 saturate-120 shadow-lg';
      case 3:
        return 'brightness-130 contrast-130 saturate-130 shadow-xl';
      default:
        return '';
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setEnhancementLevel(0);
  };

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

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !image) return;
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('saved_images')
        .insert([
          {
            user_id: user.id,
            image_data: image,
            scale,
            position_x: position.x,
            position_y: position.y,
            enhancement_level: enhancementLevel
          },
        ]);
      if (error) throw error;
      alert('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'enhanced-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`max-w-4xl mx-auto rounded-xl shadow-lg p-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {!image ? (
          <div className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDarkMode ? 'border-gray-600' : 'border-indigo-200'
          }`}>
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <Upload className={`w-12 h-12 ${isDarkMode ? 'text-gray-400' : 'text-indigo-500'}`} />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Click to upload an image or drag and drop
                </span>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={handleZoomIn}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <ZoomOut className="w-6 h-6" />
                </button>
                <button
                  onClick={handleReset}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
                <button
                  onClick={handleEnhanceImage}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                  title={`Enhancement Level: ${enhancementLevel}`}
                >
                  <Wand2 className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2">
                {user ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                    >
                      <Save className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                    >
                      <LogOut className="w-6 h-6" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    <LogIn className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={handleDownload}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div 
              className={`overflow-hidden rounded-lg h-[500px] cursor-move ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                ref={imageRef}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.2s',
                }}
                className="w-full h-full"
              >
                <img
                  src={image}
                  alt="Uploaded image"
                  className={`w-full h-full object-contain transition-all duration-300 ${getEnhancementStyles()}`}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageEditor;