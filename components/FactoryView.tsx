import React from 'react';
import { 
  Sparkles, 
  Wand2, 
  Target, 
  Image as ImageIcon, 
  ShieldCheck, 
  Download, 
  BookOpen, 
  Zap, 
  Bot, 
  Headphones,
  Terminal
} from 'lucide-react';
import { AppViewType } from '../types';

interface FactoryViewProps {
  setView: (view: AppViewType, manualTab?: 'studio' | 'factory') => void;
}

const safeScrollToTop = () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    try {
      window.scrollTo(0, 0);
    } catch (fallbackError) {}
  }
};

export const FactoryView: React.FC<FactoryViewProps> = ({ setView }) => {
  const factoryFeatures = [
    {
      step: "01",
      title: "음악/Suno 지식 제로도 100% OK!",
      subtitle: "초간편 원클릭 대량 자동 생산",
      description: "음악 이론이나 Suno AI 사용법을 전혀 몰라도 괜찮습니다! 원하는 테마(.pmtheme)와 제작할 곡 수만 입력하고 '시작' 버튼을 누르면 AI 프로듀서가 기획부터 입력까지 모든 공정을 알아서 마칩니다.",
      icon: <Wand2 className="w-8 h-8 text-[#00B2FF]" />,
      badge: "Zero Knowledge"
    },
    {
      step: "02",
      title: "테마별 맞춤 벤치마킹 & SOP 엔진",
      subtitle: "상투적 AI 클리셰 원천 차단",
      description: "테마별 전용 아티스트 풀(Pool)을 기반으로 대표 명곡의 감성과 구조를 정밀 벤치마킹합니다. 'coffee', 'neon', 'echo' 같은 뻔한 AI 클리셰 단어 30여 개를 금지하여 진짜 프로듀서가 쓴 듯한 가사를 작성합니다.",
      icon: <Target className="w-8 h-8 text-[#006AFF]" />,
      badge: "Smart SOP Engine"
    },
    {
      step: "03",
      title: "Suno UI 좌표 자동 인식 & 연동",
      subtitle: "화면 분석 및 스마트 마우스 제어",
      description: "화면에 띄워진 Suno 창의 가사, 스타일, 제목, 생성 버튼 좌표를 '🔍 자동 인식(Auto Detect)' 버튼 한 번으로 파악합니다. 3곡 연속 생성 후 서버 안정성을 위한 스마트 자동 대기까지 완벽히 제어합니다.",
      icon: <Bot className="w-8 h-8 text-purple-400" />,
      badge: "Auto Detect & Click"
    },
    {
      step: "04",
      title: "유튜브 썸네일 & 바이럴 제목 자동 생성",
      subtitle: "클릭률(CTR) 극대화 AI 마케터",
      description: "참조 이미지만 첨부하면 시각적 스타일과 제목 형식을 분석하여 클릭률을 폭발시키는 유튜브 알고리즘 맞춤 제목 3종과 나노 바나나(Nano Banana) 고화질 16:9 영어 프롬프트를 즉시 만들어 줍니다.",
      icon: <ImageIcon className="w-8 h-8 text-pink-400" />,
      badge: "Viral Marketing"
    },
    {
      step: "05",
      title: "철저한 품질 관리(QC) & 금지어 검수",
      subtitle: "무결점 명곡 생산을 위한 2중 필터",
      description: "생성된 가사에 금지어나 기준 미달 표현이 포함되었는지 실시간으로 QC(Quality Control) 검사하며, 탈락 시 즉시 자동 재기획을 수행하여 고품질 트랙만을 대기열에 담아냅니다.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      badge: "QC & Filtering"
    },
    {
      step: "06",
      title: "PMCS 하드웨어 보안 & 슬롯형 테마 관리",
      subtitle: "안전한 암호화 마스터키 보호",
      description: "기기 고유 ID(MAC/UUID) 기반 32비트 암호화 보안 시스템과 슬롯형 테마 로더(.pmtheme)를 탑재하여 소중한 기획 테마와 라이선스 데이터를 외부 유출로부터 완벽하게 보호합니다.",
      icon: <Terminal className="w-8 h-8 text-amber-400" />,
      badge: "PMCS Security"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(50%_50%_at_50%_30%,rgba(0,106,255,0.05)_0%,transparent_100%)] pointer-events-none z-0" />

      {/* 1. FACTORY HERO SECTION */}
      <section className="relative px-4 md:px-6 pt-12 pb-24 text-center max-w-6xl mx-auto z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-[#00B2FF]/30 bg-[#1e1e1e] text-[#00B2FF] text-xs md:text-sm font-bold">
          <Sparkles className="w-4 h-4 text-[#00B2FF]" />
          Plymaster Factory : AI 음악 대량 생산 & 유튜브 마케팅 자동화 솔루션
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black mb-8 leading-[1.2] tracking-tight text-white select-none">
          음악을 전혀 몰라도 <br className="hidden md:block" />
          <span className="text-[#00B2FF] font-black block mt-2">
            고퀄리티 음악 대량 생산!
          </span>
        </h1>

        <div className="text-base md:text-xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed space-y-3 font-medium">
          <p>
            음악 이론이나 Suno AI 사용법을 전혀 몰라도 괜찮습니다! 원하는 테마와 제작 곡 수만 입력하고 버튼을 누르면 <br className="hidden md:block" />
            <strong className="text-cyan-400 font-bold">AI 프로듀서가 기획부터 Suno 연동까지 100% 자동 수행</strong>합니다.
          </p>
          <p className="text-white/50 text-sm md:text-base">
            ✨ 유튜브 알고리즘을 겨냥한 매력적인 <strong className="text-white">썸네일 이미지 프롬프트 & 바이럴 영상 제목 카피 자동 생성 기능</strong>까지 한 번에 누리세요!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* 붉은 박스 영역 수정: 다운로드 버튼 그라데이션 및 그림자 제거 후 무결점 단색 처리 */}
          <a
            href="https://github.com/nimomusic/plymasterstudio/releases/download/plymaster/PlyMaster.Factory.Setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-8 py-5 bg-[#006AFF] hover:bg-[#0052cc] rounded-2xl text-lg md:text-xl font-black transition-all hover:scale-105 overflow-hidden text-center inline-flex items-center justify-center gap-3 text-white"
          >
            <Download className="w-6 h-6 text-white" />
            <span className="relative z-10">팩토리 다운로드 (Windows용)</span>
          </a>

          <button
            onClick={() => {
              setView('manual', 'factory');
              safeScrollToTop();
            }}
            className="w-full sm:w-auto px-8 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-lg md:text-xl font-bold border border-white/15 transition-all text-center inline-flex items-center justify-center gap-2.5 text-white/90 hover:text-white cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#00B2FF]" />
            팩토리 설명서 & PDF 가이드
          </button>

          <button 
                  onClick={() => setView('themepack')}
                  className="w-full sm:w-auto px-7 py-4.5 bg-gradient-to-r from-[#006AFF]/20 to-[#00B2FF]/20 hover:from-[#006AFF]/30 hover:to-[#00B2FF]/30 text-white rounded-2xl text-lg font-bold border border-[#006AFF]/50 hover:border-[#00B2FF] transition-all transform hover:scale-105 shadow-lg shadow-[#006AFF]/20 text-center inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Headphones className="w-5 h-5 flex-shrink-0 text-[#00B2FF]" />
                  <span className="whitespace-nowrap">테마팩 음악 둘러보기</span>
                </button>
        </div>

        <p className="text-amber-400/90 text-xs md:text-sm font-semibold mb-4 bg-amber-500/10 border border-amber-500/20 py-2.5 px-4 rounded-xl inline-block">
          ※ 만약 'Windows의 PC보호' 파란 창이 뜨면 <strong className="underline">'추가정보'</strong>를 클릭하고 아래 <strong className="underline">'실행'</strong> 버튼을 누르시면 안전하게 시작됩니다.
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm font-semibold text-white/40 pt-4">
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">⚡ 원클릭 대량생산</span>
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">🎯 테마별 SOP 기획</span>
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">🔍 Suno 좌표 자동인식</span>
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">🛡️ 금지어 QC 검수</span>
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">📸 유튜브 썸네일 프롬프트</span>
          <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">🔥 바이럴 제목 자동 생성</span>
        </div>
      </section>

      {/* 2. CORE FACTORY FEATURES SECTION */}
      <section className="py-24 px-4 md:px-6 relative z-10 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#006AFF]/15 text-[#006AFF] text-xs font-black uppercase tracking-wider border border-[#006AFF]/30">
              <Zap className="w-3.5 h-3.5" />
              Ultimate Factory Automation
            </div>
            {/* 붉은 박스 영역 수정: '6대 혁신 기능' 그라데이션을 단색 text-[#00B2FF]로 전면 교체하여 까만 블록 제거 */}
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Plymaster Factory의 <span className="text-[#00B2FF]">6대 혁신 기능</span>
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              복잡하고 반복적인 음악 제작과 유튜브 마케팅 업무를 AI 자동화 기술로 완벽하게 해결합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {factoryFeatures.map((feat, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/[0.03] hover:bg-white/[0.07] p-8 md:p-10 rounded-3xl border border-white/10 hover:border-[#00B2FF]/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-[#00B2FF]/40 transition-all">
                      {feat.icon}
                    </div>
                    <span className="text-3xl font-black text-white/15 font-mono group-hover:text-[#00B2FF]/30 transition-colors">
                      {feat.step}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#00B2FF] mb-2">
                    {feat.subtitle}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 leading-snug group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>FEATURE HIGHLIGHT</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/70 font-bold group-hover:bg-[#00B2FF]/10 group-hover:text-[#00B2FF] transition-all">
                    {feat.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FactoryView;
