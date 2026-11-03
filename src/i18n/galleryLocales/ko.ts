import { MEDIA_REGISTRY } from '../../assets/mediaRegistry';
import type { GallerySectionCopy } from '../galleryTranslations';

export const koGallery: GallerySectionCopy = {
  kicker: '공식 앱 화면 갤러리 · Google Play & App Store (출시 예정)',
  heading: '실제 앱 화면 및 핵심 기능 상세 안내.',
  subheading:
    '미드나잇 블루 다크 모드와 라이트 모드, 커스텀 캔버스 및 OCR 노트, 스마트 캘린더·알람, 저축 및 지출 분석 차트, 개인 Google 드라이브 백업 화면을 직접 확인하세요.',
  zoomHint: '화면 크게 보기',
  closePreview: '미리보기 닫기',
  prevScreen: '이전',
  nextScreen: '다음',
  heroDarkBtn: '다크 모드',
  heroLightBtn: '라이트 모드',
  items: [
    {
      id: 'dark-mode',
      src: MEDIA_REGISTRY.darkModeScreen,
      badge: '01 · 다크 모드',
      title: '시그니처 미드나잇 블루 다크 모드 홈',
      subtitle:
        '노트북, 일간, 주간, 월간, 체크리스트, 저축, 지출, 캘린더, 계산기, 알람까지 하나의 통합 대시보드에서 체계적으로 관리하세요.',
      bullets: [
        '정밀 알람을 포함한 10개의 통합 워크스페이스 모듈',
        '전체 · 생산성 · 금융 카테고리 원탭 빠른 필터링',
        '밤낮 언제나 눈이 편안한 집중형 컬러 설계',
      ],
    },
    {
      id: 'light-mode',
      src: MEDIA_REGISTRY.lightModeScreen,
      badge: '02 · 라이트 모드',
      title: '선명하고 깔끔한 클린 라이트 모드',
      subtitle:
        '상단 테마 아이콘을 한 번 탭하여 미드나잇 블루 다크 모드와 라이트 모드를 즉시 전환할 수 있습니다.',
      bullets: [
        '직관적인 컬러 아이콘과 선명한 카드형 레이아웃',
        '보안 잠금 및 환경설정에 즉시 접근',
        '오프라인과 온라인 모두에서 빠르고 가볍게 실행',
      ],
    },
    {
      id: 'versatile-notebook',
      src: MEDIA_REGISTRY.versatileNotebookScreen,
      badge: '03 · 다기능 노트북',
      title: '무제한 노트, 커스텀 캔버스 & 스마트 OCR',
      subtitle:
        '커스텀 캔버스와 배경 색상·JPG 배경 이미지를 자유롭게 지정하고, 사진을 첨부하거나 오프라인·온라인 카메라 OCR로 글자를 스캔하세요.',
      bullets: [
        '노트 배경색 변경 및 나만의 JPG 배경 이미지 지원',
        '풍부한 서식 도구 모음 (글꼴, 굵게, 밑줄, 코드, 링크)',
        '체계적인 폴더 정리 및 빠른 키워드 검색',
      ],
    },
    {
      id: 'plans-calendar',
      src: MEDIA_REGISTRY.plansCalendarScreen,
      badge: '04 · 플래너 & 캘린더',
      title: '플래너, 스마트 캘린더 & 알람 리마인더',
      subtitle:
        '일간·주간·월간 노트를 작성하고 스마트 캘린더에 일정을 등록하며, 나만의 벨소리 알람으로 중요한 약속을 정확히 챙기세요.',
      bullets: [
        '일간 · 주간 · 월간 전용 노트 폴더 구조',
        '빠른 내보내기를 지원하는 컬러 체크리스트',
        '스마트 캘린더 및 커스텀 MP3 알람 연동',
      ],
    },
    {
      id: 'financial-goals',
      src: MEDIA_REGISTRY.financialGoalsScreen,
      badge: '05 · 재무 목표 달성',
      title: '목표를 현실로: 저축 & 지출 분석 트래커',
      subtitle:
        '모든 현금 흐름을 모니터링하고 인터랙티브 분석 차트와 리포트로 꿈을 향한 저축을 꾸준히 늘려가세요.',
      bullets: [
        '저축 목표 설정, 청구서 관리 및 내장 미니 계산기',
        '인터랙티브 도넛/파이, 막대, 선형 분석 차트 제공',
        '전체 거래 내역 조회 및 PDF · Excel 문서 내보내기',
      ],
    },
    {
      id: 'privacy-backup',
      src: MEDIA_REGISTRY.privacyBackupScreen,
      badge: '06 · 개인정보 및 백업',
      title: '안전한 로컬 데이터 보호 & Google 드라이브 백업',
      subtitle:
        '개인 메모와 금융 기록은 기기 내부에 안전하게 보관되며 온라인 연결 시 개인 Google 드라이브로 직접 백업 및 복원할 수 있습니다.',
      bullets: [
        '온라인 상태에서 개인 Google 드라이브 계정으로 직접 백업 및 복원',
        '6자리 PIN · 패턴 · 생체 인증 다중 앱 잠금',
        '로컬 데이터 및 클라우드 백업에 대한 완전한 사용자 통제',
      ],
    },
  ],
};
