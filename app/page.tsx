'use client';

import './invitation/invitation.scss';
import { OpenSection } from '@/components/invitation/OpenSection';
import { HeroSection } from '@/components/invitation/HeroSection';
import { GreetingSection } from '@/components/invitation/GreetingSection';
import { BrideGroomSection } from '@/components/invitation/BrideGroomSection';
import { GallerySlideSection } from '@/components/invitation/GallerySlideSection';
import { CalendarSection } from '@/components/invitation/CalendarSection';
import { MapSection } from '@/components/invitation/MapSection';
import { AccountsSection } from '@/components/invitation/AccountsSection';
import { FooterSection } from '@/components/invitation/FooterSection';
import { InvitationConfig } from '@/types/invitation';
import { useInvitationAnimations } from '@/hooks/useInvitationAnimations';
import { ParallaxDeco } from '@/components/invitation/ParallaxDeco';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const sampleInvitation: InvitationConfig = {
  groomName: '홍길동',
  brideName: '김영희',
  date: '2027-10-18',
  time: '14:00',
  location: '서울 강남구 임피리얼 \n팰리스 호텔 B1층 그랜드홀',
  locationDetails: '서울 강남구 언주로 640',
  address: '서울 강남구 논현동 248-7',
  particleType: 'flower',

  groomParents: { father: '홍순신', fatherPhone: '010-1111-2222', mother: '이순신', motherPhone: '010-3333-4444' },
  brideParents: { father: '김유신', fatherPhone: '010-5555-6666', mother: '이육신', motherPhone: '010-7777-8888' },

  groomPhone: '010-1234-5678',
  bridePhone: '010-9876-5432',

  accounts: {
    groom: { bank: '국민은행', accountHolder: '홍길동', accountNumber: '123-456-789012' },
    groomFather: { bank: '국민은행', accountHolder: '홍순신', accountNumber: '123-456-789012' },
    groomMother: { bank: '국민은행', accountHolder: '이순신', accountNumber: '123-456-789012' },
    bride: { bank: '우리은행', accountHolder: '김영희', accountNumber: '987-654-321098' },
    brideFather: { bank: '우리은행', accountHolder: '김유신', accountNumber: '987-654-321098' },
    brideMother: { bank: '우리은행', accountHolder: '이육신', accountNumber: '987-654-321098' },
  },

  primaryColor: '#627449',
  secondaryColor: '#2d3a24',
  backgroundColor: '#f8f4ed',
  fontFamily: 'serif',

  // ✏️ 여기만 바꾸면 테마 전환
  // 'minimal' | 'elegant' | 'modern' | 'romantic'
  theme: 'minimal',

  heroImage: '/images/dummy_5.webp',
  heroScript: 'always, together',
  venueImage: '/images/dummy_4.webp',

  greetingMessage:
    '두 사람의 사랑이 새로운 시작을 맞이합니다.\n소중한 분들과 함께하는\n행복한 날이 되기를 바랍니다.',

  galleryImages: [
    '/images/dummy_1.webp',
    '/images/dummy_2.webp',
    '/images/dummy_3.webp',
    '/images/dummy_4.webp',
    '/images/dummy_5.webp',
    '/images/dummy_6.webp',
    '/images/dummy_5.webp',
    '/images/dummy_4.webp',
    '/images/dummy_3.webp',
    '/images/dummy_2.webp',
  ],

  latitude: 37.5140,
  longitude: 127.0359,

  transportation: {
    subway: '지하철 2호선 강남역 1번 출구 도보 5분',
    bus: '강남역 정류장 하차 후 도보 3분 (146, 362, 740번)',
    car: '건물 지하 주차장 이용 가능 (2시간 무료)',
  },

  footerImage: '/images/dummy_6.webp',
};

export default function InvitationPage() {
  const config = sampleInvitation;
  const [opened, setOpened] = useState(false);
  const [animEnabled, setAnimEnabled] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 새로고침 시 항상 최상단에서 시작
  // 히어로 높이를 최초 1회만 고정 — 주소바 토글 시 덜컹거림 방지
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.style.setProperty('--hero-h', `${window.innerHeight}px`);
    // OpenSection과 함께 히어로 섹션도 페이드인
    gsap.to('.inv-hero', { opacity: 1, duration: 0.8, ease: 'power2.out' });
  }, []);

  // 오픈 전: 스크롤 차단
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  // 오픈 후: Lenis + GSAP 시작
  useInvitationAnimations(animEnabled);

  const handleStart = () => {
    setAnimEnabled(true);
    const audio = new Audio('/music/wedding2.MP3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
    audioRef.current = audio;
  };

  const handleOpen = () => {
    setOpened(true);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setMusicOn(v => !v);
  };

  return (
    <main className="invitation" data-theme={config.theme} data-opened={opened ? '' : undefined} style={{maxWidth:'540px', margin:'0 auto', overflow:'hidden'}}>
      {!opened && <OpenSection onStart={handleStart} onOpen={handleOpen} />}
      <HeroSection config={config} />
      {/* 1. 왼쪽 — 인사말 옆 */}
      <div style={{ position: 'relative' }}>
        {/* <ParallaxDeco src="/images/flower_1.webp" side="left" top="8%" offset="-28px" width={120} speed={80} zIndex={1} /> */}
        <GreetingSection config={config} />
      </div>

      <div className="hypen-div"></div>
      <BrideGroomSection config={config} />

      {/* 갤러리 — 그리드: GallerySection / 슬라이드: GallerySlideSection */}
      {config.galleryImages && config.galleryImages.length > 0 && (
        <div style={{ position: 'relative' }}>
          <ParallaxDeco src="/images/flower_2.webp" side="right" top="-8%" offset="-70px" width={180} speed={90} zIndex={1} rotate="-15deg" />
          {/* <GallerySection images={config.galleryImages} /> */}
          <GallerySlideSection images={config.galleryImages} />
        </div>
      )}


      <CalendarSection date={config.date} time={config.time} />


      <div style={{ position: 'relative' }}>
        <ParallaxDeco src="/images/flower_2.webp" side="left" top="-8%" offset="-60px" width={180} speed={80} rotate='45deg' zIndex={1}/>
        <MapSection
          location={config.location}
          locationDetails={config.locationDetails}
          address={config.address}
          latitude={config.latitude}
          longitude={config.longitude}
          venueImage={config.venueImage}
          transportation={config.transportation}
        />
      </div>

      {(config.accounts?.groom || config.accounts?.bride) && (
        <AccountsSection
          groomAccount={config.accounts?.groom}
          groomFatherAccount={config.accounts?.groomFather}
          groomMotherAccount={config.accounts?.groomMother}
          brideAccount={config.accounts?.bride}
          brideFatherAccount={config.accounts?.brideFather}
          brideMotherAccount={config.accounts?.brideMother}
        />
      )}

      <FooterSection
        footerImage={config.footerImage}
        groomName={config.groomName}
        brideName={config.brideName}
        date={config.date}
      />

      {opened && (
        <button className={`inv-music-btn${musicOn ? '' : ' inv-music-btn--off'}`} onClick={toggleMusic} aria-label="음악 켜기/끄기">
          {musicOn ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          )}
        </button>
      )}
    </main>
  );
}
