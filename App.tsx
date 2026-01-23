
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App: React.FC = () => {
  const features = [
    {
      title: "\"파일 이름이 곧 자막이 된다\"",
      description: "수십 곡의 제목을 일일이 타이핑할 필요 없습니다. 파일명을 인식해 영상 속에 자동 생성합니다.",
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
      title: "\"오디오 스펙트럼 & 눈 효과\"",
      description: "음악 비트에 실시간 반응하는 오디오 스펙트럼과 감성을 더해주는 내리는 눈 효과로 시청 지속 시간을 극대화합니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      footer: "Visual Effects"
    },
    {
      title: "\"귀가 편안한 볼륨 평준화(LUFS)\"",
      description: "곡마다 제각각인 볼륨을 유튜브 최적 표준으로 맞춥니다. 시청자가 볼륨 조절을 위해 휴대폰을 만질 필요가 없게 만듭니다.",
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
      title: "\"유튜브 라이브 스트리밍 최적화\"",
      description: "제작된 영상을 즉시 Plymaster에서 유튜브 라이브로 송출할 수 있는 환경을 지원합니다. 라이브 스케줄러로 24시간 끊이지 않는 라디오 채널 운영도 꿈이 아닙니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      footer: "Streaming Ready"
    },
    {
      title: "\"강력한 성능, 낮은 진입장벽\"",
      description: "NVIDIA GPU 가속으로 초고속 렌더링을 지원하며, 오류 시 CPU로 자동 전환되어 저사양 PC에서도 멈춤 없이 작동합니다.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      footer: "Hybrid Engine"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] selection:bg-[#006AFF]/30 selection:text-white">
      <Navbar />
      <Hero />

      {/* Section 2: Problem & Solution - The Contrast */}
      <section id="problem" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-500/20 to-transparent blur-3xl opacity-50" />
            <div className="glass-card rounded-[2.5rem] p-12 border-white/5 relative overflow-hidden backdrop-blur-2xl">
              <div className="mb-8 flex justify-between items-start">
                <span className="text-red-500 text-xs font-bold tracking-widest uppercase py-1 px-3 border border-red-500/30 rounded-full bg-red-500/10">기존 방식의 한계</span>
                <span className="text-white/20 text-4xl">😫</span>
              </div>
              <ul className="space-y-6">
                {[
                  "X 타이핑 지옥 - 수십 곡을 직접 이름 및 위치입력 (수십분 소요)",
                  "X 트랙리스트 수동 계산 - 시작 시간을 일일이 확인해 타임스탬프 작성.",
                  "X 들쭉날쭉한 사운드 - 볼륨을 하나하나 수동으로 조절.",
                  "X 라이브 송출의 한계 - 스트리밍 소프트웨어로 옮겨 복잡한 설정 세팅."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 text-red-500/70 font-medium">
                    <span className="flex-shrink-0 whitespace-nowrap">{text.split(' - ')[0]}</span>
                    <span>{text.split(' - ')[1]}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-[#006AFF] font-bold text-2xl animate-pulse">Plymaster는 이 모든 고통을 없애 드립니다!</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              전문가용 편집 툴,<br />
              언제까지 <span className="text-white/40">씨름하실 건가요?</span>
            </h2>
            <div className="text-xl text-white/60 leading-relaxed">
              <p className="mb-2">자막 한 줄 한 줄, 싱크 한 칸 한 칸 맞추느라 시간 낭비 하지 마세요.</p>
              <p>Plymaster는 오직 <strong className="text-white">플레이리스트 제작만을 위해 설계된 전용 프로그램</strong>입니다.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-[#006AFF] font-bold text-3xl mb-1">95%</div>
                <div className="text-sm text-white/40">작업 시간 단축</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-[#006AFF] font-bold text-3xl mb-1">0%</div>
                <div className="text-sm text-white/40">기술 장벽</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="flex flex-col items-center gap-6">
            <a 
              href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/PlyMasterStudio_Setup_v1.0.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-16 py-7 bg-[#006AFF] hover:bg-[#0056cc] rounded-[2rem] text-2xl font-black transition-all transform hover:scale-105 electric-shadow text-center inline-block"
            >
              지금 바로 다운로드
            </a>
            <p className="text-white/30 text-sm">Window용 | 유튜브 라이브 가능 | 저사양 PC 최적화</p>
          </div>
        </div>
      </section>

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
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">&copy; 2026 NIMO MUSIC CORP. ALL RIGHTS RESERVED. MADE FOR CREATORS.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
