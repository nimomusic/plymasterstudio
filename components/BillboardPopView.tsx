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
  ListMusic, 
  Disc3, 
  Sparkles, 
  Repeat,
  Flame,
  Coffee,
  Headphones,
  ChevronRight,
  ChevronLeft
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
  description?: string;
  albumId: string;
  /* 하이퍼링크넣는 곳: 실제 mp3 파일 또는 스트리밍 링크 URL */
  audioUrl: string;
}

export interface AlbumCategory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconType: 'hiphop' | 'jazz' | 'pop';
  accentColor: string;
  bgGlow: string;
  tags: string[];
  bgImage?: string;
}

// ==================================================================================
// 💽 기본 3대 앨범 정의
// 1. 느좋 인스타 감성힙합
// 2. 빈티지 재즈
// 3. 트렌디 팝송
// ==================================================================================
export const ALBUMS: AlbumCategory[] = [
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

// ==================================================================================
// 🎵 [하이퍼링크넣는 곳] 앨범별 트랙 리스트 & 음원 링크 데이터
// ==================================================================================
export const ALBUM_TRACKS: Record<string, PopTrackItem[]> = {
  // 1. 느좋 인스타 감성힙합 앨범 트랙
  hiphop: [
    {
      id: 'hiphop-1',
      number: '01',
      title: 'Mood drip',
      duration: '03:08',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/9e6a853e-849b-4149-a16e-fb9b7570126b.mp3',
    },
    {
      id: 'hiphop-2',
      number: '02',
      title: 'Daydream',
      duration: '03:05',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/bb01c0ca-06df-4fab-95aa-1d75daad899c.mp3',
    },
    {
      id: 'hiphop-3',
      number: '03',
      title: 'Soft Drizzle',
      duration: '02:50',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/b924b122-3bd1-4ba5-b833-854168b90b99.mp3',
    },
    {
      id: 'hiphop-4',
      number: '04',
      title: '우산 없는 밤',
      duration: '04:02',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/c4142110-476a-4b75-867d-6a5dc3b65ee2.mp3',
    },
    {
      id: 'hiphop-5',
      number: '05',
      title: '읽히지 않아',
      duration: '03:03',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/7ad30ed2-3112-4a85-a54d-797340f35c29.mp3',
    },
    {
      id: 'hiphop-6',
      number: '06',
      title: '환상통',
      duration: '03:12',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/34c49a87-8f59-42b0-8af9-8d4c0a0e7a68.mp3',
    },
    {
      id: 'hiphop-7',
      number: '07',
      title: '상상',
      duration: '03:29',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/dc3e09c8-2dc6-40a1-93db-78968eed183a.mp3',
    },
    {
      id: 'hiphop-8',
      number: '08',
      title: '착각',
      duration: '02:28',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/b05c14a7-997b-4e1f-8fe5-e998e609e175.mp3',
    },
    {
      id: 'hiphop-9',
      number: '09',
      title: 'Drift',
      duration: '03:06',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/ae50ba63-53b4-4e90-8e36-caba6afb056e.mp3',
    },
    {
      id: 'hiphop-10',
      number: '10',
      title: 'Uncharted Still',
      duration: '03:14',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/570e8be4-6e3d-4544-a20d-b661d086ed87.mp3',
    },
    {
      id: 'hiphop-11',
      number: '11',
      title: 'Hazy View',
      duration: '02:51',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/4f740500-8f41-4a5d-be00-f08aaecc4bc4.mp3',
    },
    {
      id: 'hiphop-12',
      number: '12',
      title: 'Frozen Frame',
      duration: '03:06',
      genreTag: '느좋 인스타 알앤비 힙합',
      albumId: 'hiphop',
      audioUrl: 'https://cdn1.suno.ai/27bd341f-5828-42c8-80af-5f458b56400d.mp3',
    },
  ],

  // 2. 빈티지 재즈 앨범 트랙
  jazz: [
    {
      id: 'jazz-1',
      number: '01',
      title: 'A Soft Surrender',
      duration: '04:28',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/621e2642-24a6-4a6f-8895-e88a1574fd7b.mp3',
    },
    {
      id: 'jazz-2',
      number: '02',
      title: 'Soft Drift',
      duration: '03:27',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/c6dca2e7-5311-4119-9869-f39efd74955a.mp3',
    },
    {
      id: 'jazz-3',
      number: '03',
      title: 'Where Thoughts Linger',
      duration: '03:53',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/def4da68-b80f-40b4-af7b-51ad8f5207cb.mp3',
    },
    {
      id: 'jazz-4',
      number: '04',
      title: 'A Soft Place to Be',
      duration: '03:23',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/5c60a6bc-0f9d-4114-96cf-3e3b2f2dc915.mp3',
    },
    {
      id: 'jazz-5',
      number: '05',
      title: 'Softest Hours',
      duration: '04:14',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/ad9a53b9-6801-4fc9-ba6f-463bbfdf012f.mp3',
    },
    {
      id: 'jazz-6',
      number: '06',
      title: 'Soft Exhale',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/d4f49773-9714-4ced-87c5-93031381ea99.mp3',
    },
    {
      id: 'jazz-7',
      number: '07',
      title: 'Deepening Sigh',
      duration: '02:31',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/10c9cc6b-6b5c-4f46-ad1f-90ddb28efe6f.mp3',
    },
    {
      id: 'jazz-8',
      number: '08',
      title: 'Somnus',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/3da806b5-4712-4e09-b5b9-a1ae040bb8e3.mp3',
    },
    {
      id: 'jazz-9',
      number: '09',
      title: 'Quiet Resonance',
      duration: '04:53',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/68712f78-7eab-46d8-838f-3718a222ffc1.mp3',
    },
    {
      id: 'jazz-10',
      number: '10',
      title: 'A Gentle Murmur',
      duration: '03:58',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/8a3b599a-a161-4372-833f-9720ea0691db.mp3',
    },
    {
      id: 'jazz-11',
      number: '11',
      title: 'Hush',
      duration: '04:16',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/5edc5fbe-68e6-4913-85c0-789f7f9d21b3.mp3',
    },
    {
      id: 'jazz-12',
      number: '12',
      title: 'Sanctuary',
      duration: '03:43',
      genreTag: '빈티지 재즈',
      albumId: 'jazz',
      audioUrl: 'https://cdn1.suno.ai/39f7675a-497a-43ac-8225-7e1c80827525.mp3',
    },
  ],

  // 3. 트렌디 팝송 앨범 트랙
  pop: [
    {
      id: 'pop-1',
      number: '01',
      title: 'Same Script',
      duration: '02:35',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/994ade1c-43c4-45d3-85ef-4fcfba3e0625.mp3',
    },
    {
      id: 'pop-2',
      number: '02',
      title: 'Sweet Tide',
      duration: '03:06',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/009ce87e-aea8-45a8-b47b-aae9496c88f4.mp3',
    },
    {
      id: 'pop-3',
      number: '03',
      title: 'Sweet Fix',
      duration: '03:01',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/1a4006fb-32d6-4e9c-870d-a20e9dd13b6d.mp3',
    },
    {
      id: 'pop-4',
      number: '04',
      title: 'Lose My Number',
      duration: '02:13',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/ec05ee6f-b59b-4bb3-8fe8-ea9ca64cbf3a.mp3',
    },
    {
      id: 'pop-5',
      number: '05',
      title: 'Heated Silence',
      duration: '03:07',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/dfe7344f-51e0-4369-8536-78594a70f514.mp3',
    },
    {
      id: 'pop-6',
      number: '06',
      title: 'Say It First',
      duration: '02:59',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/5287ae16-8e99-4f17-ae54-c1d1d388204d.mp3',
    },
    {
      id: 'pop-7',
      number: '07',
      title: 'I Hate Your New Girl',
      duration: '02:42',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/c9ff40ae-14d9-4334-96e6-b46acab554cd.mp3',
    },
    {
      id: 'pop-8',
      number: '08',
      title: 'Call Me Back',
      duration: '02:15',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/75f65fb6-8460-41b9-92f8-931348f551ec.mp3',
    },
    {
      id: 'pop-9',
      number: '09',
      title: 'Lose My Number',
      duration: '02:13',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/ec05ee6f-b59b-4bb3-8fe8-ea9ca64cbf3a.mp3',
    },
    {
      id: 'pop-10',
      number: '10',
      title: 'I Heard You Breathe',
      duration: '03:07',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/dfe7344f-51e0-4369-8536-78594a70f514.mp3',
    },
    {
      id: 'pop-11',
      number: '11',
      title: 'Blindside',
      duration: '02:28',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/904b00f8-76ed-465c-a3e4-96b700a890d8.mp3',
    },
    {
      id: 'pop-12',
      number: '12',
      title: 'Cold Radius',
      duration: '02:27',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/b21eca7d-4dd4-4bcc-bfd4-3cec9623bbbc.mp3',
    },
    {
      id: 'pop-13',
      number: '13',
      title: 'V.I.P. Zone',
      duration: '02:21',
      genreTag: '트렌디 팝송',
      albumId: 'pop',
      audioUrl: 'https://cdn1.suno.ai/d6d00917-5520-451e-8541-627ca509e4bd.mp3',
    },
  ],
};

// ==================================================================================
// 🔥 [Hot & New] 표시할 신곡 목록을 여기서 직접 등록/수정하세요!
// 원하는 만큼 곡을 추가할 수 있으며, title과 audioUrl만 넣어도 바로 재생 및 표시됩니다.
// ==================================================================================
export interface CustomNewTrack {
  title: string;           // 곡 제목 (필수)
  audioUrl: string;        // mp3 음원 링크 URL (필수)
  genreTag?: string;       // (선택) 장르 태그 - 기본값: 'NEW'
  description?: string;    // (선택) 곡 설명
  duration?: string;       // (선택) 재생 시간 - 기본값: '03:00'
}

export const NEW_TRACKS: CustomNewTrack[] = [
  {
    title: '내 속의 엑셀',
    audioUrl: 'https://cdn1.suno.ai/f707e945-14ab-495a-9b92-7e470915ace6.mp3',
    genreTag: '제작자: 홍트',
    description: 'Korean Hip-hop Trot',
    duration: '03:04',
  },
  {
    title: 'Unbound Notion',
    audioUrl: 'https://cdn1.suno.ai/ca941d08-0abf-4644-803f-023300df4a61.mp3',
    genreTag: '트렌디 팝',
    description: 'Dark Alt-Pop',
    duration: '01:52',
  },
  {
    title: 'Redline Zone',
    audioUrl: 'https://cdn1.suno.ai/1be540ff-5c50-4d16-8f39-ae6e8d322a6e.mp3',
    genreTag: '트렌디 팝',
    description: 'Tropical house',
    duration: '02:10',
  },
  {
    title: '掠れた約束-갈라진 약속',
    audioUrl: 'https://cdn1.suno.ai/745032ff-514f-48b1-98f2-b8a6901653bd.mp3',
    genreTag: 'JPOP',
    description: 'Emotional acoustic rock ballad',
    duration: '03:50',
  },
  {
    title: '水面の彼方',
    audioUrl: 'https://cdn1.suno.ai/969d3731-eb43-460d-b37b-4240a36eb014.mp3',
    genreTag: 'JPOP',
    description: 'Electronic R&B J-pop',
    duration: '03:17',
  },
  // 💡 곡을 더 추가하고 싶으시면 여기에 계속 이어서 넣으시면 됩니다:
  // {
  //   title: '신곡 4번 - 내 노래 제목',
  //   audioUrl: 'https://내음원.mp3',
  // },
];

// 뷰어용 자동 포맷 변환기
export const FORMATTED_NEW_TRACKS: PopTrackItem[] = NEW_TRACKS.map((item, idx) => ({
  id: `custom-new-${idx + 1}`,
  number: String(idx + 1).padStart(2, '0'),
  title: item.title,
  audioUrl: item.audioUrl,
  genreTag: item.genreTag || 'NEW',
  description: item.description || '새롭게 등록된 신곡',
  duration: item.duration || '03:00',
  albumId: 'hiphop',
}));

export const BillboardPopView: React.FC<BillboardPopViewProps> = ({ setView, standalone = false }) => {
  // 현재 선택된 앨범 ID ('hiphop' | 'jazz' | 'pop')
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('hiphop');

  // 현재 선택된 앨범 객체 및 트랙 목록
  const currentAlbum = ALBUMS.find(a => a.id === selectedAlbumId) || ALBUMS[0];
  const currentAlbumTracks = ALBUM_TRACKS[selectedAlbumId] || [];

  // 선택된 곡 ID 목록 (초기값: 현재 앨범의 전곡 선택)
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return ALBUM_TRACKS['hiphop'].map(t => t.id);
  });

  // 현재 재생 중인 트랙 정보
  const [currentTrack, setCurrentTrack] = useState<PopTrackItem | null>(() => {
    return ALBUM_TRACKS['hiphop'][0] || null;
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [totalDuration, setTotalDuration] = useState<string>('00:00');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isAutoRepeat, setIsAutoRepeat] = useState<boolean>(true);
  
  // 1. 방문자 카운트 (localStorage 연동)
  const [visitCount, setVisitCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('plymaster_visit_count');
      const count = saved ? parseInt(saved, 10) : 0;
      const newCount = count + 1;
      localStorage.setItem('plymaster_visit_count', newCount.toString());
      return newCount;
    } catch (e) {
      return 1;
    }
  });

  // 2. 각 곡별 재생 횟수 (localStorage 연동)
  const [playCounts, setPlayCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('plymaster_play_counts');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // 곡 재생 횟수 증가 함수
  const incrementPlayCount = (trackId: string) => {
    setPlayCounts(prev => {
      const updated = { ...prev, [trackId]: (prev[trackId] || 0) + 1 };
      try {
        localStorage.setItem('plymaster_play_counts', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save play counts', e);
      }
      return updated;
    });
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const hotScrollRef = useRef<HTMLDivElement | null>(null);

  // Hot & New 가로 스크롤 이동 함수
  const scrollHotTracks = (direction: 'left' | 'right') => {
    if (hotScrollRef.current) {
      const scrollAmount = 300;
      hotScrollRef.current.scrollBy({
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
  
  const selectedCountInCurrentAlbum = currentAlbumTracks.filter(t => selectedIds.includes(t.id)).length;
  const isPartiallySelected = selectedCountInCurrentAlbum > 0 && !isAllSelected;

  // 앨범 변경 핸들러
  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
    const newTracks = ALBUM_TRACKS[albumId] || [];
    
    // 새 앨범의 곡들을 기본 선택 목록으로 업데이트
    setSelectedIds(newTracks.map(t => t.id));
    
    // 만약 현재 재생 중인 곡이 없거나 앨범이 바뀌면 첫 번째 곡을 대기 상태로 설정
    if (!isPlaying && newTracks.length > 0) {
      setCurrentTrack(newTracks[0]);
      setProgress(0);
      setCurrentTime('00:00');
    }
  };

  // 전체 선택 토글
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // 현재 앨범의 곡들만 선택 해제
      setSelectedIds(prev => prev.filter(id => !currentAlbumTracks.some(t => t.id === id)));
    } else {
      // 현재 앨범의 전곡을 선택에 추가
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
      // 앨범별 톤 설정
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

    incrementPlayCount(track.id);

    // 재생하려는 곡이 현재 앨범과 다르면 앨범 탭도 자동 동기화
    if (track.albumId && track.albumId !== selectedAlbumId) {
      setSelectedAlbumId(track.albumId);
    }

    // 재생하는 곡을 선택 목록에 포함
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
          playSynthPreview(track.albumId);
        });
      }
    } else {
      setIsDemoMode(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      playSynthPreview(track.albumId);
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
      const allIds = currentAlbumTracks.map(t => t.id);
      setSelectedIds(allIds);
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

  // 링크 복사
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
            <span>전체 테마팩으로 가기</span>
          </button>
        )}
      
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
                  <span className="text-[11px] font-mono text-[#38BDF8] bg-[#0284c7]/15 px-2 py-0.5 rounded-md">
                    {currentTrack.genreTag}
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
            {/* Left: Title, Badge, Description */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                <span className="text-2xl text-yellow-400 select-none">⚡</span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  플리마스터 플레이리스트
                </h1>
                <span 
                  className="text-xs font-bold px-3 py-1 rounded-full border transition-all"
                  style={{
                    backgroundColor: `${currentAlbum.accentColor}20`,
                    borderColor: `${currentAlbum.accentColor}50`,
                    color: currentAlbum.accentColor
                  }}
                >
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
                {currentAlbum.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentAlbum.tags.slice(3).map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 🔥 [Hot & New 직접 등록한 신곡 가로 스크롤 섹션] */}
          {/* ========================================================================= */}
          <div className="mb-6 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-inner">
                  <Flame className="w-4 h-4 fill-current" />
                </span>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  New
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  신곡 {FORMATTED_NEW_TRACKS.length}곡
                </span>
              </div>

              {/* 좌우 스크롤 화살표 버튼 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/40 font-mono hidden sm:inline mr-1">
                  화살표 클릭 또는 좌우 스크롤
                </span>
                <button
                  type="button"
                  onClick={() => scrollHotTracks('left')}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="이전 곡 보기"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollHotTracks('right')}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="다음 곡 보기"
                >
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>

            {/* 등록된 신곡 리스트를 map으로 순회하여 출력 */}
            <div 
              ref={hotScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 select-none scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {FORMATTED_NEW_TRACKS.map((track) => {
                const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
                const isThisTrackSelected = currentTrack?.id === track.id;
                const trackAlbum = ALBUMS.find(a => a.id === track.albumId) || currentAlbum;

                return (
                  <div
                    key={`hot-${track.id}`}
                    onClick={() => handlePlayTrack(track)}
                    className={`flex-none w-[calc(100%-20px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-8px)] min-w-[220px] p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer snap-start relative overflow-hidden group flex flex-col justify-between ${
                      isThisTrackPlaying
                        ? 'bg-white/15 border-rose-500/60 shadow-xl'
                        : isThisTrackSelected
                        ? 'bg-white/10 border-white/25'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                    style={
                      isThisTrackPlaying
                        ? {
                            boxShadow: `0 10px 25px -8px ${trackAlbum.accentColor}40`,
                            borderColor: trackAlbum.accentColor,
                          }
                        : {}
                    }
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span 
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: `${trackAlbum.accentColor}20`,
                          borderColor: `${trackAlbum.accentColor}40`,
                          color: trackAlbum.accentColor,
                        }}
                      >
                        {track.genreTag}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {(playCounts[track.id] || 0).toLocaleString()}회 재생
                      </span>
                    </div>

                    <div className="mb-3">
                      <h4 
                        className="text-sm font-bold text-white truncate transition-colors"
                        style={isThisTrackPlaying ? { color: trackAlbum.accentColor } : {}}
                      >
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-white/50 truncate mt-0.5">
                        {track.description || trackAlbum.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                        <span>{track.duration}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayTrack(track);
                        }}
                        className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isThisTrackPlaying
                            ? 'text-white shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                        style={isThisTrackPlaying ? { backgroundColor: trackAlbum.accentColor } : {}}
                        title={isThisTrackPlaying ? '일시정지' : '재생'}
                      >
                        {isThisTrackPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 💽 [앨범 선택 카드 탭 (3대 앨범)] */}
          {/* ========================================================================= */}
          <div className="pb-5 mb-5 border-b border-white/10 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                <Disc3 className="w-4 h-4 text-[#EC4899]" />
                <span>앨범 선택 ({ALBUMS.length}개 앨범)</span>
              </div>
              <span className="text-[11px] text-white/40 font-mono">앨범을 클릭하면 해당 곡 목록으로 전환됩니다</span>
            </div>

            {/* 3대 앨범 카드 탭 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ALBUMS.map((album) => {
                const isSelected = selectedAlbumId === album.id;
                const trackCount = ALBUM_TRACKS[album.id]?.length || 0;

                return (
                  <button
                    key={album.id}
                    onClick={() => handleSelectAlbum(album.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
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

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70 flex-shrink-0">
                        {trackCount}곡
                      </span>
                    </div>

                    <p className="text-[11px] text-white/50 line-clamp-1 group-hover:text-white/70 transition-colors">
                      {album.subtitle}
                    </p>

                    {isSelected && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold font-mono" style={{ color: album.accentColor }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: album.accentColor }} />
                        <span>선택된 앨범</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* [1번 곡 상단 왼쪽 정렬 툴바: 전체 선택 체크박스 & 선택 곡 재생하기 버튼] */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
            {/* Left: 전체 선택 체크박스 & 선택 곡 재생하기 버튼 */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* 전체 선택 체크박스 */}
              <button
                onClick={handleToggleSelectAll}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm transition cursor-pointer group"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
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
            </div>

            {/* Right: 재생 모드 안내 뱃지 */}
            <div className="text-xs text-white/40 hidden sm:flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>체크된 곡이 순서대로 자동 재생됩니다</span>
            </div>
          </div>

          {/* Tracks List */}
          <div className="space-y-3 relative z-10">
            {currentAlbumTracks.map((track) => {
              const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
              const isThisTrackSelected = currentTrack?.id === track.id;
              const isChecked = selectedIds.includes(track.id);

              return (
                <div
                  key={track.id}
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
                  {/* Left: 체크박스 + 번호 뱃지 + 곡 정보 */}
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

                    <div 
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isThisTrackPlaying 
                          ? 'text-white shadow-lg' 
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
                      ) : (
                        track.number
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#0284c7]/20 px-2 py-0.5 rounded">
                          {track.genreTag}
                        </span>
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
                          {(playCounts[track.id] || 0).toLocaleString()}회
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
    </div>
  );
};

export default BillboardPopView;
