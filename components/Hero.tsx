
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#006AFF]/20 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[45%] h-[45%] bg-[#006AFF]/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs md:text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[#006AFF] animate-ping" />
          Plymaster Studio: 플레이리스트 제작의 새로운 기준
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.4rem] font-bold mb-8 leading-[1.2] tracking-tight px-2 break-keep">
          유튜브 플레이리스트,<br />
          더 이상 <span className="gradient-text italic font-black pr-1">노가다 </span>&nbsp;하지 마세요
        </h1>
        
        <div className="text-base md:text-xl text-white/50 mb-12 max-w-4xl mx-auto leading-relaxed break-keep">
          <p>곡당 1시간 걸리던 편집을 <strong>3분</strong>이내로 단축하세요.</p>
          <p>선곡부터 라이브 송출까지, 누구나 클릭 몇 번만으로 플리 영상을 만들 수 있습니다.</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
            <a 
              href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/PlyMasterStudio_Setup_v1.0.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-10 py-5 bg-[#006AFF] hover:bg-[#0056cc] rounded-2xl text-xl font-bold transition-all transform hover:scale-105 electric-shadow overflow-hidden text-center inline-block"
            >
              <span className="relative z-10">지금 바로 다운로드</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>
            <a 
              href="https://youtu.be/Qej5PF5yaLQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-xl font-bold border border-white/10 transition-all backdrop-blur-sm text-center inline-block"
            >
              사용설명 영상 보기
            </a>
          </div>
          <p className="text-white/30 text-sm font-medium mb-24">Window용 | 유튜브 라이브 가능</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .break-keep {
          word-break: keep-all;
        }
      `}} />
    </section>
  );
};

export default Hero;
