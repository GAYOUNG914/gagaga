'use client';

import { useState } from 'react';

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

interface FooterSectionProps {
  footerImage?: string;
  groomName: string;
  brideName: string;
  date: string;
  url?: string;
  shareImageUrl?: string;
}

export function FooterSection({ footerImage, groomName, brideName, date, url, shareImageUrl }: FooterSectionProps) {
  const [copiedMsg, setCopiedMsg] = useState('');

  const getPageUrl = () => url || window.location.href;

  const handleKakaoShare = () => {
    
    const doShare = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const kakao = (window as any).Kakao;
      const currentUrl = getPageUrl();
      const imageUrl = shareImageUrl || `${window.location.origin}/og-image.jpg?t=${Date.now()}`;



      if (!kakao.isInitialized()) kakao.init(KAKAO_KEY);

      console.log('[Kakao Share] key:', KAKAO_KEY, 'url:', currentUrl, 'img:', imageUrl);


      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${groomName} ♥ ${brideName} 결혼합니다`,
          description: `${date} 결혼식에 초대합니다`,
          imageUrl,
          link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
        },
        buttons: [
          { title: '청첩장 보기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } },
        ],
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Kakao?.Share) {
      doShare();
      return;
    }

    const existing = document.querySelector('#kakao-share-sdk');
    if (existing) {
      existing.addEventListener('load', doShare, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-share-sdk';
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.crossOrigin = 'anonymous';
    script.onload = doShare;
    document.head.appendChild(script);
  };

  const handleCopyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(getPageUrl());
      } else {
        const el = document.createElement('textarea');
        el.value = getPageUrl();
        el.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopiedMsg('URL이 복사되었습니다!');
      setTimeout(() => setCopiedMsg(''), 2000);
    } catch {
      setCopiedMsg('복사 실패');
      setTimeout(() => setCopiedMsg(''), 2000);
    }
  };

  const handleAddCalendar = () => {
    const [year, month, day] = date.split('-');
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${groomName}님과 ${brideName}님의 결혼식`)}&dates=${year}${month}${day}/${year}${month}${day}`;
    window.open(calUrl, '_blank');
  };

  return (
    <footer className="inv-footer">
      <div className="inv-footer__actions">
        <button onClick={handleCopyUrl} className="inv-footer__btn inv-footer__btn--ghost url-copy-btn" style={{fontFamily: 'NotoSansKR', fontWeight: '400'}} data-aos="fade-in" data-aos-offset="60">
          <i>{copiedMsg ?'':<img src="./images/icons/link.svg" alt="" />}</i>
          {copiedMsg ? <span style={{ fontSize: '0.85rem' }}>{copiedMsg}</span> : ' 청첩장 주소 복사'}
        </button>

        <button onClick={handleKakaoShare} className="inv-footer__btn inv-footer__btn--kakao" style={{fontFamily: 'NotoSansKR', fontWeight: '400', textShadow: '0 1px 2px #00000038', color: '#000000b9'}}  data-aos="fade-in" data-aos-offset="60">
          <i><img src="./images/icons/chat_bk.svg" alt="" /></i> 카카오톡 보내기
        </button>

        <button onClick={handleAddCalendar} className="inv-footer__btn inv-footer__btn--ghost google-calendar-btn" style={{fontFamily: 'NotoSansKR', fontWeight: '400'}} data-aos="fade-in" data-aos-offset="60">
          <i><img src="./images/icons/calendar.svg" alt="" /></i> 구글 캘린더에 추가
        </button>
      </div>

      <div className="inv-footer__copy">
        <p>Copyright 2026. gayoung Kim</p>
        {/* <p>{groomName}님과 {brideName}님의 특별한 날을 축하합니다.</p> */}
      </div>

      <div className="inv-footer__picture">
        {footerImage && <img src={footerImage} alt="푸터 이미지" className="inv-footer__image" />}
      </div>
    </footer>
  );
}
