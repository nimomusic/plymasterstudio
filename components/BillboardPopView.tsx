import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Music, 
  Zap,
  ArrowLeft,
  Share2,
  ExternalLink
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
// 🎵 [하이퍼링크넣는 곳] 빌보드 트렌디팝 트랙 리스트 & 음원 링크 데이터
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
    // [하이퍼링크넣는 곳] 곡 1 링크를 아래 따옴표 안에 입력하세요:
    audioUrl: 'https://cdn1.suno.ai/9e6a853e-849b-4149-a16e-fb9b7570126b.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_01.mp3' */
    // =========================================================
  },
  {
    id: 'pop-2',
    number: '02',
    title: 'Daydream',
    duration: '03:05',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 2 링크를 아래 따옴표 안에 입력하세요:
    audioUrl: 'https://cdn1.suno.ai/bb01c0ca-06df-4fab-95aa-1d75daad899c.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_02.mp3' */
    // =========================================================
  },
  {
    id: 'pop-3',
    number: '03',
    title: 'Soft Drizzle',
    duration: '02:50',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
    audioUrl: 'https://cdn1.suno.ai/b924b122-3bd1-4ba5-b833-854168b90b99.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_03.mp3' */
    // =========================================================
  },
  {
    id: 'pop-4',
    number: '04',
    title: '우산 없는 밤',
    duration: '04:02',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
    audioUrl: 'https://cdn1.suno.ai/c4142110-476a-4b75-867d-6a5dc3b65ee2.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_03.mp3' */
    // =========================================================
  },
  {
    id: 'pop-5',
    number: '05',
    title: '읽히지 않아',
    duration: '03:03',
    genreTag: '느좋 인스타 알앤비 힙합',
    // =========================================================
    // [하이퍼링크넣는 곳] 곡 3 링크를 아래 따옴표 안에 입력하세요:
    audioUrl: 'https://cdn1.suno.ai/7ad30ed2-3112-4a85-a54d-797340f35c29.mp3', /* 하이퍼링크넣는 곳: 예) 'https://your-domain.com/tracks/pop_03.mp3' */
    // =========================================================
  },
];

export const BillboardPopView: React.FC<BillboardPopViewProps> = ({ setView, standalone = false }) => {
  const [currentTrack, setCurrentTrack] = useState<PopTrackItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Stop synthetic audio preview
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

  // Synthesizer demo preview for Pop
  const playSynthPreview = () => {
    stopSynthAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const popFrequencies = [329.63, 392.00, 493.88, 587.33, 659.25]; // Pop Synth chords
      let step = 0;

      const playPopChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = popFrequencies[step % popFrequencies.length];

        osc.type = 'sawtooth';
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
      console.warn("Web Audio synth not supported in this environment", e);
    }
  };

  // Play / Pause Track
  const handlePlayTrack = (track: PopTrackItem) => {
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
          console.warn("Audio playback fallback to synth:", err);
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

  // Stop Track
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

  // Toggle Mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Change Volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = false;
    }
  };

  // Time update
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

  // Cleanup
  useEffect(() => {
    return () => {
      stopSynthAudio();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col justify-center items-center py-10 px-4 sm:px-6 md:px-8">
      {/* Hidden real audio element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Standalone Navigation / Header helper if setView is passed */}
      {setView && (
        <div className="w-full max-w-5xl flex items-center justify-between gap-4 mb-5">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-medium transition cursor-pointer"
            title="이 페이지 전용 링크 복사"
          >
            <Share2 className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{copied ? '링크 복사 완료!' : '페이지 링크 공유'}</span>
          </button>
        </div>
      )}

      {/* Main Single Card Container (Matches Attached Screenshot Exactly) */}
      <div className="w-full max-w-5xl bg-[#141622]/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle Pink/Magenta Ambient Background Glow */}
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

        {/* 3 Tracks List */}
        <div className="space-y-4 relative z-10">
          {POP_TRACKS.map((track) => {
            const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
            const isThisTrackSelected = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isThisTrackPlaying
                    ? 'bg-[#EC4899]/10 border-[#EC4899]/40 shadow-lg shadow-[#EC4899]/10'
                    : isThisTrackSelected
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 hover:bg-white/[0.08] border-white/10'
                }`}
              >
                {/* Left: Track Number & Meta Details */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Number Badge / Visual Equalizer */}
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isThisTrackPlaying 
                        ? 'bg-[#EC4899] text-white shadow-lg shadow-[#EC4899]/30' 
                        : 'bg-white/10 text-white/70 font-mono font-bold text-sm'
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

                  {/* Title & Description */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0284c7]/20 px-2 py-0.5 rounded">
                        {track.genreTag}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {track.title}
                    </h3>
                    <p className="text-xs text-white/50 truncate">
                      {track.description}
                    </p>
                  </div>
                </div>

                {/* Right: Audio Play Controls */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 flex-shrink-0">
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
                      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isThisTrackPlaying
                          ? 'bg-[#EC4899] hover:bg-[#db2777] text-white shadow-lg shadow-[#EC4899]/30'
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

      {/* Floating Bottom Audio Player Bar when track is playing */}
      {currentTrack && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-50 bg-[#161822]/95 border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-lg bg-[#EC4899] text-white flex items-center justify-center flex-shrink-0">
                <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
              </div>
              <div className="min-w-0 flex-1 sm:flex-initial">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#EC4899] uppercase bg-[#EC4899]/10 px-1.5 py-0.5 rounded">
                    NOW PLAYING
                  </span>
                  {isDemoMode && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                      Demo Synth Preview
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-white truncate max-w-xs">
                  {currentTrack.title}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayTrack(currentTrack)}
                  className="p-3 bg-[#EC4899] hover:bg-[#db2777] text-white rounded-xl shadow-md transition cursor-pointer"
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

              {/* Volume */}
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
                  className="w-16 accent-[#EC4899] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-[#EC4899] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillboardPopView;
