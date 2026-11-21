# 원탭 도구 허브 (OneTap Tools) · portal-hub

무료 웹앱 17종(국내 14 · 해외 3)을 한 장에 모은 **통합 랜딩 허브**입니다.
무료 도구로 들어와 **절약액 → 5단계 워크플로 → B2B 커스텀 제작 문의**로 이어지는 동선 하나를 목표로 만들었습니다.

- 서버·빌드·계정·광고·추적 없음. `index.html`을 열면 바로 동작합니다.
- 입력값은 브라우저 `localStorage`에만 남고, 이 페이지는 **외부 요청 0건**입니다(폰트·아이콘·썸네일·질감 전부 로컬).
- 개인정보·블로그명·실명은 파일 어디에도 넣지 않았습니다(`test.js`가 검사).

```bash
# 로컬에서 보기 (file:// 도 되지만 폰트 로딩이 확실한 http 를 권합니다)
python3 -m http.server 8000
# → http://127.0.0.1:8000

# 검증(내부 QA 스크립트 — 공개 저장소에는 넣지 않습니다)
node test.js        # PASS 340  FAIL 0
python3 uitest.py   # PASS 182  FAIL 0  (헤드리스 Chrome)
```

---

## 1. 한 장에 담은 다섯 구역

| # | 구역 | 하는 일 | 구현 |
| --- | --- | --- | --- |
| — | 히어로 | `월 구독료 없이 평생 쓰는 1인 사업자·마케터 무료 도구 17선` + 3대 약속 + **구독료 영수증** | `index.html` `.hero` |
| 01 | 도구 17종 | 카드 17장 · 검색(동의어 포함) · 카테고리 5종 · 라이브만 보기 · 히어로 빠른 검색 4개 | `data.js` + `app.js` |
| 02 | 절약액 | 17종 대체 요금 비교표, 체크로 켜고 끄면 월·연 합계와 영수증이 같이 갱신 | `core.js` `savings()` |
| 03 | 5단계 | 주제 발굴 → 검수 → 제작 → 영업 → 정산, 단계별 도구 3개로 카드 이동 | `data.js` `steps` |
| 04 | 커스텀 제작 | 기본형·스튜디오형·풀커스텀 + **빠른 견적 문의 폼**(동의 필수, 문안 복사/메일) | `data.js` `tiers` + `core.js` `validateLead()` |
| 05 | FAQ | 돈·데이터·AI 연결·법적 판단 5문항 | `data.js` `faq` |

### 절약액 계산

- 17종 대체 요금 합계 **월 344,000원 / 연 4,128,000원**(1인 기준).
- 표에서 도구를 끄면 그 행이 흐려지고 합계·영수증이 즉시 다시 계산됩니다. `전체 선택/전체 해제` 제공.
- 요금은 각 서비스 공개 요금제를 2026-11에 확인해 만 원 단위로 반올림한 **참고값**이며, 페이지에도 그렇게 적혀 있습니다. 좌석 수·연간 약정·부가세에 따라 실제 청구액은 달라집니다.
- 16번(퇴직금·연차, 월 12,000원)·17번(보안 점검, 월 9,000원)을 더해 합계가 323,000원 → 344,000원이 되었습니다.

### 문의 폼

- 필수: 이름(2자↑)·회신 메일(형식 검사)·필요한 도구·요청 내용(10자↑)·**개인정보 수집·이용 동의**.
- 전송 버튼이 아니라 **문안을 만드는** 버튼입니다. 만든 문안을 `문안 복사`하거나, 수신 주소가 설정돼 있으면 `메일 앱으로 보내기`(`mailto:`)로 엽니다.
- 검증 실패 시 첫 오류로 포커스가 이동하고, 오류는 `role="alert"`로 읽힙니다.
- `CONTACT_EMAIL`은 공개 노출을 피하려고 **빈 값(복사 전용)** 으로 둡니다.

---

## 2. 배포 전에 바꿀 곳

