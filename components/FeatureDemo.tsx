
import React, { useState } from 'react';
import { generatePlaylistMockup } from '../services/geminiService';
import { PlaylistSuggestion } from '../types';

const FeatureDemo: React.FC = () => {
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState<PlaylistSuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    try {
      const result = await generatePlaylistMockup(mood);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      alert('AI 엔진 가동 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-32 px-6 bg-black/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#006AFF]/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#006AFF]/10 text-[#006AFF] text-xs font-bold uppercase tracking-widest border border-[#006AFF]/20">AI Magic Engine</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Plymaster의 감성을 체험해보세요</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">상상만 하던 무드를 텍스트로 입력하세요.<br />AI 엔진이 당신을 위한 완벽한 플레이리스트 설계를 제안합니다.</p>
        </div>

        <div className="glass-card rounded-[3rem] p-1 md:p-1.5 shadow-2xl relative">
          <div className="bg-[#121212] rounded-[2.9rem] p-8 md:p-16 border border-white/5">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-20 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#006AFF] to-[#00B2FF] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
              <input 
                type="text" 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="예: 늦은 밤 비오는 창가에서 듣는 재즈, 새벽 드라이브 시티팝"
                className="relative flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-[#006AFF] transition-all backdrop-blur-sm"
              />
              <button 
                type="submit"
                disabled={loading}
                className="relative bg-[#006AFF] disabled:bg-gray-600 px-12 py-5 rounded-2xl font-black text-xl text-white transition-all hover:scale-105 shadow-xl shadow-[#006AFF]/20"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    AI 엔진 분석 중...
                  </span>
                ) : '컨셉 즉시 생성하기'}
              </button>
            </form>

            {suggestion ? (
              <div className="grid lg:grid-cols-2 gap-16 animate-[fadeIn_0.8s_ease-out]">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="text-[#006AFF] font-mono text-sm tracking-[0.3em] uppercase">Cinematic Blueprint</div>
                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">{suggestion.title}</h3>
                    <p className="text-lg text-white/50 leading-relaxed font-medium italic">"{suggestion.description}"</p>
                  </div>
                  
                  <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <svg className="w-8 h-8 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#006AFF] mb-4">Recommended Visual Theme</h4>
                    <p className="text-xl text-white/90 leading-snug">{suggestion.visualTheme}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/30">Auto-Generated Tracklist</h4>
                    <span className="text-[10px] text-[#006AFF] font-bold">5 TRACKS SYNCED</span>
                  </div>
                  <div className="space-y-3">
                    {suggestion.tracks.map((track, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all group cursor-default border border-transparent hover:border-white/10">
                        <div className="flex items-center gap-5">
                          <span className="text-white/10 font-black text-lg group-hover:text-[#006AFF] transition-colors">{String(i + 1).padStart(2, '0')}</span>
                          <div>
                            <div className="font-bold text-white group-hover:translate-x-1 transition-transform">{track.title}</div>
                            <div className="text-sm text-white/30">{track.artist}</div>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-black/50 rounded-lg text-[10px] font-mono text-white/40">{track.duration}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-4 border border-[#006AFF]/30 rounded-2xl text-[#006AFF] text-sm font-bold hover:bg-[#006AFF]/5 transition-colors">
                    이 구성으로 제작 시작하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl group hover:border-[#006AFF]/30 transition-colors">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white/20 group-hover:text-[#006AFF]/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-white/30 text-center font-medium">
                  당신의 음악적 상상을 현실로.<br />
                  <span className="text-sm opacity-50">엔진이 대기 중입니다.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};

export default FeatureDemo;
