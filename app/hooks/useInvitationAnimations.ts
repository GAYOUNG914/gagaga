'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function useInvitationAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis 스무스 스크롤 초기화 ──────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Lenis ↔ GSAP 연동 (이걸 해야 ScrollTrigger가 Lenis 스크롤을 인식)
    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // ── AOS 초기화 (Lenis 스크롤 위치 반영) ────────────────
    AOS.init({ once: true, duration: 800, easing: 'ease-out' });
    lenis.on('scroll', () => AOS.refresh());


    // ── 히어로 진입 애니메이션 (페이지 로드 시) ───────────
    const heroTl = gsap.timeline({ delay: 0.1 });
    
    gsap.to('.inv-photo', {
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.5,
      ease: 'power3.out',
    });

    heroTl
      .to('.inv-hero__names', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.3,
        ease: 'power2.out',
      })
      .to('.inv-hero__date', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      }, '-=0.6')
      .to('.inv-hero__location', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      }, '-=0.5')
      // .to('.inv-script', {
      //   opacity: 0.5,
      //   y: 0,
      //   duration: 0.9,
      //   ease: 'power2.out',
      // }, '-=1');
    

    // ── 히어로 사진 패럴랙스 ────────────────────────────────
    // 사진이 페이지보다 느리게 올라가서 깊이감 생성
    gsap.to('.inv-hero .inv-photo', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.inv-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });


    // ── 스크롤 트리거 공통 헬퍼 ───────────────────────────
    const onScroll = (
      targets: string | Element | Element[],
      vars: gsap.TweenVars = {},
      triggerEl?: string | Element,
    ) => {
      gsap.from(targets, {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: (triggerEl ?? targets) as gsap.DOMTarget,
          start: 'top 88%',
        },
        ...vars,
      });
    };


    // ── 섹션 타이틀 (모든 .inv-title) ───────────────────
    // document.querySelectorAll<Element>('.inv-title').forEach((el) => {
    //   onScroll(el, {}, el);
    // });


    // ── 인사말 ───────────────────────────────────────────
    onScroll('.inv-greeting__title');
    onScroll('.inv-greeting', { delay: 0.1 });


    // ── 신랑신부 ─────────────────────────────────────────
    // onScroll('.inv-title');   // 전체 래퍼
    // gsap.from('.inv-person', {
    //   opacity: 0,
    //   y: 28,
    //   duration: 0.7,
    //   ease: 'power2.out',
    //   stagger: 0.15,
    //   scrollTrigger: { trigger: '.inv-people', start: 'top 88%' },
    // });
    // onScroll('.inv-people ~ .inv-btn');   // 연락하기 버튼


    // ── 갤러리 ───────────────────────────────────────────
    // gsap.from('.inv-gallery__item', {
    //   opacity: 0,
    //   scale: 0.94,
    //   duration: 0.55,
    //   ease: 'power2.out',
    //   stagger: 0.07,
    //   scrollTrigger: { trigger: '.inv-gallery__grid', start: 'top 88%' },
    // });


    // ── 날짜/캘린더 카드 ─────────────────────────────────
    // gsap.from('.inv-calendar__cards .inv-card', {
    //   opacity: 0,
    //   y: 28,
    //   duration: 0.7,
    //   ease: 'power2.out',
    //   stagger: 0.15,
    //   scrollTrigger: { trigger: '.inv-calendar__cards', start: 'top 88%' },
    // });
    // onScroll('.inv-date-full');


    // ── 지도 주소 + 링크 버튼 ────────────────────────────
    // onScroll('.inv-map__address');
    // onScroll('.inv-map__links', { delay: 0.1 });


    // ── 계좌 카드 ─────────────────────────────────────────
    // gsap.from('.inv-account-card', {
    //   opacity: 0,
    //   y: 28,
    //   duration: 0.7,
    //   ease: 'power2.out',
    //   stagger: 0.15,
    //   scrollTrigger: { trigger: '.inv-accounts__grid', start: 'top 88%' },
    // });

     // ── 푸터 버튼 ────────────────────────────
    //  onScroll('.url-copy-btn');
    //  onScroll('.inv-footer__btn--kakao');
    //  onScroll('.google-calendar-btn');

    // ── .inv-btn 반짝 애니메이션 ─────────────────────────
    const btnObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), 200);
            btnObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll('.inv-btn').forEach((el) => btnObserver.observe(el));

    // ── 클린업 ───────────────────────────────────────────
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      heroTl.kill();
      btnObserver.disconnect();
    };
  }, [enabled]);
}