| 파일 | 상수 | 지금 값 | 바꿀 때 |
| --- | --- | --- | --- |
| `data.js` | `CONTACT_EMAIL` | `''` | 문의 수신 메일을 넣으면 `메일 앱으로 보내기` 버튼이 켜집니다. 비어 있으면 복사 전용으로 동작합니다. |
| `data.js` | `apps[].live` | 17종 모두 `true` | 해당 앱을 GitHub Pages에 올린 뒤 `true`로. 카드 CTA가 `먼저 써 보기` → `지금 열기`로 바뀌고 상단 라이브 수·안내 문구도 자동으로 따라갑니다. |
| `index.html` | `canonical` / `og:url` / JSON-LD `url` | `https://marcj81.github.io/portal-hub/` | 저장소 이름이 다르면 세 곳을 같은 값으로. |

> **링크 상태(2026-11-21 실측)** — 17개 앱 주소를 직접 열어 본 결과 **17개 모두 HTTP 200** 입니다. 이 허브 자신은 `https://marcj81.github.io/portal-hub/` 에서 열립니다(GitHub Pages, 게시 브랜치 `gh-pages` — `main`과 같은 내용 · HTTPS 강제).

---

## 3. 라인업 (17종)

| # | 이름 | 폴더 | 카테고리 | 라이브 |
| --- | --- | --- | --- | --- |
| 01 | 떡상 레이더 | `shortform-radar` | 콘텐츠·SNS | ● |
| 02 | 블로그 키워드·SEO 스튜디오 | `blog-seo-studio` | 콘텐츠·SNS | ● |
| 03 | 커머스 SEO 스튜디오 | `commerce-seo-studio` | 커머스·마케팅 | ● |
| 04 | 카드뉴스·대본 스튜디오 | `cardnews-script-studio` | 콘텐츠·SNS | ● |
| 05 | 유튜브 댓글·고객반응 분석기 | `youtube-comment-analyzer` | 콘텐츠·SNS | ● |
| 06 | 광고 문구 법률 검수기 | `ad-law-checker` | 법률·세무·계약 | ● |
| 07 | 대행사 견적서·제안서 생성기 | `agency-proposal-maker` | 커머스·마케팅 | ● |
| 08 | 체험단 매칭 보드 | `influencer-campaign-board` | 커머스·마케팅 | ● |
| 09 | PDF 서명·직인 스튜디오 | `pdf-sign-stamp` | 법률·세무·계약 | ● |
| 10 | 급여명세서 스튜디오 | `payslip-calculator` | 법률·세무·계약 | ● |
| 11 | 1인 사업자 세금·순수익 계산기 | `tax-margin-calculator` | 법률·세무·계약 | ● |
| 12 | 원탭링크 (OneTapLink) · 링크·문의폼 빌더 | `onetaplink-studio` | 커머스·마케팅 | ● |
| 13 | ICS Calendar Viewer & CSV Converter | `ics-viewer-online` | 보안·유틸 | ● |
| 14 | Invoice, Receipt & P&L Generator | `invoice-receipt-pl-generator` | 법률·세무·계약 | ● |
| 15 | LLM API Cost Calculator & llms.txt Generator | `llm-cost-llms-txt` | 보안·유틸 | ● |
| 16 | 퇴직금·연차 계산기 | `severance-leave-calculator` | 법률·세무·계약 | ● |
| 17 | 개인정보·피싱링크 보안 점검기 | `privacy-security-guard` | 보안·유틸 | ● |

- 화면 표기명 `원탭링크 (OneTapLink)`는 12번 앱의 표시명입니다. 배포 주소는 저장소 이름을 따라 `onetaplink-studio`이며, 로컬 폴더명만 옛 이름(`apps/linkhub-studio`)입니다. 다른 이름으로 바꾸려면 `data.js`의 `name`·`slug`·`url`과 `index.html`의 JSON-LD를 함께 고치세요.
- 주소는 전부 `https://marcj81.github.io/<폴더>/` 규칙입니다. 16번은 `severance-leave-calculator`, 17번은 `privacy-security-guard` 입니다.
- 카테고리는 콘텐츠·SNS 4 · 커머스·마케팅 4 · 법률·세무·계약 6 · 보안·유틸 3 = 17종입니다.
- 썸네일은 17종 모두 `thumbs.js`의 자체 SVG(`radar` … `llm`, `severance`, `guard`)이며 외부 이미지 요청이 없습니다.

---

