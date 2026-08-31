import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  ListMusic, 
  Disc3, 
  Sparkles, 
  Repeat,
  Flame,
  Coffee,
  Headphones,
  Radio,
  PlusCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  Trophy,
  ChevronDown,
  ExternalLink,
  Trash2
} from 'lucide-react';
import MusicRegisterModal from './MusicRegisterModal';
import MusicDeleteModal from './MusicDeleteModal';
import { deleteMp3FromR2, saveUserTracksToR2, fetchUserTracksFromR2, R2TrackItem } from '../lib/uploadAction';

interface BillboardPopViewProps {
  setView?: (view: any) => void;
  standalone?: boolean;
}

export interface PopTrackItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  genreTag?: string;
  nickname?: string;
  channelUrl?: string;
  description?: string;
  albumId: string;
  /* 하이퍼링크넣는 곳: 실제 mp3 파일 또는 스트리밍 링크 URL */
  audioUrl: string;
  phone?: string;
  password?: string;
  createdAt?: number;
}

export interface AlbumCategory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconType: 'hot100' | 'artist' | 'hiphop' | 'jazz' | 'pop';
  accentColor: string;
  bgGlow: string;
  tags: string[];
  bgImage?: string;
}

// ==================================================================================
// 💽 앨범 목록 정의 (첫 번째: HOT 100 차트, 두 번째: AI음악 아티스트, ...)
// 1. HOT 100 차트 (AI음악 아티스트 앨범 조회수 상위 100곡)
// 2. AI음악 아티스트
// 3. 느좋 인스타 감성힙합
// 4. 빈티지 재즈
// 5. 트렌디 팝송
// ==================================================================================
export const HOT_100_ALBUM: AlbumCategory = {
  id: 'hot100',
  title: '월간 HOT 100 차트',
  subtitle: '접속일 기준 최근 한 달간 누적 조회순 실시간 랭킹',
  badge: '월간 차트',
  iconType: 'hot100',
  accentColor: '#F43F5E',
  bgGlow: 'from-[#F43F5E]/20 to-[#EC4899]/10',
  tags: ['#월간HOT100', '#인기순위', '#한달누적조회', '#AI음악차트'],
  bgImage: '/hiphop.jpeg',
};

export const GENRE_ALBUMS: AlbumCategory[] = [
  {
    id: 'artist',
    title: 'AI음악 아티스트',
    subtitle: '독창적인 AI 뮤지션들의 공식 시그니처 트랙',
    badge: '아티스트 공식',
    iconType: 'artist',
    accentColor: '#A855F7',
    bgGlow: 'from-[#A855F7]/20 to-[#EC4899]/10',
    tags: ['#AI아티스트', '#신곡', '#창작곡', '#버추얼뮤직'],
    bgImage: '/hiphop.jpeg',
  },
  {
    id: 'hiphop',
    title: '느좋 인스타 감성힙합',
    subtitle: '감성 알앤비 & 칠한 인스타 릴스 힙합',
    badge: '인스타 릴스 추천',
    iconType: 'hiphop',
    accentColor: '#EC4899',
    bgGlow: 'from-[#EC4899]/20 to-[#8B5CF6]/10',
    tags: ['#인스타감성', '#칠힙합', '#알앤비', '#새벽감성', '#릴스음악'],
    bgImage: '/hiphop.jpeg',
  },
  {
    id: 'jazz',
    title: '빈티지 재즈',
    subtitle: '비 오는 날 카페 & 고급스러운 레트로 라운지',
    badge: '카페 & 힐링',
    iconType: 'jazz',
    accentColor: '#F59E0B',
    bgGlow: 'from-[#F59E0B]/20 to-[#D97706]/10',
    tags: ['#빈티지재즈', '#카페음악', '#스윙', '#보사노바', '#LP감성'],
    bgImage: '/jazz.jpeg',
  },
  {
    id: 'pop',
    title: '트렌디 팝송',
    subtitle: '글로벌 빌보드 차트 & 쇼츠 바이럴 비트',
    badge: '빌보드 핫차트',
    iconType: 'pop',
    accentColor: '#06B6D4',
    bgGlow: 'from-[#06B6D4]/20 to-[#3B82F6]/10',
    tags: ['#트렌디팝', '#신스웨이브', '#쇼츠바이럴', '#드라이브', '#댄스'],
    bgImage: '/pop.jpeg',
  },
];

export const ALBUMS: AlbumCategory[] = [HOT_100_ALBUM, ...GENRE_ALBUMS];

