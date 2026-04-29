// 청첩장 설정 타입
export interface InvitationConfig {
  // 기본 정보
  groomName: string;
  brideName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  address: string;
  locationDetails: string;

  // 선택사항
  groomParents?: {
    father: string;
    fatherPhone?: string;
    mother: string;
    motherPhone?: string;
  };
  brideParents?: {
    father: string;
    fatherPhone?: string;
    mother: string;
    motherPhone?: string;
  };

  // 연락처
  groomPhone?: string;
  bridePhone?: string;

  // 계좌 정보
  accounts?: {
    groom?: { bank: string; accountHolder: string; accountNumber: string };
    groomFather?: { bank: string; accountHolder: string; accountNumber: string };
    groomMother?: { bank: string; accountHolder: string; accountNumber: string };
    bride?: { bank: string; accountHolder: string; accountNumber: string };
    brideFather?: { bank: string; accountHolder: string; accountNumber: string };
    brideMother?: { bank: string; accountHolder: string; accountNumber: string };
  };

  // 디자인 설정
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: 'serif' | 'sans' | 'script';
  theme: 'minimal' | 'elegant' | 'modern' | 'romantic';
  particleType?: 'flower' | 'snow' | 'heart' | 'bokeh';

  // 텍스트 내용
  greetingMessage?: string; // 초대말
  
  // 갤러리
  galleryImages?: string[];
  
  // 지도
  mapUrl?: string; // 네이버/카카오/티맵 등
  mapEmbedUrl?: string; // 지도 임베드 URL
  latitude?: number; // 위도
  longitude?: number; // 경도

  // 오시는 길 교통 안내
  transportation?: {
    subway?: string;
    bus?: string;
    car?: string;
  };

  // 이미지
  heroImage?: string;    // 메인 커플 사진
  heroScript?: string;   // 사진 위 이탤릭 스크립트 문구
  venueImage?: string;   // 장소 사진 (지도 위에 표시)

  //푸터
  footerImage?: string;   // 푸터에 들어갈 사진 (커플 일러스트 등)

  // SEO/소셜
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}
