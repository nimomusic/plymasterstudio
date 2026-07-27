import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Target, 
  Image as ImageIcon, 
  ShieldCheck, 
  Layers, 
  Download, 
  BookOpen, 
  Copy, 
  Check, 
  Play, 
  Zap, 
  Music2, 
  TrendingUp, 
  Bot, 
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
  // Demo State for Thumbnail & Title Generator
  const [demoTheme, setDemoTheme] = useState('봄날 햇살 아래 한가로운 테라스 카페 재즈 플레이리스트');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [demoResult, setDemoResult] = useState<{
    titles: string[];
    prompt: string;
    keywords: string[];
  } | null>({
    titles: [
      "[Playlist] 봄바람 살랑이는 어느 오후, 따스한 햇살과 어울리는 카페 재즈 | Warm Terrace Jazz",
      "[Playlist] 기분 좋은 여유가 필요한 날, 테라스에서 마시는 아이스 라떼 같은 재즈 음악 모음",
      "[Playlist] 복잡한 생각은 잠시 내려놓고 | 봄날의 오후를 채우는 편안한 카페 연주곡"
    ],
    prompt: "[Medium/Style] A professional, ultra-high-definition cinematic photography of a peaceful sunny outdoor cafe terrace in spring. Presented in a clean 16:9 widescreen aspect ratio.\n[Subject Detail] A rustic wooden table with a glass of iced caffe latte and an open art book. Soft spring sunlight filtering through fresh green tree leaves, casting gentle bokeh shadows on the table.\n[Color & Lighting Specs] Warm golden hour natural sunlight, bright airy pastel tones, high-contrast clean white balance without any dark gloom.\n[Technical Finish & AR] 8k resolution, razor-sharp focus on the coffee glass with creamy bokeh background, shot on 35mm lens, natural film grain. Aspect Ratio 16:9. Absolutely NO typography, NO text, NO watermarks, NO graphic overlays.",
    keywords: ["봄날재즈", "카페테라스", "힐링음악", "작업용플리", "감성재즈"]
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleRunDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoTheme.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      let titles = [
        `[Playlist] ${demoTheme} | 당신의 하루를 감성으로 채우는 시간`,
        `[Playlist] 듣는 순간 몰입되는 완벽한 분위기 | ${demoTheme} 모음`,
        `[Playlist] 센스 있는 공간을 위한 배경음악 | ${demoTheme}`
      ];
      let prompt = `[Medium/Style] Ultra-high-definition cinematic photography reflecting the mood of: ${demoTheme}. Presented in a clean 16:9 widescreen aspect ratio.\n[Subject Detail & Environment] Atmospheric lighting, rich emotional textures, professional studio color grading matching the exact vibe of the music.\n[Technical Finish & AR] Razor-sharp depth of field, 8k resolution, natural film grain. Aspect Ratio 16:9. Absolutely NO typography, NO text, NO letters or graphic overlays.`;
      let keywords = ["플레이리스트", "감성음악", "트렌드뮤직", "분위기맛집", "배경음악"];

      if (demoTheme.includes("새벽") || demoTheme.includes("시티팝") || demoTheme.includes("드라이브")) {
        titles = [
          "[Playlist] 창문 열고 달리는 새벽 2시의 고속도로 | 낭만 넘치는 네온 시티팝 모음",
          "[Playlist] 복잡한 도시의 밤을 위로하는 감성 드라이브 뮤직 | Midnight City Pop",
          "[Playlist] 혼자만의 야간 드라이브, 감성에 취하는 밤 | 레트로 시티팝 베스트"
        ];
        prompt = "[Medium/Style] A professional cinematic night photography of a sleek retro sports car driving along a coastal highway at 2 AM. Presented in a 16:9 widescreen aspect ratio.\n[Subject Detail] Blurred city lights reflecting on the glossy wet asphalt, glowing dashboard lights illuminating the interior.\n[Color & Lighting Specs] Deep midnight blues contrasted with vibrant warm street lamps and subtle tail light trails. High-contrast cinematic night color grading.\n[Technical Finish & AR] 8k resolution, anamorphic lens flare, sharp focus on the car exterior. Aspect Ratio 16:9. Absolutely NO typography, NO text, NO logos or letters.";
        keywords = ["새벽드라이브", "시티팝", "야경플리", "드라이브뮤직", "밤감성"];
      } else if (demoTheme.includes("운동") || demoTheme.includes("힙합") || demoTheme.includes("워크아웃")) {
        titles = [
          "[Playlist] 한계까지 끌어올리는 심장 터지는 비트 | 동기부여 고강도 워크아웃 힙합",
          "[Playlist] 헬스장 텐션 200% 폭발! 지칠 때 듣는 강력한 파워 힙합 플리",
          "[Playlist] 오늘 운동 완료를 부르는 미친 에너지 | 동기부여 랩 & 힙합 모음"
        ];
        prompt = "[Medium/Style] High-energy professional fitness photography in a modern industrial gym. Presented in a 16:9 widescreen aspect ratio.\n[Subject Detail] Dramatic lighting accentuating athletic determination, heavy steel dumbbells and industrial training gear in sharp focus.\n[Color & Lighting Specs] High-contrast moody lighting with energetic warm highlights and deep shadows. Clean and powerful color grading.\n[Technical Finish & AR] 8k resolution, dynamic low-angle composition, crisp textures. Aspect Ratio 16:9. Absolutely NO typography, NO text, NO watermarks.";
        keywords = ["헬스플리", "운동음악", "동기부여", "파워힙합", "워크아웃"];
      }

      setDemoResult({ titles, prompt, keywords });
      setIsGenerating(false);
    }, 800);
  };

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
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background Ambient Blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#006AFF]/20 via-[#00B2FF]/15 to-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[#00B2FF]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* 1. FACTORY HERO SECTION */}
      <section className="relative px-4 md:px-6 pt-12 pb-24 text-center max-w-6xl mx-auto z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-[#00B2FF]/30 bg-gradient-to-r from-[#006AFF]/15 to-[#00B2FF]/15 backdrop-blur-md text-[#00B2FF] text-xs md:text-sm font-bold shadow-lg shadow-[#006AFF]/10 animate-[fadeIn_0.5s_ease-out]">
          <Sparkles className="w-4 h-4 text-[#00B2FF] animate-spin" style={{ animationDuration: '4s' }} />
          Plymaster Factory : AI 음악 대량 생산 & 유튜브 마케팅 자동화 솔루션
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black mb-8 leading-[1.18] tracking-tight break-keep">
          Suno와 음악을 전혀 몰라도 <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#006AFF] via-[#00B2FF] to-cyan-300 bg-clip-text text-transparent italic font-black">
            단 한 번의 클릭으로 고퀄리티 명곡 대량 생산!
          </span>
        </h1>

        <div className="text-base md:text-xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed break-keep space-y-3 font-medium">
          <p>
            음악 이론이나 Suno AI 사용법을 전혀 몰라도 괜찮습니다! 원하는 테마와 제작 곡 수만 입력하고 버튼을 누르면 <br className="hidden md:block" />
            <strong className="text-cyan-400 font-bold">AI 프로듀서가 기획부터 Suno 연동까지 100% 자동 수행</strong>합니다.
          </p>
          <p className="text-white/50 text-sm md:text-base">
            ✨ 유튜브 알고리즘을 겨냥한 매력적인 <strong className="text-white">썸네일 이미지 프롬프트 & 바이럴 영상 제목 카피 자동 생성 기능</strong>까지 한 번에 누리세요!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/PlyMaster.Studio.Setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-[#006AFF] to-[#00B2FF] hover:brightness-110 rounded-2xl text-lg md:text-xl font-black transition-all transform hover:scale-105 shadow-xl shadow-[#006AFF]/25 overflow-hidden text-center inline-flex items-center justify-center gap-3"
          >
            <Download className="w-6 h-6 text-white animate-bounce" />
            <span className="relative z-10 text-white">팩토리 무료 다운로드 (Windows용)</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </a>

          <button
            onClick={() => {
              setView('manual', 'factory');
              safeScrollToTop();
            }}
            className="w-full sm:w-auto px-8 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-lg md:text-xl font-bold border border-white/15 transition-all backdrop-blur-md text-center inline-flex items-center justify-center gap-2.5 text-white/90 hover:text-white cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#00B2FF]" />
            팩토리 설명서 & PDF 가이드
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
      <section className="py-24 px-4 md:px-6 relative z-10 bg-gradient-to-b from-transparent via-black/40 to-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#006AFF]/15 text-[#006AFF] text-xs font-black uppercase tracking-wider border border-[#006AFF]/30">
              <Zap className="w-3.5 h-3.5" />
              Ultimate Factory Automation
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Plymaster Factory의 <span className="bg-gradient-to-r from-[#006AFF] to-[#00B2FF] bg-clip-text text-transparent">6대 혁신 기능</span>
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              복잡하고 반복적인 음악 제작과 유튜브 마케팅 업무를 AI 자동화 기술로 완벽하게 해결합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {factoryFeatures.map((feat, idx) => (
              <div 
                key={idx} 
                className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] p-8 md:p-10 rounded-3xl border border-white/10 hover:border-[#00B2FF]/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-[#00B2FF]/40 transition-all">
                      {feat.icon}
                    </div>
                    <span className="text-3xl font-black text-white/15 font-mono group-hover:text-[#00B2FF]/40 transition-colors">
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
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/70 font-bold group-hover:bg-[#00B2FF]/10 group-hover:text-[#00B2FF] group-hover:border-[#00B2FF]/30 transition-all">
                    {feat.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FACTORY DEMO SECTION */}
      <section className="py-24 px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
            <Wand2 className="w-3.5 h-3.5" />
            Live Factory Preview
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
            🛠️ 유튜브 썸네일 & 영상 제목 카피 자동 생성기
          </h2>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            원하는 테마나 무드를 선택해 보세요! Plymaster Factory가 유튜브 알고리즘을 겨냥한 클릭률(CTR) 최적화 제목과 썸네일 프롬프트를 즉시 추출합니다.
          </p>
        </div>

        <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Preset Buttons */}
          <div className="mb-8">
            <label className="block text-xs font-extrabold uppercase tracking-widest text-white/50 mb-3">
              🔥 인기 테마 프리셋 선택 (클릭하여 테마 적용)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                "봄날 햇살 아래 한가로운 테라스 카페 재즈 플레이리스트",
                "새벽 2시 창문 열고 달리는 고속도로 네온 시티팝",
                "운동할 때 심장 터지는 고강도 동기부여 파워 힙합",
                "비 내리는 밤 차분하게 집중력 높여주는 딥하우스"
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDemoTheme(preset)}
                  className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                    demoTheme === preset
                      ? 'bg-gradient-to-r from-[#006AFF] to-[#00B2FF] text-white border-transparent shadow-lg shadow-[#006AFF]/20 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleRunDemo} className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <input
                type="text"
                value={demoTheme}
                onChange={(e) => setDemoTheme(e.target.value)}
                placeholder="예: 가을 밤 선선한 바람 불 때 듣는 어쿠스틱 감성 플레이리스트"
                className="w-full bg-black/50 border border-white/15 rounded-2xl px-6 py-4 text-white placeholder-white/30 font-medium text-base md:text-lg focus:outline-none focus:border-[#00B2FF] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-[#006AFF] to-[#00B2FF] hover:brightness-110 disabled:opacity-50 text-white font-black rounded-2xl text-base md:text-lg transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#006AFF]/20 cursor-pointer whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI 분석 및 추출 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>✨ 썸네일 프롬프트 & 제목 추출하기</span>
                </>
              )}
            </button>
          </form>

          {/* Result Area */}
          {demoResult && (
            <div className="space-y-6 pt-6 border-t border-white/10 animate-[fadeIn_0.4s_ease-out]">
              {/* 1. Viral Titles */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-extrabold text-cyan-300 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#00B2FF]" />
                    📌 유튜브 클릭률(CTR) 극대화 바이럴 제목 3종
                  </h3>
                  <span className="text-xs font-mono text-white/40">ALGORITHM OPTIMIZED</span>
                </div>
                <div className="space-y-2.5">
                  {demoResult.titles.map((title, i) => (
                    <div
                      key={i}
                      onClick={() => handleCopy(title, `title-${i}`)}
                      className="group p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-[#00B2FF]/40 transition-all cursor-pointer flex items-center justify-between gap-4"
                      title="클릭하여 복사"
                    >
                      <span className="font-bold text-white/90 text-sm md:text-base group-hover:text-white transition-colors">
                        {title}
                      </span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-white/60 group-hover:bg-[#00B2FF] group-hover:text-white transition-all shrink-0">
                        {copiedType === `title-${i}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>복사</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Nano Banana Image Prompt */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-base md:text-lg font-extrabold text-purple-300 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    🎨 나노 바나나(Nano Banana) 고화질 16:9 썸네일 프롬프트
                  </h3>
                  <button
                    onClick={() => handleCopy(demoResult.prompt, 'prompt')}
                    className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs md:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    {copiedType === 'prompt' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span className="text-emerald-300">전체 프롬프트 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>프롬프트 전체 복사</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-xs md:text-sm text-white/80 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-purple-500/30">
                  {demoResult.prompt}
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-white/40">🎯 자동 추출 알고리즘 태그:</span>
                  {demoResult.keywords.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-cyan-300 font-bold">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. FACTORY CLOSING SECTION */}
      <section className="py-28 px-4 md:px-6 relative z-10 text-center max-w-5xl mx-auto">
        <div className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-b from-[#006AFF]/20 via-black/60 to-[#00B2FF]/10 border border-[#00B2FF]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00B2FF]/15 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
            이제 음악과 유튜브 마케팅을 <br />
            <span className="bg-gradient-to-r from-[#006AFF] to-cyan-300 bg-clip-text text-transparent italic">클릭 한 번으로 자동화</span>하세요!
          </h2>
          <p className="text-base md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            더 이상 Suno 앞에서 어떤 프롬프트를 써야 할지 막막해하지 마세요. <br />
            Plymaster Factory가 당신만의 24시간 무인 음악 프로덕션이 되어드립니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/PlyMaster.Studio.Setup.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#006AFF] to-[#00B2FF] hover:brightness-110 text-white font-black rounded-2xl text-lg md:text-xl transition-all shadow-xl shadow-[#006AFF]/30 flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6 animate-bounce" />
              <span>팩토리 무료 다운로드 시작</span>
            </a>
            <button
              onClick={() => {
                setView('manual', 'factory');
                safeScrollToTop();
              }}
              className="w-full sm:w-auto px-8 py-5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl text-lg md:text-xl transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#00B2FF]" />
              <span>팩토리 가이드북 열람</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FactoryView;
