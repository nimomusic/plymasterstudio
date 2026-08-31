import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle, FileAudio, ExternalLink, ShieldCheck, Music } from 'lucide-react';
import { uploadMp3ToR2 } from '../lib/uploadAction';
import { PopTrackItem } from './BillboardPopView';

interface MusicRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newTrack: PopTrackItem) => void;
  totalArtistTracksCount: number;
}

export const MusicRegisterModal: React.FC<MusicRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  totalArtistTracksCount,
}) => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1000곡 초과 여부 체크
  const isMaxCapacityReached = totalArtistTracksCount >= 1000;

  if (!isOpen) return null;

  // 전화번호 010- 이후 7~8자리 숫자 포맷팅 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    
    // 010으로 시작하지 않으면 010 강제 보정 또는 숫자만 추출
    if (raw.startsWith('010')) {
      raw = raw.substring(3);
    }
    // 최대 8자리 숫자까지만
    const digits = raw.substring(0, 8);
    
    if (digits.length === 0) {
      setPhone('');
    } else if (digits.length <= 4) {
      setPhone(`010-${digits}`);
    } else if (digits.length <= 7) {
      // 3자리-4자리
      setPhone(`010-${digits.slice(0, 3)}-${digits.slice(3)}`);
    } else {
      // 4자리-4자리 (총 8자리)
      setPhone(`010-${digits.slice(0, 4)}-${digits.slice(4)}`);
    }
  };

  // 재생시간 00:00 형식 포맷팅 핸들러
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length > 4) raw = raw.slice(0, 4);

    if (raw.length <= 2) {
      setDuration(raw);
    } else {
      setDuration(`${raw.slice(0, 2)}:${raw.slice(2)}`);
    }
  };

  // MP3 파일 선택 핸들러 (10MB 제한)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileSizeError(null);
    setErrorMessage(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // MP3 검사 (확장자 및 MIME 타입)
    if (!file.name.toLowerCase().endsWith('.mp3') && !file.type.includes('audio')) {
      setFileSizeError('MP3 오디오 파일만 업로드 가능합니다.');
      setSelectedFile(null);
      return;
    }

    // 10MB 제한 (10 * 1024 * 1024 bytes)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileSizeError(`파일 크기가 10MB를 초과했습니다. (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isMaxCapacityReached) {
      setErrorMessage('AI음악 아티스트 테마에 이미 1000곡이 등록되어 더 이상 업로드가 불가능합니다.');
      return;
    }

    if (!nickname.trim()) {
      setErrorMessage('닉네임을 입력해 주세요 (띄어쓰기 포함 20자 이내).');
      return;
    }
    if (nickname.length > 20) {
      setErrorMessage('닉네임은 20자 이내로 입력해 주세요.');
      return;
    }

    // 전화번호 010-XXXX-XXXX 또는 010-XXX-XXXX 유효성 검사 (010 이후 7~8자리)
    const rawFullPhone = phone.replace(/[^0-9]/g, '');
    const phoneDigits = rawFullPhone.slice(3);
    if (phoneDigits.length < 7 || phoneDigits.length > 8) {
      setErrorMessage('전화번호는 010 이후 7~8자리 숫자로 입력해 주세요.');
      return;
    }

    // 010-7430-0527 번호가 아니면 닉네임에 '놀이터' 단어 포함 금지
    if (rawFullPhone !== '01074300527' && nickname.includes('놀이터')) {
      setErrorMessage("닉네임에 '놀이터' 단어는 포함될 수 없습니다.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage('비밀번호를 입력해 주세요 (띄어쓰기 포함 20자 이내).');
      return;
    }
    if (password.length > 20) {
      setErrorMessage('비밀번호는 20자 이내로 입력해 주세요.');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('곡 명을 입력해 주세요 (띄어쓰기 포함 20자 이내).');
      return;
    }
    if (title.length > 20) {
      setErrorMessage('곡 명은 20자 이내로 입력해 주세요.');
      return;
    }

    if (!duration || !/^\d{2}:\d{2}$/.test(duration)) {
      setErrorMessage('재생시간을 00:00 형태로 입력해 주세요. (예: 03:20)');
      return;
    }

    if (description && description.length > 40) {
      setErrorMessage('곡 설명은 띄어쓰기 포함 40자 이내로 입력해 주세요.');
      return;
    }

    if (!selectedFile) {
      setErrorMessage('MP3 파일을 선택해 주세요 (최대 10MB 이내).');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('이용약관에 동의하셔야 음원을 등록하실 수 있습니다.');
      return;
    }

    setLoading(true);

    try {
      // 1. R2 업로드 수행
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', 'artist');

      const res = await uploadMp3ToR2(formData);

      if (!res.success || !res.url) {
        throw new Error(res.error || '음원 업로드에 실패했습니다.');
      }

      // 2. 신규 트랙 객체 구성
      const trackId = `artist-user-${Date.now()}`;
      const newTrack: PopTrackItem = {
        id: trackId,
        number: String(totalArtistTracksCount + 1).padStart(2, '0'),
        title: title.trim(),
        duration: duration.trim(),
        nickname: nickname.trim(),
        channelUrl: channelUrl.trim() || undefined,
        description: description.trim() || undefined,
        albumId: 'artist',
        audioUrl: res.url,
        phone: phone.trim(),
        password: password.trim(),
        createdAt: Date.now(),
      };

      setLoading(false);
      onSuccess(newTrack);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || '음원 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
        <div className="bg-[#161826] border border-purple-500/30 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8 text-white max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                AI음악 아티스트 음원 등록
              </h2>
              <p className="text-xs text-white/60">
                아티스트님의 소중한 창작곡을 등록하고 전 세계 리스너들과 공유하세요.
              </p>
            </div>
          </div>

          {/* 1000곡 등록 마감 알림 */}
          {isMaxCapacityReached && (
            <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>
                현재 AI음악 아티스트 테마에 1,000곡이 모두 등록되어 더 이상 신규 업로드가 불가능합니다.
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2.5 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* 1. 닉네임 (20자 이내) */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">
                닉네임 <span className="text-pink-400">*</span>
                <span className="text-[10px] text-white/40 ml-1.5 font-normal">(띄어쓰기 포함 20자 이내)</span>
              </label>
              <input
                type="text"
                required
                maxLength={20}
                placeholder="예: DJ Nimo"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition"
              />
            </div>

            {/* 2. 전화번호 (010- 이후 7~8자리 숫자) & 비밀번호 (20자 이내) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  전화번호 <span className="text-pink-400">*</span>
                  <span className="text-[10px] text-white/40 ml-1.5 font-normal">(010- 이후 7~8자리 숫자)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  비밀번호 <span className="text-pink-400">*</span>
                  <span className="text-[10px] text-white/40 ml-1.5 font-normal">(삭제 시 인증용 / 20자 이내)</span>
                </label>
                <input
                  type="password"
                  required
                  maxLength={20}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition"
                />
              </div>
            </div>

            {/* 3. 아티스트 채널 주소 */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">
                아티스트 채널 주소
                <span className="text-[10px] text-white/40 ml-1.5 font-normal">(유튜브, 인스타그램, 사운드클라우드 등 링크)</span>
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/@channel"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition font-mono text-xs"
              />
            </div>

            {/* 4. 곡 명 (20자 이내) & 재생시간 (00:00) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  곡 명 <span className="text-pink-400">*</span>
                  <span className="text-[10px] text-white/40 ml-1.5 font-normal">(20자 이내)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  placeholder="예: Midnight Starlight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  재생시간 <span className="text-pink-400">*</span>
                  <span className="text-[10px] text-white/40 ml-1.5 font-normal">(00:00 형태)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="03:20"
                  value={duration}
                  onChange={handleDurationChange}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* 5. 곡 설명 (40자 이내) */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">
                곡 설명
                <span className="text-[10px] text-white/40 ml-1.5 font-normal">(띄어쓰기 포함 40자 이내)</span>
              </label>
              <input
                type="text"
                maxLength={40}
                placeholder="예: 몽환적인 신스웨이브와 따뜻한 네오소울 보컬"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-purple-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition"
              />
              <div className="text-right text-[10px] text-white/40 mt-1">
                {description.length}/40자
              </div>
            </div>

            {/* 6. MP3 파일 업로드 (최대 10MB 이내 제한 표기) */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5 flex items-center justify-between">
                <span>MP3 파일 업로드 <span className="text-pink-400">*</span></span>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  최대 10MB 이내로 제한
                </span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="audio/mp3, audio/mpeg, .mp3"
                  onChange={handleFileChange}
                  className="hidden"
                  id="mp3-file-upload-input"
                />
                <label
                  htmlFor="mp3-file-upload-input"
                  className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-2xl cursor-pointer transition ${
                    fileSizeError 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : selectedFile 
                      ? 'border-purple-500/50 bg-purple-500/10' 
                      : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/[0.08]'
                  }`}
                >
                  {selectedFile ? (
                    <div className="flex items-center gap-3 text-purple-300">
                      <FileAudio className="w-6 h-6 text-purple-400" />
                      <div className="text-left">
                        <p className="font-bold text-xs truncate max-w-xs">{selectedFile.name}</p>
                        <p className="text-[10px] text-white/50">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB / 10MB</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-white/40 mb-2" />
                      <span className="text-xs font-bold text-white/80">내 컴퓨터에서 MP3 파일 선택</span>
                      <span className="text-[10px] text-white/40 mt-0.5">최대 10MB 이하의 .mp3 파일만 가능</span>
                    </>
                  )}
                </label>
              </div>
              {fileSizeError && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fileSizeError}
                </p>
              )}
            </div>

            {/* 7. 이용약관 동의 체크 & 이용약관 보기 */}
            <div className="pt-2 pb-1 border-t border-white/10">
              <div className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-black/40 border-white/30 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-white/90">
                    [필수] AI음악 아티스트 음원 등록 및 서비스 이용약관 동의
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-bold underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
                >
                  <span>이용약관 보기</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* 월간 자동 삭제 룰 안내 문구 */}
              <p className="text-[10px] text-white/40 mt-2 leading-relaxed">
                ※ 음원을 업로드하고 한 달이 지난 후 월간 조회수 상위 300위 안에 들지 못하면 해당 곡은 AI음악 아티스트 테마에서 자동 삭제됩니다.
              </p>
            </div>

            {/* Bottom Buttons: 확인 & 취소 */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!agreeTerms || loading || isMaxCapacityReached}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 ${
                  agreeTerms && !loading && !isMaxCapacityReached
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 active:scale-95 cursor-pointer shadow-purple-500/25'
                    : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>업로드 중...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>확인</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 이용약관 팝업 모달 */}
      {showTermsModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#1a1c2e] border border-white/20 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative text-white max-h-[80vh] flex flex-col">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-black text-white">AI음악 아티스트 이용약관</h3>
            </div>

            {/* 약관 텍스트 내용 */}
            <div className="flex-1 overflow-y-auto pr-2 text-xs text-white/70 space-y-4 leading-relaxed border border-white/10 p-4 rounded-2xl bg-black/30 font-sans">
              
              {/* 섹션 1: 저작권 및 음원 업로드 정책 */}
              <div className="space-y-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                  <span>🎵</span>
                  <span>1. 저작권 및 음원 업로드 정책 (핵심 가이드라인)</span>
                </div>
                <p className="text-white/90 font-medium">
                  AI 아티스트 놀이터는 순수 AI 생성 창작 음악만을 위한 오픈 스트리밍 플랫폼입니다.
                </p>
                <div className="space-y-1.5 pl-1">
                  <p><strong className="text-white">1) 순수 AI 생성 음원 원칙 (무료/유료 플랜 무관)</strong><br />
                  Suno, Udio, AIVA, Stable Audio, MusicLM 등 AI 음악 생성 도구(무료 플랜 및 유료 플랜 모두 포함)로 직접 제작한 순수 창작 음원만 업로드할 수 있습니다. 업로드 시 생성에 사용된 정보는 사실에 기반해야 합니다.</p>

                  <p><strong className="text-rose-300">2) 커버곡 및 기존 발매곡 업로드 절대 금지 (발견 즉시 삭제)</strong><br />
                  기존 발매곡, 타인의 음악, 저작권이 있는 음원의 무단 커버(Cover), 리믹스, 샘플링, 부분 차용 음원은 업로드가 일체 불가합니다. 기존 유명 가수의 목소리·창법을 직접 모방하거나 타인의 저작권을 침해하는 음원은 엄격히 금지되며, 위반 사항이 확인되거나 신고가 접수될 경우 사전 통보 없이 즉시 영구 삭제 처리됩니다.</p>

                  <p><strong className="text-purple-300">3) 분쟁 발생 시 'AI 제작 원본 링크' 제시 의무</strong><br />
                  등록된 음원에 대해 저작권, 표절, 소유권 분쟁 또는 타인 권리 침해 신고가 접수될 경우, 업로더는 해당 곡의 AI 생성 도구 내 원본 생성 링크(Public Link), 생성 프롬프트 및 작업 이력 등 객관적인 소명 자료를 제시할 의무를 집니다. 기한 내에 AI 생성 링크 및 적법한 증거를 제시하지 못하는 경우 해당 음원은 즉시 삭제되며 영구 재업로드가 제한됩니다.</p>

                  <p><strong className="text-white">4) 신고 접수 및 즉시 처리 절차</strong><br />
                  권리 침해 신고 접수 시 서비스 안정성과 권리자 보호를 위해 해당 음원은 우선 비공개 또는 즉시 삭제 조치됩니다. 소명 절차가 완료되어 적법성이 입증된 경우에 한해 게시가 재개될 수 있습니다.</p>
                </div>
              </div>

              {/* 섹션 2: 서비스 이용약관 */}
              <div className="space-y-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-sm">
                  <span>📜</span>
                  <span>2. 서비스 이용약관</span>
                </div>
                <div className="space-y-1.5 pl-1">
                  <p><strong className="text-white">제1조 (목적 및 서비스 정의)</strong><br />
                  본 약관은 AI 아티스트 놀이터(이하 "서비스")가 제공하는 AI 음악 스트리밍, 음원 등록, 월간 HOT 100 차트 집계 및 링크 공유 기능의 이용 조건과 절차, 권리와 의무를 규정함을 목적으로 합니다.</p>

                  <p><strong className="text-white">제2조 (음원 등록 및 관리)</strong><br />
                  1. 이용자는 별도의 회원가입 절차 없이 전화번호와 비밀번호 기반의 간편 인증을 통해 본인의 AI 음원을 직접 등록하고 삭제할 수 있습니다.<br />
                  2. 닉네임 설정 시 시스템 관리자 전용 특정 명칭(예: '놀이터' 등) 및 미풍양속을 해치는 단어는 사용이 제한될 수 있습니다.<br />
                  3. 등록된 음원의 정보(곡명, 닉네임, 채널 링크, 곡 소개 등)는 사실에 부합해야 하며 허위 정보 기재 시 삭제 대상이 됩니다.</p>

                  <p><strong className="text-white">제3조 (콘텐츠의 이용허락)</strong><br />
                  1. 회원이 서비스에 업로드한 음원 및 메타데이터는 서비스 내에서의 재생(스트리밍), 순위 집계(월간 HOT 100 차트 등), 플레이리스트 포함, 검색 및 플랫폼 홍보 목적으로 저장·표시·전송될 수 있으며, 회원은 이에 필요한 범위의 비독점적 이용허락을 플랫폼에 부여합니다.<br />
                  2. 등록자가 직접 삭제하거나 관리자에 의해 삭제된 경우, 서비스 내 스트리밍 및 저장소에서 음원 물리 파일과 메타데이터가 영구 파기됩니다.</p>

                  <p><strong className="text-white">제4조 (월간 랭킹 및 자동 관리 정책)</strong><br />
                  업로드 가능한 음원은 최대 10MB 이내의 MP3 파일이어야 하며, AI음악 아티스트 테마 전체 최대 등록 곡 수는 1,000곡으로 제한됩니다. 또한 음원을 업로드하고 1개월(30일)이 경과한 시점에 월간 누적 조회수 상위 300위 안에 진입하지 못한 음원은 서비스 품질 및 트래픽 유지를 위해 AI음악 아티스트 테마에서 자동 삭제 처리됩니다.</p>

                  <p><strong className="text-white">제5조 (관리자 권한 및 제재)</strong><br />
                  운영자는 순수 AI 제작물이 아니거나 기존 발매곡, 커버곡, 무단 샘플링 곡인 경우, 타인의 권리를 침해한 경우, 분쟁 시 정당한 AI 제작 원본 링크를 제시하지 못한 경우, 어뷰징 행위 등이 확인될 시 사전 통지 없이 해당 음원을 임의로 삭제하거나 접속을 차단할 수 있습니다.</p>

                  <p><strong className="text-white">제6조 (이용자의 법적 책임 및 면책)</strong><br />
                  1. 업로드된 음원으로 인해 발생하는 제3자와의 저작권 분쟁, 민·형사상 손해배상 청구 등 모든 법적 분쟁의 일차적 책임은 음원을 업로드한 당사자에게 있습니다.<br />
                  2. 서비스는 이용자가 등록한 콘텐츠의 진실성이나 적법성을 사전 보증하지 않으며, 관계 법령과 내부 운영 기준에 따른 신고 접수 및 신속한 삭제 조치를 충실히 수행합니다.</p>
                </div>
              </div>

              {/* 섹션 3: 개인정보 처리방침 */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                  <span>🔒</span>
                  <span>3. 개인정보 처리방침</span>
                </div>
                <div className="space-y-1.5 pl-1">
                  <p><strong className="text-white">1) 수집하는 정보 항목</strong><br />
                  • 음원 등록 시: 필수(전화번호, 비밀번호 - 본인 확인 및 삭제 인증용, 음원 파일 MP3, 곡 제목), 선택(닉네임, 채널 URL, 곡 소개글)<br />
                  • 서비스 이용 중 생성/저장: 누적 방문 횟수, 곡별 실시간 재생 횟수, 브라우저 로컬 저장소(localStorage) 설정 데이터<br />
                  <span className="text-white/50 text-[11px]">※ 별도의 회원가입 아이디/이메일, 주민등록번호, 결제 수단 정보 등은 일체 수집하지 않습니다.</span></p>

                  <p><strong className="text-white">2) 개인정보 수집 및 이용 목적</strong><br />
                  • 등록된 음원의 본인 확인 및 본인 요청에 따른 음원 삭제 권한 검증<br />
                  • 저작권 분쟁 및 권리 침해 신고 발생 시 업로더 식별 및 소명 안내<br />
                  • 실시간 차트 집계, 재생 횟수 통계 산출 및 서비스 어뷰징 방지</p>

                  <p><strong className="text-white">3) 개인정보의 보유 및 파기 절차</strong><br />
                  • 음원 삭제 시 즉시 파기: 등록자가 직접 비밀번호 인증을 통해 음원을 삭제하거나 관리자 조치로 삭제되는 즉시, 보관된 전화번호와 비밀번호를 포함한 모든 메타데이터와 음원 파일이 영구 파기됩니다.<br />
                  • 관계 법령에 따른 별도의 보존 의무가 없는 한, 목적이 달성된 개인정보는 지체 없이 안전하게 파기됩니다.</p>
                </div>
              </div>

            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setAgreeTerms(true);
                  setShowTermsModal(false);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition cursor-pointer"
              >
                약관에 동의하고 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MusicRegisterModal;
