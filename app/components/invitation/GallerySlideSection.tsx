'use client';

import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

interface GallerySlideSectionProps {
  images: string[];
}

type Phase = 'hidden' | 'open' | 'closing';

export function GallerySlideSection({ images }: GallerySlideSectionProps) {
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('hidden');

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    setPhase('open');
  }, []);

  const closeLightbox = useCallback(() => {
    setPhase('closing');
    setTimeout(() => setPhase('hidden'), 250);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section className="inv-section inv-section--alt gallery-section">
      <h2 className="inv-title eng" data-aos="fade-in">Gallery</h2>

      <div className="gallery-slide" data-aos="fade-in" data-aos-delay="100">
        <Swiper
          modules={[Pagination]}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={12}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          className="inv-gallery-swiper"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="inv-gallery-swiper__slide" onClick={() => openLightbox(idx)}>
              <img src={src} alt={`웨딩 사진 ${idx + 1}`} className="inv-slide__img" draggable={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 라이트박스 */}
      {phase !== 'hidden' && (
        <>
          <div
            className={`inv-lightbox-overlay${phase === 'closing' ? ' inv-lightbox-overlay--out' : ''}`}
            onClick={closeLightbox}
          />
          <div className={`inv-lightbox${phase === 'closing' ? ' inv-lightbox--out' : ''}`}>
            <button className="inv-lightbox__close" onClick={closeLightbox} aria-label="닫기">✕</button>
            <Swiper
              modules={[EffectFade, Navigation]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              // navigation
              loop
              initialSlide={lightboxIdx}
              className="inv-lightbox__swiper"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img src={src} alt={`갤러리 사진 ${idx + 1}`} className="inv-lightbox__img" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
}
