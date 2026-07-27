import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Chrome, 
  Cpu, 
  Folder, 
  Settings, 
  Music, 
  Play, 
  HelpCircle, 
  Info, 
  Puzzle, 
  ChevronRight, 
  ChevronLeft,
  FileDown,
  Monitor,
  ExternalLink
} from 'lucide-react';

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

interface SunoLyricProps {
  setView: (view: any, manualTab?: 'studio' | 'factory') => void;
}

export const SunoLyric: React.FC<SunoLyricProps> = ({ setView }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [simDeveloperMode, setSimDeveloperMode] = useState<boolean>(false);
  const [simExtensionLoaded, setSimExtensionLoaded] = useState<boolean>(false);
  const [simFolderSelected, setSimFolderSelected] = useState<boolean>(false);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      id: 1,
      title: "크롬 확장프로그램 관리 접속",
      subtitle: "chrome://extensions",
      icon: <Chrome className="w-5 h-5" />,
      steps: [
        "Google Chrome 브라우저를 실행합니다.",
        "화면 맨 위 주소창을 클릭합니다.",
        "chrome://extensions 를 주소창에 그대로 입력하고 Enter 키를 누릅니다.",
        "또는 크롬 우측 상단 메뉴(점 3개) -> 확장 프로그램 -> 확장 프로그램 관리를 클릭하셔도 됩니다."
      ],
      tip: "검색창(구글/네이버 등)이 아닌 브라우저 최상단의 '주소창'에 입력하셔야 페이지가 정상적으로 열립니다.",
      hasCopy: true,
      copyValue: "chrome://extensions"
    },
    {
      id: 2,
      title: "개발자 모드 활성화",
      subtitle: "Developer Mode Toggle",
      icon: <Settings className="w-5 h-5" />,
      steps: [
        "확장프로그램 설정 화면의 우측 상단을 확인합니다.",
        "우측 상단에 위치한 '개발자 모드' 스위치를 찾습니다.",
        "스위치를 클릭하여 활성화(ON / 파란색) 상태로 변경합니다."
      ],
      tip: "개발자 모드가 활성화되어 있어야 외부에서 직접 다운로드한 확장 프로그램을 수동으로 등록할 수 있습니다."
    },
    {
      id: 3,
      title: "압축해제된 확장프로그램 로드",
      subtitle: "Load Unpacked",
      icon: <Cpu className="w-5 h-5" />,
      steps: [
        "개발자 모드가 켜지면 좌측 상단에 새로운 버튼 메뉴들이 나타납니다.",
        "가장 첫 번째에 있는 '압축해제된 확장 프로그램을 로드' 버튼을 클릭합니다.",
        "폴더 선택 창이 뜹니다."
      ],
      tip: "버튼을 누르기 전에 먼저 맨 위에서 다운로드한 'sunolyric.zip' 파일의 압축을 완전히 해제하셔야 합니다."
    },
    {
      id: 4,
      title: "폴더 선택하기",
      subtitle: "Select sunolyric Folder",
      icon: <Folder className="w-5 h-5" />,
      steps: [
        "다운로드 후 압축을 해제한 'sunolyric' 폴더를 찾아 클릭합니다.",
        "주의: 폴더 '안'으로 더블클릭해서 들어가지 마세요. 폴더가 닫힌 상태에서 한 번만 클릭해야 합니다.",
        "하단의 '폴더 선택' 버튼을 누릅니다."
      ],
      tip: "폴더 내부 파일들이 보이는 안쪽까지 들어가서 폴더 선택을 누르면 에러가 발생하거나 로드가 되지 않습니다. 반드시 최상위 'sunolyric' 폴더 이름 자체를 클릭한 상태에서 '폴더 선택'을 진행하세요."
    },
    {
      id: 5,
      title: "설치 확인 및 활성화",
      subtitle: "Verify Extension",
      icon: <Check className="w-5 h-5" />,
      steps: [
        "확장프로그램 리스트에 'SUNO 가사 다운로더 - 플리마스터' 카드가 정상적으로 표시되는지 확인합니다.",
        "카드 오른쪽 아래의 스위치가 파란색(활성화 / ON)으로 켜져 있는지 확인합니다."
      ],
      tip: "만약 빨간색 '오류' 버튼이 있다면, 폴더 경로를 올바르게 선택했는지 확인하시고, 오류가 계속된다면 압축을 다시 풀고 재로드 해보세요."
    },
    {
      id: 6,
      title: "Suno 홈페이지 접속",
      subtitle: "Go to suno.com",
      icon: <Music className="w-5 h-5" />,
      steps: [
        "Suno 공식 웹사이트(https://suno.com)에 접속합니다.",
        "자막을 다운로드할 노래를 재생하거나 곡 상세 페이지로 이동합니다.",
        "곡 제목을 클릭하면 상세 화면으로 원활하게 넘어갑니다."
      ],
      tip: "가사 추출기는 곡이 재생 대기 상태에 있거나 최소 1초 이상 플레이 될 때 가사 정보를 정확하게 감지합니다."
    },
    {
      id: 7,
      title: "확장프로그램 실행",
      subtitle: "Launch Extenstion",
      icon: <Puzzle className="w-5 h-5" />,
      steps: [
        "크롬 주소창 우측의 퍼즐 조각(🧩) 모양 확장프로그램 아이콘을 누릅니다.",
        "목록에서 'SUNO 가사 다운로더 - 플리마스터'를 찾아 클릭합니다.",
        "화면 중앙에 가사 추출 팝업창이 나타납니다."
      ],
      tip: "자주 사용하신다면 팝업창 목록에서 핀(📌) 고정 아이콘을 활성화해 두시면 주소창 옆에 항상 고정되어 매우 신속하게 다운로드할 수 있습니다."
    },
    {
      id: 8,
      title: "가사 파일 다운로드 완료",
      subtitle: "Download SRT & Sync",
      icon: <FileDown className="w-5 h-5" />,
      steps: [
        "팝업창에서 원하는 자막 포맷(SRT 또는 TXT) 버튼을 클릭합니다.",
        "SRT 다운로드 시 재생 중인 노래 가사가 싱크 파일로 깔끔하게 저장됩니다.",
        "다운로드 완료된 가사 파일을 음원 파일과 같은 폴더에 저장하고, 파일명을 음원과 100% 동일하게 맞춰주세요."
      ],
      tip: "Plymaster Studio 프로그램에 음원 파일과 SRT 파일명이 일치한 상태로 불러오면, 어떠한 수동 싱크 조절 없이 1초 만에 풀 화면 노래방 자막이 자동 생성됩니다."
    }
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-4 md:px-6 min-h-screen bg-black text-white selection:bg-[#006AFF]/30 overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#006AFF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Controls */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={() => {
              setView('hero');
              safeScrollToTop();
            }}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl border border-white/5 hover:border-white/10 transition-all font-semibold flex items-center gap-2 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> 메인 화면으로 돌아가기
          </button>
          
          <span className="text-xs font-mono tracking-widest text-[#006AFF] uppercase font-bold bg-[#006AFF]/10 px-3 py-1.5 rounded-full border border-[#006AFF]/20">
            Suno Lyrics Utility
          </span>
        </div>

        {/* Title & Introduction Block */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            Suno 가사 다운로드<br />
            <span className="gradient-text italic">프로그램 사용 설명서</span>
          </h1>
          <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">
            Suno AI로 만든 노래에 자동으로 가사 싱크(SRT)를 입혀보세요. 
            크롬 확장 프로그램을 사용해 클릭 한 번으로 Suno로부터 가사와 싱크를 추출하고 다운로드할 수 있습니다.<br></br>
          <span className="text-red-500 text-sm font-medium mb-2">※Suno에서 만든 싱크가 간혹 맞지 않는 경우가 있습니다. <br></br>그럴때는 다운로드시 싱크오류 의심 문구가 뜨는데 스튜디오의 '도구-자막 싱크 메이커'에서 해당부분만 싱크를 수정하여 사용하세요.</span>
          </p>
          
          {/* Core Feature Program Download Button */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-950/40 to-slate-900/40 border border-[#006AFF]/25 rounded-3xl max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006AFF]/10 blur-[40px] rounded-full group-hover:scale-150 transition-all duration-700" />
            <span className="text-xs font-bold tracking-wider text-[#006AFF] uppercase mb-3">Suno Extension Package</span>
            <h3 className="text-xl font-bold mb-5">플리마스터 스튜디오 전용 수노 가사 추출기</h3>
            <a 
              href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/sunolyric.zip"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#006AFF] hover:bg-[#0052cc] text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#006AFF]/30"
            >
              <Download className="w-5 h-5" /> 프로그램 다운로드
            </a>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-white/40">
              <Info className="w-3.5 h-3.5" /> 파일명: <code className="bg-white/5 px-1.5 py-0.5 rounded text-white/70">sunolyric.zip</code> (다운로드 후 반드시 압축을 풀어 사용하세요)
            </div>
          </div>
        </div>

        {/* Main Content: Layout Split into Left Step Cards & Right Dynamic Interactive Visual Chrome Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* LEFT COLUMN: Steps Tracker & Detailed Content (7 Cols on large screen) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Horizontal Step Pills */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-wrap gap-2 justify-between items-center">
              <span className="text-xs font-mono font-bold text-white/50 px-2">진행 과정</span>
              <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-thin">
                {steps.map(step => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStep(step.id);
                      if (step.id >= 2 && !simDeveloperMode) setSimDeveloperMode(true);
                      if (step.id >= 4 && !simFolderSelected) setSimFolderSelected(true);
                      if (step.id >= 5 && !simExtensionLoaded) setSimExtensionLoaded(true);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                      currentStep === step.id 
                        ? 'bg-[#006AFF] text-white ring-2 ring-blue-400' 
                        : currentStep > step.id 
                          ? 'bg-[#006AFF]/20 text-[#006AFF] border border-[#006AFF]/30' 
                          : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {step.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Detailed Card */}
            <div
              key={currentStep}
              className="glass-card border-white/10 p-8 rounded-3xl relative overflow-hidden"
            >
                {/* Accent glow on current card */}
                <div className="absolute top-0 left-0 w-2 h-full bg-[#006AFF]" />
                
                {/* Card Title & Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#006AFF]/10 border border-[#006AFF]/30 text-[#006AFF] rounded-2xl flex items-center justify-center font-black text-xl">
                    {steps[currentStep-1].icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#006AFF] tracking-widest uppercase">STEP 0{currentStep}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006AFF]" />
                      <span className="text-xs font-mono font-semibold text-white/40">{steps[currentStep-1].subtitle}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mt-1 text-white">{steps[currentStep-1].title}</h2>
                  </div>
                </div>

                {/* Step List (따라하기) */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5" /> 따라하기 가이드
                  </h4>
                  <ol className="space-y-3.5 pl-1">
                    {steps[currentStep-1].steps.map((text, idx) => (
                      <li key={idx} className="flex gap-3 text-white/80 leading-relaxed text-sm md:text-base">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold flex items-center justify-center text-[#006AFF] mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Interactive Copy for Step 1 */}
                {steps[currentStep-1].hasCopy && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-8 flex items-center justify-between gap-4">
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">복사할 주소</div>
                      <code className="font-mono text-sm md:text-base text-[#006AFF] font-bold block overflow-x-auto truncate select-all">
                        {steps[currentStep-1].copyValue}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyText(steps[currentStep-1].copyValue || '')}
                      className="flex-shrink-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>주소 복사</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Helpful Tip Box */}
                <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3.5">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 text-[#006AFF] rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white mb-1">설치 꿀팁! (TIP)</h5>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                      {steps[currentStep-1].tip}
                    </p>
                  </div>
                </div>

            </div>

            {/* Step Navigation Button Controls */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex-1 py-4 px-6 rounded-2xl border font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  currentStep === 1 
                    ? 'opacity-40 border-white/5 bg-white/2 text-white/30 cursor-not-allowed' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5" /> 이전 단계
              </button>
              
              {currentStep < 8 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 px-6 bg-[#006AFF] hover:bg-blue-600 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#006AFF]/15"
                >
                  다음 단계 <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setView('hero');
                    safeScrollToTop();
                  }}
                  className="flex-1 py-4 px-6 bg-green-600 hover:bg-green-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-600/15"
                >
                  설명서 종료 & 다운로드 시작
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive High-Fidelity Browser Chrome Simulator (5 Cols on large screen) */}
          <div className="lg:col-span-5">
            
            {/* Visual Header / Indicator */}
            <div className="mb-3 flex justify-between items-center text-xs text-white/40 px-2 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Simulator
              </span>
              <span>CHROME SIMULATOR V1.2</span>
            </div>

            {/* Mock Browser Container */}
            <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Chrome Browser Header Tab bar */}
              <div className="bg-[#202124] px-4 py-2.5 flex items-center gap-2 border-b border-[#2d2e30]">
                {/* Window Control buttons (Red, Yellow, Green) */}
                <div className="flex gap-1.5 mr-3">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Browser Tabs */}
                <div className="flex gap-1 items-end overflow-hidden max-w-full">
                  <div className={`px-4 py-1.5 rounded-t-lg text-[11px] font-medium flex items-center gap-1.5 cursor-pointer max-w-[120px] truncate ${currentStep <= 5 ? 'bg-[#18181c] text-white border-t-2 border-[#006AFF]' : 'text-white/40 hover:bg-white/5'}`}>
                    <Chrome className="w-3 h-3 text-blue-400" />
                    <span>확장 프로그램</span>
                  </div>
                  <div className={`px-4 py-1.5 rounded-t-lg text-[11px] font-medium flex items-center gap-1.5 cursor-pointer max-w-[120px] truncate ${currentStep >= 6 ? 'bg-[#18181c] text-white border-t-2 border-[#006AFF]' : 'text-white/40 hover:bg-white/5'}`}>
                    <Music className="w-3 h-3 text-purple-400" />
                    <span>Suno AI</span>
                  </div>
                </div>
              </div>

              {/* Address bar / Nav area */}
              <div className="bg-[#18181c] px-3 py-2 flex items-center gap-3 border-b border-white/5">
                {/* Back, Forward, Reload arrows */}
                <div className="flex gap-3 text-white/30 text-xs">
                  <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-white/60" />
                  <ChevronRight className="w-4 h-4" />
                  <svg className="w-4 h-4 cursor-pointer hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
                  </svg>
                </div>

                {/* Smart Address input field */}
                <div className="flex-grow bg-[#202124] rounded-lg px-3 py-1 flex items-center justify-between text-xs text-white/60 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-mono text-white tracking-wide truncate">
                      {currentStep >= 6 ? 'https://suno.com/song/jelly-legs' : 'chrome://extensions'}
                    </span>
                  </div>
                  {currentStep === 1 && (
                    <span className="text-[10px] bg-[#006AFF]/10 text-[#006AFF] px-1.5 py-0.5 rounded animate-pulse font-bold">입력 상태</span>
                  )}
                </div>

                {/* Rightmost toolbar buttons */}
                <div className="flex items-center gap-2.5 text-white/60">
                  {/* Extension Puzzle icon */}
                  <div className={`p-1.5 rounded hover:bg-white/5 cursor-pointer relative ${currentStep === 7 ? 'bg-[#006AFF]/20 text-[#006AFF] ring-2 ring-blue-500 animate-pulse' : ''}`}>
                    <Puzzle className="w-4 h-4" />
                    {currentStep === 7 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  
                  {/* Profile Menu / Three dots */}
                  <div className={`p-1 flex flex-col gap-0.5 justify-center items-center w-5 h-5 rounded hover:bg-white/5 cursor-pointer ${currentStep === 1 ? 'border border-[#ff3b30] bg-[#ff3b30]/10 rounded-full' : ''}`}>
                    <span className="w-1 h-1 rounded-full bg-white" />
                    <span className="w-1 h-1 rounded-full bg-white" />
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Dynamic Viewport Canvas based on currentStep */}
              <div className="aspect-[16/11] bg-[#121214] p-5 relative overflow-hidden flex flex-col justify-between text-xs">
                
                {/* 1. EXTENSIONS PAGE LAYOUT (Steps 1 to 5) */}
                {currentStep <= 5 && (
                  <div className="w-full h-full flex flex-col">
                    {/* Top sub-header toolbar */}
                    <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px]">확장 프로그램</span>
                        <span className="text-[10px] text-white/40">목록</span>
                      </div>
                      
                      {/* Developer Mode switch (Step 2 target) */}
                      <div className={`flex items-center gap-2 p-1 rounded-lg transition-all ${currentStep === 2 ? 'ring-2 ring-[#006AFF] bg-[#006AFF]/10 p-2 relative animate-pulse scale-105' : ''}`}>
                        <span className="text-[10px] text-white/60">개발자 모드</span>
                        <button 
                          onClick={() => setSimDeveloperMode(!simDeveloperMode)}
                          className={`w-8 h-4 rounded-full transition-all relative ${simDeveloperMode ? 'bg-[#006AFF]' : 'bg-white/20'}`}
                        >
                          <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${simDeveloperMode ? 'left-4.5' : 'left-0.5'}`} />
                        </button>
                        {currentStep === 2 && (
                          <div className="absolute -left-10 -bottom-8 bg-[#006AFF] text-white text-[9px] font-black py-1 px-2 rounded whitespace-nowrap shadow-lg">
                            ← 클릭하여 활성화!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Left submenu loaded on Developer Mode (Step 3 target) */}
                    {simDeveloperMode && (
                      <div className="flex gap-2 mb-4 animate-fadeIn">
                        <button 
                          onClick={() => {
                            setSimFolderSelected(true);
                            if (currentStep === 3) setCurrentStep(4);
                          }}
                          className={`px-3 py-1.5 rounded font-bold text-[10px] flex items-center gap-1.5 transition-all cursor-pointer ${
                            currentStep === 3 
                              ? 'bg-[#006AFF] text-white ring-2 ring-blue-300 animate-pulse scale-105' 
                              : 'bg-white/10 hover:bg-white/15 text-white/80'
                          }`}
                        >
                          <Folder className="w-3 h-3" /> 압축해제된 확장 프로그램을 로드
                        </button>
                        <button className="px-3 py-1.5 rounded font-bold text-[10px] bg-white/5 text-white/30 cursor-not-allowed">
                          확장 프로그램 압축
                        </button>
                        <button className="px-3 py-1.5 rounded font-bold text-[10px] bg-white/5 text-white/30 cursor-not-allowed">
                          업데이트
                        </button>
                      </div>
                    )}

                    {/* Extension Cards Grid */}
                    <div className="flex-grow grid grid-cols-1 gap-3 overflow-y-auto pr-1">
                      {/* CARD A: Standard default Google doc (just for mock realism) */}
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-3 opacity-60">
                        <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center font-bold">
                          G
                        </div>
                        <div className="flex-grow">
                          <h6 className="font-bold text-[11px] text-white">Google Docs 오프라인</h6>
                          <p className="text-[9px] text-white/40 mt-0.5">인터넷에 연결하지 않고도 문서를 편집...</p>
                        </div>
                      </div>

                      {/* CARD B: OUR SUNO EXTENSION (Step 5 target) */}
                      {(simExtensionLoaded || currentStep >= 5) ? (
                        <div className={`p-3 bg-gradient-to-r from-blue-950/20 to-slate-900/20 rounded-xl border flex gap-3 transition-all ${
                          currentStep === 5 
                            ? 'border-[#006AFF] bg-[#006AFF]/5 ring-2 ring-[#006AFF]/30 animate-pulse' 
                            : 'border-[#006AFF]/20'
                        }`}>
                          <div className="w-8 h-8 bg-[#006AFF] text-white rounded-lg flex items-center justify-center font-black text-sm">
                            S
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h6 className="font-black text-[11px] text-white">SUNO 가사 다운로더 - 플리마스터</h6>
                              <span className="text-[8px] bg-[#006AFF]/10 text-[#006AFF] font-mono px-1 rounded">1.0.0</span>
                            </div>
                            <p className="text-[9px] text-white/50 mt-0.5">PLYSRT, TXT파일 다운로드 도구</p>
                            
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                              <span className="text-[8px] text-white/30">ID: ecknpaj...mld</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[8px] text-green-400 font-bold">활성화됨</span>
                                <div className="w-6 h-3 bg-[#006AFF] rounded-full relative">
                                  <div className="absolute right-0.5 top-0.5 w-2 h-2 rounded-full bg-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center text-white/30 h-20">
                          <HelpCircle className="w-5 h-5 mb-1 text-white/20" />
                          <span>압축해제된 확장 프로그램을 로드하면 여기에 표시됩니다.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. WINDOWS FILE EXPLORER MOCK (Step 4 only) */}
                {currentStep === 4 && (
                  <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
                    <div className="w-11/12 bg-[#2d2d30] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col text-[10px]">
                      {/* Window Title */}
                      <div className="bg-[#1e1e1f] px-3 py-1.5 flex justify-between items-center border-b border-white/5">
                        <span className="font-semibold text-white/80">확장 프로그램 디렉터리를 선택합니다.</span>
                        <span className="text-white/40">✕</span>
                      </div>
                      
                      {/* Navigation bar inside Explorer */}
                      <div className="bg-[#2d2d30] px-2 py-1 border-b border-white/5 text-[9px] text-white/50 flex items-center gap-2">
                        <span>내 PC &gt; 다운로드</span>
                      </div>

                      {/* File Grid */}
                      <div className="p-3 grid grid-cols-3 gap-2 bg-[#1e1e1f] min-h-[90px]">
                        <div className="p-1.5 rounded border border-white/5 bg-white/2 opacity-40 flex items-center gap-1">
                          <Folder className="w-3 h-3 text-yellow-500" />
                          <span>Documents</span>
                        </div>
                        <div className="p-1.5 rounded border border-white/5 bg-white/2 opacity-40 flex items-center gap-1">
                          <Folder className="w-3 h-3 text-yellow-500" />
                          <span>Music</span>
                        </div>
                        {/* TARGET FOLDER (sunolyric) */}
                        <div 
                          onClick={() => setSimFolderSelected(true)}
                          className={`p-1.5 rounded border flex items-center gap-1.5 transition-all cursor-pointer ${
                            simFolderSelected 
                              ? 'border-[#006AFF] bg-[#006AFF]/10 text-white font-bold scale-105' 
                              : 'border-white/10 hover:border-white/20 text-white/70'
                          }`}
                        >
                          <Folder className="w-3 h-3 text-yellow-400 fill-yellow-400/20" />
                          <span>sunolyric</span>
                        </div>
                      </div>

                      {/* Folder Select Button area */}
                      <div className="bg-[#2d2d30] p-2 flex justify-between items-center border-t border-white/5">
                        <div className="text-white/60 flex items-center gap-1">
                          <span>폴더:</span>
                          <span className="bg-[#1e1e1f] px-1.5 py-0.5 rounded text-[#006AFF] font-bold">sunolyric</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSimFolderSelected(true);
                              setSimExtensionLoaded(true);
                              setCurrentStep(5);
                            }}
                            className="px-3 py-1 bg-[#006AFF] text-white font-bold rounded cursor-pointer hover:bg-blue-600 active:scale-95 transition-all"
                          >
                            폴더 선택
                          </button>
                          <button className="px-3 py-1 bg-white/10 text-white/70 rounded cursor-pointer">취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SUNO PLAYER LAYOUT (Step 6) */}
                {currentStep === 6 && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">Suno AI 플레이어</span>
                        <span className="text-[9px] text-[#006AFF] bg-[#006AFF]/10 px-1 rounded">ON</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-base shadow">
                          ♬
                        </div>
                        <div>
                          <div className="font-black text-white text-[11px] flex items-center gap-1.5">
                            Jelly Legs (Remastered) 
                            <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1 rounded">v3.5</span>
                          </div>
                          <p className="text-[9px] text-white/40 mt-0.5">Indie Pop, Psychedelic Pop, Neo-Soul</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Simulated visual of entering detail page */}
                    <div className="mt-4 p-3 bg-[#006AFF]/5 border border-dashed border-[#006AFF]/20 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">상세 곡 페이지 이동 완료</div>
                        <p className="text-[9px] text-white/50 mt-0.5">상세화면이어야 가사 추출기가 제대로 활성화됩니다.</p>
                      </div>
                      <div className="w-6 h-6 bg-[#006AFF]/20 text-[#006AFF] rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="bg-white/5 p-2 rounded-lg flex items-center justify-between text-[9px] text-white/50 mt-2">
                      <span>곡 정보 감지 대기중...</span>
                      <Play className="w-3 h-3 text-green-400 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* 4. CHROME PUZZLE EXTENSION POPUP OPEN (Step 7) */}
                {currentStep === 7 && (
                  <div className="w-full h-full relative">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Puzzle className="w-4 h-4 text-blue-400" />
                        <span className="font-bold">확장 프로그램 메뉴</span>
                      </div>
                      <span className="text-[8px] text-white/40">주소창 우측 아이콘</span>
                    </div>

                    {/* Simulating puzzle list dropdown popup */}
                    <div className="absolute right-2 top-10 w-9/12 bg-[#202124] rounded-xl border border-white/10 shadow-2xl p-2.5 z-20">
                      <div className="text-[9px] text-white/40 pb-1.5 mb-2 border-b border-white/5">전체 액세스 허용</div>
                      
                      <div 
                        onClick={() => setCurrentStep(8)}
                        className="p-2 hover:bg-white/5 rounded-lg flex items-center justify-between cursor-pointer border border-[#006AFF]/40 bg-[#006AFF]/5 scale-[1.02] transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#006AFF] text-white rounded text-[10px] font-black flex items-center justify-center">
                            S
                          </div>
                          <span className="font-black text-[10px] text-white">SUNO 가사 다운로더 - 플리마스터</span>
                        </div>
                        <div className="w-4 h-4 text-blue-400 flex items-center justify-center">
                          📌
                        </div>
                      </div>

                      <div className="p-2 hover:bg-white/5 rounded-lg flex items-center justify-between opacity-40 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-purple-500 text-white rounded text-[10px] font-bold flex items-center justify-center">
                            A
                          </div>
                          <span className="text-[10px] text-white">Adobe Acrobat</span>
                        </div>
                        <span className="text-[10px]">📌</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. EXTRACTION AND DOWNLOAD BUTTONS (Step 8) */}
                {currentStep === 8 && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="p-4 bg-gradient-to-b from-[#1c1c24] to-[#121214] rounded-2xl border border-white/10 text-center relative overflow-hidden flex-grow flex flex-col justify-between">
                      {/* Header in Popup */}
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                        <span className="font-bold text-[11px] text-white">Suno 가사 추출기 가동 중</span>
                      </div>
                      <p className="text-[8px] text-white/40 mb-3">Jelly Legs 곡의 싱크 정보 100% 감지 완료</p>

                      {/* Download Buttons Mockup */}
                      <div className="flex justify-center gap-3 my-2">
                        <button 
                          onClick={() => alert("가상 시뮬레이션: SRT 파일 다운로드를 실행합니다.")}
                          className="px-4 py-2.5 bg-[#006AFF] hover:bg-blue-600 text-white font-bold text-[11px] rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" /> SRT 다운로드
                        </button>
                        <button 
                          onClick={() => alert("가상 시뮬레이션: TXT 파일 다운로드를 실행합니다.")}
                          className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-[11px] rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
                        >
                          <FileDown className="w-3.5 h-3.5" /> TXT 다운로드
                        </button>
                      </div>

                      {/* Status indicator */}
                      <div className="mt-3 p-1.5 bg-white/5 rounded-lg text-[9px] text-white/60 leading-relaxed text-left flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-[#006AFF]" />
                        <span>곡 재생을 누른 채 버튼을 누르면 다운로드 폴더로 자동 다운로드됩니다.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback info card at bottom of simulator viewport */}
                <div className="mt-auto bg-white/5 p-2 rounded-xl border border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#006AFF]" />
                    <span className="text-[9px] text-white/60 font-semibold">설치 및 테스트 진행도</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#006AFF] font-bold">
                    {Math.round((currentStep / 8) * 100)}% 완료
                  </span>
                </div>

              </div>

              {/* Bottom bar with hints */}
              <div className="bg-[#202124] px-4 py-3 border-t border-[#2d2e30] flex justify-between items-center text-[10px] text-white/40">
                <span>실제 크롬 브라우저와 동일한 화면 구성을 모사하였습니다.</span>
                <span className="font-mono text-[#006AFF] font-bold">PLYMASTER</span>
              </div>

            </div>

          </div>

        </div>

        {/* Detailed FAQ / Manual Section Footer */}
        <div className="mt-20 glass-card border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-r from-slate-950/40 to-[#121212]/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#006AFF]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center">자주 묻는 질문 (FAQ)</h3>
            
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
                <h4 className="font-bold text-base text-[#006AFF] mb-2">Q. '압축해제된 확장 프로그램을 로드' 버튼이 안 보여요.</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  확장 프로그램 관리 페이지 우측 상단에 있는 <strong>'개발자 모드'</strong> 스위치가 반드시 켜져(ON) 있어야 해당 버튼이 생성됩니다. 스위치가 켜졌는지 다시 한번 확인해 주세요.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
                <h4 className="font-bold text-base text-[#006AFF] mb-2">Q. '매니페스트 파일이 없거나 읽을 수 없습니다' 오류가 뜹니다.</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  다운로드 받은 <code>sunolyric.zip</code> 파일의 압축이 완벽하게 풀렸는지 확인해 주세요. 또한 크롬에서 폴더 선택 시 폴더 '안'으로 들어가서 선택하지 말고, <code>sunolyric</code> 이라는 <strong>최상위 폴더 자체를 단 한번만 클릭</strong>하고 '폴더 선택'을 실행해야 정상 로드됩니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
                <h4 className="font-bold text-base text-[#006AFF] mb-2">Q. 플레이마스터 스튜디오(Plymaster Studio) 연동 방법이 궁금합니다.</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  다운로드한 <strong>가사 자막 파일(SRT)</strong>을 가져온 <strong>음원 파일(MP3/WAV 등)</strong>과 <strong>100% 동일한 이름</strong>으로 바꾼 뒤 동일한 폴더에 넣어주세요. Plymaster Studio 프로그램에서 음원을 불러올 때 자막 파일이 자동 인식되어 초고속 가사 비디오가 완성됩니다.
                </p>
              </div>
            </div>

            {/* Back Button inside box */}
            <div className="text-center mt-12">
              <button 
                onClick={() => {
                  setView('hero');
                  safeScrollToTop();
                }}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 transition-all text-sm inline-flex items-center gap-2 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 설명 완료, 메인 화면으로 가기
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
