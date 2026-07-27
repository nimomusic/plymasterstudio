import React, { useState } from 'react';
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
  Radio 
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

interface ManualSectionProps {
  setView: (view: 'hero' | 'pricing' | 'manual') => void;
}

const ManualSection: React.FC<ManualSectionProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tabs = [
    { id: 'part1', label: 'Part 1. 플레이리스트 비디오 제작', icon: <Film className="w-5 h-5" /> },
    { id: 'part2', label: 'Part 2. 부록 A (다중 작업 & 가사 싱크)', icon: <Layers className="w-5 h-5" /> },
    { id: 'part3', label: 'Part 3. 부록 B (실시간 스트리밍 송출)', icon: <Tv className="w-5 h-5" /> },
  ] as const;

  return (
    <section className="relative pt-32 pb-24 px-4 md:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('hero')}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full border border-[#006AFF]/30 bg-[#006AFF]/10 text-[#006AFF] text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                사용자 가이드북
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Plymaster Studio <span className="gradient-text">사용자 매뉴얼</span>
              </h2>
            </div>
          </div>
          <a
            href="https://raw.githubusercontent.com/nimomusic/plymasterstudio/main/Plymaster%20Studio%20manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="md:self-end px-6 py-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all flex items-center gap-2 justify-center cursor-pointer"
          >
            <FileText className="w-5 h-5 text-[#006AFF]" />
            매뉴얼 PDF 다운로드
          </a>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold transition-all text-sm md:text-base flex-1 ${
                activeTab === tab.id 
                  ? 'bg-[#006AFF] text-white shadow-lg shadow-[#006AFF]/20' 
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
        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              setView('hero');
              safeScrollToTop();
            }}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 transition-all font-sans text-sm inline-flex items-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            메인 페이지로 돌아가기
          </button>
        </div>

      </div>
    </section>
  );
};

export default ManualSection;
