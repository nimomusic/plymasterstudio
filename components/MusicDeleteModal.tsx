import React, { useState } from 'react';
import { X, Trash2, AlertCircle, Check, KeyRound, Phone, Music } from 'lucide-react';
import { PopTrackItem } from './BillboardPopView';

interface MusicDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (trackId: string) => void;
  targetTrack: PopTrackItem | null;
}

export const MusicDeleteModal: React.FC<MusicDeleteModalProps> = ({
  isOpen,
  onClose,
  onDeleteSuccess,
  targetTrack,
}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !targetTrack) return null;

  // 전화번호 010 포맷팅 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.startsWith('010')) {
      raw = raw.substring(3);
    }
    const digits = raw.substring(0, 8);
    if (digits.length === 0) {
      setPhone('');
    } else if (digits.length <= 4) {
      setPhone(`010-${digits}`);
    } else if (digits.length <= 7) {
      setPhone(`010-${digits.slice(0, 3)}-${digits.slice(3)}`);
    } else {
      setPhone(`010-${digits.slice(0, 4)}-${digits.slice(4)}`);
    }
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 전화번호 비교 (숫자만 추출해서 비교)
    const inputPhoneDigits = phone.replace(/[^0-9]/g, '');
    const trackPhoneDigits = (targetTrack.phone || '').replace(/[^0-9]/g, '');

    // 관리자 마스터 번호/비밀번호 체크 (010-7430-0527 / u3589f7)
    const isAdmin = inputPhoneDigits === '01074300527' && password === 'u3589f7';

    if (!isAdmin) {
      // 기본 등록 음원(샘플)인 경우 안내
      if (!targetTrack.phone && !targetTrack.password) {
        setErrorMessage('시스템 기본 등록 음원은 삭제할 수 없습니다. 사용자가 직접 등록한 음원만 삭제 가능합니다.');
        return;
      }

      if (inputPhoneDigits !== trackPhoneDigits) {
        setErrorMessage('등록된 전화번호와 일치하지 않습니다.');
        return;
      }

      if (password !== targetTrack.password) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onDeleteSuccess(targetTrack.id);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#181a28] border border-red-500/30 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
          <div className="w-11 h-11 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">음원 삭제</h3>
            <p className="text-xs text-white/60">본인 인증 후 선택한 음원을 삭제합니다.</p>
          </div>
        </div>

        {/* Selected Track Preview */}
        <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
            <Music className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{targetTrack.title}</p>
            <p className="text-[11px] text-white/50 truncate">
              아티스트: {targetTrack.nickname || targetTrack.genreTag} ({targetTrack.duration})
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleDeleteSubmit} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-white/80 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>등록 시 입력한 전화번호</span>
            </label>
            <input
              type="text"
              required
              placeholder="010-1234-5678"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-red-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span>등록 시 설정한 비밀번호</span>
            </label>
            <input
              type="password"
              required
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 focus:border-red-400 rounded-xl text-white placeholder-white/30 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl font-bold text-xs bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 transition active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              {loading ? (
                <span>삭제 확인 중...</span>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>삭제 확인</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MusicDeleteModal;
