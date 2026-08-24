import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Music, 
  Headphones, 
  Sparkles, 
  Radio, 
  Disc, 
  Layers, 
  Share2, 
  Download,
  Info,
  ExternalLink
} from 'lucide-react';

interface ThemePackMusicProps {
  setView: (view: 'hero' | 'pricing' | 'manual' | 'suno' | 'privacy' | 'terms' | 'refund' | 'themepack') => void;
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genreTag: string;
  description: string;
  bpm: number;
  key: string;
  /* 하이퍼링크넣는 곳: 실제 mp3 파일 또는 스트리밍 링크 URL */
  audioUrl: string;
}

export interface ThemeCategory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  accentColor: string;
  description: string;
  keywords: string[];
  tracks: TrackItem[];
}

// ==================================================================================
// 🎵 [하이퍼링크넣는 곳] 테마팩 트랙 리스트 & 음원 링크 데이터
// 각 곡의 audioUrl 항목에 실제 호스팅된 음원 파일 URL(mp3, wav 등)을 입력하시면 됩니다.
// ==================================================================================
export const THEME_PACKS: ThemeCategory[] = [
  {
    id: 'hiphop',
    title: '감성힙합',
    subtitle: 'Emotional Lofi & Chill Hip-Hop',
    badge: '감성 플레이리스트 인기 1위',
    icon: '☕',
    accentColor: '#006AFF',
    description: '감성힙합, 인스타 느좋 R&B Hip-Hop, 청량 R&B Hip-Hop - 세가지로 구성되어 있는 새벽 감성을 자극하는 따뜻한 피아노 선율, 감각적인 붐뱁 비트와 칠한 멜로디의 감성 힙합 테마팩입니다.',
    keywords: ['#새벽감성', '#로파이', '#피아노루프', '#붐뱁', '#카페BGM'],
    tracks: [
      {
        id: 'hiphop-1',
        title: '미련의 흔적',
        artist: 'Plymaster AI Producer',
        duration: '02:40',
        genreTag: 'Emotional trap',
        description: '감미로운 일렉 피아노로 시작하여 멜로디컬한 보컬 훅이 어우러진  감성 힙합',
        bpm: 85,
        key: 'Mid-tempo',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 1 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: 'https://cdn1.suno.ai/3705bdad-3386-4f5f-b04c-057a868f2f11_lyrics.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/hiphop_01.mp3' */
        // =========================================================
      },
      {
        id: 'hiphop-2',
        title: '따뜻한 라떼와 창가에 비친 기억 (Coffee & Nostalgia)',
        artist: 'Plymaster AI Producer',
        duration: '03:12',
        genreTag: 'Jazz Lofi Beat',
        description: '따스한 재즈 코드 진행과 빈티지 비닐 크랙클 질감의 로파이 트랙',
        bpm: 78,
        key: 'F Maj',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 2 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/hiphop_02.mp3' */
        // =========================================================
      },
      {
        id: 'hiphop-3',
        title: '도심 속 홀로 걷는 밤 (City Lights Walk)',
        artist: 'Plymaster AI Producer',
        duration: '02:55',
        genreTag: 'Melodic Emotional Hip-Hop',
        description: '서정적인 기타 아르페지오와 묵직한 808 베이스가 돋보이는 멜로디 힙합',
        bpm: 90,
        key: 'C Min',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/hiphop_03.mp3' */
        // =========================================================
      },
    ],
  },
  {
    id: 'sleep',
    title: '수면음악',
    subtitle: 'Deep Sleep & Healing Ambient (432Hz)',
    badge: '숙면 유도 & 힐링 앰비언트',
    icon: '🌙',
    accentColor: '#8B5CF6',
    description: '뇌파를 안정시키고 깊은 수면 상태로 인도하는 432Hz 튜닝 앰비언트와 평온한 자연의 소리 테마팩입니다.',
    keywords: ['#깊은수면', '#432Hz', '#스트레스완화', '#명상', '#자연의소리'],
    tracks: [
      {
        id: 'sleep-1',
        title: '깊은 밤 은하수의 자장가 (Galaxy Lullaby - 432Hz)',
        artist: 'Plymaster Sleep Lab',
        duration: '04:20',
        genreTag: 'Deep Delta Ambient',
        description: '마음을 편안하게 가라앉혀주는 432Hz 앰비언트 신스 패드 사운드',
        bpm: 60,
        key: 'D Maj',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 1 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/sleep_01.mp3' */
        // =========================================================
      },
      {
        id: 'sleep-2',
        title: '잔잔한 숲속 빗소리와 명상 (Forest Rain Slumber)',
        artist: 'Plymaster Sleep Lab',
        duration: '03:50',
        genreTag: 'Nature Healing Sound',
        description: '숲속 나뭇잎에 떨어지는 부드러운 빗소리와 따뜻한 드론 사운드',
        bpm: 55,
        key: 'G Maj',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 2 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/sleep_02.mp3' */
        // =========================================================
      },
      {
        id: 'sleep-3',
        title: '포근한 구름 위 수면 여행 (Cozy Cloud Slumber)',
        artist: 'Plymaster Sleep Lab',
        duration: '04:05',
        genreTag: 'Dreaming Piano Ambient',
        description: '느리고 몽환적인 피아노 멜로디와 따스한 공명음의 숙면 트랙',
        bpm: 58,
        key: 'A Maj',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/sleep_03.mp3' */
        // =========================================================
      },
    ],
  },
  {
    id: 'pop',
    title: '빌보드 트렌디팝',
    subtitle: 'Billboard Trendy Pop & Viral Beats',
    badge: '글로벌 차트 스타일 & 바이럴',
    icon: '⚡',
    accentColor: '#EC4899',
    description: '귀에 감기는 강렬한 훅과 현대적인 신스 사운드로 유튜브 쇼츠 및 플레이리스트 바이럴을 유도하는 트렌디 팝 테마팩입니다.',
    keywords: ['#빌보드팝', '#신스웨이브', '#쇼츠바이럴', '#드라이브', '#트렌디'],
    tracks: [
      {
        id: 'pop-1',
        title: 'Drive Me Crazy (feat. Neon Sunset)',
        artist: 'Plymaster Hit Factory',
        duration: '02:40',
        genreTag: 'Synthpop & Dance',
        description: '신나는 80년대 레트로 신스웨이브 베이스라인과 중독적인 탑라인 팝',
        bpm: 122,
        key: 'A Min',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 1 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_01.mp3' */
        // =========================================================
      },
      {
        id: 'pop-2',
        title: 'Summer Heartbeat (Tropical Breeze)',
        artist: 'Plymaster Hit Factory',
        duration: '03:05',
        genreTag: 'Tropical House Pop',
        description: '청량한 플럭 사운드와 산뜻한 리듬감으로 기분 전환에 최적화된 트로피컬 팝',
        bpm: 116,
        key: 'C Maj',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 2 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_02.mp3' */
        // =========================================================
      },
      {
        id: 'pop-3',
        title: 'Catch Me If You Can (Night Fever)',
        artist: 'Plymaster Hit Factory',
        duration: '02:50',
        genreTag: 'Nu-Disco Pop',
        description: '그루비한 베이스와 화려한 스트링 사운드가 어우러진 뉴디스코 댄스팝',
        bpm: 124,
        key: 'E Min',
        // =========================================================
        // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
        audioUrl: '', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_03.mp3' */
        // =========================================================
      },
    ],
  },
];

