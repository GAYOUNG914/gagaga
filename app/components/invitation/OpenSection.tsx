'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface OpenSectionProps {
  onStart?: () => void;
  onOpen: () => void;
}

export function OpenSection({ onStart, onOpen }: OpenSectionProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGGElement>(null);
  const hintRef  = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef  = useRef(false);

  useEffect(() => {
    const heart = heartRef.current;
    const hint  = hintRef.current;
    const wrap  = wrapRef.current;
    if (!heart || !hint || !wrap) return;

    // 로딩 완료 후 페이드인
    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 0, ease: 'power2.out' });

    const startPulse = () => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      gsap.set(heart, { x: cx, y: cy });
      pulseRef.current?.kill();
      pulseRef.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(heart, {
          scale: 1.08,
          svgOrigin: `${cx} ${cy}`,
          duration: 1.4,
          ease: 'sine.inOut',
        });
    };

    startPulse();

    gsap.to(hint, { y: -8, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      if (doneRef.current) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(startPulse, 100);
    };

    window.addEventListener('resize', onResize);

    return () => {
      pulseRef.current?.kill();
      gsap.killTweensOf(hint);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const handleOpen = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onStart?.();

    const heart = heartRef.current;
    const wrap  = wrapRef.current;
    const hint  = hintRef.current;
    if (!heart || !wrap) return;

    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;

    pulseRef.current?.kill();
    if (hint) gsap.to(hint, { opacity: 0, duration: 0.15 });

    gsap.timeline()
      .to(heart, {
        scale: 15,
        svgOrigin: `${cx} ${cy}`,
        duration: 0.6,
        ease: 'power3.in',
      })
      .to(wrap, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: onOpen,
      }, '-=0.15');
  };

  return (
    <div
      ref={wrapRef}
      onClick={handleOpen}
      // onTouchMove={handleOpen}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        cursor: 'pointer',
        touchAction: 'none',
        userSelect: 'none',
        opacity: 0,
        // height: '110%',

        transform: 'scale(1.05)', // 레이어 생성으로 애니메이션 성능 향상
      }}
    >
      {/* <div className="heart-mask-wrap" style={{ width:'130%'}}> */}
        <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <mask id="heart-mask">
              <rect width="100%" height="100%" fill="white" />
              {/* 1:1 비율 하트 — (0,0) 중심, GSAP이 x/y로 이동 */}
              <g ref={heartRef}>
                <path
                  fill="black"
                  d="M 0,-50 C 5,-100 95,-100 95,-40 C 100,30 0,85 0,100 C 0,85 -100,30 -95,-40 C -95,-100 -5,-100 0,-50 Z"
                />
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#161616" mask="url(#heart-mask)" />
        </svg>
      {/* </div> */}

      <div
        ref={hintRef}
        style={{
          position: 'fixed',
          top: 'calc(50% - 155px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.75)',
          pointerEvents: 'none',
          fontSize: '0.75rem',
          letterSpacing: '0.22em',
          lineHeight: 1.8,
        }}
      >
        터치하세요<br />⇣
      </div>
    </div>
  );
}
