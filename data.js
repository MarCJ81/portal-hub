/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · 데이터
 * 21종 무료 웹앱 라인업, 유료 대체 요금 참고표, 5단계 워크플로, B2B 납품 3단계.
 *
 * - 배포 전 확인: CONTACT_EMAIL 한 줄만 넣으면 '메일 앱으로 보내기'가 켜집니다.
 * - live: true 인 앱만 카드 CTA가 열립니다. 지금은 21종 모두 배포 완료 상태를 전제로 true 입니다.
 * - pro: true 는 OpenAI·Gemini·Claude 키를 넣는 Pro AI 연결을 함께 지원하는 앱입니다(무료 모드는 키 없이 동작).
 * - 배포 순서: 이 허브는 라인업의 마지막(22번)에 올립니다. 1~21번 앱이 모두 라이브가 된 뒤에
 *   올려야 카드 21개의 링크가 살아 있습니다(live: true는 그 전제).
 * - 개인정보·블로그명·실명은 이 파일에 넣지 않습니다(테스트가 검사합니다).
 * ==========================================================================*/
(function (root) {
  'use strict';

  var CONTACT_EMAIL = '';           // 예: 'hello@example.com' — 비워 두면 복사 전용으로 동작
  var CONTACT_LABEL = '운영자 메일';  // 화면에 보이는 수신자 표기

  var CATEGORIES = [
    { id: 'all', label: '전체', note: '21종' },
    { id: 'content', label: '콘텐츠·SNS', note: '7종' },
    { id: 'commerce', label: '커머스·마케팅', note: '5종' },
    { id: 'legal', label: '법률·세무·계약', note: '6종' },
    { id: 'utility', label: '보안·유틸', note: '3종' }
  ];

  /* price: 1인 기준 월 참고액(원). 공개 요금제를 2026-11에 확인해 만원 단위로 반올림한 값. */
  var APPS = [
    {
      id: 'shortform-radar', no: 1, name: '떡상 레이더', en: 'Shortform Radar',
      slug: 'shortform-radar', url: 'https://marcj81.github.io/shortform-radar/', live: true,
      category: 'content', thumb: 'radar',
      tagline: '채널 평균 대비 몇 배로 뜬 숏폼만 골라 봅니다. 훅·구간·30초 대본까지 뽑아 벤치마킹 보드에 쌓습니다.',
      features: ['바이럴 배수 자동 계산', '30초 대본 + 훅', '실시간 수집 보드'],
      replaces: { name: '숏폼 트렌드 분석 서비스', price: 29000 }
    },
    {
      id: 'blog-seo-studio', no: 2, name: '블로그 키워드·SEO 스튜디오', en: 'Blog SEO Studio',
      slug: 'blog-seo-studio', url: 'https://marcj81.github.io/blog-seo-studio/', live: true,
      category: 'content', thumb: 'blog',
      tagline: '키워드 경쟁률부터 발행 전 원고 진단까지 한 화면에. AI 번역체 12계열과 위험 표현을 문장 단위로 짚습니다.',
      features: ['키워드 경쟁률·등급', '번역체 12계열 탐지', '5단 원고 빌더'],
      replaces: { name: '블로그 키워드 분석 구독', price: 33000 }
    },
    {
      id: 'commerce-seo-studio', no: 3, name: '커머스 SEO 스튜디오', en: 'Commerce SEO Studio',
      slug: 'commerce-seo-studio', url: 'https://marcj81.github.io/commerce-seo-studio/', live: true,
      category: 'commerce', thumb: 'commerce',
      tagline: '상품명 점수, 경쟁강도, 7단 상세 카피, 상세 디자인 v2까지. 스마트스토어와 쿠팡 규칙을 각각 적용합니다.',
      features: ['상품명 0~100점', '경쟁강도 1초 계산', '7단 상세 카피'],
      replaces: { name: '셀러 키워드·경쟁 분석 툴', price: 22000 }
    },
    {
      id: 'cardnews-script-studio', no: 4, name: '카드뉴스·대본 스튜디오', en: 'Card News Studio',
      slug: 'cardnews-script-studio', url: 'https://marcj81.github.io/cardnews-script-studio/', live: true,
      category: 'content', thumb: 'cardnews',
      tagline: '긴 글을 4:5·9:16 카드로 쪼개 PNG·ZIP으로 내려받습니다. 같은 주제로 숏폼 대본과 .srt 자막까지.',
      features: ['PNG·ZIP 내보내기', '레퍼런스 90% 복제', '숏폼 .srt 자막'],
      replaces: { name: '카드뉴스 제작 툴 유료 플랜', price: 15000 }
    },
    {
      id: 'youtube-comment-analyzer', no: 5, name: '유튜브 댓글·고객반응 분석기', en: 'Comment Radar',
      slug: 'youtube-comment-analyzer', url: 'https://marcj81.github.io/youtube-comment-analyzer/', live: true,
      category: 'content', thumb: 'comments',
      tagline: '댓글을 구매의향·질문·긍정·불만으로 자동 분류합니다. 자주 나온 질문으로 FAQ와 다음 소재를 뽑습니다.',
      features: ['4분류 자동 태깅', 'FAQ·고정댓글 추출', '카피 스튜디오'],
      replaces: { name: '댓글 수집·분석 유료 툴', price: 19000 }
    },
    {
      id: 'ad-law-checker', no: 6, name: '광고 문구 법률 검수기', en: 'Ad Law Checker',
      slug: 'ad-law-checker', url: 'https://marcj81.github.io/ad-law-checker/', live: true,
      category: 'legal', thumb: 'law',
      tagline: '건기식·뷰티·의료·커머스 50개 규칙으로 위험 표현을 1초에 잡고, 쓸 수 있는 대체 문구를 함께 줍니다.',
      features: ['50개 규칙 1초 검수', '대가성·고지 점검', '대체 문구 제안'],
      replaces: { name: '광고 문구 사전 검수 대행', price: 29000 }
    },
    {
      id: 'agency-proposal-maker', no: 7, name: '대행사 견적서·제안서 생성기', en: 'Proposal Studio',
      slug: 'agency-proposal-maker', url: 'https://marcj81.github.io/agency-proposal-maker/', live: true,
      category: 'commerce', thumb: 'proposal',
      tagline: '실전 단가 프리셋 5종을 불러 수량만 고치면 A4 2쪽 견적서가 완성됩니다. 8종 테마와 PDF 인쇄까지.',
      features: ['단가 프리셋 5종', 'A4 2쪽 PDF', '문구 진단·교정'],
      replaces: { name: '견적·인보이스 SaaS', price: 16500 }
    },
    {
      id: 'influencer-campaign-board', no: 8, name: '체험단 매칭 보드', en: 'Creator Matching Board',
      slug: 'influencer-campaign-board', url: 'https://marcj81.github.io/influencer-campaign-board/', live: true,
      category: 'commerce', thumb: 'influencer',
      tagline: '모집 공고부터 지원자 선정·발송·리뷰 마감·CPV까지. 광고주에게 보낼 1장 성과 리포트가 같이 나옵니다.',
      features: ['지원자 파이프라인', '공고문 심리 진단', 'CPV·ROI 리포트'],
      replaces: { name: '체험단 매칭 플랫폼 정액', price: 39000 }
    },
    {
      id: 'pdf-sign-stamp', no: 9, name: 'PDF 서명·직인 스튜디오', en: 'PDF Sign & Stamp',
      slug: 'pdf-sign-stamp', url: 'https://marcj81.github.io/pdf-sign-stamp/', live: true,
      category: 'legal', thumb: 'signature',
      tagline: '계약서 PDF는 브라우저 밖으로 나가지 않습니다. 서명과 투명 도장을 그 자리에서 만들어 얹습니다.',
      features: ['서버 전송 0건', '투명 도장 제작', '계약서 5종 양식'],
      replaces: { name: 'PDF 서명 도구 구독', price: 16500 }
    },
    {
      id: 'payslip-calculator', no: 10, name: '급여명세서 스튜디오', en: 'Payslip Studio',
      slug: 'payslip-calculator', url: 'https://marcj81.github.io/payslip-calculator/', live: true,
      category: 'legal', thumb: 'payslip',
      tagline: '2026년 요율로 주휴수당·4대보험을 계산하고, 근로기준법 제48조 기재사항을 갖춘 A4 명세서를 뽑습니다.',
      features: ['2026 요율 반영', '5인 미만 주휴수당', 'A4 1쪽 인쇄'],
      replaces: { name: '급여·명세서 관리 SaaS', price: 29000 }
    },
    {
      id: 'tax-margin-calculator', no: 11, name: '1인 사업자 세금·순수익 계산기', en: 'Tax & Margin Calculator',
      slug: 'tax-margin-calculator', url: 'https://marcj81.github.io/tax-margin-calculator/', live: true,
      category: 'legal', thumb: 'tax',
      tagline: '간이·일반 부가세, 3.3% 종소세, 플랫폼 수수료까지 넣고 이번 달 손에 쥘 돈을 확인합니다.',
      features: ['간이 vs 일반 비교', '3.3% 종소세 계산', '월 순수익 시뮬'],
      replaces: { name: '세무 상담·정산 대행', price: 19000 }
    },
    {
      id: 'linkhub-studio', no: 12, name: '원탭링크 (OneTapLink)', en: 'Link & Inquiry Builder',
      slug: 'onetaplink-studio', url: 'https://marcj81.github.io/onetaplink-studio/', live: true,
      category: 'commerce', thumb: 'linkhub',
      tagline: '프로필 링크와 1분 견적 문의폼을 만들고, 광고·로고 없는 HTML 한 장으로 내보냅니다.',
      features: ['외부 요청 0건 HTML', '1분 문의폼', '로고·테마 자유'],
      replaces: { name: '프로필 링크 유료 플랜', price: 19000 }
    },
    {
      id: 'ics-viewer-online', no: 13, name: 'ICS Calendar Viewer & CSV Converter', en: 'ICS Viewer',
      slug: 'ics-viewer-online', url: 'https://marcj81.github.io/ics-viewer-online/', live: true,
      category: 'utility', thumb: 'calendar', lang: 'en',
      tagline: 'Open an .ics file, check it against RFC 5545, and export the events to CSV, TSV or JSON — all inside the tab.',
      features: ['RFC 5545 validation', 'CSV · TSV · JSON export', 'Sample calendar built in'],
      replaces: { name: 'Calendar converter tool', price: 4000 }
    },
    {
      id: 'invoice-receipt-pl-generator', no: 14, name: 'Invoice, Receipt & P&L Generator', en: 'Invoice & P&L',
      slug: 'invoice-receipt-pl-generator', url: 'https://marcj81.github.io/invoice-receipt-pl-generator/', live: true,
      category: 'legal', thumb: 'invoice', lang: 'en',
      tagline: 'Make an invoice, a receipt, a quote or a P&L and print it. Every amount is computed in integer cents with BigInt.',
      features: ['Invoice · quote · P&L', 'BigInt cent math', 'Print or save as PDF'],
      replaces: { name: 'Invoicing & bookkeeping SaaS', price: 26000 }
    },
    {
      id: 'llm-cost-llms-txt', no: 15, name: 'LLM API Cost Calculator & llms.txt Generator', en: 'LLM Cost & llms.txt',
      slug: 'llm-cost-llms-txt', url: 'https://marcj81.github.io/llm-cost-llms-txt/', live: true,
      category: 'utility', thumb: 'llm', lang: 'en',
      tagline: 'Price one request across OpenAI, Anthropic, Google and DeepSeek models, then generate a spec-shaped llms.txt.',
      features: ['Per-request to yearly cost', 'Budget reverse calculation', 'llms.txt generator'],
      replaces: { name: 'LLM pricing dashboard', price: 7000 }
    },
    {
      id: 'severance-leave-calculator', no: 16, name: '퇴직금·연차 계산기', en: 'Severance & Leave',
      slug: 'severance-leave-calculator', url: 'https://marcj81.github.io/severance-leave-calculator/', live: true,
      category: 'legal', thumb: 'severance',
      tagline: '재직일수와 평균임금으로 퇴직금을, 입사일·회계연도 두 기준으로 연차를 계산합니다. 퇴사 정산일수와 연차수당까지 한 화면에 담았습니다.',
      features: ['퇴직금·연차 동시 계산', '평균·통상임금 큰 값 적용', '회계연도 정산 비교'],
      replaces: { name: '퇴직금·연차 계산 엑셀 대행', price: 12000 }
    },
    {
      id: 'privacy-security-guard', no: 17, name: '개인정보·피싱링크 보안 점검기', en: 'Privacy & Link Guard',
      slug: 'privacy-security-guard', url: 'https://marcj81.github.io/privacy-security-guard/', live: true,
      category: 'utility', thumb: 'guard',
      tagline: '붙여넣은 글의 주민번호·카드·계좌를 가리고, 누르기 전에 피싱 링크를 걸러내고, 보내기 전에 사진 속 GPS를 지웁니다.',
      features: ['개인정보 자동 마스킹', '피싱 링크 위험 점수', '사진 GPS·메타 삭제'],
      replaces: { name: '개인정보 점검·마스킹 툴', price: 9000 }
    },

    /* --- 2026-11-21 추가: 사장님·1인 크리에이터용 제작 4종 --- */
    {
      id: 'review-reply-studio', no: 18, name: '사장님 리뷰 답글 스튜디오', en: 'Owner Reply Studio',
      slug: 'review-reply-studio', url: 'https://marcj81.github.io/review-reply-studio/', live: true,
      category: 'commerce', thumb: 'reply', pro: true,
      tagline: '리뷰를 붙여넣으면 별점·감정을 읽고 업종·플랫폼·말투에 맞춘 사장님 답글 3안을 만듭니다. 일괄 답글과 허위 리뷰 소명서까지.',
      features: ['답글 3안·말투 3종', '일괄 답글 CSV', '허위 리뷰 소명서'],
      replaces: { name: '리뷰 관리·답글 대행', price: 29000 }
    },
    {
      id: 'shorts-video-studio', no: 19, name: '원탭 숏폼 스튜디오', en: 'One-Tap Shorts Studio',
      slug: 'shorts-video-studio', url: 'https://marcj81.github.io/shorts-video-studio/', live: true,
      category: 'content', thumb: 'shorts', pro: true,
      tagline: '대본 한 줄로 9:16 숏폼 5컷 스토리보드를 짜고, 자막과 배경음까지 넣어 .webm 영상으로 브라우저에서 바로 녹화합니다.',
      features: ['5컷 스토리보드', '.webm 실제 녹화', '자막 .srt·.vtt'],
      replaces: { name: '숏폼 편집 툴 구독', price: 25000 }
    },
    {
      id: 'ai-writer-studio', no: 20, name: '원탭 원고 스튜디오', en: 'One-Tap Draft Studio',
      slug: 'ai-writer-studio', url: 'https://marcj81.github.io/ai-writer-studio/', live: true,
      category: 'content', thumb: 'writer', pro: true,
      tagline: '주제 한 줄과 경험 메모로 네이버 블로그·스레드 타래·상세페이지 카피를 조립하고, AI 티와 광고 위험 표현을 문장마다 점검합니다.',
      features: ['블로그·스레드·상세', 'AI 티 실시간 점검', '2,200자 원고 목표'],
      replaces: { name: 'AI 글쓰기 구독', price: 19000 }
    },
    {
      id: 'ai-image-studio', no: 21, name: '원탭 이미지·썸네일 스튜디오', en: 'One-Tap Image Studio',
      slug: 'ai-image-studio', url: 'https://marcj81.github.io/ai-image-studio/', live: true,
      category: 'content', thumb: 'image', pro: true,
      tagline: '사진 한 장으로 배경을 지우고 유튜브·인스타·스마트스토어 규격 썸네일을 만듭니다. 테마 6종에 PNG·JPG·WebP 저장.',
      features: ['배경 투명화', '규격 5종·테마 6종', 'PNG·JPG·WebP'],
      replaces: { name: '썸네일 제작 툴 구독', price: 15000 }
    }
  ];

  var STEPS = [
    {
      no: '01', title: '주제와 키워드 발굴',
      lead: '무엇으로 시작할지 정합니다. 뜨는 숏폼과 블로그·스토어 검색량을 같이 봅니다.',
      appIds: ['shortform-radar', 'blog-seo-studio', 'commerce-seo-studio'],
      output: '이번 주 주제 3개 · 키워드 20줄'
    },
    {
      no: '02', title: '반응·경쟁·법률 검수',
      lead: '만들기 전에 걸러 냅니다. 댓글과 리뷰로 수요를 확인하고, 위험 표현을 지우고, 경쟁강도를 봅니다.',
      appIds: ['youtube-comment-analyzer', 'review-reply-studio', 'ad-law-checker'],
      output: '수요 근거 1장 · 위험 표현 0건'
    },
    {
      no: '03', title: '원고·카드뉴스·숏폼 제작',
      lead: '한 번 쓴 글을 원고, 카드, 썸네일, 숏폼 영상으로 나눠 씁니다. 무료 모드만으로도 결과물이 나옵니다.',
      appIds: ['ai-writer-studio', 'cardnews-script-studio', 'ai-image-studio', 'shorts-video-studio'],
      output: '원고 1편 · 카드 8장 · 숏폼 1편'
    },
    {
      no: '04', title: '체험단·링크·견적서 영업',
      lead: '만든 것을 팝니다. 체험단으로 후기를 모으고, 링크와 견적서로 문의를 받습니다.',
      appIds: ['influencer-campaign-board', 'linkhub-studio', 'agency-proposal-maker'],
      output: '문의 폼 1개 · 견적서 1부'
    },
    {
      no: '05', title: '계약·급여·세금 정산',
      lead: '돈이 들어오면 남는 것을 확인합니다. 서명, 명세서, 부가세와 종소세까지 한 번에.',
      appIds: ['pdf-sign-stamp', 'payslip-calculator', 'tax-margin-calculator'],
      output: '서명된 계약서 · 이번 달 순수익'
    }
  ];

  var TIERS = [
    {
      id: 'basic', name: '기본형', tag: '1주 · 1개 도구',
      price: '80만 원부터', note: '세금계산서 발행',
      desc: '지금 쓰는 21종 중 하나를 우리 브랜드로 바꿉니다. 로고·색·문구·도메인만 교체합니다.',
      items: ['도구 1종 브랜드 교체', '로고·색·폰트 적용', 'GitHub Pages 또는 우리 서버에 배포', '1회 수정 2건 포함']
    },
    {
      id: 'studio', name: '스튜디오형', tag: '2~3주 · 3개 도구 묶음',
      price: '180만 원부터', note: '세금계산서 발행',
      desc: '업무 흐름에 맞춰 도구를 묶고, 사내 기준(금지어·단가표·양식)을 데이터로 심습니다.',
      items: ['도구 3종 연결·브랜드 통일', '사내 금지어·단가표·양식 반영', '관리자용 설정 화면', '1회 수정 5건 포함']
    },
    {
      id: 'custom', name: '풀커스텀', tag: '4주~ · 설계부터',
      price: '협의', note: '견적서·계약서 발행',
      desc: '새 도구를 설계합니다. 기존 엑셀·시트·사내 시스템과 데이터를 주고받아야 할 때.',
      items: ['업무 분석 → 화면 설계', 'DB·계정·권한이 붙는 사내 시스템', '오프라인·폐쇄망 설치도 가능', '운영 인수인계 문서']
    }
  ];

  var FAQ = [
    {
      q: '정말 무료인가요? 결제 화면이 안 나옵니다.',
      a: '21종 모두 회원가입·결제·서버가 없습니다. 페이지 파일이 브라우저에서 도는 것이 전부라 운영 비용이 0원이고, 그래서 값을 받을 것이 없습니다. 21종 전부 광고와 추적 스크립트도 넣지 않았습니다.'
    },
    {
      q: '입력한 내용은 어디로 가나요?',
      a: '서버로 가지 않습니다. 입력값은 이 브라우저의 localStorage에만 남고, 다른 기기와 동기화되지 않습니다. 브라우저 기록을 지우면 함께 사라지므로, 급여·세금처럼 중요한 값은 JSON 내보내기로 백업하세요.'
    },
    {
      q: '"내 구독 AI 연결"은 무슨 뜻인가요?',
      a: 'ChatGPT·Claude·Gemini 구독이나 API 키를 이미 쓰고 있다면, 도구가 만든 프롬프트를 복사해 그 대화창에 붙이면 됩니다. API 키를 직접 넣는 방식도 지원하며 키는 이 브라우저에만 저장됩니다. 대화 한도 안에서 쓰는 방식이라 별도 결제가 없습니다. 리뷰 답글·숏폼·원고·이미지 스튜디오 4종은 키를 넣으면 Pro AI가 결과물을 한 번에 채우고, 키가 없어도 무료 모드로 끝까지 동작합니다.'
    },
    {
      q: '법률·세무 판단을 대신해 주나요?',
      a: '아닙니다. 광고 문구 검수기와 세금 계산기는 공개된 규정과 요율을 규칙으로 옮긴 참고 도구입니다. 최종 판단과 신고는 변호사·세무사 등 전문가 검토가 필요합니다. 급여 계산 결과도 사업장 상황에 따라 달라질 수 있습니다.'
    },
    {
      q: '우리 회사 도구로 만들 수 있나요?',
      a: '가능합니다. 기본형은 1주 안에 로고와 색만 바꿔 납품하고, 스튜디오형은 사내 기준을 데이터로 심습니다. 아래 문의 폼에 필요한 도구와 쓰는 업무를 적어 주시면 3일 안에 회신합니다.'
    }
  ];

  var DATA = {
    contactEmail: CONTACT_EMAIL,
    contactLabel: CONTACT_LABEL,
    categories: CATEGORIES,
    apps: APPS,
    steps: STEPS,
    tiers: TIERS,
    faq: FAQ,
    promises: [
      { k: '서버 전송 0건', v: '입력값은 이 브라우저에만 남습니다' },
      { k: '가입 0초', v: '링크를 열면 바로 계산이 됩니다' },
      { k: '내 구독 AI 연결', v: '쓰던 ChatGPT·Claude·Gemini로 이어 씁니다' }
    ],
    meta: {
      total: APPS.length,
      live: APPS.filter(function (a) { return a.live; }).length,
      version: '1.2.0',
      checked: '2026-11-21'
    }
  };

  root.HubData = DATA;
  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