export const ThemePackMusic: React.FC<ThemePackMusicProps> = ({ setView }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentTrack, setCurrentTrack] = useState<TrackItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Stop synthetic preview sound
  const stopSynthAudio = () => {
    if (synthIntervalRef.current) {
      window.clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state !== 'closed') {
      try {
        synthCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      synthCtxRef.current = null;
    }
  };

  // Play musical preview synthesized sound when audioUrl is empty
  const playSynthPreview = (category: string) => {
    stopSynthAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const baseFrequencies = category === 'hiphop' 
        ? [261.63, 329.63, 392.00, 493.88] // C maj 7
        : category === 'sleep'
        ? [216.00, 272.16, 324.00, 432.00] // 432Hz ambient
        : [329.63, 392.00, 493.88, 587.33]; // E min 7

      let step = 0;
      const playChordNote = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = baseFrequencies[step % baseFrequencies.length];
        
        osc.type = category === 'sleep' ? 'sine' : category === 'hiphop' ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const masterVol = isMuted ? 0 : volume * 0.15;
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(masterVol, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.9);
        step++;
      };

      playChordNote();
      synthIntervalRef.current = window.setInterval(playChordNote, 900);
    } catch (e) {
      console.warn("Web Audio preview not supported in this environment", e);
    }
  };

  // Play a track
  const handlePlayTrack = (track: TrackItem, categoryId: string) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Pause
      if (audioRef.current && track.audioUrl) {
        audioRef.current.pause();
      }
      stopSynthAudio();
      setIsPlaying(false);
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);

    if (track.audioUrl && track.audioUrl.trim() !== '') {
      setIsDemoMode(false);
      stopSynthAudio();
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch((err) => {
          console.warn("Audio playback fallback to synthesizer:", err);
          setIsDemoMode(true);
          playSynthPreview(categoryId);
        });
      }
    } else {
      // Audio URL not yet filled by user -> Use interactive musical synthesizer demo preview
      setIsDemoMode(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      playSynthPreview(categoryId);
    }
  };

  // Stop current track completely
  const handleStopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopSynthAudio();
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
  };

  // Toggle mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Update volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = false;
    }
  };

  // Audio element timeupdate handler
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('00:00');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSynthAudio();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const filteredPacks = activeCategory === 'all' 
    ? THEME_PACKS 
    : THEME_PACKS.filter(p => p.id === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hidden real audio element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Top Breadcrumb & Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setView('hero')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-sm font-medium transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#006AFF] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#006AFF] tracking-wider uppercase">THEME PACK PREVIEW</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006AFF]/10 border border-[#006AFF]/30 text-[#006AFF] text-xs font-bold mb-4">
            <Headphones className="w-3.5 h-3.5" />
            Plymaster Factory 정규 테마 컬렉션
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            테마팩 <span className="text-[#006AFF]">음악 둘러보기</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 leading-relaxed break-keep">
            각 테마팩의 AI 프로듀서가 기획·제작한 고퀄리티 음원을 직접 청음해보세요.<br />
            원하는 테마팩의 곡에 '재생하기' 버튼을 누르면 음악을 들으실 수 있습니다.
          </p>
        </div>

        {/* Developer Guide / Info Box for Hyperlink Customization */}
        <div className="glass-card p-4 md:p-5 rounded-2xl border-white/10 mb-8 bg-blue-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#006AFF]/20 text-[#006AFF] mt-0.5 sm:mt-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">테마팩 사용 가이드</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                구매후 파일을 다운로드 받고 <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#00B2FF] font-mono font-bold">/* 팩토리의 파일-테마파일 불러오기 */</code> 를 통해 파일을 불러오면 팩토리에 장착이 됩니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 font-mono">
              총 3개 테마 / 9개 트랙
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#006AFF] text-white shadow-lg shadow-[#006AFF]/25'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
            }`}
          >
            전체 테마 보기
          </button>
          {THEME_PACKS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#006AFF] text-white shadow-lg shadow-[#006AFF]/25'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Categories & Tracks Grid */}
      <div className="space-y-12">
        {filteredPacks.map((pack) => (
          <div 
            key={pack.id} 
            className="glass-card p-6 md:p-8 rounded-3xl border-white/10 relative overflow-hidden"
          >
            {/* Ambient category glow */}
            <div 
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" 
              style={{ backgroundColor: pack.accentColor }} 
            />

            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{pack.icon}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white">{pack.title}</h2>
                  <span 
                    className="text-xs font-bold px-3 py-1 rounded-full border"
                    style={{ 
                      backgroundColor: `${pack.accentColor}15`, 
                      borderColor: `${pack.accentColor}40`,
                      color: pack.accentColor 
                    }}
                  >
                    {pack.badge}
                  </span>
                </div>
                <p className="text-sm text-white/50">{pack.subtitle} • {pack.description}</p>
              </div>

              {/* Category Hashtag Keywords */}
              <div className="flex flex-wrap gap-1.5">
                {pack.keywords.map((kw, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/60 font-mono">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Track List inside this Theme */}
            <div className="grid grid-cols-1 gap-4">
              {pack.tracks.map((track, idx) => {
                const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
                const isThisTrackSelected = currentTrack?.id === track.id;

                return (
                  <div
                    key={track.id}
                    className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isThisTrackPlaying
                        ? 'bg-[#006AFF]/10 border-[#006AFF]/40 shadow-lg shadow-[#006AFF]/10'
                        : isThisTrackSelected
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 hover:bg-white/[0.08] border-white/10'
                    }`}
                  >
                    {/* Left: Track Info & Icon */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Visual Indicator / Disc */}
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isThisTrackPlaying 
                            ? 'bg-[#006AFF] text-white shadow-lg shadow-[#006AFF]/30 animate-pulse' 
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {isThisTrackPlaying ? (
                          <div className="flex items-end gap-0.5 h-5">
                            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
                            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-5" />
                            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-4" />
                            <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_400ms] h-2" />
                          </div>
                        ) : (
                          <span className="font-mono font-bold text-sm">0{idx + 1}</span>
                        )}
                      </div>

                      {/* Track Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono font-bold text-[#006AFF] bg-[#006AFF]/10 px-2 py-0.5 rounded">
                            {track.genreTag}
                          </span>
                          <span className="text-xs text-white/40 font-mono">BPM {track.bpm}</span>
                          <span className="text-xs text-white/40 font-mono">• {track.key}</span>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white truncate">
                          {track.title}
                        </h3>
                        <p className="text-xs text-white/50 truncate">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Audio Play Controls (곡 제목 아래 / 우측 컨트롤) */}
                    <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      {/* Duration / Status */}
                      <div className="text-right mr-2 hidden sm:block">
                        <div className="text-xs font-mono font-semibold text-white/70">
                          {isThisTrackPlaying ? currentTime : track.duration}
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">
                          {isThisTrackPlaying ? '재생 중' : '대기'}
                        </div>
                      </div>

                      {/* Control Buttons (플레이 & 정지 버튼) */}
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        {/* Play / Pause Button */}
                        <button
                          onClick={() => handlePlayTrack(track, pack.id)}
                          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                            isThisTrackPlaying
                              ? 'bg-[#006AFF] hover:bg-[#0056cc] text-white shadow-lg shadow-[#006AFF]/30'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30'
                          }`}
                          title={isThisTrackPlaying ? '일시정지' : '음악 재생'}
                        >
                          {isThisTrackPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              <span>일시정지</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current text-white" />
                              <span>재생하기</span>
                            </>
                          )}
                        </button>

                        {/* Stop Button */}
                        <button
                          onClick={handleStopTrack}
                          disabled={!isThisTrackSelected}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isThisTrackSelected
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30'
                              : 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed opacity-50'
                          }`}
                          title="재생 정지"
                        >
                          <Square className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Music Player Bar when a track is active */}
      {currentTrack && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50 glass-card bg-[#18181b]/95 border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Track Info in Player */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-lg bg-[#006AFF] text-white flex items-center justify-center flex-shrink-0">
                <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
              </div>
              <div className="min-w-0 flex-1 sm:flex-initial">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#006AFF] uppercase bg-[#006AFF]/10 px-1.5 py-0.5 rounded">
                    NOW PLAYING
                  </span>
                  {isDemoMode && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                      Demo Synth Preview
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {currentTrack.title}
                </div>
              </div>
            </div>

            {/* Playback Controls & Progress */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Play / Pause / Stop Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const pack = THEME_PACKS.find(p => p.tracks.some(t => t.id === currentTrack.id));
                    handlePlayTrack(currentTrack, pack?.id || 'hiphop');
                  }}
                  className="p-3 bg-[#006AFF] hover:bg-[#0056cc] text-white rounded-xl shadow-md transition cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={handleStopTrack}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white/80 rounded-xl transition cursor-pointer"
                  title="정지"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  className="text-white/60 hover:text-white transition cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 sm:w-20 accent-[#006AFF] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-[#006AFF] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA for Factory */}
      <div className="mt-16 text-center glass-card p-10 rounded-3xl border-white/10 relative overflow-hidden bg-gradient-to-b from-transparent to-[#006AFF]/10">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
          원하는 테마로 고퀄리티 음원을 즉시 대량 생산해보세요!
        </h3>
        <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Plymaster Factory를 사용하면 별도의 음악 지식 없이도 마우스 클릭 몇 번만으로<br />
          감성 힙합, 수면 음악, 빌보드 팝을 비롯한 수십 가지 테마의 음원과 썸네일을 100% 자동 생성합니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/nimomusic/plymasterstudio/releases/download/plymasterstudio/Plymaster.Factory.For.Pop.Setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#006AFF] hover:bg-[#0056cc] text-white rounded-2xl font-bold text-base transition-all transform hover:scale-105 shadow-xl shadow-[#006AFF]/25 inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>팩토리 다운로드 (Windows용)</span>
          </a>
          <button
            onClick={() => setView('manual')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-2xl font-bold text-base transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Info className="w-5 h-5" />
            <span>팩토리 사용 설명서 보기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
