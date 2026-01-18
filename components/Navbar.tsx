
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#006AFF] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Plymaster <span className="text-[#006AFF]">Studio</span></span>
        </div>
        
        <a 
          href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/PlyMasterStudio_Setup_v1.0.exe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#006AFF] hover:bg-[#0056cc] text-white px-6 py-2 rounded-full text-sm font-semibold transition-all electric-shadow text-center"
        >
          지금 바로 다운로드
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