// ==================================================================================
// 🎵 [하이퍼링크넣는 곳] 앨범별 트랙 리스트 & 음원 링크 데이터
// ==================================================================================
export const ALBUM_TRACKS: Record<string, PopTrackItem[]> = {
  // 1. AI음악 아티스트 앨범 트랙
  artist: [
    {
      id: 'artist-1',
      number: '01',
      title: 'Just Like This',
      duration: '02:59',
      genreTag: 'AI 아티스트',
      description: 'Neo-Soul R&B 트렌디 사운드',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/chillrnb/Just Like This.mp3',
    },
    {
      id: 'artist-2',
      number: '02',
      title: 'Inner Tide',
      duration: '03:20',
      genreTag: 'AI 아티스트',
      description: 'Ethereal R&B 몽환적인 보컬 선율',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/chillrnb/Inner Tide.mp3',
    },
    {
      id: 'artist-3',
      number: '03',
      title: 'Sweet Observance',
      duration: '03:09',
      genreTag: 'AI 아티스트',
      description: '감각적인 비트메이킹과 네오소울 바이브',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/chillrnb/Sweet Observance.mp3',
    },
    {
      id: 'artist-4',
      number: '04',
      title: 'Mood drip',
      duration: '03:08',
      genreTag: 'AI 아티스트',
      description: '부드러운 기타 루프와 감각적인 808 베이스라인',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Mood Drip.mp3',
    },
    {
      id: 'artist-5',
      number: '05',
      title: 'Same Script',
      duration: '02:35',
      genreTag: 'AI 아티스트',
      description: '80년대 레트로 신스웨이브 베이스',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Same Script.mp3',
    },
    {
      id: 'artist-6',
      number: '06',
      title: 'A Soft Surrender',
      duration: '04:28',
      genreTag: 'AI 아티스트',
      description: '따뜻한 콘트라베이스와 피아노 선율',
      albumId: 'artist',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/A Soft Surrender.mp3',
    },
  ],

  // 2. 느좋 인스타 감성힙합 앨범 트랙
  hiphop: [
    {
      id: 'hiphop-1',
      number: '01',
      title: 'Mood drip',
      duration: '03:08',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Mood Drip.mp3',
    },
    {
      id: 'hiphop-2',
      number: '02',
      title: 'Daydream',
      duration: '03:05',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Daydream.mp3',
    },
    {
      id: 'hiphop-3',
      number: '03',
      title: 'Soft Drizzle',
      duration: '02:50',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Soft Drizzle.mp3',
    },
    {
      id: 'hiphop-4',
      number: '04',
      title: '우산 없는 밤',
      duration: '04:02',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/우산 없는 밤.mp3',
    },
    {
      id: 'hiphop-5',
      number: '05',
      title: '읽히지 않아',
      duration: '03:03',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/읽히지 않아.mp3',
    },
    {
      id: 'hiphop-6',
      number: '06',
      title: '환상통',
      duration: '03:12',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/환상통.mp3',
    },
    {
      id: 'hiphop-7',
      number: '07',
      title: '상상',
      duration: '03:29',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/상상.mp3',
    },
    {
      id: 'hiphop-8',
      number: '08',
      title: '착각',
      duration: '02:28',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/착각.mp3',
    },
    {
      id: 'hiphop-9',
      number: '09',
      title: 'Drift',
      duration: '03:06',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Drift.mp3',
    },
    {
      id: 'hiphop-10',
      number: '10',
      title: 'Uncharted Still',
      duration: '03:14',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Uncharted Still.mp3',
    },
    {
      id: 'hiphop-11',
      number: '11',
      title: 'Hazy View',
      duration: '02:51',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Hazy View.mp3',
    },
    {
      id: 'hiphop-12',
      number: '12',
      title: 'Frozen Frame',
      duration: '03:06',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/instarnb/Frozen Frame.mp3',
    },
  ],

  // 3. 빈티지 재즈 앨범 트랙
  jazz: [
    {
      id: 'jazz-1',
      number: '01',
      title: 'A Soft Surrender',
      duration: '04:28',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/A Soft Surrender.mp3',
    },
    {
      id: 'jazz-2',
      number: '02',
      title: 'Soft Drift',
      duration: '03:27',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Soft Drift.mp3',
    },
    {
      id: 'jazz-3',
      number: '03',
      title: 'Where Thoughts Linger',
      duration: '03:53',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Where Thoughts Linger.mp3',
    },
    {
      id: 'jazz-4',
      number: '04',
      title: 'A Soft Place to Be',
      duration: '03:23',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/A Soft Place to Be.mp3',
    },
    {
      id: 'jazz-5',
      number: '05',
      title: 'Softest Hours',
      duration: '04:14',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Softest Hours.mp3',
    },
    {
      id: 'jazz-6',
      number: '06',
      title: 'Soft Exhale',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Soft Exhale.mp3',
    },
    {
      id: 'jazz-7',
      number: '07',
      title: 'Deepening Sigh',
      duration: '02:31',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Deepening Sigh.mp3',
    },
    {
      id: 'jazz-8',
      number: '08',
      title: 'Somnus',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Somnus.mp3',
    },
    {
      id: 'jazz-9',
      number: '09',
      title: 'Quiet Resonance',
      duration: '04:53',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Quiet Resonance.mp3',
    },
    {
      id: 'jazz-10',
      number: '10',
      title: 'A Gentle Murmur',
      duration: '03:58',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/A Gentle Murmur.mp3',
    },
    {
      id: 'jazz-11',
      number: '11',
      title: 'Hush',
      duration: '04:16',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Hush.mp3',
    },
    {
      id: 'jazz-12',
      number: '12',
      title: 'Sanctuary',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/vintagejazz/Sanctuary.mp3',
    },
  ],

  // 4. 트렌디 팝송 앨범 트랙
  pop: [
    {
      id: 'pop-1',
      number: '01',
      title: 'Same Script',
      duration: '02:35',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Same Script.mp3',
    },
    {
      id: 'pop-2',
      number: '02',
      title: 'Sweet Tide',
      duration: '03:06',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Sweet Tide.mp3',
    },
    {
      id: 'pop-3',
      number: '03',
      title: 'Sweet Fix',
      duration: '03:01',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Sweet Fix.mp3',
    },
    {
      id: 'pop-4',
      number: '04',
      title: 'Lose My Number',
      duration: '02:13',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Lose My Number.mp3',
    },
    {
      id: 'pop-5',
      number: '05',
      title: 'Heated Silence',
      duration: '03:07',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Heated Silence.mp3',
    },
    {
      id: 'pop-6',
      number: '06',
      title: 'Say It First',
      duration: '02:59',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Say It First.mp3',
    },
    {
      id: 'pop-7',
      number: '07',
      title: 'I Hate Your New Girl',
      duration: '02:42',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/I Hate Your New Girl.mp3',
    },
    {
      id: 'pop-8',
      number: '08',
      title: 'Call Me Back',
      duration: '02:15',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Call Me Back.mp3',
    },
    {
      id: 'pop-9',
      number: '09',
      title: 'I Heard You Breathe',
      duration: '03:07',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/I Heard You Breathe.mp3',
    },
    {
      id: 'pop-10',
      number: '10',
      title: 'Blindside',
      duration: '02:28',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Blindside.mp3',
    },
    {
      id: 'pop-11',
      number: '11',
      title: 'Cold Radius',
      duration: '02:27',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/Cold Radius.mp3',
    },
    {
      id: 'pop-12',
      number: '12',
      title: 'V.I.P. Zone',
      duration: '02:21',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://pub-bc94af244b17445b87f52262786affae.r2.dev/trendypop/VIP Zone.mp3',
    },
  ],
};

export type TrackSortOption = 'default' | 'views' | 'latest';

