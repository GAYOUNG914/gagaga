'use client';

import { InvitationConfig } from '@/types/invitation';
import { useState, useEffect } from 'react';

type Phase = 'hidden' | 'open' | 'closing';

function ContactPopup({
  isOpen,
  onClose,
  groomName,
  brideName,
  groomPhone,
  bridePhone,
  groomParents,
  brideParents,
}: {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  groomPhone?: string;
  bridePhone?: string;
  groomParents?: { father: string; fatherPhone?: string; mother: string; motherPhone?: string };
  brideParents?: { father: string; fatherPhone?: string; mother: string; motherPhone?: string };
}) {
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    if (isOpen) setPhase('open');
  }, [isOpen]);

  const handleClose = () => {
    setPhase('closing');
    setTimeout(() => {
      setPhase('hidden');
      onClose();
    }, 220);
  };

  if (phase === 'hidden') return null;

  return (
    <>
      <div
        className={`inv-popup-overlay${phase === 'closing' ? ' inv-popup-overlay--out' : ''}`}
        onClick={handleClose}
      />
      <div className={`inv-popup${phase === 'closing' ? ' inv-popup--out' : ''}`}>
        <div className="inner">
          <h3 className="inv-popup__title">연락하기</h3>
          <div className="inv-popup__section-wrap">
            <div className="inv-popup__section">
              <div className="inv-popup__name-wrap">
                <p className="inv-popup__label">신랑</p>
                <p className="inv-popup__name">{groomName}</p>
              </div>
              {groomPhone && (
                <a href={`tel:${groomPhone}`} className="inv-popup__call">📞 전화하기</a>
              )}
            </div>
            {groomParents && (
              <>
                <div className="inv-popup__section">
                  <div className="inv-popup__name-wrap">
                    <p className="inv-popup__label">신랑 아버지</p>
                    <p className="inv-popup__name">{groomParents.father}</p>
                  </div>
                  {groomParents.fatherPhone && (
                    <a href={`tel:${groomParents.fatherPhone}`} className="inv-popup__call">📞 전화하기</a>
                  )}
                </div>
                <div className="inv-popup__section">
                  <div className="inv-popup__name-wrap">
                    <p className="inv-popup__label">신랑 어머니</p>
                    <p className="inv-popup__name">{groomParents.mother}</p>
                  </div>
                  {groomParents.motherPhone && (
                    <a href={`tel:${groomParents.motherPhone}`} className="inv-popup__call">📞 전화하기</a>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="inv-popup__section-wrap">
            <div className="inv-popup__section">
              <div className="inv-popup__name-wrap">
                <p className="inv-popup__label">신부</p>
                <p className="inv-popup__name">{brideName}</p>
              </div>
              {bridePhone && (
                <a href={`tel:${bridePhone}`} className="inv-popup__call">📞 전화하기</a>
              )}
            </div>
            {brideParents && (
              <>
                <div className="inv-popup__section">
                  <div className="inv-popup__name-wrap">
                    <p className="inv-popup__label">신부 아버지</p>
                    <p className="inv-popup__name">{brideParents.father}</p>
                  </div>
                  {brideParents.fatherPhone && (
                    <a href={`tel:${brideParents.fatherPhone}`} className="inv-popup__call">📞 전화하기</a>
                  )}
                </div>
                <div className="inv-popup__section">
                  <div className="inv-popup__name-wrap">
                    <p className="inv-popup__label">신부 어머니</p>
                    <p className="inv-popup__name">{brideParents.mother}</p>
                  </div>
                  {brideParents.motherPhone && (
                    <a href={`tel:${brideParents.motherPhone}`} className="inv-popup__call">📞 전화하기</a>
                  )}
                </div>
              </>
            )}
          </div>
          <button className="inv-popup__close" onClick={handleClose} style={{fontFamily: 'NotoSansKR', fontWeight: '400', borderRadius:'50px'}}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
}

interface BrideGroomSectionProps {
  config: InvitationConfig;
}

export function BrideGroomSection({ config }: BrideGroomSectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="inv-section" style={{ position: 'relative', paddingTop: '80px' }}>
        <div className="inv-container">
          <h2 className="inv-title" data-aos="fade-in">신랑 · 신부</h2>

          <div className="inv-people">
            <div className="inv-person" data-aos="fade-in">
              <p className="inv-person__name">{config.groomName}</p>
              {config.groomParents && (
                <p className="inv-person__parents">
                  아버지: {config.groomParents.father}<br />
                  어머니: {config.groomParents.mother}
                </p>
              )}
            </div>
            <div className="inv-person" data-aos="fade-in" data-aos-delay="100">
              <p className="inv-person__name">{config.brideName}</p>
              {config.brideParents && (
                <p className="inv-person__parents">
                  아버지: {config.brideParents.father}<br />
                  어머니: {config.brideParents.mother}
                </p>
              )}
            </div>
          </div>

          <button className="inv-btn" onClick={() => setIsContactOpen(true)} style={{fontFamily: 'NotoSansKR', fontWeight: '400', borderRadius:'50px'}} data-aos="fade-in" data-aos-delay="200">
            <i><img src="./images/icons/chat.svg" alt="" /></i> 연락하기
          </button>
        </div>
      </section>

      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        groomName={config.groomName}
        brideName={config.brideName}
        groomPhone={config.groomPhone}
        bridePhone={config.bridePhone}
        groomParents={config.groomParents}
        brideParents={config.brideParents}
      />
    </>
  );
}
