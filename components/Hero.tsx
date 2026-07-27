import React, { useState } from 'react';
import { AppViewType } from '../types';
import screenshot1 from '../screenshot1.jpg';
import screenshot2 from '../screenshot2.jpg';
import screenshot3 from '../screenshot3.jpg';

interface HeroProps {
  setView: (view: AppViewType, manualTab?: 'studio' | 'factory') => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [loaded, setLoaded] = useState({
    img1: false,
    img2: false,
    img3: false,
  });
  const [error, setError] = useState({
    img1: false,
    img2: false,
    img3: false,
  });

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs md:text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[#006AFF] animate-ping" />
          Plymaster Factory & Studio: 플레이리스트 제작 전용 프로그램
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.4rem] font-bold mb-8 leading-[1.2] tracking-tight px-2 break-keep">
          플레이리스트 영상 제작 &nbsp; <br />
          <span className="gradient-text italic font-black pr-1"> 이제 영상편집 배우지 마세요!</span>
        </h1>
        
        <div className="text-base md:text-xl text-white/50 mb-12 max-w-4xl mx-auto leading-relaxed break-keep">
          <p>
            영상편집 없이 단 몇번의 클릭만으로{" "}
            <strong className="text-red-500">5분이내 편집 끝!</strong>
          </p>
          <p>
            음원에서 자막, 비주얼라이저, 인코딩, 라이브 송출까지{" "}
            <strong className="text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
              ONE-STOP!
            </strong>
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a 
              href="https://github.com/nimomusic/plymasterstudio/releases/download/plymaster/PlyMaster.Studio.Setup.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-8 py-5 bg-[#006AFF] hover:bg-[#0056cc] rounded-2xl text-xl font-bold transition-all transform hover:scale-105 electric-shadow overflow-hidden text-center inline-block"
            >
              <span className="relative z-10">스튜디오 무료 다운로드</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>

            <button 
              onClick={() => setView('manual')}
              className="w-full sm:w-auto px-8 py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-xl font-bold border border-white/10 transition-all backdrop-blur-sm text-center inline-block cursor-pointer"
            >
              스튜디오 설명서
            </button>
          </div>
          <p className="text-red-500 text-sm font-medium mb-2">※만약,'Windows의 PC보호'라는 파란창이 뜨면 '추가정보'를 클릭하고 아래 '실행'버튼을 클릭하시면 됩니다.</p>
          <p><strong className="text-red/40">NVIDIA GPU 초고속 인코딩 지원!</strong></p><p className="text-white/40 text-sm font-medium mb-12">자동자막 | EQ탑재 | 오디오스펙트럼 | 저사양 PC호환 | 유튜브 라이브 | 자동 트랙리스트 | Window용</p>
          <p className="text-base md:text-xl text-white/50 mb-6 max-w-4xl mx-auto leading-relaxed break-keep">Studio</p>
          {/* Grid of three actual images with graceful loading/error fallbacks */}
          <div className="w-full max-w-[1400px] mx-auto mt-2 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {/* Left Image: Settings 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#006AFF]/50 transition-all hover:scale-[1.50] duration-300">
                <div className={`relative bg-neutral-950 flex items-center justify-center overflow-hidden ${(!loaded.img1 || error.img1) ? 'aspect-[16/10]' : ''}`}>
                  <img
                    src={screenshot1}
                    alt="배경 및 자막 설정 화면"
                    onLoad={() => setLoaded(prev => ({ ...prev, img1: true }))}
                    onError={() => setError(prev => ({ ...prev, img1: true }))}
                    className={`w-full h-auto block transition-opacity duration-500 ${
                      loaded.img1 && !error.img1 ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                  />
                  {(!loaded.img1 || error.img1) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-900 to-black z-10">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#006AFF]/30 transition-all">
                        {error.img1 ? (
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#006AFF] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-white/80 mb-1">
                        {error.img1 ? '이미지 로드 실패' : '이미지 로딩 중...'}
                      </span>
                      <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
                        {error.img1 
                          ? '/src/components/screenshot1.jpg 파일을 불러올 수 없습니다.' 
                          : '플레이마스터 스튜디오 스크린샷을 불러오는 중입니다.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Image: Preview & Spectrum */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#006AFF]/50 transition-all hover:scale-[1.50] duration-300">
                <div className={`relative bg-neutral-950 flex items-center justify-center overflow-hidden ${(!loaded.img2 || error.img2) ? 'aspect-[16/10]' : ''}`}>
                  <img
                    src={screenshot2}
                    alt="오디오 스펙트럼 및 선곡 프리뷰"
                    onLoad={() => setLoaded(prev => ({ ...prev, img2: true }))}
                    onError={() => setError(prev => ({ ...prev, img2: true }))}
                    className={`w-full h-auto block transition-opacity duration-500 ${
                      loaded.img2 && !error.img2 ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                  />
                  {(!loaded.img2 || error.img2) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-900 to-black z-10">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#006AFF]/30 transition-all">
                        {error.img2 ? (
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#006AFF] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-white/80 mb-1">
                        {error.img2 ? '이미지 로드 실패' : '이미지 로딩 중...'}
                      </span>
                      <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
                        {error.img2 
                          ? '/src/components/screenshot2.jpg 파일을 불러올 수 없습니다.' 
                          : '플레이마스터 스튜디오 스크린샷을 불러오는 중입니다.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Image: EQ & Sound */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#006AFF]/50 transition-all hover:scale-[1.50] duration-300">
                <div className={`relative bg-neutral-950 flex items-center justify-center overflow-hidden ${(!loaded.img3 || error.img3) ? 'aspect-[16/10]' : ''}`}>
                  <img
                    src={screenshot3}
                    alt="부가 기능 및 이퀄라이저 설정"
                    onLoad={() => setLoaded(prev => ({ ...prev, img3: true }))}
                    onError={() => setError(prev => ({ ...prev, img3: true }))}
                    className={`w-full h-auto block transition-opacity duration-500 ${
                      loaded.img3 && !error.img3 ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                  />
                  {(!loaded.img3 || error.img3) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-900 to-black z-10">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#006AFF]/30 transition-all">
                        {error.img3 ? (
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#006AFF] border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-white/80 mb-1">
                        {error.img3 ? '이미지 로드 실패' : '이미지 로딩 중...'}
                      </span>
                      <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
                        {error.img3 
                          ? '/src/components/screenshot3.jpg 파일을 불러올 수 없습니다.' 
                          : '플레이마스터 스튜디오 스크린샷을 불러오는 중입니다.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

