import React from 'react';
import { Wand2, ZoomIn, Move, Download, Save, Moon } from 'lucide-react';

interface FeaturesProps {
  isDarkMode: boolean;
}

function Features({ isDarkMode }: FeaturesProps) {
  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Smart Enhancement",
      description: "Multiple levels of image enhancement with AI-powered algorithms to improve clarity and vibrancy.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <ZoomIn className="w-8 h-8" />,
      title: "Advanced Zoom",
      description: "Smooth and precise zooming capabilities for detailed image inspection.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Move className="w-8 h-8" />,
      title: "Interactive Pan",
      description: "Click and drag to pan around your image with fluid motion and precise control.",
      gradient: "from-pink-500 to-indigo-500"
    },
    {
      icon: <Save className="w-8 h-8" />,
      title: "Cloud Storage",
      description: "Save your enhanced images to the cloud and access them from anywhere.",
      gradient: "from-indigo-500 to-pink-500"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Quick Export",
      description: "Download your enhanced images in high quality with a single click.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Dark Mode",
      description: "Easy on the eyes with a beautiful dark mode interface.",
      gradient: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Powerful Features</h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Everything you need to perfect your images
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-gray-800/50 backdrop-blur-lg hover:bg-gray-700/50'
                : 'bg-white/70 backdrop-blur-lg shadow-xl hover:shadow-2xl'
            }`}
          >
            <div className={`mb-4 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
              {feature.icon}
            </div>
            <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
              {feature.title}
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;