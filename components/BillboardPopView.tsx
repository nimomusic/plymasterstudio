import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward,
  SkipBack,
  Volume2, 
  VolumeX, 
  Music, 
  Zap,
  ArrowLeft,
  Share2,
  CheckSquare,
  Square as EmptySquare,
  ListMusic,
  Disc3,
  Sparkles,
  Repeat
} from 'lucide-react';

interface BillboardPopViewProps {
  setView?: (view: any) => void;
  standalone?: boolean;
}

export interface PopTrackItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  genreTag: string;
  /* 하이퍼링크넣는 곳: 실제 mp3 파일 또는 스트리밍 링크 URL */
  audioUrl: string;
}

// ==================================================================================
// 🎵 [하이퍼링크넣는 곳] 플리마스터 플레이리스트 트랙 리스트 & 음원 링크 데이터
// 각 곡의 audioUrl 항목에 실제 호스팅된 음원 파일 URL(mp3, wav 등)을 입력하시면 됩니다.
// ==================================================================================
export const POP_TRACKS: PopTrackItem[] = [
  {
    id: 'pop-1',
    number: '01',
    title: 'Mood drip',
    duration: '03:08',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 1 링크:
    audioUrl: 'https://cdn1.suno.ai/9e6a853e-849b-4149-a16e-fb9b7570126b.mp3',
    // =========================================================
  },
  {
    id: 'pop-2',
    number: '02',
    title: 'Daydream',
    duration: '03:05',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 2 링크:
    audioUrl: 'https://cdn1.suno.ai/bb01c0ca-06df-4fab-95aa-1d75daad899c.mp3',
    // =========================================================
  },
  {
    id: 'pop-3',
    number: '03',
    title: 'Soft Drizzle',
    duration: '02:50',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 3 링크:
    audioUrl: 'https://cdn1.suno.ai/b924b122-3bd1-4ba5-b833-854168b90b99.mp3',
    // =========================================================
  },
  {
    id: 'pop-4',
    number: '04',
    title: '우산 없는 밤',
    duration: '04:02',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 4 링크:
    audioUrl: 'https://cdn1.suno.ai/c4142110-476a-4b75-867d-6a5dc3b65ee2.mp3',
    // =========================================================
  },
  {
    id: 'pop-5',
    number: '05',
    title: '읽히지 않아',
    duration: '03:03',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 5 링크:
    audioUrl: 'https://cdn1.suno.ai/7ad30ed2-3112-4a85-a54d-797340f35c29.mp3',
    // =========================================================
  },
];

