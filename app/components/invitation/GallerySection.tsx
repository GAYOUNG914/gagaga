'use client';

import { useState, useEffect } from 'react';

interface GallerySectionProps {
  images: string[];
}

const INITIAL_COUNT = 6;
type LightboxPhase = 'hidden' | 'open' | 'closing';

export function GallerySection({ images }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [phase, setPhase] = useState<LightboxPhase>('hidden');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (selectedImage) setPhase('open');
  }, [selectedImage]);

  const handleClose = () => {
    setPhase('closing');
    setTimeout(() => {
      setPhase('hidden');
      setSelectedImage(null);
    }, 220);
  };

  const handleOpen = (image: string) => {
    setSelectedImage(image);
  };

  if (!images || images.length === 0) {
    return (
      <section className="inv-section">
        <div className="inv-container--wide">
          <h2 className="inv-title">Gallery</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            갤러리 이미지가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  const visible = showAll ? images : images.slice(0, INITIAL_COUNT);
  const hasMore = !showAll && images.length > INITIAL_COUNT;

  return (
    <>
      <section className="inv-section inv-section--alt" style={{ position: 'relative' }}>
        <div className="inv-container--wide">
          <h2 className="inv-title" data-aos="fade-in">Gallery</h2>
          <div className="inv-gallery__grid" data-aos="fade-in" data-aos-delay="100">
            {visible.map((image, idx) => (
              <div
                key={idx}
                className="inv-gallery__item"
                onClick={() => handleOpen(image)}
              >
                <img src={image} alt={`웨딩 사진 ${idx + 1}`} />
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              className="inv-gallery__more"
              onClick={() => setShowAll(true)}
              data-aos="fade-in"
              data-aos-delay="200"
            >
              더보기 +{images.length - INITIAL_COUNT}
            </button>
          )}
        </div>
      </section>

      {phase !== 'hidden' && (
        <>
          <div
            className={`inv-lightbox-overlay${phase === 'closing' ? ' inv-lightbox-overlay--out' : ''}`}
            onClick={handleClose}
          />
          <div className={`inv-lightbox${phase === 'closing' ? ' inv-lightbox--out' : ''}`}>
            <div className="inv-lightbox__inner">
              <button className="inv-lightbox__close" onClick={handleClose}>
                ✕
              </button>
              <img
                src={selectedImage!}
                alt="갤러리"
                className="inv-lightbox__img"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
