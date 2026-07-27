import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Film, 
  Sliders, 
  Volume2, 
  Music, 
  ListMusic, 
  Tv, 
  Cpu, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  FileText, 
  Compass, 
  CloudRain, 
  Type as TypeIcon, 
  ListOrdered, 
  Clock, 
  Copy, 
  Check, 
  Radio,
  Printer,
  Wand2,
  Target,
  Bot,
  Image as ImageIcon,
  ShieldCheck,
  Terminal,
  Download,
  Zap
} from 'lucide-react';
import { AppViewType } from '../types';

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

interface ManualSectionProps {
  setView: (view: AppViewType, manualTab?: 'studio' | 'factory') => void;
  initialMode?: 'studio' | 'factory';
}

const ManualSection: React.FC<ManualSectionProps> = ({ setView, initialMode }) => {
  const [manualMode, setManualMode] = useState<'studio' | 'factory'>(initialMode || 'studio');
  const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3' | 'fact1' | 'fact2' | 'fact3' | 'fact4'>(
    initialMode === 'factory' ? 'fact1' : 'part1'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialMode) {
      setManualMode(initialMode);
      setActiveTab(initialMode === 'factory' ? 'fact1' : 'part1');
    }
  }, [initialMode]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const studioTabs = [
    { id: 'part1', label: 'Part 1. 플레이리스트 비디오 제작', icon: <Film className="w-5 h-5" /> },
    { id: 'part2', label: 'Part 2. 부록 A (다중 작업 & 가사 싱크)', icon: <Layers className="w-5 h-5" /> },
    { id: 'part3', label: 'Part 3. 부록 B (실시간 스트리밍 송출)', icon: <Tv className="w-5 h-5" /> },
  ] as const;

  const factoryTabs = [
    { id: 'fact1', label: '1. 인증 & AI 설정', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'fact2', label: '2. 테마(.pmtheme) 기획', icon: <Target className="w-5 h-5" /> },
    { id: 'fact3', label: '3. Suno 자동 인식 & 생산', icon: <Bot className="w-5 h-5" /> },
    { id: 'fact4', label: '4. 썸네일 & 영상 제목 카피', icon: <ImageIcon className="w-5 h-5" /> },
  ] as const;

  const currentTabs = manualMode === 'studio' ? studioTabs : factoryTabs;

  return (
    <section className="relative pt-32 pb-24 px-4 md:px-6 min-h-screen">
      {/* Print-friendly styles */}
      <style>{`
        @media print {
          body, html, main, section, div {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          nav, footer, button, .no-print {
            display: none !important;
          }
          .glass-card {
            border: 1px solid #dddddd !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
            margin-bottom: 24px !important;
            padding: 24px !important;
          }
          h1, h2, h3, h4, h5, p, span, strong, code {
            color: #000000 !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Product Mode Toggle (Studio vs Factory Manual) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-black/40 p-2 rounded-2xl border border-white/10 no-print">
          <button
            onClick={() => { setManualMode('studio'); setActiveTab('part1'); }}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              manualMode === 'studio'
                ? 'bg-gradient-to-r from-[#006AFF] to-blue-600 text-white shadow-lg shadow-[#006AFF]/25'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Film className="w-5 h-5 text-[#006AFF]" />
            <span>🎬 Plymaster Studio (영상 제작) 매뉴얼</span>
          </button>
          <button
            onClick={() => { setManualMode('factory'); setActiveTab('fact1'); }}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              manualMode === 'factory'
                ? 'bg-gradient-to-r from-[#006AFF] via-[#00B2FF] to-cyan-400 text-white shadow-lg shadow-[#00B2FF]/25 scale-[1.01]'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#00B2FF]" />
            <span>✨ Plymaster Factory (음악 대량공장) 매뉴얼</span>
          </button>
        </div>

        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView(manualMode === 'factory' ? 'factory' : 'hero')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all group no-print cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full border border-[#006AFF]/30 bg-[#006AFF]/10 text-[#006AFF] text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                {manualMode === 'studio' ? '스튜디오 공식 가이드북' : '팩토리 공식 가이드북'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Plymaster {manualMode === 'studio' ? 'Studio' : 'Factory'} <span className="bg-gradient-to-r from-[#006AFF] to-[#00B2FF] bg-clip-text text-transparent">사용자 매뉴얼</span>
              </h2>
            </div>
          </div>

          {manualMode === 'studio' ? (
            <a
              href="https://raw.githubusercontent.com/nimomusic/plymasterstudio/main/Plymaster%20Studio%20manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="md:self-end px-6 py-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-2 justify-center cursor-pointer no-print"
            >
              <FileText className="w-5 h-5 text-[#006AFF]" />
              스튜디오 PDF 다운로드
            </a>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 md:self-end no-print">
              <button
                onClick={() => window.print()}
                className="px-6 py-3.5 bg-gradient-to-r from-[#006AFF] to-[#00B2FF] hover:brightness-110 active:scale-95 text-white font-bold rounded-xl transition-all flex items-center gap-2 justify-center cursor-pointer shadow-lg shadow-[#006AFF]/20"
              >
                <Printer className="w-5 h-5" />
                🖨️ 팩토리 PDF 저장 / 인쇄하기
              </button>
            </div>
          )}
        </div>

        {/* PDF Guide Notice Box for Factory */}
        {manualMode === 'factory' && (
          <div className="mb-8 p-5 bg-gradient-to-r from-cyan-950/40 via-[#006AFF]/15 to-purple-950/40 rounded-2xl border border-[#00B2FF]/30 flex items-start gap-4 no-print animate-[fadeIn_0.3s_ease-out]">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-base font-bold text-cyan-300 mb-1">팩토리 고화질 PDF 설명서 저장 가이드</h4>
              <p className="text-sm text-white/70 leading-relaxed break-keep">
                상단의 <strong className="text-white">'🖨️ 팩토리 PDF 저장 / 인쇄하기'</strong> 버튼을 누른 후, 인쇄 창의 <strong className="text-cyan-300 underline">대상(Destination)을 'PDF로 저장(Save as PDF)'</strong>으로 변경하세요. 
                불필요한 버튼과 테두리가 자동 제거된 A4 규격의 인쇄용 클린 PDF 설명서 파일이 즉시 컴퓨터에 저장됩니다!
              </p>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-12 no-print">
          {currentTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold transition-all text-sm md:text-base flex-1 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#006AFF] to-[#00B2FF] text-white shadow-lg shadow-[#006AFF]/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span className="break-keep">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contents Area */}
        <div className="space-y-16">
          {/* ========================================================================= */}
          {/* ======================= FACTORY MANUAL CHAPTERS ======================= */}
          {/* ========================================================================= */}

          {activeTab === 'fact1' && (
            <div className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
              <div className="border-l-4 border-[#00B2FF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#00B2FF] tracking-wider uppercase font-mono">Chapter 1</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">🚀 라이선스 인증 & 초기 AI 설정 (Setup & Auth)</h3>
              </div>

              {/* 01. 하드웨어 인증 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B2FF]/10 blur-2xl rounded-full pointer-events-none" />
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    01
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      PMCS 하드웨어 보안 인증 <span className="text-xs text-cyan-300 font-mono py-1 px-2.5 border border-cyan-500/20 rounded-full bg-cyan-500/10">32-Bit Encryption</span>
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      Plymaster Factory는 안전한 음악 기획 데이터 보호를 위해 사용자 PC의 고유 하드웨어 ID(MAC/UUID)를 기반으로 작동합니다.
                      최초 실행 시 기기 등록 절차가 진행되며, 비인가 PC로의 무단 복제를 원천 방지하여 정품 사용자의 권리를 보호합니다.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white block mb-3">🛡️ 보안 인증 작동 순서</span>
                    <ol className="text-sm text-white/60 space-y-2.5 leading-relaxed">
                      <li>1. <code className="text-[#00B2FF] bg-white/10 px-1 rounded">PlyMaster.Studio.Setup.exe</code> 파일 다운로드 후 실행</li>
                      <li>2. 프로그램 기동 시 시스템 고유 하드웨어 시리얼 자동 검증</li>
                      <li>3. 정품 인증 완료 시 메인 대시보드 및 AI 프로듀서 엔진 활성화</li>
                    </ol>
                  </div>

                  <div className="p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
                    <div>
                      <span className="text-sm font-bold text-amber-300 block mb-2">⚠️ 'Windows의 PC보호' 파란 창 해결 방법</span>
                      <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed break-keep">
                        새로 릴리즈된 실행 파일 특성상 Windows Defender 스마트 스크린이 뜰 수 있습니다. <br />
                        창 본문의 <strong className="underline font-bold text-white">'추가 정보'</strong> 글자를 클릭하시면 아래에 <strong className="underline font-bold text-white">'실행'</strong> 버튼이 나타나며, 클릭 즉시 안전하게 실행됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 02. Gemini API Key */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    02
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      Gemini API Key 발급 및 입력 <span className="text-xs text-purple-300 font-mono py-1 px-2.5 border border-purple-500/20 rounded-full bg-purple-500/10">Google AI Studio</span>
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      테마별 맞춤 작사와 유튜브 마케팅 카피 생성을 위해 Google의 강력한 AI 엔진인 Gemini API가 사용됩니다. 
                      상단의 <code className="text-[#00B2FF] bg-white/10 px-1 rounded">Gemini API Key</code> 입력란에 발급받은 키를 넣고 저장하면 로컬 PC에 AES 방식으로 암호화 저장됩니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 mt-6 space-y-4">
                  <h5 className="font-bold text-base text-white">🔑 무료 API Key 1분 발급 튜토리얼:</h5>
                  <div className="grid sm:grid-cols-3 gap-4 text-xs md:text-sm text-white/70">
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <strong className="text-[#00B2FF] block mb-1">Step 1. AI Studio 접속</strong>
                      <span>aistudio.google.com 에 구글 계정으로 로그인합니다.</span>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <strong className="text-[#00B2FF] block mb-1">Step 2. Get API Key 클릭</strong>
                      <span>좌측 메뉴의 'Get API Key' → 'Create API Key'를 누릅니다.</span>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <strong className="text-[#00B2FF] block mb-1">Step 3. 팩토리에 입력</strong>
                      <span>복사된 문자열을 팩토리 상단 키 입력창에 붙여넣고 Enter를 칩니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fact2' && (
            <div className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
              <div className="border-l-4 border-[#00B2FF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#00B2FF] tracking-wider uppercase font-mono">Chapter 2</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">🎨 테마 파일(.pmtheme) 등록 & 벤치마킹 설정</h3>
              </div>

              {/* 03. 테마 파일 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    03
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      슬롯형 테마 파일(.pmtheme) 불러오기 <span className="text-xs text-emerald-300 font-mono py-1 px-2.5 border border-emerald-500/20 rounded-full bg-emerald-500/10">Zero AI Slop Engine</span>
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      팩토리의 핵심은 음악 장르와 무드가 완벽히 정제된 <strong className="text-white">'.pmtheme' 테마 패키지</strong>입니다.
                      상단 메뉴의 <code className="text-[#00B2FF] bg-white/10 px-1 rounded">파일 &gt; 테마 파일 불러오기</code>를 통해 원하는 테마를 로드하면 선택 목록에 자동으로 추가됩니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-[#006AFF]/15 to-[#00B2FF]/15 border border-[#00B2FF]/30 rounded-2xl mt-6">
                  <h5 className="font-bold text-base text-cyan-300 mb-2">🎯 벤치마킹 SOP 작사 엔진 작동 원리:</h5>
                  <p className="text-sm text-white/80 leading-relaxed mb-4 break-keep">
                    단순히 AI에게 "재즈 음악 만들어줘"라고 명령하지 않습니다. 각 테마 슬롯 내부에는 해당 장르를 대표하는 글로벌 아티스트 풀(Pool)과 곡 구조 규격이 내장되어 있습니다. <br />
                    특히 <strong className="text-white">'coffee', 'neon', 'shadows', 'echo', 'whispers'</strong> 등 AI 가사에서 상투적으로 남발되는 30여 개의 클리셰 단어를 실시간 금지어 필터로 차단하여 인간 프로듀서 수준의 세련된 가사를 작성합니다.
                  </p>
                </div>
              </div>

              {/* 04. 곡 수 및 대기 시간 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    04
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      제작 곡 수 및 안전 대기 시간 설정
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      한 번에 만들고자 하는 목표 트랙 수를 지정합니다 (예: 10곡). Suno AI 서버의 429 과부하 오류(Too Many Requests)나 무료 사용량 일시 제한을 막기 위해 스마트 대기 쿨타임 로직이 탑재되어 있습니다.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white block mb-2">⏱️ 스마트 쿨타임 시스템</span>
                    <p className="text-xs text-white/60 leading-relaxed break-keep">
                      기본적으로 <strong className="text-[#00B2FF]">3곡(6개 트랙) 생성 시마다 210초(3분 30초) 동안 자동 휴식</strong>합니다. 
                      이 대기 시간을 통해 Suno 서버 차단을 피하고 밤새 100곡 이상의 대량 작업을 안전하게 완수할 수 있습니다.
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white block mb-2">⚙️ 대기 시간 설정 변경</span>
                    <p className="text-xs text-white/60 leading-relaxed break-keep">
                      상단 메뉴 <code className="text-white bg-white/10 px-1 rounded">도구 &gt; 자동화 설정</code>에서 본인의 Suno 유료 플랜(Pro/Premier) 환경에 맞게 대기 시간과 한계 곡 수를 자유롭게 커스텀 변경할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fact3' && (
            <div className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
              <div className="border-l-4 border-[#00B2FF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#00B2FF] tracking-wider uppercase font-mono">Chapter 3</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">🤖 Suno UI 좌표 인식 & 원클릭 연동 생산</h3>
              </div>

              {/* 05. 좌표 자동 인식 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    05
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      Suno UI 좌표 자동 인식 (Auto Detect) <span className="text-xs text-blue-300 font-mono py-1 px-2.5 border border-blue-500/20 rounded-full bg-blue-500/10">OpenCV Vision</span>
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      웹 브라우저(크롬, 엣지 등)로 Suno AI 생성 페이지(<code className="text-[#00B2FF]">suno.com/create</code>)를 띄워둔 상태에서 
                      팩토리 인터페이스의 <strong className="text-purple-300">'🔍 Suno 좌표 자동 인식'</strong> 버튼을 클릭하세요.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-black/50 border border-white/10 rounded-2xl mt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span>⚡ OpenCV 1초 초고속 매칭 프로세스:</span>
                    <span>AUTO-CALIBRATION ACTIVE</span>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">1. Lyrics 창</strong>
                      <span className="text-white/40">가사 입력부 인식</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">2. Style 창</strong>
                      <span className="text-white/40">음악 장르/태그 인식</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">3. Title 창</strong>
                      <span className="text-white/40">곡 제목 입력부 인식</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <strong className="text-white block mb-1">4. Create 버튼</strong>
                      <span className="text-white/40">최종 생성 버튼 인식</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 pt-2 break-keep">
                    💡 만약 모니터 해상도 배율이나 다크/라이트 모드 차이로 인식이 실패할 경우, <strong className="text-white">'수동 설정(Manual Setup)'</strong> 버튼을 눌러 각 입력창을 마우스로 한 번씩 클릭해 주면 즉시 좌표가 고정됩니다.
                  </p>
                </div>
              </div>

              {/* 06. 통합 자동화 시작 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    06
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                      🚀 통합 자동화 프로세스 기동 & 프로듀서 노트
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      모든 준비가 끝났다면 하단의 파란색 <strong className="text-white">'🚀 통합 자동화 프로세스 시작'</strong> 버튼을 클릭하세요!
                      이후부터는 사용자가 마우스를 건드리지 않아도 팩토리가 알아서 다음 루프를 무한 수행합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-6 text-sm text-white/70">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3">
                    <span className="text-cyan-400 font-bold font-mono">Step 1.</span>
                    <span>AI 프로듀서가 테마에 맞는 가사, 스타일 태그, 제목을 실시간 기획하여 프로듀서 노트 팝업으로 보여줍니다.</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3">
                    <span className="text-cyan-400 font-bold font-mono">Step 2.</span>
                    <span>기획된 데이터를 JSON 스크립트로 백업한 뒤, Suno 창의 입력칸을 자동 클릭하고 클립보드에 붙여넣습니다.</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3">
                    <span className="text-cyan-400 font-bold font-mono">Step 3.</span>
                    <span>Suno의 'Create' 버튼을 클릭하여 음원 생성을 시작하고, 안전 쿨타임 카운트다운에 들어갑니다.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fact4' && (
            <div className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
              <div className="border-l-4 border-[#00B2FF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#00B2FF] tracking-wider uppercase font-mono">Chapter 4</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">📸 유튜브 썸네일 & 바이럴 영상 제목 자동 제작</h3>
              </div>

              {/* 07. 썸네일/제목 제작 도구 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#00B2FF]">
                    07
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      참조 이미지 분석 & 바이럴 제목 3종 추출 <span className="text-xs text-pink-300 font-mono py-1 px-2.5 border border-pink-500/20 rounded-full bg-pink-500/10">YouTube Marketing</span>
                    </h4>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed break-keep">
                      음악만 좋아서는 유튜브에서 조회수를 터뜨릴 수 없습니다. 상단 메뉴 <code className="text-[#00B2FF] bg-white/10 px-1 rounded">도구 &gt; 썸네일/제목 제작</code>을 실행하세요!
                      평소 참고하고 싶었던 다른 유튜브 영상의 썸네일이나 풍경 사진을 첨부하면 AI 마케터가 즉시 분석을 시작합니다.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white block mb-2">🔥 클릭률(CTR) 극대화 제목 3종</span>
                    <p className="text-xs text-white/60 leading-relaxed break-keep">
                      이미지 속 장소(카페, 드라이브, 새벽방), 계절감, 색감을 음악 장르와 결합하여 시청자의 감성을 자극하는 제목 3가지를 제시합니다. 각 제목 오른쪽의 <strong className="text-[#00B2FF]">'복사'</strong> 버튼을 눌러 바로 유튜브 업로드에 쓰세요!
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white block mb-2">🎨 나노 바나나(Nano Banana) 프롬프트</span>
                    <p className="text-xs text-white/60 leading-relaxed break-keep">
                      미드저니(Midjourney)나 스테이블 디퓨전에서 고화질 16:9 썸네일을 뽑을 수 있는 최상급 영어 프롬프트를 자동 작성합니다. 
                      특히 이미지 내에 글자가 깨져서 출력되는 현상을 막기 위해 <code className="text-pink-300">No typography, No letters</code> 제어 명령을 자동으로 삽입합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips for Youtube Growth */}
              <div className="p-8 bg-gradient-to-r from-purple-900/30 via-black to-[#006AFF]/20 rounded-[2.5rem] border border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h5 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
                      🌟 유튜브 채널 급성장을 위한 Plymaster 워크플로우 팁
                    </h5>
                    <p className="text-sm text-white/70 leading-relaxed break-keep">
                      1. <strong className="text-cyan-300">Factory</strong>로 테마 곡 10~15곡(약 45분~1시간 분량)을 취침 시간에 원클릭 자동 생산합니다. <br />
                      2. 다음날 아침 <strong className="text-cyan-300">Studio</strong>에서 생성된 음원 폴더를 드래그 앤 드롭하고, 자동 LUFS 평준화(-14 LUFS) 및 1080p 마스터 영상을 렌더링합니다. <br />
                      3. 마지막으로 Factory의 <strong className="text-pink-300">썸네일/제목 도구</strong>로 추출한 바이럴 제목과 타임스탬프를 유튜브 설명란에 붙여넣으면 고퀄리티 플레이리스트 업로드가 10분 만에 끝납니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}

          {activeTab === 'part1' && (
            <div className="space-y-12">
              <div className="border-l-4 border-[#006AFF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#006AFF] tracking-wider uppercase font-mono">Part 1</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">플레이리스트 비디오 제작 (Core Engine)</h3>
              </div>

              {/* 01. 배경 제어 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006AFF]/5 blur-2xl rounded-full pointer-events-none" />
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#006AFF]">
                    01
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      배경 제어 <span className="text-xs text-white/40 font-mono py-1 px-2.5 border border-white/10 rounded-full bg-white/5">Auto Loop Video</span>
                    </h4>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed break-keep">
                      영상 전체의 시각적 바탕이 되는 이미지나 비디오 소스(<code className="text-[#006AFF] bg-white/5 px-1.5 py-0.5 rounded">jpg</code>, <code className="text-[#006AFF] bg-white/5 px-1.5 py-0.5 rounded">png</code>, <code className="text-[#006AFF] bg-white/5 px-1.5 py-0.5 rounded">mp4</code>)를 드래그 앤 드롭으로 간편하게 추가합니다.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-sm font-bold text-white/80 block mb-3">🎞️ 지원 가능한 포맷</span>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      순서대로 완벽하게 반복해서 오토 무한 루프 재생이 구현됩니다.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['jpg', 'jpeg', 'png', 'bmp', 'webp', 'mp4', 'mov', 'avi', 'mkv'].map((f) => (
                        <span key={f} className="text-xs bg-[#006AFF]/10 text-[#006AFF] border border-[#006AFF]/20 px-2.5 py-1 rounded-md font-mono font-bold uppercase">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-sm font-bold text-white/80 block mb-3">✨ 오프닝 & 날씨 감성 효과</span>
                      <p className="text-sm text-white/50 leading-relaxed break-keep">
                        시작 시 아이덴티티를 심어주는 <strong className="text-white">인트로 영상 1회 재생 옵션</strong>과 감성을 극대화하는 <strong className="text-white">날씨 효과 (눈, 비, 꽃잎)</strong>의 하강 밀도와 속도를 드래그 한 번으로 제어 가능합니다.
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <span className="text-xs bg-white/5 text-white/80 px-2.5 py-1 border border-white/10 rounded-md">눈 (원형/결정)</span>
                      <span className="text-xs bg-white/5 text-white/80 px-2.5 py-1 border border-white/10 rounded-md">꽃잎 효과</span>
                      <span className="text-xs bg-white/5 text-white/80 px-2.5 py-1 border border-white/10 rounded-md">비 효과</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 02. 커버 문구 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#006AFF]">
                    02
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      커버 문구 <span className="text-xs text-white/40 font-mono py-1 px-2.5 border border-white/10 rounded-full bg-white/5">Smart Cover Text</span>
                    </h4>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed break-keep">
                      화면 중앙에 노출되는 메인 앨범 아트워크 및 타이틀을 완벽하게 제어합니다. 활성화 후 원하는 정밀 폰트 종류, 컬러 피커를 통한 세밀한 색상값, 글자 크기(<code className="text-[#006AFF] bg-white/5 px-1 py-0.5 rounded">px</code>)를 취향에 맞춰 맞춤 구성할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-[#006AFF]/5 border border-[#006AFF]/10 rounded-2xl mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006AFF]/10 flex items-center justify-center text-[#006AFF]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">가로 가운데 자동 정렬 스냅 지원</span>
                      <p className="text-xs text-white/50 mt-0.5 break-keep">위치가 다소 왜곡되었을 때 [가로 가운데 정렬] 스냅 버튼을 클릭하면 절대 좌표로 정교하게 자동 보정됩니다.</p>
                    </div>
                  </div>
                  <span className="text-xs bg-[#006AFF]/10 text-[#006AFF] border border-white/5 font-mono font-bold rounded-lg px-3 py-1.5 uppercase shrink-0">Auto-Centering Snap</span>
                </div>
              </div>

              {/* 03 & 04. 곡 이름 자동 표시 & 가사 자막 연동 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* 03. 곡 이름 자동 표시 */}
                <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-[#006AFF]">
                        03
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white">곡 이름 자동 표시</h4>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 break-keep">
                      음원이 다음 트랙으로 전환될 때마다 해당 오디오 파일명(<em className="text-white font-mono not-italic text-xs bg-white/5 px-1.5 py-0.5 border border-white/5 rounded">예: 01_Midnight_Lo-fi.mp3</em>)에서 순수 제목 정보만을 스마트하게 추출합니다. 일일이 텍스트를 입력하는 지루한 과정 없이, 가장 최적의 타이밍에 세련된 형태의 화면 오버레이 애니메이션으로 표시해 줍니다.
                    </p>
                  </div>
                  <span className="text-xs text-[#006AFF] font-mono font-semibold tracking-wider uppercase">File Name Processing Engine</span>
                </div>

                {/* 04. 가사 자막 연동 및 AI 의역 시스템 */}
                <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#006AFF]/10 blur-xl rounded-full" />
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-[#006AFF]">
                        04
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-1.5">
                        가사 자막 & AI 의역 <Sparkles className="w-4 h-4 text-[#006AFF]" />
                      </h4>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 break-keep">
                      SUNO에 입력한 가사 그대로 표시하여 오탈자가 없이 자막 데이터를 화면에 출력합니다. <strong>Gemini API 연동 문맥 기반 인공지능 번역 기능</strong>을 탑재하여 자막 내용을 <strong className="text-white">음악 분위기에 최고조로 매칭되는 감성적인 구어체 번역 결과물</strong>로 완성시킵니다. 해당 SRT 파일은 2개 국어를 동시에 포함하여 깔끔한 2줄 오버레이 자막으로 영상에 새겨집니다.
                    </p>
                  </div>
                  <span className="text-xs text-[#006AFF] font-mono font-semibold tracking-wider uppercase">Gemini-Powered Smart Translate</span>
                </div>
              </div>

              {/* Magnet UI Guide Grid Accent */}
              <div className="p-8 bg-gradient-to-r from-[#006AFF]/20 via-[#006AFF]/5 to-transparent rounded-[2rem] border border-[#006AFF]/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🧲</span>
                    <div>
                      <h5 className="font-bold text-lg text-white mb-1">드래그 앤 드롭 자석 레이아웃 시스템 (Magnet Layout)</h5>
                      <p className="text-sm text-white/50 leading-relaxed break-keep">
                        미리보기 실시간 편집 화면 상에서 커버 문구, 곡 제목, 자막 가사, 비주얼라이저 스펙트럼 바의 정확한 화면상 위치를 마우스 조작을 통해 극도로 자유롭게 이동 및 배치할 수 있습니다. 캔버스의 가로/세로 정중앙 자석 가이드 라인에 축이 근접할 때 하늘색 마그네틱 자석 라인이 환상적으로 작동하여 오차 없이 칼각으로 자동 부착 정렬됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 05. 오디오 스펙트럼 효과 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-[#006AFF]">
                    05
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      오디오 스펙트럼 효과 <span className="text-xs text-[#006AFF] font-mono py-1 px-2.5 border border-[#006AFF]/20 rounded-full bg-[#006AFF]/10">Audio Visualizer</span>
                    </h4>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed break-keep">
                      재생 사운드의 실제 주파수 대역 및 파형에 매 순간마다 다이내믹 피드백을 실시간으로 감응하는 시각 비주얼라이저입니다. 곡조의 깊이와 장면에 조화롭게 세팅할 수 있도록 세 가지 핵심 고유 모드를 폭넓게 지원합니다.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { name: 'Animation (단순 루프)', desc: '지형이나 춤추는 듯한 루프 궤적을 일정하게 생성하는 패턴.' },
                    { name: 'Bar (클래식 막대)', desc: '클래식 이퀄라이저 디자인 형태로 비트에 역동적으로 반응.' },
                    { name: 'Line (부드러운 곡선 파형)', desc: '미세 오디오 신호에 따라 파도처럼 일렁이는 고운 라인 연출.' }
                  ].map((spec, i) => (
                    <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[#006AFF] font-bold text-sm md:text-base mb-1.5">{spec.name}</div>
                      <p className="text-xs text-white/40 leading-relaxed break-keep">{spec.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-white/5 border border-dashed border-white/10 rounded-2xl mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-xs md:text-sm text-white/50">
                    💡 <strong className="text-white">나만의 연출 옵션:</strong> 가로 너비/높이 크기는 물론 막대 개수를 정밀 제어할 수 있으며, <span className="text-[#006AFF] font-bold">‘레인보우’ 그라데이션</span>과 <span className="text-white font-bold">‘잔상 효과 (Motion blur / persistence decay)’</span>를 활성화해 몽환을 극치로 끌어올린 영상미를 만들어낼 수 있습니다.
                  </div>
                </div>
              </div>

              {/* 06. 스마트 선곡 모드 & 07. 재생시간 및 해상도 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* 06. 스마트 선곡 모드 */}
                <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-[#006AFF]">
                        06
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white">스마트 선곡 모드</h4>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 break-keep">
                      비디오에 배치될 음원들의 구성 규칙을 고도로 커스터마이징하고 큐레이팅합니다.
                    </p>
                    <ul className="space-y-3.5 mb-6 text-xs md:text-sm text-white/60">
                      <li className="flex gap-2"><strong className="text-white shrink-0">1. 수동 배치:</strong> 전 트랙리스트를 사용자가 직접 원하는 순서 그대로 완벽히 리드하며 설계합니다.</li>
                      <li className="flex gap-2"><strong className="text-white shrink-0">2. 첫 3곡 지정:</strong> 유입률이 최고조에 달하는 최상단 핵심 첫 3곡은 고정 배치하고, 그 이후의 수많은 트랙들은 사운드 풀에서 무작위 자동 결정합니다.</li>
                      <li className="flex gap-2"><strong className="text-white shrink-0">3. 랜덤 모드:</strong> 플레이리스트 음원 풀 안에서 스마트하게 완전 난수 믹싱을 시도합니다.</li>
                    </ul>
                  </div>
                </div>

                {/* 07. 재생시간 및 해상도 설정 */}
                <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-bold text-sm text-[#006AFF]">
                        07
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white">재생시간 & 1080p 해상도</h4>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 break-keep">
                      제작 대상 비디오 파일의 총 러닝타임 목표를 분 단위(<code className="text-[#006AFF] bg-white/5 px-1 py-0.5 rounded">예: 45분, 128분</code>)로 아주 명확히 지정해줄 수 있습니다. 
                      랜덤/첫3곡 모드 실행 시, 입력한 분 단위 목표 시간에 귀신 같이 최적으로 근접하게 전체 마이너 믹스 곡수를 자동 매칭합니다. <strong className="text-white">[전체 반복]</strong>을 선택하여 한 바퀴 재생완료 후 재차 반복시켜 총 러닝타임을 배수로 신속히 연장시킬 수도 있습니다.
                    </p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                      <span className="text-white/40">기본 인코딩 사양:</span>
                      <span className="text-white/80 font-bold font-mono">Full HD 1080p 고화질 고비트레이트</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 08 & 09. 오디오 볼륨 평준화 & 트랙리스트 추출 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-black text-sm text-[#006AFF]">
                        08
                      </div>
                      <h4 className="text-xl font-bold text-white">오디오 볼륨 평준화 (Auto LUFS)</h4>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 break-keep">
                      서로 다른 매체에서 수급되어 곡조 볼륨 크기가 지나치게 들쭉날쭉한 사운드 트랙 원본의 격차를, 유튜브 글로벌 고밀도 오디오 송출 기준 규격 사양인 <strong className="text-white">-14 LUFS</strong> 스케일 값으로 온전히 규격 통일하는 일체형 정규화 특수 알고리즘을 담아 구현했습니다. 
                    </p>
                    <p className="text-xs text-white/30 bg-white/5 p-3 rounded-lg border border-white/5 break-keep">
                      💡 볼륨 사운드를 보다 풍성하고 도드라지게 업하고 싶을 때는 -11 또는 -9 값을 주어 정밀 증폭 타겟을 구성하실 수도 있습니다.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-mono font-black text-sm text-[#006AFF]">
                        09
                      </div>
                      <h4 className="text-xl font-bold text-white">유튜브 타임스탬프 추출</h4>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-5 break-keep">
                      렌더링 인코딩 비디오 합산 처리가 완료되는 즉시, 각 곡의 정확한 타임라인 매칭 타임스탬프를 곧장 텍스트 클립보드 형태로 추출해줍니다.
                    </p>
                    
                    {/* Timestamp Sample Code block with Copy Button */}
                    <div className="relative p-4 bg-black/60 rounded-xl border border-white/5 font-mono text-xs text-white/80">
                      <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-white/5">
                        <span className="text-[10px] text-white/30 lowercase uppercase tracking-wider">Example Timestamp text</span>
                        <button
                          onClick={() => handleCopy(`00:00 01_Midnight_Lo-fi\n03:21 02_Rainy_Neon_Scent\n06:55 03_Cozy_Room_Aura`, 'timestamp')}
                          className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-[10px] text-white/60 hover:text-white transition-all font-sans"
                        >
                          {copiedId === 'timestamp' ? (
                            <>
                              <Check className="w-3 h-3 text-green-500" />
                              복사완료
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              샘플 복사
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-white/40">00:00 <span className="text-white/80">01_Midnight_Lo-fi</span></p>
                      <p className="text-white/40">03:21 <span className="text-[#006AFF] font-bold">02_Rainy_Neon_Scent</span></p>
                      <p className="text-white/40">06:55 <span className="text-white/80">03_Cozy_Room_Aura</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'part2' && (
            <div className="space-y-12">
              <div className="border-l-4 border-[#006AFF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#006AFF] tracking-wider uppercase font-mono">Part 2</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">부록 A. 다중 영상작업 자동화 및 가사 싱크 매칭</h3>
              </div>

              {/* 1. 다중 영상작업 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006AFF]/5 blur-2xl rounded-full pointer-events-none" />
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-white/60">
                      고급 도구 A-1
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
                      다중 영상작업 <span className="text-sm text-[#006AFF] font-mono block sm:inline sm:ml-2">(Batch Setup Workflow)</span>
                    </h4>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 break-keep">
                      작업자가 수면을 취하거나 온전히 부재중인 연장 시간에도 미리 꼼꼼하게 설정된 수많은 프로파일 설정을 읽어들여 <strong className="text-white">무인 가동으로 논스톱 연속 생산 렌더링</strong>을 도맡아 조력하는 하이엔드 인코딩 스케줄러 핵심 유틸리티입니다.
                    </p>
                    
                    <div className="space-y-3.5 text-sm">
                      <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                        <strong className="text-white block mb-1">⚙️ 작동 원리 (Save & Load Setup)</strong>
                        <p className="text-xs text-white/40 break-keep leading-relaxed">
                          메인 화면에 커스텀 설계한 내용을 상단 <code className="text-[#006AFF] bg-white/10 px-1 py-0.5 rounded">파일 - 설정 저장하기</code>를 거쳐 고유의 <code className="text-[#006AFF] bg-white/10 px-1 py-0.5 rounded">.json</code> 파일로 차곡차곡 스택한 뒤, <span className="text-white font-bold">[도구(T)]</span> 메뉴 슬롯을 빌려 한데 로드하고 <span className="text-[#006AFF] font-bold">‘순차 제작 시작’</span>을 격하하면 지치지 않는 논스톱 무인 연속 빌드가 시전됩니다.
                        </p>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                        <strong className="text-[#006AFF] block mb-1">🧹 운용의 핵심 클리닝 마인드</strong>
                        <p className="text-xs text-white/40 break-keep leading-relaxed">
                          하나의 빌드 패스가 종결되어 마감 처리될 때마다, 대용량 비디오 생성으로 유발된 임시 파일 브릿지와 미사용 그래픽 캐시 메모리를 자체 청소 엔진이 <strong className="text-white">자동으로 완벽 청소 릴리즈</strong>하여 수치상의 디렉토리 하드 성능 저하와 충돌 버그를 미연에 원천 차단해 줍니다.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Interface Mockup */}
                  <div className="md:w-[360px] bg-black/40 rounded-3xl border border-white/5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                        <span className="text-xs font-bold text-white">Batch Setup Slot</span>
                        <span className="text-[10px] text-[#006AFF] animate-pulse">● Auto Pilot Active</span>
                      </div>
                      
                      <div className="space-y-2.5">
                        {[
                          { slot: '1. 파일미선택', path: 'JSON 설정 파일 경로', active: true },
                          { slot: '2. 파일미선택', path: 'JSON 설정 파일 경로', active: false },
                          { slot: '3. 파일미선택', path: 'JSON 설정 파일 경로', active: false },
                        ].map((s, idx) => (
                          <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] flex justify-between items-center">
                            <div className="overflow-hidden mr-2">
                              <span className="text-white/40 block font-mono text-[9px]">{s.slot}</span>
                              <span className="text-white/80 block truncate font-mono">{s.path}</span>
                            </div>
                            <span className="text-[10px] bg-white/5 text-white/40 py-1 px-2.5 border border-white/10 rounded">찾기</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-6 py-3.5 bg-[#006AFF] text-white font-bold text-xs md:text-sm rounded-xl hover:bg-blue-600 transition-all">
                      ▶ 순차 제작 시작
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. 가사 탭 싱크 메이커 */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006AFF]/5 blur-2xl rounded-full pointer-events-none" />
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Visual Interface Mockup */}
                  <div className="md:w-[360px] bg-black/40 rounded-3xl border border-white/5 p-6 flex flex-col justify-between order-2 md:order-1">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-5">
                        <div className="flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-[#006AFF]" />
                          <span className="text-xs font-bold text-white">Lyric Sync Maker</span>
                        </div>
                        <span className="text-[10px] bg-[#006AFF]/10 text-[#006AFF] border border-white/5 rounded px-2 font-mono">Live Sync</span>
                      </div>

                      <div className="p-4 bg-[#006AFF]/5 border border-[#006AFF]/10 rounded-2xl mb-5 text-center">
                        <span className="text-[11px] text-white/50 block">음악 실시간 모니터링 청취 중</span>
                        <div className="text-xl font-black text-white my-2 tracking-widest font-mono">03:21</div>
                        <span className="text-[10px] text-white/30 block">[스페이스바] 클릭 시 타임 스냅 저장</span>
                      </div>

                      <div className="space-y-2 border-t border-dashed border-white/10 pt-4">
                        <span className="text-[10px] text-white/40 uppercase font-mono block">Sync Rules</span>
                        <p className="text-[11px] text-white/60 leading-relaxed break-keep">
                          음악 파일과 완전히 동일한 명칭의 원본 <code className="text-white bg-white/10 px-1 rounded font-mono text-[9px]">.txt</code> 파일이 같은 폴더에 함께 대기해야 자동 파싱이 정상 시동됩니다.
                        </p>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 py-3 bg-white/5 hover:bg-[#006AFF] text-white hover:text-white font-bold text-xs md:text-sm border border-white/10 hover:border-[#006AFF] rounded-xl transition-all">
                      자막 파일 싱크 저장 (.srt)
                    </button>
                  </div>

                  <div className="flex-1 order-1 md:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-white/60">
                      고급 도구 A-2
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
                      가사 탭 싱크 메이커 <span className="text-sm text-[#006AFF] font-mono block sm:inline sm:ml-2">(Lyric Sync Master Tool)</span>
                    </h4>
                    <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 break-keep">
                      영상 위에 정확한 타임라인 매칭 흐름 가사를 인장 인쇄하기 위해 극강의 동기 효율을 시전하는 <strong className="text-white">SRT 규격 자막 파일 자동화 제작 시스템</strong>입니다.
                    </p>

                    <div className="space-y-4 text-sm text-white/50 leading-relaxed break-keep">
                      <p>
                        1. <strong className="text-white">가사 정제 필터링</strong>: Suno 등지에서 소싱된 보컬 곡 가사 문장 데이터 전체를 그대로 드래그 복사 입건하면 문장 속의 불필요한 특수 대괄호, 중괄호 노이즈 요소를 순수 필터링 메커니즘을 통해 완벽 소거해주고 깔끔한 순수 가사 줄거리만 단숨에 뽑아줍니다.
                      </p>
                      <p>
                        2. <strong className="text-white">제미나이 AI 보컬 번역 매칭</strong>: 연이어 똑똑한 <strong className="text-white">Gemini API</strong>가 시동 번역을 담당하여 난해한 문장 흐름을 인간 보컬의 라이브 감성을 부드러운 수작업 싱크 구어체로 유기적 변환 처리를 보증합니다.
                      </p>
                      <p>
                        3. <strong className="text-white">스페이스바 터치 동기화</strong>: 멜로디 음악을 실시간 귀로 다정하게 모니터에 담아 청음하면서, 가수가 노래의 첫 소절 소리를 터치하기 시작하는 운명의 정확한 타임 포인트 순간에 키보드 <kbd className="bg-white/10 text-white font-bold border border-white/20 rounded px-1.5 py-0.5 text-xs font-mono">SpaceBar 스페이스바</kbd>를 가볍게 한 번 탁 튕겨 눌러줍니다. 이 한 번의 클릭을 포획하여 밀리초 단위의 극장 정밀 타임코드가 즉각 1:1 바인딩 인장 완료되어 완성도 지존의 <code className="text-[#006AFF] font-mono font-bold font-sans">.srt</code> 파일 스펙으로 고스란히 최종 안치 생성해 냅니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'part3' && (
            <div className="space-y-12">
              <div className="border-l-4 border-[#006AFF] pl-4 mb-4">
                <span className="text-sm font-semibold text-[#006AFF] tracking-wider uppercase font-mono">Part 3</span>
                <h3 className="text-2xl md:text-3xl font-black text-white">부록 B. 유튜브 실시간 스트리밍 송출 제어 (YouTube Live Broadcast Engine)</h3>
              </div>

              {/* Streaming introduction */}
              <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#006AFF]/5 blur-2xl rounded-full pointer-events-none" />
                <div className="max-w-3xl">
                  <span className="text-xs bg-[#006AFF]/10 text-[#006AFF] px-2.5 py-1.5 border border-[#006AFF]/20 rounded-md font-mono font-bold uppercase mb-4 inline-block">Direct RTMP Streaming</span>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed break-keep">
                    열심히 제작이 최종 완정된 무거운 대용량 플레이리스트 완료 영상을, 비대하고 무거운 타사 외부 라이브 인코더 송출 전용 소프트웨어(OBS Studio, Streamlabs 등)를 컴퓨터에 구태여 별도 기동하거나 복잡하게 설치 세팅을 유기할 필요 일절 없이! 
                    오직 <strong className="text-[#006AFF]">PlyMaster 고유의 파워풀한 내부 특화 경량 코어 엔진</strong>을 발판 삼아 유튜브 라이브 송출 서버에 다이렉트 연동을 제공하는 실시간 원스톱 송출 특급 편의 방송 솔루션입니다.
                  </p>
                </div>

                {/* Step-by-Step UI Process */}
                <div className="mt-12">
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    🛠️ 실시간 방송 송출 프로토콜 (Step-by-Step Protocol)
                  </h4>

                  <div className="grid md:grid-cols-5 gap-4 relative">
                    {[
                      { step: '01', title: '스트림 키 획득', desc: '유튜브 스튜디오 라이브 관제실에서 내 채널의 고유 스트림 키를 복사 복사합니다.' },
                      { step: '02', title: '마스킹 입력', desc: '프로그램 내부의 [스트림 키 입력란]에 붙여넣습니다. 개인정보 보장을 위해 완전히 안전하게 자동 마스킹 및 암호화 이중 처리됩니다.' },
                      { step: '03', title: '대상 영상 연결', desc: 'PlyMaster로 생성 완료한 최종 마스터 플레이리스트 비디오 파일(.mp4)을 클릭 지정하여 연동시킵니다.' },
                      { step: '04', title: '규격 최적화', desc: '유튜브 라이브 정교 동기화를 위해 방송 송출 해상도(1080p) 대역에 마중하는 스트리밍 타겟 비트레이트를 정량 인가하여 사전에 점검 조치합니다.' },
                      { step: '05', title: '엔진 기동 송출', desc: '하단의 [실시간 방송 시작] 버튼을 클릭하면 내장 심장 엔진이 급속 시동되어 라이브 송출을 시전합니다. 종료는 [송출 중지]로 마칩니다.' }
                    ].map((step, idx) => (
                      <div key={idx} className="relative p-5 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#006AFF]/30 transition-all">
                        <div>
                          <span className="text-2xl font-mono font-black text-[#006AFF]/20 block mb-2">{step.step}</span>
                          <span className="text-xs md:text-sm font-bold text-white block mb-2 break-keep">{step.title}</span>
                          <p className="text-[11px] text-white/40 leading-relaxed break-keep">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-5 bg-[#006AFF]/10 rounded-2xl border border-dashed border-[#006AFF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs md:text-sm text-white/70 leading-relaxed">
                    🌟 <strong>라이브 모니터링 기능 탑재:</strong> 송출이 진행되는 전체 상황 및 혹시 모를 네트워크 대역 드랍 프레임 발생 현황은 PlyMaster 내부 방송 콘솔의 실시간 상태 메시지 위젯창을 통해 한 눈에 디테일하고 직관적으로 수시 모니터링 점검이 가능해 최고의 송출 안정성을 보유하고 있습니다.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Return Button */}
        <div className="mt-16 text-center no-print">
          <button 
            onClick={() => {
              setView(manualMode === 'factory' ? 'factory' : 'hero');
              safeScrollToTop();
            }}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 transition-all font-sans text-sm inline-flex items-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {manualMode === 'factory' ? '팩토리 메인 페이지로 돌아가기' : '스튜디오 메인 페이지로 돌아가기'}
          </button>
        </div>

      </div>
    </section>
  );
};

export default ManualSection;
