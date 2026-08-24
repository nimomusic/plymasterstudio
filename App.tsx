import React, { useState, useEffect } from 'react';
import { AppViewType } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import ManualSection from './components/ManualSection';
import { PolicyView } from './components/PolicyView';
import { SunoLyric } from './components/sunolyric';
import FactoryView from './components/FactoryView';
import { ThemePackMusic } from './components/ThemePackMusic';

const safeScrollToTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.warn("window.scrollTo smooth failed, trying fallback:", error);
    try {
      window.scrollTo(0, 0);
    } catch (fallbackError) {
      console.warn("window.scrollTo completely blocked in this environment:", fallbackError);
    }
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<AppViewType>('hero');
  const [manualMode, setManualMode] = useState<'studio' | 'factory'>('studio');
  
  const handleSetView = (newView: AppViewType, tab?: 'studio' | 'factory') => {
    setView(newView);
    if (tab) {
      setManualMode(tab);
    } else if (newView === 'manual' && view === 'factory') {
      setManualMode('factory');
    } else if (newView === 'manual' && view === 'hero') {
      setManualMode('studio');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as AppViewType;
    if (
      viewParam === 'manual' ||
      viewParam === 'pricing' ||
      viewParam === 'hero' ||
      viewParam === 'factory' ||
      viewParam === 'suno' ||
      viewParam === 'privacy' ||
      viewParam === 'terms' ||
      viewParam === 'refund'
    ) {
      setView(viewParam);
    }
  }, []);
  const features = [
    {
      title: "\"자동 자막 기능(PRO)\"",
      description: "제목과 가사를 일일이 복붙하고 싱크를 맞출 필요 없습니다. 제목은 파일명을 인식하고 가사는 Suno의 가사와 싱크정보를 읽어오는 자체프로그램을 통해 영상 속에 자막을 생성 해 줍니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      footer: "Auto Naming"
    },
    {
      title: "\"트랙리스트 자동 생성\"",
      description: "일일이 시간 확인하고 직접 타이핑하는 수고를 덜도록 입력된 순서와 시간에 맞게 트랙리스트를 자동 생성합니다. 복사 붙여넣기만 하세요.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      footer: "Auto Track Listing"
    },
    {
      title: "\"다양한 배경 효과\"",
      description: "음악 비트에 실시간 반응하는 오디오 스펙트럼, 비트바운서와 감성을 더해주는 내리는 계절 효과로 시청 지속 시간을 극대화합니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      footer: "Visual Effects"
    },
    {
      title: "\"간편 마스터링(PRO)\"",
      description: "볼륨 평준화 및 EQ 기능을 탑재하여 필수 후가공 기능으로 DAW를 별도로 거칠 필요가 없습니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      footer: "Volume Normalize"
    },
    {
      title: "\"멀티 음악 선곡 모드\"",
      description: "수동, 첫 3곡 지정, 랜덤? 다양한 모드 지원으로 빠르고 쉽게 곡을 배치 할 수 있습니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      footer: "Smart Curation"
    },
    {
      title: "\"유튜브 라이브(PRO)\"",
      description: "제작된 영상을 Studio에서 별도 외부 프로그램없이 즉시 유튜브 라이브로 송출할 수 있는 환경을 지원합니다. 라이브 스케줄러로 여러 시간대에 다른 영상을 자동으로 송출해 줍니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      footer: "Streaming Ready"
    },
    {
      title: "\"강력한 성능, 낮은 진입장벽\"",
      description: "NVIDIA GPU 초고속 렌더링을 지원하며, GPU가 없는 저사양 PC에서도 상대적으로 빠르게 작동합니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      footer: "Hybrid Engine"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] selection:bg-[#006AFF]/30 selection:text-white relative overflow-hidden">
      {/* Persistent Background Blurs */}
      <div className="fixed top-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#006AFF]/20 blur-[140px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-15%] w-[45%] h-[45%] bg-[#006AFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <Navbar setView={setView} currentView={view} />
      <main className="relative z-10">
        {view === 'hero' && (
          <>
            <Hero setView={setView} />
            {/* Section 3: Key Features - Updated 7 Core Functions */}
            <section id="features" className="py-32 px-6 bg-[#0c0c0c] relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black mb-6">Plymaster Studio의 7대 핵심 기능</h2>
                  <p className="text-xl text-white/50 max-w-3xl mx-auto">플레이리스트 유튜버의 꿈을 현실로 만드는 독보적인 기술력.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, idx) => (
                    <div key={idx} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#006AFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                      <div className="relative glass-card p-10 rounded-[2.5rem] border-white/5 h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-3">
                        <div className="w-16 h-16 bg-[#006AFF] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#006AFF]/20 transition-transform group-hover:scale-110">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 leading-tight">{feature.title}</h3>
                        <p className="text-white/50 leading-relaxed mb-8 flex-grow">
                          {feature.description}
                        </p>
                        <div className="text-xs font-mono text-white/20 uppercase tracking-widest">{feature.footer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5: Closing - The Final Push */}
            <section className="py-40 px-6 relative overflow-hidden bg-gradient-to-b from-[#121212] to-black">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#006AFF]/10 blur-[150px] rounded-full" />
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <h2 className="text-6xl md:text-[5.4rem] font-black mb-10 leading-tight">
                  기술은 저희가 준비했습니다<br />
                  그저 <span className="gradient-text italic">감성 </span>만 챙겨오세요!
                </h2>
                <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-3xl mx-auto leading-relaxed">
                  더 이상 편집 툴 앞에서 좌절하지 마세요.<br />
                  Plymaster Studio가 당신의 음악을 세상에서 가장 빛나는 영상으로 연결합니다.
                </p>          
              </div>
            </section>
          </>
        )}
        {view === 'pricing' && <PricingSection />}
        {view === 'factory' && <FactoryView setView={handleSetView} />}
        {view === 'manual' && <ManualSection setView={handleSetView} initialMode={manualMode} />}
        {view === 'suno' && <SunoLyric setView={handleSetView} />}
        {(view === 'privacy' || view === 'terms' || view === 'refund') && (
          <PolicyView initialTab={view as any} setView={handleSetView} />
        )}
        {view === 'themepack' && <ThemePackMusic setView={handleSetView} />}
      </main>

      <footer className="py-20 px-6 bg-black border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#006AFF] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter">Plymaster <span className="text-[#006AFF]">Studio</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-white/40 font-medium">
            <button
              onClick={() => {
                setView('privacy');
                safeScrollToTop();
              }}
              className={`hover:text-white transition-colors ${view === 'privacy' ? 'text-[#006AFF]' : ''}`}
            >
              Privacy Policy(개인정보처리방침)
            </button>
            <button
              onClick={() => {
                setView('terms');
                safeScrollToTop();
              }}
              className={`hover:text-white transition-colors ${view === 'terms' ? 'text-[#006AFF]' : ''}`}
            >
              Terms of Service(이용약관)
            </button>
            <button
              onClick={() => {
                setView('refund');
                safeScrollToTop();
              }}
              className={`hover:text-white transition-colors ${view === 'refund' ? 'text-[#006AFF]' : ''}`}
            >
              Refund Policy(환불 정책)
            </button>
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">&copy; 2026 NIMO MUSIC CORP. ALL RIGHTS RESERVED. MADE FOR CREATORS.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
