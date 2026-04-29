'use client';

import { useEffect, useRef } from 'react';

interface MapSectionProps {
  location: string;
  locationDetails?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  venueImage?: string;
  transportation?: {
    subway?: string;
    bus?: string;
    car?: string;
  };
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

function KakaoMap({ latitude, longitude }: { latitude: number; longitude: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kakao = (window as any).kakao;
      const center = new kakao.maps.LatLng(latitude, longitude);
      const map = new kakao.maps.Map(container, { center, level: 3 });
      new kakao.maps.Marker({ position: center, map });
    };

    // kakao.maps.load()는 생성자 초기화 완료 후 콜백을 보장
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initMap = () => (window as any).kakao.maps.load(createMap);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).kakao?.maps) {
      initMap();
      return;
    }

    const existing = document.querySelector('#kakao-map-sdk');
    if (existing) {
      existing.addEventListener('load', initMap);
      return () => existing.removeEventListener('load', initMap);
    }

    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [latitude, longitude]);

  return <div ref={containerRef} style={{ width: '100%', height: '360px' }} />;
}

export function MapSection({
  location,
  locationDetails,
  address,
  latitude,
  longitude,
  venueImage,
  transportation,
}: MapSectionProps) {
  const searchQuery = address ?? location;

  return (
    <section className="inv-section inv-section--alt">
      <div className="inv-container--wide">
        <h2 className="inv-title" data-aos="fade-in">오시는 길</h2>

        <div className="inv-map-wrap" data-aos="fade-in" data-aos-delay="100">
          <div className="inv-map__embed">
            {KAKAO_KEY && latitude && longitude ? (
              <KakaoMap latitude={latitude} longitude={longitude} />
            ) : (
              <div className="inv-map__placeholder">
                <p>지도를 표시할 수 없습니다</p>
              </div>
            )}
          </div>
          <div className="inv-map__links">
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inv-map__link inv-map__link--naver"
              style={{fontFamily: 'NotoSansKR', fontWeight: '400'}}
            >
              네이버맵
            </a>
            <a
              href={`https://map.kakao.com/link/search/${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inv-map__link inv-map__link--kakao"
              style={{fontFamily: 'NotoSansKR', fontWeight: '400'}}
            >
              카카오맵
            </a>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inv-map__link inv-map__link--google"
              style={{fontFamily: 'NotoSansKR', fontWeight: '400'}}
            >
              구글맵
            </a>
          </div>
        </div>

        <p className="inv-map__address" data-aos="fade-in">{location}</p>
        <p className="inv-map__address__detail" data-aos="fade-in" data-aos-delay="100">
          {locationDetails}
        </p>
            

        {transportation && (
          <div className="inv-map__transport" data-aos="fade-in" data-aos-delay="200">
            {transportation.subway && (
              <div className="inv-map__transport-item">
                <p className="inv-map__transport-label">🚇 지하철</p>
                <p className="inv-map__transport-desc">{transportation.subway}</p>
              </div>
            )}
            {transportation.bus && (
              <div className="inv-map__transport-item">
                <p className="inv-map__transport-label">🚌 버스</p>
                <p className="inv-map__transport-desc">{transportation.bus}</p>
              </div>
            )}
            {transportation.car && (
              <div className="inv-map__transport-item">
                <p className="inv-map__transport-label">🚗 자가용</p>
                <p className="inv-map__transport-desc">{transportation.car}</p>
              </div>
            )}
          </div>
        )}


      </div>
    </section>
  );
}
