/* ==========================================================================
   원탭 도구 허브 (OneTap Tools) · KO / EN runtime
   Korean is the default in the markup; this file adds English.
   - Language choice: ?lang=ko|en → localStorage('onetap_lang') → navigator.language
   - Static text is translated by exact match on the text node, so the markup
     stays readable and no string is duplicated.
   - Dynamic strings call t('english') from app.js.
   - Elements holding inline markup get a data-ko-html="…" attribute.
   ========================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'onetap_lang';
  var DEFAULT_LANG = 'ko';
  var OTHER_LANG = 'en';

  var DICT = {
    /* ---- static page ---- */
    '무료 도구 30선 — 1인 사업자·마케터 웹툴 모음 | 원탭 도구 허브': 'Free web tools for solo founders and marketers | OneTap Tools',
    '도구 목록으로 바로 가기': 'Skip to the tool list',
    '원탭 도구 허브': 'OneTap Tools',
    '도구 31종': 'Tools',
    '절약액': 'Savings',
    '5단계': '5 steps',
    '커스텀 제작': 'Custom build',
    '도구 검색': 'Search tools',
    '종 라이브': ' live',
    '제작 문의': 'Build enquiry',
    '무료 도구 · 서버 0 · 가입 0 ·': 'Free tools · zero servers · zero sign-up ·',
    '월 구독료 없이 평생 쓰는': 'No subscription, ever.',
    '1인 사업자·마케터': 'for solo founders and marketers',
    '무료 도구': 'Free tools',
    '30선': 'yours to keep',
    '키워드 발굴부터 블로그 원고, 카드뉴스, 숏폼 영상, 썸네일, 인쇄용 벡터 변환, 리뷰 답글, 광고 문구 검수, 견적서와 수리 시세 비교, 작업 증빙 리포트, 계약서 서명, 급여명세서와 세금·퇴직금·연말정산 정산, 개인정보·피싱 점검, AI 팀 회의실과 광고비 감사, 긴 영상에서 9:16 클립을 뽑는 클립 팩토리, HWPX를 HWP로 바꾸는 변환기, AI로 만든 웹앱의 구멍을 잡는 웹앱 실드까지. 30개 도구가 브라우저 안에서만 돌아갑니다.':
      'From keyword research to blog drafts, card news, short-form video, thumbnails, print-ready vector conversion, review replies, ad copy checks, quotes and repair price comparisons, proof-of-work reports, contract signing, payslips and tax, severance and year-end settlement, privacy and phishing checks, an AI team room and ad-spend audit, a clip factory that cuts 9:16 clips from long video, an HWPX-to-HWP converter and a web app shield that finds the holes in AI-built apps. All of them run inside your browser.',
    '도구 31종 열기': 'Open the tools',
    '구독료 얼마나 아끼나': 'How much do I save?',
    '앱처럼 설치': 'Install as an app',
    '서버 전송 0건': 'Zero uploads',
    '입력값은 이 브라우저에만': 'Input stays in this browser',
    '가입 0초': 'No sign-up',
    '링크를 열면 바로 계산': 'Open the link and start',
    '내 구독 AI 연결': 'Use your own AI',
    '쓰던 ChatGPT·Claude·Gemini로': 'Your ChatGPT, Claude or Gemini',
    '빠른 검색': 'Quick search',
    '급여명세서': 'Payslip',
    '카드뉴스': 'Card news',
    '세금 계산': 'Tax calculator',
    '계약서 서명': 'Sign a contract',
    '지금 내는 구독료 영수증': 'Your subscription receipt',
    '합계': 'Total',
    '0원': '₩0',
    '이 허브에서': 'Here',
    '구독료': 'FEES',
    '30종': ' tools',
    '기준 · 1인 · 공개 요금제 참고값.': ' basis · one seat · public list prices.',
    '연': 'Yearly ',
    '이 사라집니다.': ' disappears.',
    '줄을 눌러 하나씩 지워 보기': 'Tap a line to cross it out',
    '종': ' tools',
    '+ 백오피스 오퍼 1장': '+ 1 back-office offer',
    '한 달에 사라지는 구독료': 'Subscription fees gone each month',
    '원': '',
    '서버로 가는 입력값': 'Input sent to a server',
    '건': '',
    '전부 이 브라우저에서': 'All in this browser',
    '첫 결과까지': 'To first result',
    '초': 's',
    '가입 없이 즉시': 'Instant, no account',
    '도구 30종 + 오퍼 1': 'Free tools + 1 offer',
    '하는 일을 그대로 검색하세요': 'Search for the job you need done',
    '카테고리로 좁히거나, 하려는 일을 그대로 적으면 됩니다.': 'Narrow by category, or just type what you want to do.',
    '예: 세금, 카드뉴스, 계약서, 댓글.': 'e.g. tax, card news, contract, comments.',
    '어디서든': 'Anywhere',
    '또는': 'or',
    '지금 열 수 있는 도구만': 'Only tools that open now',
    '🇰🇷 한국 전용 도구 9종': '🇰🇷 Korea-specific tools (9)',
    '한국 전용 도구 9종 보기': 'Show the 9 Korea-specific tools',
    '31장': 'cards',
    '검색어에 맞는 도구가 없습니다.': 'No tool matches that search.',
    '전체 31장 보기': 'Show all cards',
    '30종 모두 지금 바로 열 수 있습니다.': 'All 30 tools open right now.',
    '각 카드의 ‘지금 열기’는 새 창에서 그 도구를 엽니다. 우리 회사 로고·기준을 넣은 제작은 아래 문의 폼에서 상담하세요.': '“Open now” on each card opens that tool in a new tab. For a version with your logo and rules, use the enquiry form below.',
    '절약액 계산': 'Savings calculator',
    '지금 내는 구독료를 하나씩 지워 봅니다': 'Cross out the subscriptions you pay for now',
    '대체하려는 도구만 남기고 체크를 풀어 보세요. 남은 합계가 이 허브로 바꿨을 때 사라지는 금액입니다. 위 영수증의 줄을 눌러도 같은 계산이 됩니다.': 'Uncheck the tools you would not replace. What is left is the money that disappears when you switch to this hub. Tapping a line on the receipt gives the same calculation.',
    '한 달': 'Per month',
    '선택 30종 · 1인': ' tools selected · one seat',
    '1년': 'Per year',
    '같은 조건으로 12개월': 'Same terms, twelve months',
    '이 허브에서 내는 돈': 'Paid here',
    '계정도, 카드도 필요 없습니다': 'No account, no card',
    '대체 대상': 'Replacing',
    '종 선택됨': 'tools selected',
    '전체 선택': 'Select all',
    '전체 해제': 'Clear all',
    '도구별 유료 대체 서비스와 월 요금': 'Paid service each tool replaces and its monthly fee',
    '선택': 'Select',
    '이 허브의 도구': 'Tool in this hub',
    '대체하는 유료 서비스': 'Paid service it replaces',
    '월 요금': 'Monthly fee',
    '1인 기준 · 공개 요금제 반올림': 'One seat · public plans, rounded',
    '요금은 각 서비스의 공개 요금제를 2026년 11월에 확인해 반올림한 참고값입니다. 실제 청구액은 좌석 수·연간 약정·부가세에 따라 다르며, 이 페이지는 어떤 서비스와도 제휴 관계가 없습니다. 원탭 백오피스는 유료 대행 서비스라 이 계산에서 빠집니다.': 'Fees are reference figures taken from each service’s public plan in November 2026 and rounded. Real bills vary with seats, annual commitment and VAT, and this page is not affiliated with any service. The OneTap back office is a paid service, so it is left out of this calculation.',
    '5단계 워크플로': 'Five-step workflow',
    '도구 하나로 끝나지 않게, 순서대로': 'In order, so one tool is never the whole job',
    '주제를 찾고, 걸러 내고, 만들고, 팔고, 정산합니다. 각 단계에서 쓸 도구를 눌러 바로 그 카드로 갑니다.': 'Find the topic, filter it, make it, sell it, settle it. Tap a tool in any step to jump to its card.',
    '해외 고객용 영문 3종(ICS 변환·인보이스/P&L·LLM 비용)은 같은 흐름의 옆 트랙입니다. 달러 결제 견적서와 손익계산이 필요할 때 04~05단계와 함께 쓰면 됩니다. 리뷰 답글·숏폼·원고·이미지 4종과 AI 팀 회의실·광고 감사 스튜디오까지 6종은 OpenAI·Gemini·Claude 키를 넣는 Pro AI 연결을 함께 지원하고, 키가 없어도 무료 모드로 끝까지 동작합니다.': 'The three English tools for overseas clients (ICS converter, invoice/P&L, LLM cost) run alongside this flow; use them with steps 04–05 when you need dollar invoices and a P&L. Six tools — review replies, short-form, drafts, images, the AI team room and the ad audit studio — also support a Pro AI connection with your OpenAI, Gemini or Claude key, and every one of them still works end to end in free mode without a key.',
    '우리 회사 로고와 기준을 넣어 납품합니다': 'Delivered with your logo and your rules',
    '지금 쓰는 도구 하나를 브랜드에 맞게 바꾸거나, 업무에 맞는 새 도구를 만듭니다. 서버 없이 파일로 납품하므로 유지비가 들지 않고, 폐쇄망에도 설치됩니다.': 'We rebrand a tool you already use, or build a new one for your workflow. It ships as files with no server, so there is no maintenance bill, and it installs on a closed network.',
    '빠른 견적 문의': 'Quick quote request',
    '3일 안에 회신합니다. 서버로 보내지 않고, 아래 문안을 복사해 메일로 보내는 방식입니다.': 'We reply within three days. Nothing is sent to a server: you copy the message below and send it by email yourself.',
    '이름': 'Name',
    '필수': 'required',
    '회사·브랜드': 'Company or brand',
    '회신 메일': 'Reply email',
    '연락처': 'Phone',
    '필요한 도구': 'Tool you need',
    '고르세요': 'Choose one',
    '예산': 'Budget',
    '모르겠음': 'Not sure',
    '100만 원 이하': 'Up to ₩1M',
    '100~300만 원': '₩1M–3M',
    '300~1,000만 원': '₩3M–10M',
    '1,000만 원 이상': '₩10M and up',
    '어떤 업무에 쓰실 건가요?': 'What work will it do?',
    '문의 회신을 위해 이름·메일·연락처·요청 내용을 수집·이용하는 데 동의합니다. 회신 후 3개월 안에 지우며, 그 전에 지워 달라고 요청할 수 있습니다.': 'I agree that my name, email, phone and request may be collected and used to reply. They are deleted within three months of the reply, and I can ask for them to be deleted sooner.',
    '개인정보처리방침': 'Privacy policy',
    '문의 문안 만들기': 'Draft the message',
    '입력 지우기': 'Clear the form',
    '전송 버튼이 아니라 문안을 만드는 버튼입니다. 만든 문안을 확인한 뒤 직접 보내 주세요.': 'This button drafts the message rather than sending it. Check the text, then send it yourself.',
    '보낼 문안이 준비됐습니다': 'Your message is ready',
    '문안 복사': 'Copy message',
    '메일 앱으로 보내기': 'Open in mail app',
    '다시 고치기': 'Edit again',
    '자주 묻는 것': 'Common questions',
    '쓰기 전에 확인하실 것': 'Worth checking before you start',
    '돈, 데이터, AI 연결, 법적 판단에 대한 답만 모았습니다.': 'Only the answers about money, data, AI connections and legal judgement.',
    '원탭 도구 허브 (OneTap Tools)': 'OneTap Tools',
    '무료 웹앱 30종 ·': 'Free web tools ·',
    '· 2026.11 기준': '· as of Nov 2026',
    '각 도구는 참고용 계산·검수 도구입니다. 법률·세무·노무의 최종 판단은 전문가 검토가 필요합니다. 이 페이지는 어떤 유료 서비스와도 제휴하지 않았고, 광고·추적 스크립트를 넣지 않았습니다.': 'Every tool is a reference calculator or checker. Final legal, tax and labour decisions need a professional. This page is not affiliated with any paid service and carries no ads or tracking scripts.',
    '이 페이지는 목록과 계산을 브라우저에서 그립니다. JavaScript를 켜면 30종 도구와 절약액 계산이 보입니다.': 'This page draws its list and calculations in the browser. Turn on JavaScript to see the tools and the savings calculator.',
    'INSTALL · 홈 화면에 추가': 'INSTALL · add to home screen',
    '폰 바탕화면에 앱처럼 설치': 'Install it like an app',
    '공유(□↑)': 'Share (□↑)',
    '홈 화면에 추가': 'Add to Home Screen',
    '바탕화면': 'Home screen',
    '이 페이지 주소': 'This page’s address',
    '주소 복사': 'Copy address',
    '닫기': 'Close',
    '설치 안내 닫기': 'Close install guide',
    '검색어 지우기': 'Clear search',
    '도구 검색': 'Search tools',
    '무엇을 하려고 하시나요? (예: 급여, 세금)': 'What do you want to do? (e.g. payslip, tax)',
    '세 가지 약속': 'Three promises',
    '화면 읽기': 'Screen reader',
    '카테고리 필터': 'Category filter',
    '주요 섹션': 'Main sections',
    '바닥글': 'Footer',
    '한눈에 보는 숫자': 'Numbers at a glance',
    '도구 검색으로 이동 (⌘K 또는 /)': 'Go to tool search (⌘K or /)',
    '원탭 도구 허브, 맨 위로': 'OneTap Tools, back to top',
    '폰 바탕화면에 앱 아이콘으로 설치합니다': 'Install an app icon on your phone’s home screen',
    '사람이 붙는 유료 대행 서비스입니다': 'A paid service with a person behind it',
    'OpenAI·Gemini·Claude 키를 넣으면 Pro AI가 함께 채웁니다': 'Add an OpenAI, Gemini or Claude key and Pro AI fills it in',
    '월 구독료 없이 평생 쓰는 무료 도구 30선': 'Free tools you keep for life',
    '서버 전송 0건 · 가입 0초 · 내 구독 AI 연결. 1인 사업자와 마케터를 위한 무료 웹앱 30종.': 'Zero uploads, no sign-up, your own AI subscription. Free web apps for solo founders and marketers.',
    'Free invoice': 'Free invoice',
    '계산 결과': 'Result',

    /* ---- categories ---- */
    '전체': 'All',
    '콘텐츠·SNS': 'Content & social',
    '9종': '9 tools',
    '커머스·마케팅': 'Commerce & marketing',
    '8종': '8 tools',
    '법률·세무·계약': 'Legal · tax · contracts',
    '업무·회의': 'Work & meetings',
    '1종': '1 tool',
    '보안·유틸': 'Security & utilities',
    '5종': '5 tools',

    /* ---- app cards ---- */
    '떡상 레이더': 'Shortform Radar',
    '채널 평균 대비 배수': 'Multiple vs channel average',
    '지금 터지는 숏폼만 골라 배수·참여율·수익 추정까지 한 표에서.': 'Only the short-form clips breaking out now, with multiple, engagement and revenue estimate in one table.',
    '채널 평균 대비 몇 배로 뜬 숏폼만 골라 봅니다. 훅·구간·30초 대본까지 뽑아 벤치마킹 보드에 쌓습니다.': 'Finds the clips that beat their channel average by several times, then lifts the hook, the segment and a 30-second script onto a benchmarking board.',
    '바이럴 배수 자동 계산': 'Automatic viral multiple',
    '30초 대본 + 훅': '30-second script + hook',
    '실시간 수집 보드': 'Live collection board',
    '숏폼 트렌드 분석 서비스': 'Short-form trend service',
    '원탭 벡터 스튜디오': 'OneTap Vector Studio',
    '인쇄용 벡터 출력': 'Print-ready vector output',
    'AI가 만든 로고·일러스트 PNG를 인쇄용 SVG·EPS·AI로.': 'Turn AI logos and illustrations into print-ready SVG, EPS and AI.',
    'ChatGPT·미드저니로 만든 PNG/JPG를 초정밀 벡터(SVG·EPS·PDF·AI)로 바꿉니다. 배경 투명화, 색상 양자화, 베지어 곡선 피팅, 용량 최적화까지 브라우저 안에서.': 'Converts PNG/JPG from ChatGPT or Midjourney into high-precision vectors (SVG, EPS, PDF, AI), with background removal, colour quantisation, Bézier fitting and size optimisation inside the browser.',
    '베지어 곡선 피팅': 'Bézier curve fitting',
    'EPS·PDF·AI 내보내기': 'EPS · PDF · AI export',
    '색상 양자화·용량 최적화': 'Colour quantise + compress',
    '온라인 벡터 변환 서비스 구독': 'Online vectoriser subscription',
    '연말정산 13월의 월급 역산기': '13th Month Reverse Calculator',
    '남은 날짜로 역산': 'Counts back from Dec 31',
    '12월 31일 전에 뭘 얼마나 해야 세금이 얼마 줄어드는지 역산합니다.': 'Counts back from December 31: what to do, and how much it saves.',
    '총급여와 카드·연금·월세만 넣으면 12월 31일 전에 무엇을 얼마나 해야 세금이 얼마 줄어드는지 역산합니다. 카드 25% 문턱, 공제 한도 잔여, 연금저축·IRP 900만 원 한도까지.': 'Enter gross pay, card spending, pension and rent, and it works back from December 31 to show what to do and how much tax it saves — including the 25% card threshold, remaining deduction room and the ₩9M pension/IRP cap.',
    '카드 25% 문턱 계산': '25% card threshold',
    '연금저축·IRP 900만 한도': '₩9M pension/IRP cap',
    '공제 잔여 자동 진단': 'Remaining deduction check',
    '연말정산 환급 진단·상담': 'Year-end refund review',
    '원탭 숏폼 스튜디오': 'OneTap Shorts Studio',
    '30초': '30 sec',
    '대본 → 세로 영상 MP4': 'Script → vertical video',
    '대본 한 줄로 9:16 숏폼 5컷, 자막까지 브라우저에서 녹화.': 'One line of script becomes a five-shot 9:16 clip, captions and all, recorded in the browser.',
    '대본 한 줄로 9:16 숏폼 5컷 스토리보드를 짜고, 자막과 배경음까지 넣어 .webm 영상으로 브라우저에서 바로 녹화합니다.': 'Turns one line of script into a five-shot 9:16 storyboard, adds captions and background audio, and records a .webm right in the browser.',
    '5컷 스토리보드': 'Five-shot storyboard',
    '.webm 실제 녹화': 'Real .webm recording',
    '자막 .srt·.vtt': '.srt / .vtt captions',
    '숏폼 편집 툴 구독': 'Short-form editor subscription',
    '원탭 이미지·썸네일 스튜디오': 'OneTap Image Studio',
    '사진 한 장으로 배경을 지우고 규격 썸네일 5종을 만듭니다.': 'One photo, background removed, five sized thumbnails out.',
    '사진 한 장으로 배경을 지우고 유튜브·인스타·스마트스토어 규격 썸네일을 만듭니다. 테마 6종에 PNG·JPG·WebP 저장.': 'Removes the background from one photo and makes YouTube, Instagram and Smart Store sized thumbnails, in six themes, saved as PNG, JPG or WebP.',
    '배경 투명화': 'Background removal',
    '규격 5종·테마 6종': '5 sizes · 6 themes',
    '썸네일 제작 툴 구독': 'Thumbnail tool subscription',
    '원탭 원고 스튜디오': 'OneTap Draft Studio',
    '블로그·스레드·상세페이지 원고를 조립하고 AI 티를 잡습니다.': 'Assembles blog, Threads and product-page copy and strips the AI tells.',
    '주제 한 줄과 경험 메모로 네이버 블로그·스레드 타래·상세페이지 카피를 조립하고, AI 티와 광고 위험 표현을 문장마다 점검합니다.': 'One topic line plus notes from your own experience assembles a Naver blog post, a Threads thread or product copy, checking every sentence for AI tells and risky ad claims.',
    '블로그·스레드·상세': 'Blog · Threads · product',
    'AI 티 실시간 점검': 'Live AI-tell check',
    '2,200자 원고 목표': '2,200-character target',
    'AI 글쓰기 구독': 'AI writing subscription',
    '블로그 키워드·SEO 스튜디오': 'Blog SEO Studio',
    '키워드 경쟁률부터 발행 전 원고 진단까지 한 화면에.': 'From keyword competition to a pre-publish draft check on one screen.',
    '키워드 경쟁률부터 발행 전 원고 진단까지 한 화면에. AI 번역체 12계열과 위험 표현을 문장 단위로 짚습니다.': 'Keyword competition, five-step draft building and a pre-publish check on one screen, flagging twelve families of machine-translated phrasing and risky claims sentence by sentence.',
    '키워드 경쟁률·등급': 'Keyword competition + grade',
    '번역체 12계열 탐지': '12 translationese patterns',
    '5단 원고 빌더': 'Five-step draft builder',
    '블로그 키워드 분석 구독': 'Keyword analytics subscription',
    '커머스 SEO 스튜디오': 'Commerce SEO Studio',
    '상품명 점수·경쟁강도·7단 상세 카피를 스토어 규칙대로.': 'Product-name score, competition and seven-block copy, by store rules.',
    '상품명 점수, 경쟁강도, 7단 상세 카피, 상세 디자인 v2까지. 스마트스토어와 쿠팡 규칙을 각각 적용합니다.': 'Product-name score, competition, seven blocks of product copy and design v2, applying Smart Store and Coupang rules separately.',
    '상품명 0~100점': 'Name score 0–100',
    '경쟁강도 1초 계산': 'Competition in a second',
    '7단 상세 카피': 'Seven-block copy',
    '셀러 키워드·경쟁 분석 툴': 'Seller keyword tool',
    '카드뉴스·대본 스튜디오': 'Card News Studio',
    '긴 글을 카드 8장과 숏폼 대본·자막으로 쪼갭니다.': 'Splits a long post into eight cards plus a short-form script and captions.',
    '긴 글을 4:5·9:16 카드로 쪼개 PNG·ZIP으로 내려받습니다. 같은 주제로 숏폼 대본과 .srt 자막까지.': 'Cuts a long piece into 4:5 and 9:16 cards, downloadable as PNG or ZIP, with a short-form script and .srt captions from the same topic.',
    '8장': '8 cards',
    'PNG·ZIP 내보내기': 'PNG / ZIP export',
    '레퍼런스 90% 복제': '90% reference clones',
    '숏폼 .srt 자막': '.srt captions',
    '카드뉴스 제작 툴 유료 플랜': 'Card news tool plan',
    '사장님 리뷰 답글 스튜디오': 'Owner Review Reply Studio',
    '리뷰 → 사장님 답글': 'Review → owner reply',
    '리뷰 별점·감정을 읽고 사장님 답글 3안을 만듭니다.': 'Reads the rating and mood, then writes three owner replies.',
    '리뷰를 붙여넣으면 별점·감정을 읽고 업종·플랫폼·말투에 맞춘 사장님 답글 3안을 만듭니다. 일괄 답글과 허위 리뷰 소명서까지.': 'Paste a review and it reads the rating and mood, then writes three owner replies fitted to your industry, platform and tone — plus batch replies and a false-review statement.',
    '답글 3안·말투 3종': '3 replies · 3 tones',
    '일괄 답글 CSV': 'Batch replies CSV',
    '허위 리뷰 소명서': 'False review statement',
    '리뷰 관리·답글 대행': 'Review reply service',
    '원탭 백오피스': 'OneTap Back Office',
    '월 29만 원부터': 'From ₩290,000/mo',
    '월 39만 원': '₩390,000/mo',
    '39만': '₩390k',
    '39만': '₩390k',
    '월 정액 · 대행 서비스': 'Monthly · done for you',
    '리뷰·블로그·카드뉴스·견적서를 매일 대신 처리하는 유료 대행.': 'A paid service that handles reviews, blog posts, card news and quotes every day.',
    '도구가 아니라 사람이 붙는 월 단위 백오피스입니다. 사장님은 하루 3분 카톡으로 자료만 보내고, 리뷰 답글·블로그 원고·카드뉴스·견적서를 법규 검수까지 마쳐 당일 받습니다.': 'Not a tool but a monthly back office with a person on it. You send material by KakaoTalk in three minutes a day and get review replies, blog drafts, card news and quotes the same day, compliance-checked.',
    '하루 3분 접수': '3 minutes a day',
    '당일 납품': 'Same-day delivery',
    '아이디·비밀번호 없음': 'No passwords needed',
    '급여명세서 스튜디오': 'Payslip Studio',
    '2026년 요율로 4대보험·주휴수당을 계산해 A4 명세서로.': '2026 rates for the four insurances and weekly holiday pay, as an A4 payslip.',
    '2026년 요율로 주휴수당·4대보험을 계산하고, 근로기준법 제48조 기재사항을 갖춘 A4 명세서를 뽑습니다.': 'Calculates weekly holiday pay and the four insurances at 2026 rates, then prints an A4 payslip with everything Article 48 of the Labour Standards Act requires.',
    '2026 요율 반영': '2026 rates',
    '5인 미만 주휴수당': 'Holiday pay under 5 staff',
    'A4 1쪽 인쇄': 'One A4 page',
    '급여·명세서 관리 SaaS': 'Payroll SaaS',
    '1인 사업자 세금·순수익 계산기': 'Solo Business Tax & Profit',
    '부가세·3.3%·수수료까지 넣고 이번 달 손에 쥘 돈을 봅니다.': 'VAT, 3.3% withholding and fees in, take-home for the month out.',
    '간이·일반 부가세, 3.3% 종소세, 플랫폼 수수료까지 넣고 이번 달 손에 쥘 돈을 확인합니다.': 'Adds simplified or standard VAT, 3.3% withholding and platform fees to show what you actually keep this month.',
    '간이 vs 일반 비교': 'Simplified vs standard VAT',
    '3.3% 종소세 계산': '3.3% withholding',
    '월 순수익 시뮬': 'Monthly net simulator',
    '세무 상담·정산 대행': 'Tax filing service',
    '퇴직금·연차 계산기': 'Severance & Leave Calculator',
    '퇴직금과 연차를 두 기준으로 동시에 계산합니다.': 'Severance and leave, each on two bases at once.',
    '재직일수와 평균임금으로 퇴직금을, 입사일·회계연도 두 기준으로 연차를 계산합니다. 퇴사 정산일수와 연차수당까지 한 화면에 담았습니다.': 'Severance from days served and average wage, leave on both the hire-date and fiscal-year bases, with settlement days and unused-leave pay on one screen.',
    '퇴직금·연차 동시 계산': 'Severance + leave together',
    '평균·통상임금 큰 값 적용': 'Higher of average or ordinary wage',
    '회계연도 정산 비교': 'Fiscal-year comparison',
    '퇴직금·연차 계산 엑셀 대행': 'Severance spreadsheet service',
    'PDF 서명·직인 스튜디오': 'PDF Sign & Stamp Studio',
    '계약서 PDF는 브라우저 밖으로 나가지 않고 서명·도장.': 'Sign and stamp contract PDFs without them leaving the browser.',
    '계약서 PDF는 브라우저 밖으로 나가지 않습니다. 서명과 투명 도장을 그 자리에서 만들어 얹습니다.': 'The contract PDF never leaves the browser. Draw the signature and build a transparent stamp right there.',
    '투명 도장 제작': 'Transparent stamp maker',
    '계약서 5종 양식': '5 contract templates',
    'PDF 서명 도구 구독': 'PDF signing subscription',
    '대행사 견적서·제안서 생성기': 'Agency Quote & Proposal Maker',
    'A4 2쪽': 'Two A4 pages',
    '견적서 PDF': 'Quote PDF',
    '단가 프리셋 5종으로 A4 2쪽 견적서를 바로 만듭니다.': 'Five rate presets become a two-page A4 quote straight away.',
    '실전 단가 프리셋 5종을 불러 수량만 고치면 A4 2쪽 견적서가 완성됩니다. 8종 테마와 PDF 인쇄까지.': 'Load one of five real-world rate presets, change the quantities, and a two-page A4 quote is ready — eight themes and PDF print included.',
    '단가 프리셋 5종': '5 rate presets',
    'A4 2쪽 PDF': 'Two-page A4 PDF',
    '문구 진단·교정': 'Copy review',
    '견적·인보이스 SaaS': 'Quote and invoice SaaS',
    '체험단 매칭 보드': 'Campaign Matching Board',
    '모집·선정·발송·리뷰 마감을 한 보드에서, 성과 리포트까지.': 'Recruit, select, ship, close reviews on one board, with a results report.',
    '모집 공고부터 지원자 선정·발송·리뷰 마감·CPV까지. 광고주에게 보낼 1장 성과 리포트가 같이 나옵니다.': 'From the call for applicants through selection, shipping, review deadlines and CPV, with a one-page results report for the advertiser.',
    '지원자 파이프라인': 'Applicant pipeline',
    '공고문 심리 진단': 'Post-copy psychology check',
    'CPV·ROI 리포트': 'CPV / ROI report',
    '체험단 매칭 플랫폼 정액': 'Reviewer platform fee',
    '원탭링크 (OneTapLink)': 'OneTapLink',
    '프로필 링크와 1분 문의폼을 HTML 한 장으로 내보냅니다.': 'A profile link and a one-minute enquiry form, exported as one HTML file.',
    '프로필 링크와 1분 견적 문의폼을 만들고, 광고·로고 없는 HTML 한 장으로 내보냅니다.': 'Build a profile link and a one-minute quote form, then export them as a single HTML file with no ads or branding.',
    '외부 요청 0건 HTML': 'Zero-request HTML',
    '1분 문의폼': 'One-minute form',
    '로고·테마 자유': 'Your logo and theme',
    '프로필 링크 유료 플랜': 'Link-in-bio plan',
    '유튜브 댓글·고객반응 분석기': 'YouTube Comment Analyser',
    '댓글을 구매의향·질문·긍정·불만으로 나눠 FAQ를 뽑습니다.': 'Sorts comments into intent, questions, praise and complaints, then pulls out an FAQ.',
    '댓글을 구매의향·질문·긍정·불만으로 자동 분류합니다. 자주 나온 질문으로 FAQ와 다음 소재를 뽑습니다.': 'Sorts comments into purchase intent, questions, praise and complaints, then turns the frequent questions into an FAQ and your next topics.',
    '4분류 자동 태깅': 'Four-way auto tagging',
    'FAQ·고정댓글 추출': 'FAQ + pinned comment',
    '카피 스튜디오': 'Copy studio',
    '댓글 수집·분석 유료 툴': 'Comment analytics tool',
    '광고 문구 법률 검수기': 'Ad Copy Legal Checker',
    '건기식·뷰티·의료·커머스 50개 규칙으로 위험 표현 검수.': 'Fifty rules for supplements, beauty, medical and commerce copy.',
    '건기식·뷰티·의료·커머스 50개 규칙으로 위험 표현을 1초에 잡고, 쓸 수 있는 대체 문구를 함께 줍니다.': 'Fifty rules for supplements, beauty, medical and commerce catch risky claims in a second and suggest wording you can actually use.',
    '50개 규칙 1초 검수': '50 rules, one second',
    '대가성·고지 점검': 'Disclosure check',
    '대체 문구 제안': 'Safer wording',
    '광고 문구 사전 검수 대행': 'Ad copy review service',
    '개인정보·피싱링크 보안 점검기': 'Privacy & Phishing Checker',
    '주민번호·카드·계좌를 가리고 피싱 링크를 걸러냅니다.': 'Masks ID numbers, cards and accounts, and filters out phishing links.',
    '붙여넣은 글의 주민번호·카드·계좌를 가리고, 누르기 전에 피싱 링크를 걸러내고, 보내기 전에 사진 속 GPS를 지웁니다.': 'Masks ID numbers, card numbers and account numbers in pasted text, filters phishing links before you tap, and strips GPS from photos before you send them.',
    '개인정보 자동 마스킹': 'Auto-masking',
    '피싱 링크 위험 점수': 'Phishing risk score',
    '사진 GPS·메타 삭제': 'Photo GPS removal',
    '개인정보 점검·마스킹 툴': 'Privacy masking tool',
    '작업 증빙 리포트': 'Proof of Work Report',
    '공유 링크 + PDF': 'Share link + PDF',
    '이번 달 뭘 했는지, 증빙 링크와 PDF 한 장으로 보냅니다.': 'What you did this month, in one page of links and PDF.',
    '완료 항목·소요시간·근거 링크·다음 주 계획을 한 장으로 정리해 공유 링크와 PDF로 보냅니다.': 'Completed items, hours, source links and next week’s plan on one page, sent as a share link and a PDF.',
    '완료·근거 링크 증빙': 'Completed work + sources',
    '공유 링크 한 줄': 'One share link',
    'A4 1쪽 PDF': 'One-page A4 PDF',
    '대행 리포트 툴 구독': 'Reporting tool subscription',
    '깜깜이 시세 레이더': 'Price Radar',
    '6업종 시세 품목': '54 prices in 6 trades',
    '수리·청소·치과·이사 시세를 최저·평균·최고가로 비교합니다.': 'Repair, cleaning, dental and moving prices as low, average and high.',
    '수리·청소·치과·이사 6업종 54품목 시세를 보여 주고, 받은 견적이 바가지인지 판정합니다.': 'Shows prices for 54 items across six trades — repair, cleaning, dental, moving and more — and judges whether a quote you received is inflated.',
    '6업종 54품목 시세': '54 prices, 6 trades',
    '받은 견적 판정': 'Quote verdict',
    'JSON·CSV 내보내기': 'JSON / CSV export',
    '시세 조회·견적 비교 서비스': 'Price comparison service',
    '원탭 AI 팀 회의실': 'OneTap AI Team Room',
    '8부서': '8 departments',
    '2.5D 디오라마 회의실': '2.5D diorama room',
    '안건 하나로 8개 부서가 회의하고, 부서별 아웃풋과 액션까지 남깁니다.': 'One agenda, eight departments, with per-department output and actions left behind.',
    '안건 하나를 넣으면 기획·개발·디자인·영상·그로스·영업·재무 리드가 순서대로 발언하고, 교차검수가 숫자·출처·담당을 다시 봅니다. 남는 것은 부서별 아웃풋·프로젝트 기록·액션 체크리스트입니다. 무료 모드는 키 없이, Pro는 내 GPT·Gemini·Claude 키로.': 'Give it one agenda and the planning, engineering, design, video, growth, sales and finance leads speak in turn, then a cross-check re-reads the numbers, sources and owners. What remains is per-department output, a project record and an action checklist. Free mode needs no key; Pro runs on your own GPT, Gemini or Claude key.',
    '8역할 순차 발언': '8 roles in turn',
    '교차검수 재확인': 'Cross-check pass',
    '부서별 아웃풋·회의록': 'Outputs + minutes',
    'AI 회의·협업 노트 SaaS': 'AI meeting notes SaaS',
    '원탭 광고 AI 감사 스튜디오': 'OneTap Ad Audit Studio',
    '적자 캠페인 예산 재배분': 'Loss-making budget shift',
    '메타·네이버 광고 CSV로 적자 캠페인을 걸러 예산을 다시 나눕니다.': 'Filters loss-making campaigns from Meta and Naver CSVs and re-splits the budget.',
    '광고 관리자에서 내려받은 CSV(메타·네이버, CP949 포함)를 그대로 넣으면 카피·데이터·예산 세 에이전트가 캠페인을 하나씩 감사합니다. 적자 캠페인에는 OFF를 권하고 남는 예산은 ROAS 비중으로 다시 나눠, 예상 절감액·추가 매출·블렌디드 ROAS와 CSV 예산안·MD 리포트로 정리합니다. 무료 모드는 키 없이 규칙 엔진으로 감사하고, Pro는 내 GPT·Gemini·Claude 키로 카피와 타겟까지 다시 씁니다.': 'Drop in the CSV from Ads Manager (Meta or Naver, CP949 included) and three agents — copy, data, budget — audit the campaigns one by one. Losers get an OFF recommendation, the freed budget is re-split by ROAS share, and it all lands in projected savings, added revenue, blended ROAS, a CSV budget plan and a Markdown report. Free mode audits with a rule engine and no key; Pro rewrites copy and targeting with your own GPT, Gemini or Claude key.',
    '메타·네이버 CSV·CP949': 'Meta/Naver CSV + CP949',
    'OFF 권장·예산 재배분': 'OFF calls + reallocation',
    'CSV 예산안·MD 리포트': 'CSV plan + MD report',
    '광고 관리·예산 최적화 툴': 'Ad management tool',
    '원탭 클립 팩토리': 'OneTap Clip Factory',
    '긴 영상 → 숏폼 클립': 'Long video → clips',
    '긴 가로 영상을 넣으면 무음·장면 컷을 지우고 9:16 클립 MP4로 뽑습니다.': 'Drop in a long landscape video and it cuts silences and scene breaks into 9:16 MP4 clips.',
    '강의·브이로그·게임·인터뷰 녹화를 그대로 넣으면 20ms 음량으로 죽은 초를 지우고, 표본 프레임에서 장면 컷을 찾아 15초 안팎 클립으로 나눕니다. 클립마다 피부톤·움직임·중앙 가중으로 피사체를 따라 9:16 크롭을 옮기고, 자막 4종을 구워 실제 H.264 MP4와 ZIP을 브라우저 안에서 만듭니다. 영상은 서버로 가지 않고, 무료 AI 맛보기가 클립 자막만으로 제목·훅·해시태그를 씁니다.': 'Feed in a lecture, vlog, game or interview recording and it removes dead air by 20 ms loudness, finds scene cuts in sampled frames and splits the result into clips of about 15 seconds. For each clip the 9:16 crop follows the subject using skin tone, motion and centre weighting, and four caption styles are burned in while a real H.264 MP4 and ZIP are built inside the browser. The video never goes to a server, and the free AI taste writes titles, hooks and hashtags from the clip captions alone.',
    '무음·장면 컷 자동 감지': 'Silence + scene detection',
    '9:16 피사체 추적': '9:16 subject tracking',
    'H.264 MP4·ZIP 렌더': 'H.264 MP4 + ZIP render',
    '숏폼 클립 자동 편집 구독': 'Clip editor subscription',
    '원탭 HWPX 변환기': 'OneTap HWPX Converter',
    'HWPX → HWP 변환': 'HWPX → HWP',
    '한글 2014 이후 HWPX 문서를 HWP 5.0으로, 서식·표·그림 그대로.': 'HWPX documents from Hangul 2014 and later become HWP 5.0, formatting, tables and images intact.',
    '한글 2014 이후가 쓰는 HWPX 문서를 예전 HWP 5.0 파일로 바꿉니다. 글자 모양·문단 정렬·병합 셀·그림을 옮기고 여러 개를 한 번에 변환해 ZIP으로 받습니다. 변환 전 문서 진단과 본문 미리보기, 만들어진 HWP의 글자 되읽기까지 브라우저 안에서 끝나고 파일은 서버로 가지 않습니다.': 'Converts HWPX files written by Hangul 2014 or later back into HWP 5.0. Character shapes, paragraph alignment, merged cells and images carry over, and batches convert at once into a ZIP. Document diagnosis, a body preview and a read-back check of the finished HWP all happen in the browser; files never go to a server.',
    '서식·표·그림 보존': 'Formatting, tables, images',
    '일괄 변환·ZIP': 'Batch convert + ZIP',
    '문서 변환 프로그램 구독': 'Document converter licence',
    '원탭 웹앱 실드': 'OneTap WebApp Shield',
    '86 규칙': '86 rules',
    '시크릿·SAST·설정 검사': 'Secrets · SAST · config',
    'AI로 만든 웹앱의 키 유출·RLS 누락·XSS·CORS를 찾고, 막는 설정까지.': 'Finds leaked keys, missing RLS, XSS and CORS in AI-built web apps, and gives you the settings that block them.',
    '코드·폴더·GitHub 공개 저장소·배포 URL을 넣으면 시크릿 38종과 코드 취약점 37종, 파일 설정 11종을 찾아 100점으로 채점합니다. 이어서 호스팅별 보안 헤더, 쓰는 서비스만 고르는 CSP, GitHub Actions가 든 7파일 가드레일 키트를 만들고, 의존성 CVE는 OSV.dev에서 실제 조회합니다. 브라우저가 읽지 못한 항목은 초록 체크 대신 미확인으로 남깁니다.': 'Give it code, a folder, a public GitHub repository or a deploy URL and it looks for 38 kinds of secret, 37 code weaknesses and 11 file-config issues, scoring out of 100. It then writes hosting-specific security headers, a CSP that allows only the services you use, and a seven-file guardrail kit including GitHub Actions, and looks dependency CVEs up for real on OSV.dev. Anything the browser could not read stays “unverified” instead of getting a green tick.',
    '시크릿·SAST 86규칙': '86 secret + SAST rules',
    '보안 헤더·CSP·CI 키트': 'Headers, CSP, CI kit',
    'OSV.dev CVE 실조회': 'Live OSV.dev CVEs',
    '웹 보안 스캐너 구독': 'Security scanner subscription',

    /* ---- workflow ---- */
    '주제와 키워드 발굴': 'Find the topic and keywords',
    '무엇으로 시작할지 정합니다. 뜨는 숏폼과 블로그·스토어 검색량을 같이 봅니다.': 'Decide what to start with, looking at both trending short-form and blog and store search volume.',
    '이번 주 주제 3개 · 키워드 20줄': '3 topics · 20 keyword lines this week',
    '반응·경쟁·법률 검수': 'Demand, competition and legal check',
    '만들기 전에 걸러 냅니다. 댓글과 리뷰로 수요를 확인하고, 위험 표현을 지우고, 경쟁강도를 봅니다.': 'Filter before you build: confirm demand from comments and reviews, strip risky claims and check competition.',
    '수요 근거 1장 · 위험 표현 0건': 'One page of demand proof · zero risky claims',
    '원고·카드뉴스·숏폼 제작': 'Draft, card news and short-form',
    '한 번 쓴 글을 원고, 카드, 썸네일, 숏폼 영상, 인쇄용 벡터로 나눠 씁니다. 무료 모드만으로도 결과물이 나옵니다.': 'Turn one written piece into a draft, cards, a thumbnail, a short-form video and a print-ready vector. Free mode alone produces a finished result.',
    '원고 1편 · 카드 8장 · 숏폼 1편': '1 draft · 8 cards · 1 short-form clip',
    '체험단·시세·견적서 영업': 'Reviewers, prices and quotes',
    '만든 것을 팝니다. 체험단으로 후기를 모으고, 시세를 확인해 견적을 내고, 링크와 견적서로 문의를 받습니다.': 'Sell what you made: gather reviews through a campaign, check market prices before quoting, and take enquiries through a link and a quote.',
    '문의 폼 1개 · 견적서 1부 · 증빙 리포트 1부': '1 enquiry form · 1 quote · 1 proof report',
    '계약·급여·세금 정산': 'Contracts, pay and tax',
    '돈이 들어오면 남는 것을 확인합니다. 서명, 명세서, 부가세·종소세, 연말정산 역산까지 한 번에.': 'When money comes in, see what is left: signing, payslips, VAT and income tax, and the year-end reverse calculation, all in one pass.',
    '서명된 계약서 · 이번 달 순수익': 'Signed contract · this month’s net',

    /* ---- B2B tiers ---- */
    '기본형': 'Basic',
    '1주 · 1개 도구': '1 week · 1 tool',
    '80만 원부터': 'From ₩800,000',
    '세금계산서 발행': 'Tax invoice issued',
    '지금 쓰는 도구 하나를 우리 브랜드로 바꿉니다. 로고·색·문구·도메인만 교체합니다.': 'We put your brand on one tool you already use, swapping only the logo, colours, wording and domain.',
    '도구 1종 브랜드 교체': 'One tool rebranded',
    '로고·색·폰트 적용': 'Logo, colours, fonts',
    'GitHub Pages 또는 우리 서버에 배포': 'Deployed to GitHub Pages or your server',
    '1회 수정 2건 포함': 'Two revisions included',
    '스튜디오형': 'Studio',
    '2~3주 · 3개 도구 묶음': '2–3 weeks · 3 tools',
    '180만 원부터': 'From ₩1,800,000',
    '업무 흐름에 맞춰 도구를 묶고, 사내 기준(금지어·단가표·양식)을 데이터로 심습니다.': 'We bundle tools around your workflow and plant your house rules — banned words, rate card, templates — in as data.',
    '도구 3종 연결·브랜드 통일': 'Three tools, one brand',
    '사내 금지어·단가표·양식 반영': 'House rules built in',
    '관리자용 설정 화면': 'Admin settings screen',
    '1회 수정 5건 포함': 'Five revisions included',
    '풀커스텀': 'Full custom',
    '4주~ · 설계부터': '4 weeks+ · from design',
    '협의': 'On request',
    '견적서·계약서 발행': 'Quote and contract issued',
    '새 도구를 설계합니다. 기존 엑셀·시트·사내 시스템과 데이터를 주고받아야 할 때.': 'A new tool designed from scratch, for when it has to exchange data with your spreadsheets, sheets or internal systems.',
    '업무 분석 → 화면 설계': 'Work analysis → screen design',
    'DB·계정·권한이 붙는 사내 시스템': 'Internal system with DB, accounts and roles',
    '오프라인·폐쇄망 설치도 가능': 'Offline and closed-network installs',
    '운영 인수인계 문서': 'Handover documentation',

    /* ---- FAQ ---- */
    '정말 무료인가요? 결제 화면이 안 나옵니다.': 'Is it really free? I never see a checkout.',
    '무료 도구 30종은 회원가입·결제·서버가 없습니다. 페이지 파일이 브라우저에서 도는 것이 전부라 운영 비용이 0원이고, 그래서 값을 받을 것이 없습니다. 광고와 추적 스크립트도 넣지 않았습니다. 11번 원탭 백오피스만 사람이 붙는 유료 대행 서비스라 카드에 요금을 적어 두었습니다.': 'The free tools have no sign-up, no payment and no server. The page files running in your browser are the whole product, so running costs are zero and there is nothing to charge for. There are no ads or tracking scripts either. Only the OneTap Back Office card (No. 11) is a paid service with a person behind it, which is why its price is on the card.',
    '입력한 내용은 어디로 가나요?': 'Where does what I type go?',
    '서버로 가지 않습니다. 입력값은 이 브라우저의 localStorage에만 남고, 다른 기기와 동기화되지 않습니다. 브라우저 기록을 지우면 함께 사라지므로, 급여·세금처럼 중요한 값은 JSON 내보내기로 백업하세요.': 'Nowhere: it stays in this browser’s localStorage and is not synced to other devices. Clearing browser data removes it too, so back up important figures like pay and tax with the JSON export.',
    '"내 구독 AI 연결"은 무슨 뜻인가요?': 'What does “use your own AI” mean?',
    'ChatGPT·Claude·Gemini 구독이나 API 키를 이미 쓰고 있다면, 도구가 만든 프롬프트를 복사해 그 대화창에 붙이면 됩니다. API 키를 직접 넣는 방식도 지원하며 키는 이 브라우저에만 저장됩니다. 대화 한도 안에서 쓰는 방식이라 별도 결제가 없습니다. 리뷰 답글·숏폼·원고·이미지 스튜디오와 AI 팀 회의실·광고 감사 스튜디오까지 6종은 키를 넣으면 Pro AI가 결과물을 한 번에 채우고, 키가 없어도 무료 모드로 끝까지 동작합니다.': 'If you already pay for ChatGPT, Claude or Gemini, or hold an API key, copy the prompt the tool builds and paste it into that chat. You can also enter an API key directly; it is stored only in this browser. Either way it runs inside your existing allowance, with no extra payment. Six tools — review replies, short-form, drafts, images, the AI team room and the ad audit studio — fill the result in one go when a key is present, and still work end to end in free mode without one.',
    '법률·세무 판단을 대신해 주나요?': 'Does it make legal or tax decisions for me?',
    '아닙니다. 광고 문구 검수기와 세금·연말정산 계산기는 공개된 규정과 요율을 규칙으로 옮긴 참고 도구입니다. 최종 판단과 신고는 변호사·세무사 등 전문가 검토가 필요합니다. 급여 계산 결과도 사업장 상황에 따라 달라질 수 있습니다.': 'No. The ad copy checker and the tax and year-end calculators are reference tools that turn published rules and rates into logic. Final decisions and filings need a lawyer or tax accountant, and payslip results vary with each workplace.',
    '우리 회사 도구로 만들 수 있나요?': 'Can you build it for our company?',
    '가능합니다. 기본형은 1주 안에 로고와 색만 바꿔 납품하고, 스튜디오형은 사내 기준을 데이터로 심습니다. 아래 문의 폼에 필요한 도구와 쓰는 업무를 적어 주시면 3일 안에 회신합니다.': 'Yes. The Basic tier rebrands one tool within a week, and the Studio tier plants your house rules in as data. Tell us the tool and the work in the form below and we reply within three days.',
    '입력값은 이 브라우저에만 남습니다': 'Input stays in this browser',
    '링크를 열면 바로 계산이 됩니다': 'Open the link and it calculates',
    '쓰던 ChatGPT·Claude·Gemini로 이어 씁니다': 'Continues in your ChatGPT, Claude or Gemini',

    '결과물': 'Output',

    'A4 1쪽': 'One A4 page',
    '홍길동': 'Jane Doe',
    '선택 · 010-0000-0000': 'optional · 010-0000-0000',
    '예: 대행사 3명이 견적서를 매주 5건씩 만듭니다. 우리 단가표와 로고를 넣고, PDF로 바로 나오게 하고 싶습니다.': 'e.g. Three people at our agency write five quotes a week. We want our rate card and logo in it, printing straight to PDF.',
    '예: 대행사 3명이 견적서를 매주 5건씩 만듭니다. 우리 단가표와 로고를 넣고, PDF로 바로 나오게 하고 싶습니다.': 'e.g. Three people at our agency write five quotes a week. We want our rate card and logo in it, printing straight to PDF.',


    /* ---- privacy page ---- */
    '개인정보처리방침 | 원탭 도구 허브': 'Privacy policy | OneTap Tools',
    '원탭 도구 허브': 'OneTap Tools',
    '허브로 돌아가기': 'Back to the hub',
    '개인정보처리방침': 'Privacy policy',
    '시행일 2026년 11월 22일 · 버전 1.2': 'Effective 22 November 2026 · version 1.2',
    '이 페이지는 무료 웹앱 30종의 안내 페이지입니다. 30종 도구와 이 페이지는 서버가 없고, 방문자가 입력한 값을 어디로도 전송하지 않습니다. 아래는 그 사실과 예외를 빠짐없이 적은 것입니다.': 'This page is the directory for the free web apps. Neither the tools nor this page has a server, and nothing a visitor types is sent anywhere. Below is the whole story, exceptions included.',
    '1. 수집하는 개인정보': '1. What we collect',
    '이 페이지와 30종 도구는 회원가입·로그인이 없고, 이름·연락처·주민등록번호 같은 정보를 자동으로 수집하지 않습니다. 쿠키를 심지 않고, 방문 기록·기기 정보를 수집하는 분석 도구(GA·픽셀 등)도 넣지 않았습니다.': 'Neither this page nor the tools has a sign-up or a login, and neither collects names, phone numbers or ID numbers on its own. No cookies are set, and there is no analytics tool (GA, pixels and the like) collecting visit or device data.',
    '도구 입력값': 'Tool input',
    '— 급여·세금·계약·상품·댓글 등 사용자가 넣은 값은 그 브라우저의': '— pay, tax, contract, product, comment and similar values you enter are stored only in that browser’s',
    '에만 저장됩니다. 서버로 전송되지 않으며, 다른 기기와 동기화되지 않습니다.': '. They are not sent to a server and not synced to other devices.',
    '문의 폼': 'Enquiry form',
    '— 이름·회사·메일·연락처·요청 내용은 화면에서 문안을 만드는 데만 쓰입니다. 전송 버튼이 없고, 방문자가 직접 복사해 메일 등으로 보낼 때 비로소 운영자에게 전달됩니다.': '— name, company, email, phone and the request are used only to draft a message on screen. There is no send button: the operator sees them only when the visitor copies the message and sends it by email.',
    '홈 화면 설치(PWA)': 'Home-screen install (PWA)',
    '— 폰에 앱처럼 설치해도 새로 수집하는 정보는 없습니다. 서비스 워커가 이 사이트의 정적 파일(HTML·CSS·JS·아이콘·폰트)만 기기에 캐시하며, 쿠키나 사용 기록을 만들지 않습니다. 앱을 지우면 캐시도 함께 지워집니다.': '— installing it as an app on a phone collects nothing new. The service worker caches only this site’s static files (HTML, CSS, JS, icons, fonts) on the device and creates no cookies or usage records. Deleting the app deletes the cache with it.',
    'AI 연결': 'AI connections',
    '— ChatGPT·Claude·Gemini 등 외부 AI를 쓰기로 한 경우, 방문자가 만든 프롬프트가 해당 서비스로 전송됩니다. 그 시점부터는 각 서비스의 개인정보처리방침이 적용됩니다. API 키를 직접 넣는 경우 키는 그 브라우저에만 저장되고 이 페이지로 오지 않습니다.': '— if a visitor chooses to use an outside AI such as ChatGPT, Claude or Gemini, the prompt built on the page is sent to that service, and that service’s privacy policy applies from then on. If an API key is entered, it is stored only in that browser and never reaches this page.',
    '2. 이용 목적과 보유 기간': '2. Purpose and retention',
    '문의 폼으로 보내온 정보는 문의 회신 목적으로만 사용하고, 회신이 끝난 뒤 3개월 안에 삭제합니다. 삭제를 요청하시면 지체 없이 지웁니다.': 'Information sent through the enquiry form is used only to reply and is deleted within three months of the reply. Ask for deletion at any time and it is removed without delay.',
    '3. 제3자 제공·처리위탁': '3. Third parties',
    '수집한 정보를 제3자에게 제공하거나 처리를 맡기지 않습니다. 다만 다음은 방문자가 직접 선택한 경우에만 일어납니다.': 'We do not hand collected information to third parties or outsource its processing. The following happens only when the visitor chooses it.',
    '30종 도구 중 일부는 방문자가 버튼을 누를 때만 유튜브·구글 등 공개 API를 호출합니다. 호출 시 해당 서비스에 접속 기록이 남습니다.': 'Some of the tools call public APIs such as YouTube or Google only when the visitor presses a button. That call leaves an access record with the service.',
    '작업 증빙 리포트의 공유 링크는 리포트 내용을 주소(?d=) 안에 담아 만들고 서버에 저장하지 않습니다. 링크를 아는 사람은 열어 볼 수 있으므로 민감한 내용은 빼고 공유하세요.': 'The share link from the proof-of-work report carries the report inside the address (?d=) and is not stored on a server. Anyone with the link can open it, so leave sensitive details out.',
    '리뷰 답글·숏폼·원고·이미지 4종은 방문자가 Pro AI를 직접 연결한 경우에만 입력 내용을 고른 제공자(OpenAI·Google·Anthropic 또는 본인 서버)로 보냅니다. 연결하지 않으면 무료 모드로 브라우저 안에서만 동작합니다.': 'The review-reply, short-form, draft and image tools send input to the provider the visitor picked (OpenAI, Google, Anthropic or their own server) only when a Pro AI key is connected. Without a key they run entirely in the browser in free mode.',
    '외부 AI 서비스를 쓰기로 한 경우, 그 서비스로 프롬프트가 전송됩니다.': 'If an outside AI service is used, the prompt is sent to that service.',
    '결과물(카드뉴스 PNG·PDF·CSV 등)은 방문자 기기로 다운로드되며 어디에도 저장되지 않습니다.': 'Results (card-news PNG, PDF, CSV and so on) download to the visitor’s device and are stored nowhere else.',
    '4. 방문자의 권리': '4. Your rights',
    '언제든지 브라우저 설정에서 이 페이지의 저장 값(localStorage)을 지울 수 있습니다. 도구 안에 ‘초기화’ 버튼이 있는 경우 그것으로도 지워집니다. 문의로 보낸 정보의 열람·정정·삭제를 요청하려면': 'You can clear this page’s stored values (localStorage) in your browser settings at any time, or with a tool’s own “reset” button where it has one. To see, correct or delete information you sent in an enquiry,',
    '으로 알려 주세요.': 'and tell us there.',
    '5. 안전성 확보 조치': '5. How it is protected',
    '서버를 두지 않는 것이 이 페이지의 기본 보호 조치입니다. 보관할 데이터가 없으므로 유출될 서버도 없습니다. 다만 방문자의 기기·브라우저가 공용이라면 저장 값은 다음 사용자에게 보일 수 있으니, 공용 기기에서는 사용 후 기록을 지우세요.': 'Having no server is the main protection here: with nothing stored there is no server to leak. On a shared device or browser, though, stored values can be seen by the next person, so clear the history after use.',
    '6. 고지 의무': '6. What these tools are not',
    '이 페이지의 30종 도구는 참고용 계산·검수 도구이며, 법률·세무·노무 자문이 아닙니다. 최종 판단과 신고는 변호사·세무사 등 전문가의 검토를 받으세요.': 'The tools here are reference calculators and checkers, not legal, tax or labour advice. Have a lawyer or tax accountant review anything that matters.',
    '7. 방침의 변경': '7. Changes to this policy',
    '내용이 바뀌면 이 페이지에 시행일과 버전을 올려 공지합니다. 중요한 변경은 허브 첫 화면에서도 알립니다.': 'When this policy changes, the effective date and version on this page are updated. Significant changes are also announced on the hub’s first screen.',
    '8. 문의': '8. Contact',
    '개인정보 관련 문의는': 'For privacy questions, use',
    '허브의 문의 폼': 'the hub’s enquiry form',
    '을 이용해 주세요. 회신은 남겨 주신 메일로 드립니다.': '. We reply to the address you leave.',
    '← 허브로 돌아가기': '← Back to the hub',
    '원탭 도구 허브 (OneTap Tools)': 'OneTap Tools',
    '무료 웹앱 30종 · v2.5.1 · 2026.11 기준': 'Free web apps · v2.5.1 · as of Nov 2026',
    '도구 31종': 'Tools',
    '커스텀 제작': 'Custom build',

    /* ---- JS strings ---- */
    '운영자 메일': 'operator email',
    '선택 30종 · 1인': ' tools selected · one seat',
    '지금 열 수 있는 도구': 'tools that open now',
    '이 일정의 문제': 'Issues with this event',
    '외 ': 'and ',
    '선택한 도구가 없습니다': 'No tools selected',
    '구독료 지우기': 'remove fee',
    '새 창에서 열기': 'open in a new tab',
    '안내 보기': 'See details',
    '지금 열기': 'Open now',
    '먼저 써 보기': 'Try it first',
    '대체 예시 · ': 'Replaces · ',
    '월 ': '/mo ',
    '대행 요금': 'Service fee',
    '커스텀 제작 문의': 'Ask about a custom build',
    '우리 회사용으로 제작 문의': 'ask about a build for our company',
    '유료 서비스': 'Paid service',
    '여러 개 · 전체': 'Several · all',
    '새 도구 설계': 'Design a new tool',
    '문의 수신 메일': 'enquiry inbox',
    '복사됐습니다': 'Copied',
    '‘메일 앱으로 보내기’를 누르면 방금 만든 문안이 메일에 채워집니다. 보내기 전에 한 번 더 확인하세요.': '“Open in mail app” fills the message you just drafted into your mail app. Give it one more read before sending.',
    '문안을 복사해 메일이나 카카오톡으로 보내 주세요. 회신은 적어 주신 메일로 드립니다.': 'Copy the message and send it by email or KakaoTalk. We reply to the address you gave.',
    '브라우저가 복사를 막았습니다. 위 문안을 직접 선택해 복사해 주세요.': 'The browser blocked copying. Select the message above and copy it yourself.',
    '예: ': 'e.g. ',

    /* ---- thumbnail labels (SVG) ---- */
    '인쇄 300dpi · 색상 12색': 'print 300dpi · 12 colours',
    '배경 투명': 'transparent',
    '로고 분리': 'logo isolated',
    '누끼 · 곡선 정리': 'cut out · curves',
    '12월': 'December',
    '31일까지': 'by the 31st',
    '지금 넣으면': 'put in now',
    '+13월': '+13th month',
    '카드 25% · 연금 900만': 'card 25% · pension ₩9M',
    '환급액': 'refund',
    '83.4만': '₩834k',
    '지금 실행 시': 'if you act now',
    '.webm 녹화': '.webm record',
    '자막 .srt': '.srt captions',
    '5컷 · 자막 · 배경음': '5 shots · captions · audio',
    '24,900원': '₩24,900',
    '경쟁강도': 'competition',
    '/ 보통': '/ medium',
    '상품명 점수': 'name score',
    '94점': '94 pts',
    '구매': 'buy',
    '질문': 'question',
    '긍정': 'positive',
    '불만': 'complaint',
    '4분류 자동 태깅': 'four-way tagging',
    '테마 8종': '8 themes',
    'A4 · 2쪽': 'A4 · 2 pages',
    '직인': 'stamp',
    '0 KB 전송': '0 KB sent',
    '실수령액': 'take-home pay',
    '주휴수당 · 4대보험 · 소득세 자동': 'holiday pay · insurances · income tax',
    '부가세 비교': 'VAT comparison',
    '간이': 'simplified',
    '일반': 'standard',
    '이번 달 순수익': 'net this month',
    '문의 남기기': 'leave a message',
    'HTML 1장': 'one HTML file',
    '광고 0': 'no ads',
    'RFC 5545 검사 · 브라우저에서만': 'RFC 5545 check · in-browser only',
    '정수 센트 계산 · BigInt': 'integer cents · BigInt',
    '퇴직금 정산': 'severance settlement',
    '평균임금 × 30 × 재직일수/365': 'average wage × 30 × days/365',
    '퇴직금': 'severance',
    '평균임금 · 통상임금 중 큰 값': 'higher of average or ordinary wage',
    '연차': 'leave',
    '올해 잔여': 'left this year',
    '15일': '15 days',
    '회계연도 정산': 'fiscal-year basis',
    '피싱 위험 92': 'phishing risk 92',
    '주민등록번호': 'ID number',
    '카드번호': 'card number',
    '휴대폰': 'mobile',
    'GPS 삭제': 'GPS stripped',
    '마스킹 · 링크 진단 · 사진 메타 점검': 'masking · link check · photo metadata',
    '사장님 답글': 'owner reply',
    '정중': 'polite',
    '친근': 'friendly',
    '짧게': 'short',
    '답글 3안 · 일괄 답글': '3 replies · batch',
    '블로그': 'blog',
    '스레드': 'threads',
    '상세': 'product page',
    '소제목 5단': 'five sections',
    '2,200자 · 실사 사진 6곳': '2,200 chars · 6 photos',
    'AI 티': 'AI tells',
    '광고 위험 표현 점검': 'risky ad claims check',
    '겨울 가습기 3만원대': 'winter humidifier ₩30k',
    '누끼 완료': 'cut out',
    '테마 6종': '6 themes',
    '배경 투명화 · 그림자 · 합성': 'cut-out · shadow · compose',
    '리뷰 답글 20건': '20 review replies',
    '블로그 원고 4편': '4 blog drafts',
    '카드뉴스 4장': '4 card sets',
    '견적서 2건': '2 quotes',
    '카톡 접수': 'KakaoTalk intake',
    '하루 3분': '3 min a day',
    '사장님 →': 'owner →',
    '당일 납품 · 법규 검수': 'same day · compliance checked',
    '아이디·비밀번호 없음': 'no passwords',
    '월 39만 원': '₩390,000/mo',
    '사람이 붙는 유료 대행 서비스': 'paid service with a person',
    '이번 주': 'this week',
    '공유 링크': 'share link',
    '?d= 한 줄': '?d= one line',
    '완료 6건 · 증빙률 100%': '6 done · 100% sourced',
    '엔진오일 + 오일필터': 'engine oil + filter',
    '8.0만': '₩80k',
    '평균가 · 부품+공임': 'average · parts + labour',
    '최저 대비 1.3×': '1.3× the lowest',
    '6업종 54품목': '6 trades · 54 items',
    '공개 자료 기준': 'public data',
    '최저': 'low',
    '평균': 'average',
    '최고': 'high',
    '디자인 리드': 'design lead',
    '교차검수 → 액션 24': 'cross-check → 24 actions',
    '예산': 'budget',
    '절감 −18%': 'saving −18%',
    'CSV 예산안 · MD 액션 리포트': 'CSV budget · MD report',
    '무료 감사 · 내 키는 선택': 'free audit · key optional',
    '죽은 초 삭제 · 장면 컷 · 피사체 추적': 'dead air · scene cuts · tracking',
    'H.264 MP4 · 클립 3개': 'H.264 MP4 · 3 clips',
    '문단·표·그림 보존 · 브라우저 안에서 변환': 'paragraphs, tables, images kept · in-browser',
    'ZIP 일괄': 'batch ZIP',
    '규칙 검사': 'rule check',
    '키 유출 3건': '3 leaked keys',
    '시크릿 · RLS · XSS · CORS · CVE': 'secrets · RLS · XSS · CORS · CVE',
    '헤더·CSP·CI': 'headers · CSP · CI',
    '숏폼 배수 막대와 재생 버튼이 있는 썸네일': 'Thumbnail of a short-form multiple bar and a play button',
    '검색창과 87점 점수 링이 있는 썸네일': 'Thumbnail of a search box and an 87-point score ring',
    '상품 사진 카드와 가격, 경쟁강도 막대가 있는 썸네일': 'Thumbnail of a product photo card with price and competition bar',
    '겹쳐 놓은 카드뉴스 세 장과 4대5 비율 표시': 'Three stacked card-news sheets with a 4:5 ratio mark',
    '댓글 말풍선과 구매·질문·긍정·불만 태그가 있는 썸네일': 'Thumbnail of comment bubbles tagged buy, question, praise, complaint',
    '문서 위 경고 표시와 검수 문구가 있는 썸네일': 'Thumbnail of a document with a warning mark and a review note',
    '견적서 한 장과 테마 견본이 있는 썸네일': 'Thumbnail of a quote sheet with theme swatches',
    '체험단 지원자를 세 칸으로 나눈 보드 썸네일': 'Thumbnail of a campaign board with applicants in three columns',
    '계약서 위 서명과 둥근 도장이 있는 썸네일': 'Thumbnail of a contract with a signature and a round stamp',
    '급여명세서 표와 실수령액이 있는 썸네일': 'Thumbnail of a payslip table with take-home pay',
    '간이와 일반 부가세 막대, 3.3퍼센트 도넛이 있는 썸네일': 'Thumbnail of simplified vs standard VAT bars and a 3.3% donut',
    '휴대폰 화면 안 링크 버튼과 문의 버튼이 있는 썸네일': 'Thumbnail of link buttons and an enquiry button on a phone',
    '달력 격자와 CSV로 내보내는 화살표가 있는 썸네일': 'Thumbnail of a calendar grid with an export-to-CSV arrow',
    '인보이스 금액표와 손익 막대가 있는 썸네일': 'Thumbnail of an invoice table and a P&L bar',
    '토큰 단가 계산식과 비용 추세선이 있는 썸네일': 'Thumbnail of a token price formula and a cost trend line',
    '퇴직금 정산서와 연차 달력이 있는 썸네일': 'Thumbnail of a severance statement and a leave calendar',
    '가린 개인정보와 방패 표시가 있는 썸네일': 'Thumbnail of masked personal data and a shield',
    '별점 리뷰 아래 사장님 답글과 말투 선택 칩이 있는 썸네일': 'Thumbnail of a starred review with an owner reply and tone chips',
    '세로 폰 화면에 재생 버튼과 5컷 타임라인이 있는 썸네일': 'Thumbnail of a portrait phone with a play button and a five-shot timeline',
    '원고지와 블로그·스레드·상세 탭, AI 티 점수 고리가 있는 썸네일': 'Thumbnail of manuscript paper, blog/threads/product tabs and an AI-tell gauge',
    '사진 캔버스와 투명 격자, 규격 칩이 있는 썸네일': 'Thumbnail of a photo canvas with a transparency grid and size chips',
    '베지어 곡선과 노드, SVG·EPS 포맷 칩이 있는 썸네일': 'Thumbnail of Bézier curves, nodes and SVG/EPS format chips',
    '12월 달력과 역산 화살표, 환급액 숫자가 있는 썸네일': 'Thumbnail of a December calendar, a countdown arrow and a refund figure',
    '카톡 접수 말풍선과 당일 납품 체크리스트가 있는 썸네일': 'Thumbnail of a KakaoTalk intake bubble and a same-day checklist',
    '체크된 완료 목록과 소요시간 배지, 공유 링크가 있는 썸네일': 'Thumbnail of a ticked to-do list, hour badges and a share link',
    '평균가 카드와 가격 레인지 바가 있는 썸네일': 'Thumbnail of an average-price card and a price range bar',
    '부서 모니터와 8석 회의 테이블, 발언 말풍선이 있는 썸네일': 'Thumbnail of department monitors, an eight-seat table and speech bubbles',
    '캠페인 표, OFF 판정과 예산 재배분 막대가 있는 썸네일': 'Thumbnail of a campaign table with OFF verdicts and a reallocation bar',
    '긴 영상 타임라인에서 9:16 클립과 자막이 나오는 썸네일': 'Thumbnail of a long video timeline producing 9:16 clips and captions',
    'HWPX 문서가 HWP 5.0 파일로 바뀌는 썸네일': 'Thumbnail of an HWPX document becoming an HWP 5.0 file',
    '코드 줄을 검사해 방패 체크와 86 규칙을 보여 주는 썸네일': 'Thumbnail of code being scanned with a shield tick and 86 rules'
  };

  var META = {
    en: {
      title: 'Free web tools for solo founders and marketers | OneTap Tools',
      description: 'Free web apps for one-person businesses and marketers: keyword research, blog drafts, card news, short-form video, thumbnails, vector conversion, review replies, ad copy checks, quotes, price comparison, proof-of-work reports, PDF signing, payslips, tax, severance and year-end settlement, privacy and phishing checks, an AI team room, an ad audit studio, a clip factory, an HWPX converter and a web app shield. Zero uploads, no sign-up, no subscription.',
      ogTitle: 'Free tools you keep for life',
      ogDescription: 'Zero uploads · no sign-up · your own AI subscription. Free web apps for solo founders and marketers.',
      pages: {
        privacy: {
          title: 'Privacy policy | OneTap Tools',
          description: 'How the OneTap Tools hub handles information: tools with no server, an enquiry form that only drafts a message, and nothing collected behind your back.'
        }
      }
    }
  };

  /* Keys are matched on whitespace-collapsed text, so store them that way. */
  var DICT_NORM = {};
  Object.keys(DICT).forEach(function (k) {
    var nk = String(k).replace(/\s+/g, ' ').trim();
    if (DICT_NORM[nk] == null) DICT_NORM[nk] = DICT[k];
  });

  var current = DEFAULT_LANG;
  var textOrig = new Map();
  var attrOrig = new WeakMap();
  var enOrig = new WeakMap();
  var htmlOrig = new Map();
  var metaOrig = null;

  function norm(s) { return String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); }
  function isOther() { return current === OTHER_LANG; }

  function detect() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'ko' || q === 'en') return q;
    } catch (e) { /* older engines */ }
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'ko' || saved === 'en') return saved;
    } catch (e) { /* private mode */ }
    var nav = navigator.language || navigator.userLanguage || '';
    return /^ko/i.test(nav) ? 'ko' : 'en';
  }

  function t(en) {
    if (isOther() && en != null) {
      var key = norm(en);
      if (DICT_NORM[key] != null) return DICT_NORM[key];
    }
    return en;
  }

  function L(en, ko) { return isOther() ? ko : en; }

  function textNodes(root) {
    var out = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) out.push(n);
    return out;
  }

  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

  function translateTextNode(node) {
    var orig = textOrig.get(node);
    if (orig == null) {
      if (!isOther()) return;
      orig = node.nodeValue;
      textOrig.set(node, orig);
    }
    var key = norm(orig);
    var tr = (isOther() && key) ? DICT_NORM[key] : null;
    if (tr == null && isOther() && /^[·\u00b7]\s/.test(key)) {
      var tail = key.replace(/^[·\u00b7]\s/, '');
      if (DICT_NORM[tail] != null) tr = key.slice(0, key.length - tail.length) + DICT_NORM[tail];
    }
    if (tr != null) {
      var lead = (orig.match(/^\s*/) || [''])[0];
      var trail = (orig.match(/\s*$/) || [''])[0];
      node.nodeValue = lead + tr + trail;
    } else {
      node.nodeValue = orig;
    }
  }

  function translateAttrs(el) {
    var rec = attrOrig.get(el);
    ATTRS.forEach(function (attr) {
      var val = el.getAttribute(attr);
      if (val == null) return;
      if (!rec) { rec = {}; attrOrig.set(el, rec); }
      if (!(attr in rec)) {
        if (!isOther()) return;
        rec[attr] = val;
      }
      var orig = rec[attr];
      var tr = isOther() ? DICT_NORM[norm(orig)] : null;
      el.setAttribute(attr, tr != null ? tr : orig);
    });
  }

  /* Translate one subtree. Used for the first paint and for markup that the
     app writes later (documents, table rows, dialogs). */
  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === 3) { translateTextNode(root); return; }
    if (root.nodeType !== 1) return;
    if (root.hasAttribute && root.hasAttribute('data-ko-html')) {
      if (!htmlOrig.has(root)) htmlOrig.set(root, root.innerHTML);
      root.innerHTML = isOther() ? root.getAttribute('data-ko-html') : htmlOrig.get(root);
      return;
    }
    if (root.hasAttribute && root.hasAttribute('data-en')) {
      if (!enOrig.has(root)) enOrig.set(root, root.textContent);
      root.textContent = isOther() ? root.getAttribute('data-en') : enOrig.get(root);
      return;
    }
    textNodes(root).forEach(translateTextNode);
    if (root.nodeType === 1) translateAttrs(root);
    Array.prototype.slice.call(root.querySelectorAll('body *')).forEach(translateAttrs);
  }

  var observer = null;
  var muting = false;
  function watch() {
    if (observer || !window.MutationObserver || !isOther()) return;
    observer = new MutationObserver(function (records) {
      if (muting) return;
      muting = true;
      try {
        records.forEach(function (rec) {
          Array.prototype.slice.call(rec.addedNodes || []).forEach(function (n) {
            if (n.nodeType === 1 || n.nodeType === 3) translateTree(n);
          });
        });
      } finally { muting = false; }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function applyDom() {
    textNodes(document.body).forEach(translateTextNode);
    Array.prototype.slice.call(document.querySelectorAll('[data-ko-html]')).forEach(translateTree);
    Array.prototype.slice.call(document.querySelectorAll('body *')).forEach(translateAttrs);
    if (isOther()) watch();
  }

  function setMeta(attr, name, value) {
    var el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (el) el.setAttribute('content', value);
  }

  function applyMeta() {
    if (!metaOrig) {
      metaOrig = {
        title: document.title,
        description: (document.querySelector('meta[name="description"]') || {}).content || '',
        ogTitle: (document.querySelector('meta[property="og:title"]') || {}).content || '',
        ogDescription: (document.querySelector('meta[property="og:description"]') || {}).content || ''
      };
    }
    var pageKey = /privacy\.html/.test(location.pathname) ? 'privacy' : 'home';
    var other = isOther() ? META[OTHER_LANG] : null;
    var pack = other && other.pages && other.pages[pageKey] ? other.pages[pageKey] : other;
    document.title = pack ? pack.title : metaOrig.title;
    setMeta('name', 'description', pack ? pack.description : metaOrig.description);
    setMeta('property', 'og:title', pack ? pack.ogTitle : metaOrig.ogTitle);
    setMeta('property', 'og:description', pack ? pack.ogDescription : metaOrig.ogDescription);
  }

  function paintButtons() {
    Array.prototype.slice.call(document.querySelectorAll('[data-lang]')).forEach(function (b) {
      var on = b.getAttribute('data-lang') === current;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function apply(lang) {
    current = (lang === 'ko' || lang === 'en') ? lang : DEFAULT_LANG;
    document.documentElement.lang = current;
    applyMeta();
    applyDom();
    paintButtons();
  }

  function set(lang) {
    if (lang !== 'ko' && lang !== 'en') return;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
    apply(lang);
    bind();
    fireLang();
  }

  function bind() {
    Array.prototype.slice.call(document.querySelectorAll('[data-lang]')).forEach(function (b) {
      if (b.getAttribute('data-bound') === '1') return;
      b.setAttribute('data-bound', '1');
      b.addEventListener('click', function () { set(b.getAttribute('data-lang')); });
    });
  }

  /* Apps that build text in JS render before this file boots; tell them once
     so their first paint matches the chosen language. */
  function fireLang() {
    try {
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
    } catch (e) { /* older engines */ }
  }

  function boot() {
    apply(detect());
    bind();
    fireLang();
  }

  window.OneTapLang = {
    detect: detect,
    current: function () { return current; },
    set: set,
    apply: apply,
    bind: bind,
    t: t,
    L: L,
    translate: translateTree,
    isKo: function () { return isOther(); }
  };
  window.t = t;
  window.L = L;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