## 4. 검증 결과 (2026-11-21) — 내부 QA 스크립트 측정, 공개 저장소에는 미포함

### `node test.js` → PASS 340 / FAIL 0

- 데이터: 17종·중복 없음·번호 1~17·카테고리 합 17·라이브 17종·URL 규칙·썸네일 17종·16/17번 저장소 이름
- 코어: 검색 순위(“세금”→세금 계산기, “급여”→급여명세서, “퇴직금”→퇴직금·연차, “피싱”·“개인정보”→보안 점검기, “부가세”·“연차” 동의어), 필터, 절약액(월 344,000 / 연 4,128,000, 연=월×12, 선택 0개=0원), 금액 표기, 시각 형식
- 폼: 필수 5종·메일 형식·연락처 선택/형식·동의 없으면 실패하는지, 문안에 동의 문구·작성 시각·수신자
- 정적: h1 1개, JSON-LD 17항목 파싱·`numberOfItems` 17, 외부 script/link/img/iframe 0, `fetch`·`XMLHttpRequest` 0, CSS `url(http` 0, 추적 스크립트 0, 폰트 4종 woff2 매직바이트
- 브랜드: 옛 브랜드명 **0건**(8개 파일), `원탭 도구 허브`·`OneTap Tools` 탭 제목·og:site_name·JSON-LD·푸터 반영
- 프라이버시: 실명·블로그명·계정 핸들·전화번호·메일 서비스 도메인 **0건**

### `python3 uitest.py` → PASS 182 / FAIL 0 (Chrome 헤드리스)

- 데스크톱 1440×900: h1 3줄, 영수증 줄 합 = 합계(344,000), 도장이 안내문을 가리지 않음, 카드 17장·3열, 필터 5종, 검색·지우기·결과 없음, 라이브만 17장, `/` 키 포커스, 절약 표 17행·체크 시 월/연/영수증 동시 갱신·0원·복귀, 5단계 클릭 → 카드 강조·스크롤, 폼 오류 5종 → 채움 → 동의 → 문안 생성 → 클립보드 일치 → 수신 주소를 넣었을 때만 mailto 버튼, 내비 앵커 오프셋, 카드에서 폼으로 도구 자동 선택, FAQ, 폰트 로드, 라벨 누락 0, 포커스 링
- 모바일 390×844: 카드 1열, 칩 줄바꿈, 히어로 버튼 전폭, 표 3번째 열 숨김, 폼 1열, 넘침 0
- 768×1024: 카드 2열, 넘침 0
- 전 화면 공통: **콘솔 오류 0 · 페이지 오류 0 · 실패 요청 0 · 4xx/5xx 0 · 외부 요청 0건**
- 캡처: `preview-desktop.png`(1440, 전체 높이) · `preview-mobile.png`(390, 전체 높이)

### 실서버(GitHub Pages) 재검증 — PASS 197 / FAIL 0

- `https://marcj81.github.io/portal-hub/` **HTTP 200**, HTTPS 강제, `privacy.html` 200, CSS·JS·폰트 8종 200
- 요청 11건 전부 같은 도메인 → **콘솔 오류 0 · 페이지 오류 0 · 실패 요청 0 · 4xx/5xx 0 · 외부 요청 0건**
- 가로 넘침 0 (1440 · 768 · 390), 카드 17장, 절약 계산기 월 344,000원 → 전체 해제 0원 복귀, 문의 폼 오류 5종 → 문안 생성 → 클립보드 일치
- 도구 17종 카드 링크 **17개 모두 HTTP 200**
- DOMContentLoaded 270ms · load 675ms

---

## 5. 디자인 — 에디토리얼 톤

`packages/design-ref-engine.js` **v2.0.0**의 `cream-editorial` 프리셋에서 색·타이포·여백·형태를 그대로 가져와 CSS 변수로 굳혔습니다(런타임에 엔진을 불러오지 않습니다 — 외부 요청 0건 유지).