export const BillboardPopView: React.FC<BillboardPopViewProps> = ({ setView, standalone = false }) => {
  // 현재 선택된 앨범 ID (URL 파라미터 우선, 기본: 'hot100' -> 월간 HOT 100 차트)
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const alb = params.get('album');
      if (alb && ALBUMS.some(a => a.id === alb)) return alb;
    } catch {}
    return 'hot100';
  });

  // 정렬 옵션 상태 ('default': 트랙순 (기본) | 'views': 조회순 | 'latest': 최신순)
  const [sortBy, setSortBy] = useState<TrackSortOption>('default');

  // 현재 선택된 앨범 객체
  const currentAlbum = ALBUMS.find(a => a.id === selectedAlbumId) || ALBUMS[0];

  // 1. 각 곡별 전체 누적 재생 횟수 (로컬스토리지 즉시 영구 저장 + 글로벌 클라우드 서버 + 로컬 서버 동기화)
  const [playCounts, setPlayCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('nimo_music_play_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 1-1. 사용자가 직접 등록한 AI음악 아티스트 음원 목록 (로컬스토리지 & 서버 동기화)
  const [userTracks, setUserTracks] = useState<PopTrackItem[]>(() => {
    try {
      const saved = localStorage.getItem('nimo_music_user_tracks');
      if (saved) {
        const parsed: PopTrackItem[] = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {}
    return [];
  });

  // 🚀 [한 달 경과 & 월간 조회순 300위 밖 자동 삭제 로직]
  // 업로드 후 30일(1개월)이 지났을 때 조회수 300위 안에 들지 못하면 자동 삭제
  useEffect(() => {
    if (!userTracks.length) return;

    const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    // 전체 AI 아티스트 트랙(기본 + 사용자)을 조회수 순으로 정렬하여 상위 300위 ID Set 생성
    const allTracks = [...(ALBUM_TRACKS['artist'] || []), ...userTracks];
    const sortedByViews = [...allTracks].sort((a, b) => {
      const countA = playCounts[a.id] || 0;
      const countB = playCounts[b.id] || 0;
      return countB - countA;
    });
    const top300Ids = new Set(sortedByViews.slice(0, 300).map(t => t.id));

    // 필터링: 1개월 미만이거나, 1개월이 넘었어도 상위 300위 안에 있는 곡만 유지
    const filteredUserTracks = userTracks.filter(t => {
      const createdAt = t.createdAt || now;
      const isOlderThanOneMonth = (now - createdAt) > ONE_MONTH_MS;
      if (!isOlderThanOneMonth) return true;
      return top300Ids.has(t.id);
    });

    if (filteredUserTracks.length !== userTracks.length) {
      setUserTracks(filteredUserTracks);
      try {
        localStorage.setItem('nimo_music_user_tracks', JSON.stringify(filteredUserTracks));
      } catch {}
    }
  }, [playCounts]);

  // 2. 방문자 카운트 (VISIT, 접속 시 즉시 +1 누적 저장 및 글로벌 서버 연동)
  const [visitCount, setVisitCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('nimo_music_visit_count');
      const current = saved ? parseInt(saved, 10) : 0;
      const nextCount = isNaN(current) || current < 1 ? 1 : current + 1;
      localStorage.setItem('nimo_music_visit_count', String(nextCount));
      return nextCount;
    } catch {
      return 1;
    }
  });

  // 🚀 [전 세계 실시간 글로벌 카운터 + R2 버킷 전역 음원 카탈로그 동기화]
  // 어느 사용자, 어느 기기, 어느 브라우저에서 접속하든 실시간 공통 누적 & 등록 음원 공유
  useEffect(() => {
    let isMounted = true;
    const NAMESPACE = 'nimomusic_ai_chart_v2';

    // 1) 공개 글로벌 클라우드 카운터 API (어느 환경, 깃허브 배포, 모바일, PC 어디서든 전 세계 공통 누적)
    fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/site_visits`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted || !data) return;
        const val = data.value || data.count;
        if (typeof val === 'number') {
          setVisitCount(prev => {
            const finalCount = Math.max(prev, val);
            try { localStorage.setItem('nimo_music_visit_count', String(finalCount)); } catch {}
            return finalCount;
          });
        }
      })
      .catch(() => {});

    // 2) ☁️ Cloudflare R2 버킷('artist')에 저장된 전 세계 공통 사용자 등록 음원 메타데이터 실시간 로드 (글로벌 단일 진실 공급원)
    fetchUserTracksFromR2()
      .then((r2Tracks) => {
        if (!isMounted) return;
        if (Array.isArray(r2Tracks)) {
          setUserTracks(r2Tracks as PopTrackItem[]);
          try { localStorage.setItem('nimo_music_user_tracks', JSON.stringify(r2Tracks)); } catch {}
        }
      })
      .catch(() => {});

    // 3) 백엔드 서버가 있는 경우 카운트 및 로컬 동기화
    fetch(`/api/count/visit?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted || !data) return;
        if (typeof data.visit === 'number') {
          setVisitCount(prev => {
            const finalCount = Math.max(prev, data.visit);
            try { localStorage.setItem('nimo_music_visit_count', String(finalCount)); } catch {}
            return finalCount;
          });
        }
        if (data.plays && typeof data.plays === 'object') {
          setPlayCounts(prev => {
            const merged = { ...data.plays, ...prev };
            try { localStorage.setItem('nimo_music_play_counts', JSON.stringify(merged)); } catch {}
            return merged;
          });
        }
        // 백엔드에 사용자 트랙이 있고 R2 로드가 아직 안되었거나 백엔드가 최신일 때만 보조 적용
        if (Array.isArray(data.userTracks)) {
          setUserTracks(prev => {
            // 이미 R2에서 로드된 상태가 있다면 R2 우선, 없으면 서버 데이터 활용
            if (prev.length > 0) return prev;
            try { localStorage.setItem('nimo_music_user_tracks', JSON.stringify(data.userTracks)); } catch {}
            return data.userTracks;
          });
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  // 현재 선택된 앨범의 기본 트랙 리스트 (기본곡 + 사용자 등록곡 합산)
  const rawAlbumTracks = useMemo(() => {
    if (selectedAlbumId === 'hot100') {
      const baseTracks = [...(ALBUM_TRACKS['artist'] || [])];
      return [...baseTracks, ...userTracks];
    }
    if (selectedAlbumId === 'artist') {
      const baseTracks = [...(ALBUM_TRACKS['artist'] || [])];
      return [...baseTracks, ...userTracks];
    }
    return ALBUM_TRACKS[selectedAlbumId] || [];
  }, [selectedAlbumId, userTracks]);

  // 정렬 옵션이 적용된 현재 앨범 트랙 목록 (재생 시 순서가 뒤죽박죽되지 않도록 안정적 정렬 유지)
  const currentAlbumTracks = useMemo(() => {
    const list = [...rawAlbumTracks];

    if (selectedAlbumId === 'hot100') {
      // HOT 100 차트: 기본적으로 조회수 내림차순 정렬하되, 트랙 번호 기준으로 안정성 유지
      return list.sort((a, b) => {
        const countA = playCounts[a.id] || 0;
        const countB = playCounts[b.id] || 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return a.number.localeCompare(b.number);
      });
    }

    if (sortBy === 'views') {
      return list.sort((a, b) => {
        const countA = playCounts[a.id] || 0;
        const countB = playCounts[b.id] || 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return a.number.localeCompare(b.number);
      });
    } else if (sortBy === 'latest') {
      return list.reverse();
    }

    // 'default' (기본): 01, 02, 03... 고유 트랙 번호 순서 유지 (재생해도 순서가 튀지 않고 고정)
    return list;
  }, [rawAlbumTracks, sortBy, selectedAlbumId, sortBy === 'views' ? playCounts : null]);

  // 전체 선택 기본 체크해제 (빈 배열 [])
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 현재 재생 중인 트랙 정보
  const [currentTrack, setCurrentTrack] = useState<PopTrackItem | null>(() => {
    return ALBUM_TRACKS['artist']?.[0] || ALBUM_TRACKS['hiphop']?.[0] || null;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [totalDuration, setTotalDuration] = useState<string>('00:00');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [isAutoRepeat, setIsAutoRepeat] = useState<boolean>(true);

  // 음원등록 모달 및 음원삭제 모달 상태
  const [showRegisterPopup, setShowRegisterPopup] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [trackToDelete, setTrackToDelete] = useState<PopTrackItem | null>(null);

  // 음원 등록 성공 처리 함수
  const handleRegisterSuccess = async (newTrack: PopTrackItem) => {
    const updated = [...userTracks.filter(t => t.id !== newTrack.id), newTrack];
    setUserTracks(updated);
    try {
      localStorage.setItem('nimo_music_user_tracks', JSON.stringify(updated));
    } catch {}

    // ☁️ 1. Cloudflare R2 버킷('artist/user_tracks.json')에 즉시 저장하여 전 세계 모든 기기/유저와 공통 공유
    try {
      await saveUserTracksToR2(updated as R2TrackItem[]);
    } catch (r2Err) {
      console.warn('R2 user_tracks.json 저장 알림:', r2Err);
    }

    // 2. 서버로도 저장 동기화 시도
    fetch('/api/tracks/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrack),
    }).catch(() => {});

    setShowRegisterPopup(false);
    // 등록된 곡을 즉시 재생
    startPlayingTrack(newTrack);
  };

  // 음원 삭제 성공 처리 함수
  const handleDeleteSuccess = async (trackId: string) => {
    const target = trackToDelete || userTracks.find(t => t.id === trackId);

    // 🗑️ 1. Cloudflare R2 스토리지('artist' 버킷)에서 실제 MP3 물리 파일 영구 삭제
    if (target?.audioUrl) {
      try {
        await deleteMp3FromR2(target.audioUrl);
      } catch (r2Err) {
        console.warn('Cloudflare R2 버킷 파일 삭제 요청:', r2Err);
      }

      // 프록시 서버 삭제도 백업으로 동시 실행
      fetch('/api/r2/delete-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl: target.audioUrl }),
      }).catch(() => {});
    }

    const updated = userTracks.filter(t => t.id !== trackId);
    setUserTracks(updated);
    try {
      localStorage.setItem('nimo_music_user_tracks', JSON.stringify(updated));
    } catch {}

    // ☁️ 2. Cloudflare R2 버킷('artist/user_tracks.json')에서도 해당 곡 제거하여 전 세계 동기화
    try {
      await saveUserTracksToR2(updated as R2TrackItem[]);
    } catch (r2Err) {
      console.warn('R2 user_tracks.json 갱신 알림:', r2Err);
    }

    // 3. 서버로도 삭제 동기화 시도
    if (target) {
      fetch('/api/tracks/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId,
          phone: target.phone,
          password: target.password,
          audioUrl: target.audioUrl,
        }),
      }).catch(() => {});
    }

    if (currentTrack?.id === trackId) {
      handleStopTrack();
    }
    setSelectedIds(prev => prev.filter(id => id !== trackId));
    setShowDeleteModal(false);
    setTrackToDelete(null);
  };

  // 곡 재생 횟수 증가 함수 (글로벌 클라우드 카운터 + 로컬 서버 + 로컬스토리지 3중 저장)
  const incrementPlayCount = (trackId: string) => {
    const NAMESPACE = 'nimomusic_ai_chart_v2';
    const cleanTrackKey = trackId.replace(/[^a-zA-Z0-9_-]/g, '_');

    // 1. UI 및 로컬스토리지 즉시 +1 반영 (0ms 지연)
    setPlayCounts(prev => {
      const nextCount = (prev[trackId] || 0) + 1;
      const updated = { ...prev, [trackId]: nextCount };
      try {
        localStorage.setItem('nimo_music_play_counts', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 2. 전 세계 공통 공개 글로벌 클라우드 카운터에 +1 누적 (깃허브/모바일/PC 어디서든 동기화)
    fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/play_${cleanTrackKey}`)
      .then(res => res.json())
      .then(data => {
        const val = data?.value || data?.count;
        if (typeof val === 'number') {
          setPlayCounts(prev => {
            const finalCount = Math.max(prev[trackId] || 0, val);
            const updated = { ...prev, [trackId]: finalCount };
            try { localStorage.setItem('nimo_music_play_counts', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }
      })
      .catch(() => {});

    // 3. 백엔드 서버 store.json에 +1 저장 요청 (자체 서버 환경 지원)
    fetch('/api/count/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackId }),
    }).catch(() => {});
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const albumScrollRef = useRef<HTMLDivElement | null>(null);

  // 앨범 선택 가로 스크롤 이동 함수
  const scrollAlbums = (direction: 'left' | 'right') => {
    if (albumScrollRef.current) {
      const scrollAmount = 280;
      albumScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 현재 활성화된 재생 큐 (선택된 곡들 중 현재 앨범에 속한 곡 목록)
  const activePlaylist = currentAlbumTracks.filter(t => selectedIds.includes(t.id));

  // 현재 앨범 내 전체 선택 여부
  const isAllSelected = currentAlbumTracks.length > 0 && 
    currentAlbumTracks.every(t => selectedIds.includes(t.id));
  
  const selectedCountInCurrentAlbum = activePlaylist.length;
  const isPartiallySelected = selectedCountInCurrentAlbum > 0 && !isAllSelected;

  // 앨범/테마 변경 핸들러
  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
    
    // 변경 시 기본 선택 해제
    setSelectedIds([]);
    
    // 기본 트랙 순서(01, 02, 03...)로 정렬 옵션 설정 (재생 시 섞임 방지)
    setSortBy('default');
  };

  // 전체 선택 토글
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !currentAlbumTracks.some(t => t.id === id)));
    } else {
      const newIds = new Set([...selectedIds, ...currentAlbumTracks.map(t => t.id)]);
      setSelectedIds(Array.from(newIds));
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

  // 장르별 Web Audio Synth 데모 미리듣기
  const playSynthPreview = (albumType?: string) => {
    stopSynthAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const type = albumType || selectedAlbumId;
      const freqs = type === 'jazz' 
        ? [261.63, 311.13, 392.00, 466.16, 523.25]
        : type === 'pop'
        ? [329.63, 392.00, 493.88, 587.33, 659.25]
        : [220.00, 261.63, 329.63, 392.00, 440.00];

      let step = 0;

      const playChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = freqs[step % freqs.length];

        osc.type = type === 'jazz' ? 'triangle' : type === 'pop' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const masterVol = isMuted ? 0 : volume * 0.12;
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(masterVol, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (type === 'jazz' ? 1.5 : 1.2));

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + (type === 'jazz' ? 1.6 : 1.3));
        step++;
      };

      playChord();
      synthIntervalRef.current = window.setInterval(playChord, type === 'jazz' ? 750 : 600);
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

    // 재생 횟수 +1
    incrementPlayCount(track.id);

    if (track.audioUrl && track.audioUrl.trim() !== '') {
      setIsDemoMode(false);
      stopSynthAudio();
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current.src = track.audioUrl;
          audioRef.current.load();
          audioRef.current.volume = isMuted ? 0 : volume;
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn("Audio playback fallback to synth:", err);
              setIsDemoMode(true);
              playSynthPreview(track.albumId);
            });
          }
        } catch (e) {
          console.warn("Audio element play error:", e);
          setIsDemoMode(true);
          playSynthPreview(track.albumId);
        }
      }
    } else {
      setIsDemoMode(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      playSynthPreview(track.albumId);
    }
  };

  // 🔗 공유 링크를 통해 특정 곡(?track=ID)으로 접속한 경우 자동 선택/재생
  const initialTrackCheckedRef = useRef<boolean>(false);
  useEffect(() => {
    if (initialTrackCheckedRef.current) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const targetTrackId = params.get('track');
      if (targetTrackId) {
        const found = rawAlbumTracks.find(t => t.id === targetTrackId);
        if (found) {
          initialTrackCheckedRef.current = true;
          startPlayingTrack(found);
        }
      }
    } catch {}
  }, [rawAlbumTracks]);

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
      if (currentAlbumTracks.length > 0) {
        startPlayingTrack(currentAlbumTracks[0]);
      }
      return;
    }

    if (currentTrack && activePlaylist.some(t => t.id === currentTrack.id)) {
      if (isPlaying) {
        if (audioRef.current) audioRef.current.pause();
        stopSynthAudio();
        setIsPlaying(false);
      } else {
        startPlayingTrack(currentTrack);
      }
    } else {
      startPlayingTrack(activePlaylist[0]);
    }
  };

  // 다음 곡으로 이동 (순차 자동 재생)
  const handleNextTrack = () => {
    const queue = activePlaylist.length > 0 ? activePlaylist : currentAlbumTracks;
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      if (isAutoRepeat) {
        nextIndex = 0;
      } else {
        handleStopTrack();
        return;
      }
    }

    startPlayingTrack(queue[nextIndex]);
  };

  // 이전 곡으로 이동
  const handlePrevTrack = () => {
    const queue = activePlaylist.length > 0 ? activePlaylist : currentAlbumTracks;
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

  // 페이지 링크 복사
  const handleCopyLink = () => {
    try {
      const url = window.location.origin + window.location.pathname + `?view=pop&album=${selectedAlbumId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("Copy link failed", e);
    }
  };

  // 특정 곡 공유 링크 복사
  const handleShareTrack = (track: PopTrackItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const url = window.location.origin + window.location.pathname + `?view=pop&album=${track.albumId || selectedAlbumId}&track=${encodeURIComponent(track.id)}`;
      navigator.clipboard.writeText(url);
      setCopiedTrackId(track.id);
      setTimeout(() => {
        setCopiedTrackId((prev) => (prev === track.id ? null : prev));
      }, 2000);
    } catch (err) {
      console.warn("Track share copy failed:", err);
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

      {/* 음원등록 모달 */}
      <MusicRegisterModal
        isOpen={showRegisterPopup}
        onClose={() => setShowRegisterPopup(false)}
        onSuccess={handleRegisterSuccess}
        totalArtistTracksCount={rawAlbumTracks.length}
      />

      {/* 음원삭제 본인 인증 모달 */}
      <MusicDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTrackToDelete(null);
        }}
        onDeleteSuccess={handleDeleteSuccess}
        targetTrack={trackToDelete}
      />

      {/* Top Header Helper Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 ml-auto">
          {/* 방문자 수 카운터 (VISIT) */}
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium"
            title="누적 방문 횟수"
          >
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-wider">
              VISIT
            </span>
            <span className="font-mono text-white font-bold">{visitCount.toLocaleString()}</span>
          </div>
      
          {/* 페이지 링크 공유 */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-medium transition cursor-pointer"
            title="이 페이지 전용 링크 복사"
          >
            <Share2 className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>{copied ? '링크 복사 완료!' : '페이지 링크 공유'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio Grid Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* [LEFT COLUMN: 세로형 오디오 플레이어 랙] */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 w-full bg-[#121420]/95 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between sticky top-6">
          {/* Ambient Glow */}
          <div 
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-500" 
            style={{ backgroundColor: currentAlbum.accentColor }}
          />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Player Rack Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors" 
                  style={{ backgroundColor: currentAlbum.accentColor }}
                />
                <span 
                  className="text-xs font-mono font-bold uppercase tracking-widest transition-colors"
                  style={{ color: currentAlbum.accentColor }}
                >
                  STUDIO AUDIO RACK
                </span>
              </div>
              <button
                onClick={() => setIsAutoRepeat(!isAutoRepeat)}
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition cursor-pointer border ${
                  isAutoRepeat 
                    ? 'bg-white/10 text-white border-white/30' 
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
              <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#222738] bg-black shadow-2xl flex items-center justify-center transition-transform duration-700 ${
                isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}>
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-7 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                
                <div 
                  className="w-16 h-16 rounded-full p-1 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${currentAlbum.accentColor}, #8B5CF6)`
                  }}
                >
                  <Music className="w-6 h-6 text-white" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-tighter mt-0.5">PLYMASTER</span>
                </div>
              </div>

              {isPlaying && (
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-center gap-1 h-8 bg-black/40 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/10">
                  <span className="w-1 rounded-full animate-[bounce_0.5s_infinite_100ms] h-4" style={{ backgroundColor: currentAlbum.accentColor }} />
                  <span className="w-1 bg-[#F43F5E] rounded-full animate-[bounce_0.5s_infinite_300ms] h-6" />
                  <span className="w-1 bg-[#A855F7] rounded-full animate-[bounce_0.5s_infinite_200ms] h-3" />
                  <span className="w-1 bg-[#38BDF8] rounded-full animate-[bounce_0.5s_infinite_450ms] h-5" />
                  <span className="w-1 rounded-full animate-[bounce_0.5s_infinite_150ms] h-7" style={{ backgroundColor: currentAlbum.accentColor }} />
                  <span className="w-1 bg-[#F43F5E] rounded-full animate-[bounce_0.5s_infinite_350ms] h-4" />
                  <span className="w-1 bg-[#A855F7] rounded-full animate-[bounce_0.5s_infinite_250ms] h-5" />
                </div>
              )}
            </div>

            {/* Currently Playing Track Meta */}
            <div className="mb-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
                <span 
                  className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: `${currentAlbum.accentColor}20`,
                    borderColor: `${currentAlbum.accentColor}50`,
                    color: currentAlbum.accentColor
                  }}
                >
                  {isPlaying ? 'NOW PLAYING' : 'READY TO PLAY'}
                </span>
                {currentTrack && (
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    (currentTrack.phone && currentTrack.phone.replace(/[^0-9]/g, '') === '01074300527')
                      ? 'text-amber-300 bg-amber-500/20 border border-amber-400/40 shadow-sm shadow-amber-500/20'
                      : 'text-[#38BDF8] bg-[#0284c7]/15'
                  }`}>
                    {currentTrack.nickname || currentTrack.genreTag}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white truncate tracking-tight">
                {currentTrack ? currentTrack.title : '선택된 곡 없음'}
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                {currentAlbum.title} • 트랙 {currentTrack ? currentTrack.number : '00'}
              </p>
            </div>

            {/* Progress Bar & Seek */}
            <div className="mb-4">
              <div 
                onClick={handleSeek}
                className="w-full bg-white/10 hover:bg-white/20 h-2 rounded-full cursor-pointer relative overflow-hidden transition-all group"
              >
                <div 
                  className="h-full rounded-full relative transition-all duration-100"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(to right, ${currentAlbum.accentColor}, #A855F7)`
                  }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1.5">
                <span>{currentTime}</span>
                <span>{currentTrack ? (totalDuration !== '00:00' ? totalDuration : currentTrack.duration) : '00:00'}</span>
              </div>
            </div>

            {/* Main Audio Controls */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <button
                onClick={handlePrevTrack}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                title="이전 곡"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => currentTrack && handlePlayTrack(currentTrack)}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${currentAlbum.accentColor}, #db2777)`,
                  boxShadow: `0 10px 25px -5px ${currentAlbum.accentColor}40`
                }}
                title={isPlaying ? '일시정지' : '재생'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition cursor-pointer hover:scale-105 active:scale-95"
                title="다음 곡"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

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
                  <Volume2 className="w-4 h-4" style={{ color: currentAlbum.accentColor }} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full cursor-pointer h-1.5 bg-white/20 rounded-lg"
                style={{ accentColor: currentAlbum.accentColor }}
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
                <ListMusic className="w-4 h-4" style={{ color: currentAlbum.accentColor }} />
                <span>재생 대기열 ({activePlaylist.length}곡)</span>
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
                          ? 'bg-white/15 text-white font-bold border' 
                          : 'bg-white/5 hover:bg-white/10 text-white/70'
                      }`}
                      style={isCur ? { borderColor: `${currentAlbum.accentColor}60` } : {}}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-white/40">{idx + 1}</span>
                        <span className="truncate">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isCur && isPlaying && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full animate-ping" 
                            style={{ backgroundColor: currentAlbum.accentColor }}
                          />
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
        {/* [RIGHT COLUMN: 플리마스터 앨범 탭 선택 & 플레이리스트 목록] */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 w-full bg-[#141622]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Dynamic Ambient Glow */}
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none transition-all duration-500" 
            style={{ backgroundColor: currentAlbum.accentColor }}
          />

          {/* Card Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-5 mb-5 border-b border-white/10 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                <span className="text-2xl text-yellow-400 select-none">⚡</span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  AI 아티스트 놀이터
                </h1>
                <span 
                  className="text-xs font-bold px-3 py-1 rounded-full border transition-all"
                  style={{
                    backgroundColor: `${currentAlbum.accentColor}20`,
                    borderColor: `${currentAlbum.accentColor}50`,
                    color: currentAlbum.accentColor
                  }}
                >
                  {selectedAlbumId === 'hot100' ? '월간 HOT 100' : '오직 AI음악만'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed break-keep">
                AI 음악 크리에이터들이 자유롭게 교류하고 증명하는 공간, 감각적인 AI 오리지널 사운드를 무료로 스트리밍합니다.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 🔥 [상단 월간 HOT 100 차트 단독 한 줄 섹션] */}
          {/* ========================================================================= */}
          <div className="pb-5 mb-5 border-b border-white/10 relative z-10">
            {/* HOT 100 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500 fill-current" />
                <span className="text-xs font-black text-white/90">월간 HOT 100</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  한 달 누적 조회순
                </span>
              </div>
            </div>

            {/* HOT 100 단독 카드 (다른 앨범/테마 박스 크기와 동일) */}
            <div>
              {(() => {
                const isSelected = selectedAlbumId === 'hot100';
                const trackCount = Math.min((ALBUM_TRACKS['artist']?.length || 0) + userTracks.length, 100);

                return (
                  <button
                    type="button"
                    onClick={() => handleSelectAlbum('hot100')}
                    className={`w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-8px)] min-w-[220px] p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-rose-500/10 shadow-xl border-rose-500'
                        : 'bg-white/5 hover:bg-white/[0.08] border-white/10 hover:border-white/20'
                    }`}
                    style={
                      isSelected
                        ? {
                            boxShadow: '0 10px 25px -8px rgba(244, 63, 94, 0.35)',
                          }
                        : {}
                    }
                  >
                    {isSelected && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-rose-500"
                      />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 flex-shrink-0 fill-current text-rose-500" />
                        <span className={`text-sm font-black tracking-tight ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                          월간 HOT 100 차트
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0 bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {trackCount}곡
                      </span>
                    </div>

                    <p className="text-[11px] text-white/50 line-clamp-1 group-hover:text-white/70 transition-colors">
                      접속일 기준 최근 30일간 누적 조회순 실시간 랭킹
                    </p>

                    {isSelected && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold font-mono text-rose-400">
                        <span className="w-1.5 h-1.5 rounded-full animate-ping bg-rose-500" />
                        <span>선택된 테마</span>
                      </div>
                    )}
                  </button>
                );
              })()}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 💽 [테마 선택 카드 탭: 4개 일반 테마들] */}
          {/* ========================================================================= */}
          <div className="pb-5 mb-5 border-b border-white/10 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Disc3 className="w-4 h-4 text-[#EC4899]" />
                <span>테마 선택 ({GENRE_ALBUMS.length}개 테마)</span>
              </div>

              {/* 좌우 스크롤 화살표 버튼 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollAlbums('left')}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="이전 테마 보기"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollAlbums('right')}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="다음 테마 보기"
                >
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>

            {/* 테마 카드 가로 스크롤 컨테이너 (스크롤바 숨김) */}
            <div 
              ref={albumScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 select-none scroll-smooth snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {GENRE_ALBUMS.map((album) => {
                const isSelected = selectedAlbumId === album.id;
                // AI음악 아티스트 앨범인 경우 기본 트랙 수 + 업로드된 사용자 트랙 수 합산 표시
                const trackCount = album.id === 'artist' 
                  ? (ALBUM_TRACKS['artist']?.length || 0) + userTracks.length 
                  : (ALBUM_TRACKS[album.id]?.length || 0);

                return (
                  <button
                    key={album.id}
                    onClick={() => handleSelectAlbum(album.id)}
                    className={`flex-none w-[calc(100%-20px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-8px)] min-w-[220px] p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group snap-start ${
                      isSelected
                        ? 'bg-white/10 shadow-xl'
                        : 'bg-white/5 hover:bg-white/[0.08] border-white/10 hover:border-white/20'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: album.accentColor,
                            boxShadow: `0 10px 25px -8px ${album.accentColor}30`,
                          }
                        : {}
                    }
                  >
                    {isSelected && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: album.accentColor }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {album.iconType === 'artist' && (
                          <Radio 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: album.accentColor }} 
                          />
                        )}
                        {album.iconType === 'hiphop' && (
                          <Headphones 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: album.accentColor }} 
                          />
                        )}
                        {album.iconType === 'jazz' && (
                          <Coffee 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: album.accentColor }} 
                          />
                        )}
                        {album.iconType === 'pop' && (
                          <Zap 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: album.accentColor }} 
                          />
                        )}
                        <span className={`text-sm font-black tracking-tight ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                          {album.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0 bg-white/10 text-white/70">
                        {trackCount}곡
                      </span>
                    </div>

                    <p className="text-[11px] text-white/50 line-clamp-1 group-hover:text-white/70 transition-colors">
                      {album.subtitle}
                    </p>

                    {isSelected && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold font-mono" style={{ color: album.accentColor }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: album.accentColor }} />
                        <span>선택된 테마</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* [곡 상단 툴바: 전체 선택 & 선택 곡 재생 & 음원등록(AI음악 아티스트 앨범 전용) & 정렬 드롭다운] */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
            {/* Left: 전체 선택 체크박스 & 선택 곡 재생하기 버튼 & 음원등록 버튼 (AI음악 아티스트 앨범일 때만 표시) */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {/* 전체 선택 체크박스 */}
              <button
                onClick={handleToggleSelectAll}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition cursor-pointer group"
              >
                <div 
                  className={`w-4 h-4 rounded flex items-center justify-center transition ${
                    isAllSelected 
                      ? 'text-white' 
                      : isPartiallySelected
                      ? 'text-white'
                      : 'border border-white/40 group-hover:border-white'
                  }`}
                  style={
                    isAllSelected
                      ? { backgroundColor: currentAlbum.accentColor }
                      : isPartiallySelected
                      ? { backgroundColor: `${currentAlbum.accentColor}60` }
                      : {}
                  }
                >
                  {isAllSelected && <span className="text-xs leading-none font-bold">✓</span>}
                  {isPartiallySelected && <span className="text-[10px] leading-none font-bold">-</span>}
                </div>
                <span className="select-none font-bold text-xs sm:text-sm">
                  전체 선택 <span className="font-mono" style={{ color: currentAlbum.accentColor }}>({selectedCountInCurrentAlbum}/{currentAlbumTracks.length})</span>
                </span>
              </button>

              {/* 선택한 곡 재생하기 버튼 */}
              <button
                onClick={handlePlaySelectedQueue}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${currentAlbum.accentColor}, #db2777)`,
                  boxShadow: `0 8px 20px -4px ${currentAlbum.accentColor}40`
                }}
              >
                {isPlaying && currentTrack && selectedIds.includes(currentTrack.id) ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>일시정지</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>선택 곡 재생 ({selectedCountInCurrentAlbum})</span>
                  </>
                )}
              </button>

              {/* ✨ [AI음악 아티스트 앨범을 선택했을 때만 음원등록 버튼 표시] */}
              {selectedAlbumId === 'artist' && (
                <button
                  onClick={() => setShowRegisterPopup(true)}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 hover:text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="음원 등록하기"
                >
                  <PlusCircle className="w-4 h-4 text-purple-400" />
                  <span>음원등록</span>
                </button>
              )}
            </div>

            {/* 정렬 드롭다운 메뉴 (조회순, 최신순) */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative inline-flex items-center">
                <div className="absolute left-3 pointer-events-none text-white/50">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as TrackSortOption)}
                  className="appearance-none pl-8 pr-8 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/15 focus:border-purple-400 rounded-xl text-xs sm:text-sm font-semibold text-white/90 focus:outline-none transition cursor-pointer shadow-sm"
                >
                  <option value="default" className="bg-[#181a27] text-white">트랙순 (기본)</option>
                  <option value="views" className="bg-[#181a27] text-white">조회순</option>
                  <option value="latest" className="bg-[#181a27] text-white">최신순</option>
                </select>
                <div className="absolute right-2.5 pointer-events-none text-white/50">
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Tracks List (하단 선택된 앨범 곡 목록) */}
          <div className="space-y-3 relative z-10">
            {currentAlbumTracks.map((track, trackIdx) => {
              const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
              const isThisTrackSelected = currentTrack?.id === track.id;
              const isChecked = selectedIds.includes(track.id);
              const isHot100View = selectedAlbumId === 'hot100';
              const trackPlays = playCounts[track.id] || 0;

              return (
                <div
                  key={`${selectedAlbumId}-${track.id}-${trackIdx}`}
                  onClick={() => handlePlayTrack(track)}
                  className={`p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                    isThisTrackPlaying
                      ? 'bg-white/10 shadow-lg'
                      : isThisTrackSelected
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 hover:bg-white/[0.08] border-white/10'
                  }`}
                  style={
                    isThisTrackPlaying
                      ? {
                          borderColor: `${currentAlbum.accentColor}70`,
                          boxShadow: `0 10px 25px -8px ${currentAlbum.accentColor}20`,
                        }
                      : {}
                  }
                >
                  {/* Left: 체크박스 + 번호/순위 뱃지 + 곡 정보 */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div 
                      onClick={(e) => handleToggleSelectTrack(track.id, e)}
                      className="p-1 -m-1 cursor-pointer flex-shrink-0"
                      title={isChecked ? '선택 해제' : '플레이리스트에 추가'}
                    >
                      <div 
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'text-white shadow-sm' 
                            : 'border-2 border-white/30 hover:border-white bg-white/5'
                        }`}
                        style={isChecked ? { backgroundColor: currentAlbum.accentColor } : {}}
                      >
                        {isChecked && <span className="text-xs font-bold leading-none">✓</span>}
                      </div>
                    </div>

                    {/* 트랙 번호 or HOT 랭킹 번호 뱃지 */}
                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-all ${
                        isThisTrackPlaying 
                          ? 'text-white shadow-lg' 
                          : isHot100View
                          ? trackIdx === 0
                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                            : trackIdx === 1
                            ? 'bg-slate-300/20 border border-slate-300/40 text-slate-200 font-bold'
                            : trackIdx === 2
                            ? 'bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold'
                            : 'bg-rose-500/10 border border-rose-500/20 text-rose-300 font-bold'
                          : 'bg-white/10 text-white/70 font-mono font-bold text-sm group-hover:bg-white/15'
                      }`}
                      style={
                        isThisTrackPlaying 
                          ? { 
                              backgroundColor: currentAlbum.accentColor,
                              boxShadow: `0 8px 20px -4px ${currentAlbum.accentColor}50`
                            } 
                          : {}
                      }
                    >
                      {isThisTrackPlaying ? (
                        <div className="flex items-end gap-0.5 h-5">
                          <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
                          <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-5" />
                          <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-4" />
                          <span className="w-1 bg-white rounded-full animate-[bounce_0.6s_infinite_400ms] h-2" />
                        </div>
                      ) : isHot100View ? (
                        <div className="flex flex-col items-center">
                          {trackIdx < 3 && <Trophy className="w-3 h-3 mb-0.5" />}
                          <span className="text-xs font-mono font-black">{trackIdx + 1}</span>
                        </div>
                      ) : (
                        track.number
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {isHot100View && (
                          <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded border ${
                            trackIdx === 0
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : trackIdx === 1
                              ? 'bg-slate-300/20 text-slate-200 border-slate-300/40'
                              : trackIdx === 2
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          }`}>
                            HOT {trackIdx + 1}
                          </span>
                        )}

                        {/* 닉네임 또는 장르 태그 */}
                        {(() => {
                          const isGoldPhone = track.phone && track.phone.replace(/[^0-9]/g, '') === '01074300527';
                          return (
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                              isGoldPhone
                                ? 'text-amber-300 bg-amber-500/25 border border-amber-400/50 shadow-sm shadow-amber-500/20'
                                : 'text-[#38bdf8] bg-[#0284c7]/20'
                            }`}>
                              {track.nickname ? track.nickname : track.genreTag}
                            </span>
                          );
                        })()}

                        {/* 아티스트 채널 주소 버튼 (새 탭으로 열기) */}
                        {track.channelUrl && (
                          <a
                            href={track.channelUrl.startsWith('http') ? track.channelUrl : `https://${track.channelUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 px-2 py-0.5 rounded transition"
                            title="아티스트 채널 바로가기"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>아티스트 채널</span>
                          </a>
                        )}

                        {/* 곡 공유하기 버튼 */}
                        <button
                          type="button"
                          onClick={(e) => handleShareTrack(track, e)}
                          className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-300 hover:text-white bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 px-2 py-0.5 rounded transition cursor-pointer"
                          title="이 곡 전용 링크 복사"
                        >
                          <Share2 className="w-2.5 h-2.5 text-purple-400" />
                          <span>{copiedTrackId === track.id ? '복사됨!' : '곡 공유하기'}</span>
                        </button>

                        {/* 사용자가 등록한 곡인 경우 삭제 버튼 노출 (본인 확인 비밀번호 모달 연동) */}
                        {(track.phone || track.password || track.id.startsWith('user-') || track.id.startsWith('artist-user') || (track.audioUrl && (track.audioUrl.includes('user-upload') || track.audioUrl.includes('.r2.dev/')))) && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTrackToDelete(track);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-red-400/80 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-1.5 py-0.5 rounded transition cursor-pointer"
                            title="음원 삭제 (본인 인증 필요)"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>삭제</span>
                          </button>
                        )}
                      </div>
                      <h3 
                        className="text-base sm:text-lg font-bold text-white truncate transition-colors"
                        style={isThisTrackPlaying ? { color: currentAlbum.accentColor } : {}}
                      >
                        {track.title}
                      </h3>
                      {track.description && (
                        <p className="text-xs text-white/50 truncate mt-0.5">
                          {track.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Audio Duration & Play / Stop Controls */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 flex-shrink-0"
                  >
                    <div className="text-right mr-2 hidden sm:block">
                      <div className="text-xs font-mono font-semibold text-white/70">
                        {isThisTrackPlaying ? currentTime : track.duration}
                      </div>
                      <div className="text-[10px] text-white/40 font-mono">
                        {isThisTrackPlaying ? '재생 중' : '대기'}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 w-full md:w-auto">
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                          onClick={() => handlePlayTrack(track)}
                          className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                            isThisTrackPlaying
                              ? 'text-white shadow-lg'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/30'
                          }`}
                          style={
                            isThisTrackPlaying
                              ? {
                                  backgroundColor: currentAlbum.accentColor,
                                  boxShadow: `0 8px 20px -4px ${currentAlbum.accentColor}40`
                                }
                              : {}
                          }
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
                    
                      <div className="text-[11px] font-mono text-white/50 pr-1 flex items-center gap-1 select-none">
                        <span 
                          className="font-bold transition-colors"
                          style={{ color: isThisTrackPlaying ? currentAlbum.accentColor : 'rgba(255, 255, 255, 0.75)' }}
                        >
                          {trackPlays.toLocaleString()}회
                        </span>
                        <span>재생</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      {/* 사이트 하단 회사 정보 푸터 */}
      <footer className="w-full max-w-7xl mt-12 pt-8 pb-10 border-t border-white/10 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-white/50">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium">
            <span className="text-white/80 font-bold">(주)니모뮤직</span>
            <span className="text-white/20">|</span>
            <span>대표: 김준용</span>
            <span className="text-white/20">|</span>
            <span>이메일: <a href="mailto:plymaster.help@gmail.com" className="text-white/70 hover:text-purple-300 underline underline-offset-2 transition-colors">plymaster.help@gmail.com</a></span>
          </div>
          <p className="text-[11px] text-white/30 tracking-wide mt-1">
            &copy; 2026 (주)니모뮤직. All Rights Reserved. AI 아티스트 놀이터
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BillboardPopView;
