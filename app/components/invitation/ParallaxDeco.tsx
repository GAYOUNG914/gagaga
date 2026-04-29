'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxDecoProps {
  src: string;
  side: 'left' | 'right';
  width?: number;   // px
  speed?: number;   // 스크롤 대비 이동 거리 (클수록 많이 움직임)
  rotate?: string;  // CSS 회전값 (예: '15deg')
  zIndex?: number; // z-index (기본값: 1)
  top?: string;     // 컨테이너 내 수직 위치
  offset?: string;  // 좌우 끝에서 얼마나 튀어나올지 (음수면 밖으로)
}

export function ParallaxDeco({
  src,
  side,
  width = 110,
  speed = 90,
  rotate = '0deg',
  zIndex = 0,
  top = '10%',
  offset = '-20px',
}: ParallaxDecoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      el,
      { y: speed * 0.4 },
      {
        y: -speed * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        [side]: offset,
        width,
        pointerEvents: 'none',
        zIndex,
        opacity: 0.75,
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: '100%', display: 'block', userSelect: 'none', transform: `rotate(${rotate})` }}
      />
    </div>
  );
}
