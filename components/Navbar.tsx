import React from 'react';
import { MessageCircle, Sparkles, Film, BookOpen, Music, Download } from 'lucide-react';
import { AppViewType } from '../types';

interface NavbarProps {
  setView: (view: AppViewType, manualTab?: 'studio' | 'factory') => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setView('hero')}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#006AFF] to-[#00B2FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#006AFF]/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Plymaster <span className="text-[#006AFF] font-black">Studio & Factory</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 text-sm font-semibold text-white/70">
            <button 
              onClick={() => setView('hero')}
              className={`hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${currentView === 'hero' ? 'text-white bg-white/10 font-bold border-b-2 border-[#006AFF]' : 'hover:bg-white/5'}`}
            >
              <Film className="w-4 h-4 text-[#006AFF]" />
              Studio (영상편집)
            </button>
            <button 
              onClick={() => setView('factory')}
              className={`hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${currentView === 'factory' ? 'text-white bg-white/10 font-bold border-b-2 border-[#00B2FF]' : 'hover:bg-white/5'}`}
            >
              <Sparkles className="w-4 h-4 text-[#00B2FF]" />
              <span className="bg-gradient-to-r from-[#00B2FF] to-cyan-400 bg-clip-text text-transparent font-extrabold">Factory (음악공장)</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#00B2FF]/20 text-[#00B2FF] font-black uppercase">NEW</span>
            </button>
            <button 
              onClick={() => setView('manual')}
              className={`hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${currentView === 'manual' ? 'text-white bg-white/10 font-bold border-b-2 border-[#006AFF]' : 'hover:bg-white/5'}`}
            >
              <BookOpen className="w-4 h-4 text-white/60" />
              사용 설명서
            </button>
            <button 
              onClick={() => setView('suno')}
              className={`hover:text-white transition cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${currentView === 'suno' ? 'text-white bg-white/10 font-bold border-b-2 border-[#006AFF]' : 'hover:bg-white/5'}`}
            >
              <Music className="w-4 h-4 text-white/60" />
              Suno 가사(PRO)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile switcher shortcut */}
          <button 
            onClick={() => setView(currentView === 'factory' ? 'hero' : 'factory')}
            className="md:hidden text-white hover:text-white text-xs font-bold py-2 px-3 rounded-xl bg-gradient-to-r from-[#006AFF]/30 to-[#00B2FF]/30 border border-[#006AFF]/40 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00B2FF]" />
            {currentView === 'factory' ? 'Studio' : 'Factory'}
          </button>
          <button 
            onClick={() => setView('manual')}
            className="md:hidden text-white/80 hover:text-white text-xs font-semibold py-2 px-2.5 rounded-lg bg-white/5 border border-white/10"
            title="설명서"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <a 
            href="https://open.kakao.com/o/ggTf7cci"
            target="_blank"
            rel="noopener noreferrer"
            title="카카오톡 오픈채팅 문의"
            className="bg-[#FEE500] hover:bg-[#FADA0A] text-[#1a1a1a] p-2 rounded-xl transition inline-flex items-center justify-center cursor-pointer shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a 
            href="https://litt.ly/plymaster"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#006AFF] to-[#0056cc] text-white text-xs md:text-sm font-bold py-2.5 px-4 md:px-5 rounded-xl hover:brightness-110 transition inline-flex items-center justify-center cursor-pointer shadow-lg shadow-[#006AFF]/20"
          >
            구매하기
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
