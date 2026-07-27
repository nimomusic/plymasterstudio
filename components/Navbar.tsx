import React from 'react';
import { MessageCircle } from 'lucide-react';

interface NavbarProps {
  setView: (view: 'hero' | 'pricing' | 'manual' | 'suno' | 'privacy' | 'terms' | 'refund') => void;
  currentView?: string;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('hero')}
          >
            <div className="w-8 h-8 bg-[#006AFF] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Plymaster <span className="text-[#006AFF]">Factory & Studio</span></span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/60">
            <button 
              onClick={() => setView('hero')}
              className={`hover:text-white transition cursor-pointer py-1 ${currentView === 'hero' ? 'text-white border-b-2 border-[#006AFF]' : ''}`}
            >
              소개
            </button>
            <button 
              onClick={() => setView('manual')}
              className={`hover:text-white transition cursor-pointer py-1 ${currentView === 'manual' ? 'text-white border-b-2 border-[#006AFF]' : ''}`}
            >
              사용 설명서
            </button>
            <button 
              onClick={() => setView('suno')}
              className={`hover:text-white transition cursor-pointer py-1 ${currentView === 'suno' ? 'text-white border-b-2 border-[#006AFF]' : ''}`}
            >
              Suno가사다운로더(PRO전용)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Suno Shortcut for quick access */}
          <button 
            onClick={() => setView('suno')}
            className="md:hidden text-white/80 hover:text-white text-xs font-semibold py-2 px-3 rounded-lg bg-white/5 border border-white/10"
          >
            Suno 가사
          </button>
          <a 
            href="https://open.kakao.com/o/ggTf7cci"
            target="_blank"
            rel="noopener noreferrer"
            title="카카오톡 오픈채팅"
            className="bg-[#FEE500] hover:bg-[#FADA0A] text-[#1a1a1a] p-2 rounded-lg transition inline-flex items-center justify-center cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a 
            href="https://litt.ly/plymaster"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#006AFF] text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition inline-flex items-center justify-center cursor-pointer"
          >
            구매하기
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
