import { InvitationConfig } from '@/types/invitation';
import { PetalCanvas } from './PetalCanvas';

interface HeroSectionProps {
  config: InvitationConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section className="inv-hero" style={{ position: 'relative' }}>

      {/* 사진 — 맨 뒤 */}
      {config.heroImage && (
        <div className="inv-photo-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <img
            className="inv-photo"
            src={config.heroImage}
            alt={`${config.groomName}과 ${config.brideName}`}
          />
        </div>
      )}

      {/* 파티클 — 사진 앞, 텍스트 뒤 */}
      <PetalCanvas count={30} type={config.particleType ?? config.particleType} style={{ zIndex: 2 }} />

      {/* 이름 + 날짜 + 장소 — 텍스트 레이어 */}
      <div className="inv-hero__content">
      
        <h1 className="inv-hero__names">
          {config.groomName}
          <span className="inv-hero__amp">&amp;</span>
          {config.brideName}

                  {/* 스크립트 문구 — 텍스트 레이어 */}
        {config.heroScript && (
          <p className="inv-script">
            {config.heroScript}
          </p>
        )}  

        </h1>
        <p className="inv-hero__date">
          {config.date.split('-').join('. ')}
        </p>
        <p className="inv-hero__location">
          {config.location}
        </p>
      </div>

      <div className="inv-torn">
        <img src="/images/torn_paper.webp" alt="" />
      </div>

    </section>
  );
}