export const BillboardPopView: React.FC<BillboardPopViewProps> = ({ setView, standalone = false }) => {
  // 선택된 곡 ID 목록 (초기값: 전체 선택)
  const [selectedIds, setSelectedIds] = useState<string[]>(POP_TRACKS.map(t => t.id));
  const [currentTrack, setCurrentTrack] = useState<PopTrackItem | null>(POP_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [totalDuration, setTotalDuration] = useState<string>('00:00');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isAutoRepeat, setIsAutoRepeat] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // 현재 재생 대기열 (체크된 곡들 중 유효한 목록)
  const activePlaylist = POP_TRACKS.filter(t => selectedIds.includes(t.id));

  // 전체 선택 여부 확인
  const isAllSelected = POP_TRACKS.length > 0 && selectedIds.length === POP_TRACKS.length;
  const isPartiallySelected = selectedIds.length > 0 && selectedIds.length < POP_TRACKS.length;

  // 전체 선택 토글
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(POP_TRACKS.map(t => t.id));
    }
  };

  // 개별 곡 선택 토글
  const handleToggleSelectTrack = (trackId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  // Synth Audio 정지
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

  // Web Audio Synth 데모 미리듣기
  const playSynthPreview = () => {
    stopSynthAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const popFrequencies = [293.66, 349.23, 440.00, 523.25, 659.25];
      let step = 0;

      const playPopChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = popFrequencies[step % popFrequencies.length];

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const masterVol = isMuted ? 0 : volume * 0.12;
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(masterVol, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.3);
        step++;
      };

      playPopChord();
      synthIntervalRef.current = window.setInterval(playPopChord, 600);
    } catch (e) {
      console.warn("Web Audio synth not supported", e);
    }
  };

  // 곡 재생 실행 함수
  const startPlayingTrack = (track: PopTrackItem) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime('00:00');

    // 만약 현재 곡이 선택 목록에 없다면 자동으로 선택 목록에 추가
    if (!selectedIds.includes(track.id)) {
      setSelectedIds(prev => [...prev, track.id]);
    }

    if (track.audioUrl && track.audioUrl.trim() !== '') {
      setIsDemoMode(false);
      stopSynthAudio();
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch((err) => {
          console.warn("Audio playback fallback:", err);
          setIsDemoMode(true);
          playSynthPreview();
        });
      }
    } else {
      setIsDemoMode(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      playSynthPreview();
    }
  };

  // 단일 곡 재생/일시정지 토글
  const handlePlayTrack = (track: PopTrackItem) => {
    if (currentTrack?.id === track.id && isPlaying) {
      if (audioRef.current && track.audioUrl) {
        audioRef.current.pause();
      }
      stopSynthAudio();
      setIsPlaying(false);
      return;
    }

    startPlayingTrack(track);
  };

  // 상단 '선택된 곡 재생하기' 버튼 클릭 시
  const handlePlaySelectedQueue = () => {
    if (activePlaylist.length === 0) {
      // 선택된 곡이 없으면 전체 선택 후 첫 곡부터 재생
      setSelectedIds(POP_TRACKS.map(t => t.id));
      startPlayingTrack(POP_TRACKS[0]);
      return;
    }

    // 현재 재생 중인 곡이 선택 목록에 포함되어 있다면 토글
    if (currentTrack && activePlaylist.some(t => t.id === currentTrack.id)) {
      if (isPlaying) {
        if (audioRef.current) audioRef.current.pause();
        stopSynthAudio();
        setIsPlaying(false);
      } else {
        startPlayingTrack(currentTrack);
      }
    } else {
      // 선택된 목록의 첫 곡부터 재생 시작
      startPlayingTrack(activePlaylist[0]);
    }
  };

  // 다음 곡으로 이동 (자동 재생 포함)
  const handleNextTrack = () => {
    const queue = activePlaylist.length > 0 ? activePlaylist : POP_TRACKS;
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      if (isAutoRepeat) {
        nextIndex = 0; // 처음으로 반복
      } else {
        handleStopTrack();
        return;
      }
    }

    startPlayingTrack(queue[nextIndex]);
  };

  // 이전 곡으로 이동
  const handlePrevTrack = () => {
    const queue = activePlaylist.length > 0 ? activePlaylist : POP_TRACKS;
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    startPlayingTrack(queue[prevIndex]);
  };

  // 재생 정지
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

  // 볼륨 / 음소거
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = false;
    }
  };

  // 프로그레스 바 클릭/드래그 이동
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = Math.max(0, Math.min(1, clickX / width));
    
    audioRef.current.currentTime = ratio * audioRef.current.duration;
    setProgress(ratio * 100);
  };

  // 오디오 시간 업데이트
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);

      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);

      const totalMins = Math.floor(total / 60);
      const totalSecs = Math.floor(total % 60);
      setTotalDuration(`${totalMins < 10 ? '0' : ''}${totalMins}:${totalSecs < 10 ? '0' : ''}${totalSecs}`);
    }
  };

  // 곡 재생 완료 시 -> 다음 선택된 곡 자동 재생
  const handleAudioEnded = () => {
    handleNextTrack();
  };

  // 링크 복사
  const handleCopyLink = () => {
    try {
      const url = window.location.origin + window.location.pathname + '?view=pop';
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("Copy link failed", e);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthAudio();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white flex flex-col justify-start items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Hidden Real HTML5 Audio Element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Top Header Helper Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between gap-4 mb-4">
        {setView && (
          <button
            onClick={() => setView('themepack')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-medium transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>테마팩 보러가기</span>
          </button>
        )}

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-medium transition cursor-pointer ml-auto"
          title="이 페이지 전용 링크 복사"
        >
          <Share2 className="w-3.5 h-3.5 text-[#EC4899]" />
          <span>{copied ? '링크 복사 완료!' : '페이지 링크 공유'}</span>
        </button>
      </div>

      {/* Main 2-Column Studio Grid Layout (Left: Tall Audio Player Rack, Right: Playlist Table) */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* [LEFT COLUMN: 위아래로 긴 세로형 오디오 플레이어 랙 (빨간색 영역)] */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 w-full bg-[#121420]/95 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between sticky top-6">
          {/* Ambient Glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#EC4899]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Player Rack Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#EC4899]">
                  STUDIO AUDIO RACK
                </span>
              </div>
              <button
                onClick={() => setIsAutoRepeat(!isAutoRepeat)}
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition cursor-pointer border ${
                  isAutoRepeat 
                    ? 'bg-[#EC4899]/20 text-[#EC4899] border-[#EC4899]/40' 
                    : 'bg-white/5 text-white/40 border-white/10'
                }`}
                title="연속 자동 반복 재생 토글"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{isAutoRepeat ? '연속 재생 ON' : '1회 재생'}</span>
              </button>
            </div>

            {/* Vinyl / Cover Art Visualizer Display */}
            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#1b1e30] to-[#0d0f17] border border-white/10 p-5 flex flex-col items-center justify-center relative overflow-hidden mb-5 group shadow-inner">
              {/* Rotating Vinyl Record Animation when playing */}
              <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#222738] bg-black shadow-2xl flex items-center justify-center transition-transform duration-700 ${
                isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}>
                {/* Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-7 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                
                {/* Center Label */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EC4899] to-[#9333EA] p-1 flex flex-col items-center justify-center text-center shadow-lg">
                  <Music className="w-6 h-6 text-white" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-tighter mt-0.5">PLYMASTER</span>
                </div>
              </div>

              {/* Real-time Visualizer Waves Bar at bottom of art */}
              {isPlaying && (
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-center gap-1 h-8 bg-black/40 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10">
                  <span className="w-1 bg-[#EC4899] rounded-full animate-[bounce_0.5s_infinite_100ms] h-4" />
                  <span className="w-1 bg-[#F43F5E] rounded-full animate-[bounce_0.5s_infinite_300ms] h-6" />
                  <span className="w-1 bg-[#A855F7] rounded-full animate-[bounce_0.5s_infinite_200ms] h-3" />
                  <span className="w-1 bg-[#38BDF8] rounded-full animate-[bounce_0.5s_infinite_450ms] h-5" />
                  <span className="w-1 bg-[#EC4899] rounded-full animate-[bounce_0.5s_infinite_150ms] h-7" />
                  <span className="w-1 bg-[#F43F5E] rounded-full animate-[bounce_0.5s_infinite_350ms] h-4" />
                  <span className="w-1 bg-[#A855F7] rounded-full animate-[bounce_0.5s_infinite_250ms] h-5" />
                </div>
              )}
            </div>

            {/* Currently Playing Track Meta */}
            <div className="mb-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-bold text-[#EC4899] bg-[#EC4899]/15 border border-[#EC4899]/30 px-2 py-0.5 rounded-md">
                  {isPlaying ? 'NOW PLAYING' : 'READY TO PLAY'}
                </span>
                {currentTrack && (
                  <span className="text-[11px] font-mono text-[#38BDF8] bg-[#0284c7]/15 px-2 py-0.5 rounded-md">
                    {currentTrack.genreTag}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white truncate tracking-tight">
                {currentTrack ? currentTrack.title : '선택된 곡 없음'}
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                플리마스터 엄선 플레이리스트 • 트랙 {currentTrack ? currentTrack.number : '00'}
              </p>
            </div>

            {/* Progress Bar & Seek */}
            <div className="mb-4">
              <div 
                onClick={handleSeek}
                className="w-full bg-white/10 hover:bg-white/20 h-2 rounded-full cursor-pointer relative overflow-hidden transition-all group"
              >
                <div 
                  className="bg-gradient-to-r from-[#EC4899] to-[#A855F7] h-full rounded-full relative transition-all duration-100"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1.5">
                <span>{currentTime}</span>
                <span>{currentTrack ? (totalDuration !== '00:00' ? totalDuration : currentTrack.duration) : '00:00'}</span>
              </div>
            </div>

            {/* Main Audio Controls (Prev / Play / Next / Stop) */}
            <div className="flex items-center justify-center gap-3 mb-5">
              {/* Previous Track */}
              <button
                onClick={handlePrevTrack}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                title="이전 곡"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Play / Pause Main Button */}
              <button
                onClick={() => currentTrack && handlePlayTrack(currentTrack)}
                className="p-4.5 rounded-2xl bg-gradient-to-r from-[#EC4899] to-[#db2777] hover:from-[#f43f5e] hover:to-[#be185d] text-white shadow-xl shadow-[#EC4899]/30 transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center"
                title={isPlaying ? '일시정지' : '재생'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={handleNextTrack}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                title="다음 곡"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Stop Track */}
              <button
                onClick={handleStopTrack}
                className="p-3 rounded-2xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-white/60 hover:text-red-400 transition cursor-pointer"
                title="정지"
              >
                <Square className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Volume Slider Bar */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl mb-4">
              <button 
                onClick={toggleMute}
                className="text-white/60 hover:text-white transition cursor-pointer"
                title={isMuted ? '음소거 해제' : '음소거'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#EC4899]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-[#EC4899] cursor-pointer h-1.5 bg-white/20 rounded-lg"
              />
              <span className="text-[11px] font-mono text-white/50 w-8 text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>

          {/* Active Queue Summary List */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ListMusic className="w-4 h-4 text-[#EC4899]" />
                <span>재생 대기열 ({activePlaylist.length}곡 선택됨)</span>
              </div>
              <span className="text-[11px] font-mono text-white/40">순차 자동 재생</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {activePlaylist.length === 0 ? (
                <div className="p-3 text-center text-white/40 bg-white/5 rounded-xl">
                  선택된 곡이 없습니다. 목록에서 곡을 체크해 주세요.
                </div>
              ) : (
                activePlaylist.map((t, idx) => {
                  const isCur = currentTrack?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => startPlayingTrack(t)}
                      className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                        isCur 
                          ? 'bg-[#EC4899]/20 text-white font-bold border border-[#EC4899]/40' 
                          : 'bg-white/5 hover:bg-white/10 text-white/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-white/40">{idx + 1}</span>
                        <span className="truncate">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isCur && isPlaying && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-ping" />
                        )}
                        <span className="font-mono text-[10px] text-white/40">{t.duration}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* [RIGHT COLUMN: 플리마스터 플레이리스트 목록 및 전체선택/재생 툴바] */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 w-full bg-[#141622]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Pink Ambient Glow */}
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none bg-[#EC4899]" 
          />

          {/* Card Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-6 border-b border-white/10 relative z-10">
            {/* Left: Title, Badge, Description */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                <span className="text-2xl text-yellow-400 select-none">⚡</span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  플리마스터 플레이리스트
                </h1>
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-[#EC4899]/15 border-[#EC4899]/40 text-[#EC4899]">
                  오마카세 모음
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed break-keep">
                플리마스터에서 테마팩을 사용하여 만든 곡들 중 엄선하여 모은 플레이리스트 입니다.
              </p>
            </div>

            {/* Right: Hashtag Badges */}
            <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">#이것저것</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">#주인장맘</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">#노동요</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">#드라이브</span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">#카페</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* [1번 곡 상단 왼쪽 정렬 툴바: 전체 선택 체크박스 & 선택 곡 재생하기 버튼] */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 relative z-10">
            {/* Left: 전체 선택 체크박스 & 선택 곡 재생하기 버튼 */}
            <div className="flex items-center gap-3">
              {/* 전체 선택 체크박스 */}
              <button
                onClick={handleToggleSelectAll}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition cursor-pointer group"
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center transition ${
                  isAllSelected 
                    ? 'bg-[#EC4899] text-white' 
                    : isPartiallySelected
                    ? 'bg-[#EC4899]/40 text-white'
                    : 'border border-white/40 group-hover:border-white'
                }`}>
                  {isAllSelected && <span className="text-xs leading-none">✓</span>}
                  {isPartiallySelected && <span className="text-[10px] leading-none">-</span>}
                </div>
                <span className="select-none font-bold text-xs sm:text-sm">
                  전체 선택 <span className="text-[#EC4899] font-mono">({selectedIds.length}/{POP_TRACKS.length})</span>
                </span>
              </button>

              {/* 선택한 곡 재생하기 버튼 */}
              <button
                onClick={handlePlaySelectedQueue}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EC4899] hover:bg-[#db2777] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#EC4899]/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                {isPlaying && currentTrack && selectedIds.includes(currentTrack.id) ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>일시정지</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>선택 곡 재생 ({selectedIds.length})</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: 재생 모드 안내 뱃지 */}
            <div className="text-xs text-white/40 hidden sm:flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>체크된 곡이 순서대로 자동 재생됩니다</span>
            </div>
          </div>

          {/* Tracks List */}
          <div className="space-y-3.5 relative z-10">
            {POP_TRACKS.map((track) => {
              const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
              const isThisTrackSelected = currentTrack?.id === track.id;
              const isChecked = selectedIds.includes(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                    isThisTrackPlaying
                      ? 'bg-[#EC4899]/15 border-[#EC4899]/50 shadow-lg shadow-[#EC4899]/10'
                      : isThisTrackSelected
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 hover:bg-white/[0.08] border-white/10'
                  }`}
                >
                  {/* Left: 체크박스 + 번호 뱃지 + 곡 정보 */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* 개별 곡 체크박스 (01,02,03 번호 박스 왼쪽) */}
                    <div 
                      onClick={(e) => handleToggleSelectTrack(track.id, e)}
                      className="p-1 -m-1 cursor-pointer flex-shrink-0"
                      title={isChecked ? '선택 해제' : '플레이리스트에 추가'}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-[#EC4899] text-white shadow-sm' 
                          : 'border-2 border-white/30 hover:border-[#EC4899] bg-white/5'
                      }`}>
                        {isChecked && <span className="text-xs font-bold leading-none">✓</span>}
                      </div>
                    </div>

                    {/* Number Badge / Equalizer Animation */}
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isThisTrackPlaying 
                          ? 'bg-[#EC4899] text-white shadow-lg shadow-[#EC4899]/30' 
                          : 'bg-white/10 text-white/70 font-mono font-bold text-sm group-hover:bg-white/15'
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
                        track.number
                      )}
                    </div>

                    {/* Title & Tag */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0284c7]/20 px-2 py-0.5 rounded">
                          {track.genreTag}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-[#EC4899] transition-colors">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Audio Duration & Play / Stop Controls */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 flex-shrink-0"
                  >
                    {/* Duration / Status */}
                    <div className="text-right mr-2 hidden sm:block">
                      <div className="text-xs font-mono font-semibold text-white/70">
                        {isThisTrackPlaying ? currentTime : track.duration}
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">
                        {isThisTrackPlaying ? '재생 중' : '대기'}
                      </div>
                    </div>

                    {/* Play & Stop Buttons */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      {/* Play / Pause Button */}
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                          isThisTrackPlaying
                            ? 'bg-[#EC4899] hover:bg-[#db2777] text-white shadow-lg shadow-[#EC4899]/30'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30'
                        }`}
                        title={isThisTrackPlaying ? '일시정지' : '음악 재생'}
                      >
                        {isThisTrackPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
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

      </div>
    </div>
  );
};

export default BillboardPopView;