| 토큰 | 값 | 쓰는 곳 |
| --- | --- | --- |
| `--bg` | `#F3EADD` | 바탕(크림) |
| `--surface` | `#FFFCF6` | 카드·영수증·폼 |
| `--ink` | `#33281E` | 제목·본문·다크 섹션 |
| `--sub` | `#6A5B4A` | 보조 텍스트 |
| `--line` | `#E0D2BE` | 1px 괘선 |
| `--accent` | `#A8431F` | 테라코타 포인트(링크·숫자·도장) |
| 여백 | 8 단위, 섹션 72~96px, 최대 1180px | `.wrap` |
| 형태 | radius 4 이하, 그림자 1종 | 카드·버튼 |

- **대비**: 엔진 `contrastReport('cream-editorial')` 8쌍 전부 통과(본문/배경 12.05:1 AAA, 카드 위 14.02:1 AAA, 보조 5.49:1 AA, CTA 글자 5.72:1 AA).
- **AI 기본값 탈피**: `detectDefaultLook` 결과 `risk 0 · "개성 있음"`(파랑·보라 포인트 + 큰 라운딩 + 소프트 섀도 조합이 아님).
- **질감**: 엔진의 `grainSVGDataUri()`(feTurbulence) 결과를 `data:` URI로 CSS에 인라인, `mix-blend-mode:multiply` 5.5%.
- **타이포**: 제목은 명조 계열(Noto Serif KR 서브셋) + 본문 IBM Plex Sans KR. `font-mix: myeongjo-title`과 같은 축.
- **브랜드 마크**: 옛 `問` 자리를 `1`(OneTap)로 바꾸고, 상단은 `원탭 도구 허브` + `OneTap Tools · VOL.17`, 푸터는 `원탭 도구 허브 (OneTap Tools)` 로 통일했습니다.

### 폰트 (전부 로컬, 서브셋)

| 파일 | 원본 | 크기 | 라이선스 |
| --- | --- | --- | --- |
| `assets/fonts/hub-serif.woff2` | Noto Serif CJK KR Regular | 74KB | SIL OFL 1.1 (`OFL-NotoSerifCJK.txt`) |
| `assets/fonts/plexkr-Regular/SemiBold/Bold.woff2` | IBM Plex Sans KR | 약 1.1MB | SIL OFL 1.1 |

명조는 이 페이지에 실제로 쓰인 글자(557자)만 서브셋했습니다. 폼에 방문자가 입력한 글자는 본문 폰트로 표시되고, 시스템 폰트로 자연스럽게 대체됩니다.

---

## 6. 파일

```
portal-hub/
  index.html      화면 (히어로·도구·절약액·5단계·B2B·FAQ·푸터)
  styles.css      디자인 토큰 + 전 구간 반응형(1120·900·680·print) + SVG 썸네일 색 토큰
  data.js         17종 라인업·카테고리·5단계·납품 3단계·FAQ·문의 수신 설정
  core.js         검색·필터·절약 계산·폼 검증·문안·mailto (DOM 없음, node에서도 실행)
  thumbs.js       17종 카드 썸네일 SVG 생성기 (외부 이미지 0)
  app.js          렌더링·상태·이벤트
  privacy.html    개인정보처리방침 (localStorage·문의 폼·AI 연결·보관 3개월)
  test.js         단위·정적 검사 340건
  uitest.py       Chrome 실브라우저 검사 182건 + 미리보기 캡처(16,384px 초과분 구간 캡처·스티치)
  preview-desktop.png / preview-mobile.png
  assets/favicon.svg · assets/fonts/*
  .nojekyll
```

## 7. 알아둘 점

- **17종 모두 `live: true`** 이고 2026-11-21 실측으로 17개 주소가 전부 HTTP 200 입니다. 이번 작업에서는 **로컬 업그레이드·검증만** 했고 GitHub 푸시는 하지 않았습니다(허브 자신의 Pages 는 푸시 후 켜야 합니다).
- 문의 폼은 서버가 없으므로 **자동 접수되지 않습니다**. 문안을 만들어 방문자가 직접 보내는 방식이고, 수신 주소를 넣기 전에는 `메일 앱으로 보내기`가 숨겨집니다.
- 요금·법령·세율은 참고값입니다. 페이지 하단과 FAQ에 법률·세무 자문이 아니라는 점을 적었습니다.
- 다크 모드는 넣지 않았습니다. 크림 에디토리얼 톤이 이 페이지의 정체성이라 임의로 반전하지 않았고, `prefers-reduced-motion`만 존중합니다.
